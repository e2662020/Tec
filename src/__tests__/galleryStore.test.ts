import { describe, it, expect, beforeEach } from 'vitest';
import { useGalleryStore } from '../store/galleryStore';

describe('galleryStore', () => {
  beforeEach(() => {
    useGalleryStore.setState({
      visible: false,
      view: 'grid',
      searchQuery: '',
      images: [],
      similarGroups: [],
      isDetecting: false,
    });
  });

  it('toggles visibility', () => {
    expect(useGalleryStore.getState().visible).toBe(false);
    useGalleryStore.getState().toggleVisible();
    expect(useGalleryStore.getState().visible).toBe(true);
  });

  it('switches view mode', () => {
    useGalleryStore.getState().setView('list');
    expect(useGalleryStore.getState().view).toBe('list');
  });

  it('filters images by search query', () => {
    useGalleryStore.getState().setImages([
      { hash: 'abc123', width: 100, height: 100, size: 1024, format: 'webp', compressed: true },
      { hash: 'def456', width: 200, height: 200, size: 2048, format: 'png', compressed: false },
      { hash: 'abc789', width: 300, height: 300, size: 4096, format: 'webp', compressed: true },
    ]);
    useGalleryStore.getState().setSearchQuery('abc');
    const filtered = useGalleryStore.getState().images.filter(
      (i) => i.hash.includes('abc'),
    );
    expect(filtered).toHaveLength(2);
  });

  it('adds and removes images', () => {
    const img = { hash: 'test123', width: 800, height: 600, size: 5000, format: 'webp' as const, compressed: true };
    useGalleryStore.getState().addImage(img);
    expect(useGalleryStore.getState().images).toHaveLength(1);
    useGalleryStore.getState().removeImage('test123');
    expect(useGalleryStore.getState().images).toHaveLength(0);
  });
});
