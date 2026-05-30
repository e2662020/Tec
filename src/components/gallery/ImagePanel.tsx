import { useCallback } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { useGalleryStore } from '../../store/galleryStore';
import { useImageOps } from '../../hooks/useImageOps';
import { useEditorStore } from '../../store/editorStore';
import type { ImageMeta, SimilarGroup } from '../../types';

function SimilarGroupCard({ group }: { group: SimilarGroup }) {
  const { mergeSimilarGroup } = useImageOps();
  const primary = group.images.find((i) => i.isPrimary) || group.images[0];

  return (
    <div className="gallery-group">
      <div className="gallery-group-header">
        <span className="gallery-group-title">
          <i className="bi bi-images"></i> 相似组 #{group.groupId} ({group.images.length}张)
        </span>
        <button
          className="gallery-group-merge"
          onClick={() => mergeSimilarGroup(group.groupId, primary.hash)}
          title="合并为该组主图"
        >
          <i className="bi bi-arrows-angle-contract"></i> 合并
        </button>
      </div>
      <div className="gallery-group-images">
        {group.images.map((img) => (
          <div
            key={img.hash}
            className={`gallery-thumb ${img.isPrimary ? 'primary' : ''}`}
            title={img.name}
          >
            <div className="gallery-thumb-preview">
              {img.isPrimary && <span className="gallery-thumb-star"><i className="bi bi-star-fill"></i></span>}
              <span className="gallery-thumb-name">{img.name.slice(0, 20)}</span>
            </div>
            <div className="gallery-thumb-info">
              距离: {img.distance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageThumb({ image, isGrid }: { image: ImageMeta; isGrid: boolean }) {
  return (
    <div className={`gallery-thumb ${isGrid ? 'grid' : 'list'}`}>
      <div className="gallery-thumb-preview">
        <span className="gallery-thumb-name"><i className="bi bi-image"></i> {image.hash.slice(0, 12)}</span>
      </div>
      <div className="gallery-thumb-info">
        {image.width}×{image.height} {image.format}
      </div>
    </div>
  );
}

export function ImagePanel() {
  const visible = useGalleryStore((s) => s.visible);
  const view = useGalleryStore((s) => s.view);
  const setView = useGalleryStore((s) => s.setView);
  const searchQuery = useGalleryStore((s) => s.searchQuery);
  const setSearchQuery = useGalleryStore((s) => s.setSearchQuery);
  const images = useGalleryStore((s) => s.images);
  const similarGroups = useGalleryStore((s) => s.similarGroups);
  const isDetecting = useGalleryStore((s) => s.isDetecting);
  const removeImage = useGalleryStore((s) => s.removeImage);
  const { importImage, manualDetect } = useImageOps();

  const handleImport = useCallback(async () => {
    try {
      const selected = await open({
        filters: [{ name: '图片', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'] }],
        multiple: true,
      });
      if (!selected) return;
      const paths = Array.isArray(selected) ? selected : [selected];
      const currentPath = useEditorStore.getState().currentFilePath;
      const saveDir = currentPath ? currentPath.split(/[\\/]/).slice(0, -1).join('/') : undefined;
      for (const p of paths) {
        const fp = typeof p === 'string' ? p : String(p);
        await importImage(fp, saveDir);
      }
    } catch (err) {
      console.error('[Tec] 导入图片失败:', err);
    }
  }, [importImage]);

  const filteredImages = searchQuery
    ? images.filter((i) => i.hash.includes(searchQuery))
    : images;

  return (
    <aside
      className={`gallery-panel ${visible ? 'gallery-panel-visible' : 'gallery-panel-hidden'}`}
    >
      <div className="gallery-header">
        <div className="gallery-search">
          <input
            type="text"
            placeholder="搜索图片..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="gallery-view-controls">
          <button onClick={handleImport} title="从文件导入图片">
            <i className="bi bi-cloud-upload"></i> 导入
          </button>
          <button
            className={view === 'grid' ? 'active' : ''}
            onClick={() => setView('grid')}
          >
            <i className="bi bi-grid"></i>
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
          >
            <i className="bi bi-list-ul"></i>
          </button>
          <button
            onClick={manualDetect}
            disabled={isDetecting}
            title="手动检测相似图片 (dHash + SSIM)"
          >
            {isDetecting ? <i className="bi bi-arrow-clockwise bi-spin"></i> : <i className="bi bi-search"></i>}
          </button>
        </div>
      </div>

      <div className="gallery-content">
        {similarGroups.length > 0 && (
          <div className="gallery-groups">
            {similarGroups.map((group) => (
              <SimilarGroupCard key={group.groupId} group={group} />
            ))}
          </div>
        )}

        <div className={`gallery-images ${view}`}>
          {filteredImages.map((img) => (
            <div key={img.hash} className="gallery-image-wrapper">
              <ImageThumb image={img} isGrid={view === 'grid'} />
              <button
                className="gallery-image-remove"
                onClick={() => removeImage(img.hash)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          ))}
          {filteredImages.length === 0 && (
            <div className="gallery-empty">
              <div className="gallery-empty-dropzone">
                <div className="gallery-empty-icon">
                  <i className="bi bi-cloud-arrow-down"></i>
                </div>
                <div className="gallery-empty-title">
                  {images.length === 0 ? '图片库为空' : '无匹配图片'}
                </div>
                <div className="gallery-empty-text">
                  {images.length === 0
                    ? '拖入图片到此处即可添加到图片库'
                    : '尝试其他搜索关键词'}
                </div>
                {images.length === 0 && (
                  <div className="gallery-empty-hint">
                    <span className="gallery-empty-key">Ctrl+V</span>
                    <span>或拖放图片到图片库</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default ImagePanel;
