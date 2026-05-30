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
   * .md 流程：直接引用源路径，不复制/不压缩。
   * 返回 `![文件名](原路径)`，localImagePlugin 用 convertFileSrc 渲染。
   */
  const saveImageMd = useCallback(async (filePath: string): Promise<{ imageMd: string } | null> => {
    // 验证文件是否存在
    try {
      await invoke('get_file_info', { path: filePath });
    } catch {
      showError('图片引用', '文件不存在: ' + filePath);
      return null;
    }
    const alt = fileNameWithoutExt(filePath);
    const imageMd = `![${alt}](${filePath})`;
    return { imageMd };
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

  return { saveImageMd, saveImageMdx, importImage, manualDetect, mergeSimilarGroup };
}
