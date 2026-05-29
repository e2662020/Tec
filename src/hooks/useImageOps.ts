import { useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useGalleryStore } from '../store/galleryStore';
import { useEditorStore } from '../store/editorStore';
import type { ImageMeta, SimilarGroup } from '../types';

export function useImageOps() {
  const { addImage, setSimilarGroups, setIsDetecting } = useGalleryStore();
  const content = useEditorStore((s) => s.content);
  const setContent = useEditorStore((s) => s.setContent);

  const importImage = useCallback(async (filePath: string) => {
    try {
      const meta = await invoke<ImageMeta>('import_image', { sourcePath: filePath });
      addImage(meta);

      // Auto-detect similar images
      setIsDetecting(true);
      const groups = await invoke<SimilarGroup[]>('detect_similar_images', {
        targetHash: meta.hash,
        manifestJson: JSON.stringify({}),
      });
      if (groups.length > 0) {
        setSimilarGroups(groups);
      }
      setIsDetecting(false);

      // Insert image reference into markdown
      const imageMd = `![${meta.hash}](assets/${meta.hash}.webp)`;
      const newContent = content ? `${content}\n${imageMd}` : imageMd;
      setContent(newContent);

      return meta;
    } catch (err) {
      console.error('Failed to import image:', err);
      return null;
    }
  }, [addImage, setSimilarGroups, setIsDetecting, content, setContent]);

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
      console.error('Failed to detect similar images:', err);
      setIsDetecting(false);
      return [];
    }
  }, [setSimilarGroups, setIsDetecting]);

  const mergeSimilarGroup = useCallback((groupId: string, _primaryHash: string) => {
    setSimilarGroups(useGalleryStore.getState().similarGroups.filter(
      (g) => g.groupId !== groupId,
    ));
  }, [setSimilarGroups]);

  return { importImage, manualDetect, mergeSimilarGroup };
}
