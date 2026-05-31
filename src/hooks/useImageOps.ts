import { useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useGalleryStore } from '../store/galleryStore';
import { useEditorStore } from '../store/editorStore';
import type { ImageMeta, SimilarGroup } from '../types';

function showError(action: string, err: unknown): void {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[Tec] ${action}:`, message);
  useEditorStore.getState().setStatusMessage(`❌ ${action}失败: ${message}`, 'error');
}

/** 提取文件名（不含后缀） */
function fileNameWithoutExt(path: string): string {
  const name = path.split(/[\\/]/).pop() || 'image';
  return name.replace(/\.[^.]+$/, '');
}

export function useImageOps() {
  const { addImage, setSimilarGroups, setIsDetecting } = useGalleryStore();

  /**
   * .md 流程：压缩为 WebP → 存入 assets/ → 同时保留原图。
   * 返回 `![alt](assets/{hash}.webp)`。
   *
   * 如果 .md 文件尚未保存（无路径），则回退到直接引用原路径。
   */
  const saveImageMd = useCallback(async (filePath: string): Promise<{ imageMd: string } | null> => {
    const currentFilePath = useEditorStore.getState().currentFilePath;
    if (!currentFilePath) {
      // 文件尚未保存 — 直接引用原路径
      try {
        await invoke('get_file_info', { path: filePath });
      } catch {
        showError('图片引用', '文件不存在: ' + filePath);
        return null;
      }
      const alt = fileNameWithoutExt(filePath);
      const imageMd = `![${alt}](${filePath})`;
      return { imageMd };
    }

    // 文件已保存 — 压缩到 assets/ 并存入图片库
    try {
      const saveDir = currentFilePath.split(/[\\/]/).slice(0, -1).join('/');

      // import_image: hash → compress → save to assets/{hash}.webp → return ImageMeta
      const meta = await invoke<ImageMeta>('import_image', {
        sourcePath: filePath,
        saveDir,
      });

      // 同时保存原图到 assets/{hash}_orig.{ext}（用户可对比查看）
      const origName = await invoke<string>('save_original_to_assets', {
        sourcePath: filePath,
        saveDir,
        hash: meta.hash,
      });
      console.log('[Tec] 原图已保存:', origName);

      const alt = fileNameWithoutExt(filePath);
      const imageMd = `![${alt}](assets/${meta.hash}.webp)`;

      // 添加到图片库
      useGalleryStore.getState().addImage({
        ...meta,
        name: alt,
        path: `assets/${meta.hash}.webp`,
      });

      return { imageMd };
    } catch (err) {
      showError('MD 图片导入', err);
      return null;
    }
  }, []);

  /**
   * .mdx 流程：压缩为 WebP → 存入 mdxAssets 内存列表。
   * 返回 `assets/{hash}.webp`，保存时打包进 ZIP。
   */
  const saveImageMdx = useCallback(async (filePath: string): Promise<{ imageMd: string } | null> => {
    try {
      const result = await invoke<{
        hash: string;
        data: number[];
        width: number;
        height: number;
        originalSize: number;
        compressedSize: number;
      }>('compress_image', { sourcePath: filePath });

      const asset = {
        hash: result.hash,
        name: `${result.hash}.webp`,
        data: result.data,
        width: result.width,
        height: result.height,
      };

      useEditorStore.getState().addMdxAsset(asset);

      // 同步添加到图片库（让拖入的图片在图片库面板中可见）
      useGalleryStore.getState().addImage({
        hash: result.hash,
        width: result.width,
        height: result.height,
        size: result.compressedSize,
        format: 'webp',
        compressed: true,
        name: fileNameWithoutExt(filePath),
        path: `assets/${result.hash}.webp`,
      });

      const imageMd = `![${result.hash}](assets/${result.hash}.webp)`;
      return { imageMd };
    } catch (err) {
      showError('MDX 图片导入', err);
      return null;
    }
  }, []);

  /**
   * 导入图片到图片库（含相似检测）。
   */
  const importImage = useCallback(async (filePath: string, saveDir?: string) => {
    try {
      const meta = await invoke<ImageMeta>('import_image', {
        sourcePath: filePath,
        saveDir: saveDir ?? '',
      });
      addImage(meta);

      setIsDetecting(true);
      const groups = await invoke<SimilarGroup[]>('detect_similar_images', {
        targetHash: meta.hash,
        manifestJson: JSON.stringify({}),
      });
      if (groups.length > 0) {
        setSimilarGroups(groups);
      }
      setIsDetecting(false);

      const imageMd = `![${meta.hash}](assets/${meta.hash}.webp)`;
      return { meta, imageMd };
    } catch (err) {
      showError('导入图片', err);
      setIsDetecting(false);
      return null;
    }
  }, [addImage, setSimilarGroups, setIsDetecting]);

  /**
   * 扫描本地 `assets/` 目录，将图片填充到图库。
   * 用于 .md 文件打开时加载已有图片。
   */
  const scanAssets = useCallback(async (dirPath: string) => {
    try {
      const images = await invoke<ImageMeta[]>('list_assets', { dirPath });
      useGalleryStore.getState().setImages(images.map((img) => ({
        ...img,
        path: `assets/${img.hash}.${img.format}`,
      })));
    } catch (err) {
      // 静默处理：assets/ 目录可能不存在或为空
      console.log('[Tec] scanAssets: assets 目录为空或不存在');
    }
  }, []);

  const manualDetect = useCallback(async () => {
    try {
      setIsDetecting(true);
      const groups = await invoke<SimilarGroup[]>('detect_similar_manual', {
        manifestJson: JSON.stringify({}),
        assetsDir: '',
      });
      setSimilarGroups(groups);
      setIsDetecting(false);
      return groups;
    } catch (err) {
      showError('检测相似图片', err);
      setIsDetecting(false);
      return [];
    }
  }, [setSimilarGroups, setIsDetecting]);

  const mergeSimilarGroup = useCallback((groupId: string, _primaryHash: string) => {
    setSimilarGroups(useGalleryStore.getState().similarGroups.filter(
      (g) => g.groupId !== groupId,
    ));
  }, [setSimilarGroups]);

  return { saveImageMd, saveImageMdx, importImage, scanAssets, manualDetect, mergeSimilarGroup };
}
