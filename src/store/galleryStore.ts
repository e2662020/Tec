import { create } from 'zustand';
import type { SimilarGroup, ImageMeta } from '../types';

type GalleryView = 'grid' | 'list';

interface GalleryState {
  visible: boolean;
  view: GalleryView;
  searchQuery: string;
  images: ImageMeta[];
  similarGroups: SimilarGroup[];
  isDetecting: boolean;

  setVisible: (v: boolean) => void;
  toggleVisible: () => void;
  setView: (v: GalleryView) => void;
  setSearchQuery: (q: string) => void;
  setImages: (images: ImageMeta[]) => void;
  addImage: (image: ImageMeta) => void;
  removeImage: (hash: string) => void;
  setSimilarGroups: (groups: SimilarGroup[]) => void;
  setIsDetecting: (v: boolean) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  visible: false,
  view: 'grid',
  searchQuery: '',
  images: [],
  similarGroups: [],
  isDetecting: false,

  setVisible: (visible) => set({ visible }),
  toggleVisible: () => set((s) => ({ visible: !s.visible })),
  setView: (view) => set({ view }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setImages: (images) => set({ images }),
  addImage: (image) => set((s) => ({ images: [...s.images, image] })),
  removeImage: (hash) => set((s) => ({ images: s.images.filter((i) => i.hash !== hash) })),
  setSimilarGroups: (similarGroups) => set({ similarGroups }),
  setIsDetecting: (isDetecting) => set({ isDetecting }),
}));
