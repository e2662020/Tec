export interface MdxMeta {
  version: string;
  created: string;
  modified: string;
  syntaxExtensions: string[];
  pluginData: Record<string, unknown>;
}

export interface ImageManifestEntry {
  originalName: string;
  hash: string;
  similarGroup?: string;
  isPrimary: boolean;
  mtime: string;
  compressed: boolean;
}

export interface AssetInfo {
  name: string;
  data: number[];
  manifestEntry?: ImageManifestEntry;
}

export interface MdxDocument {
  content: string;
  assets: AssetInfo[];
  theme: string;
  colorMap: string;
  meta: MdxMeta;
}

export interface FileInfo {
  name: string;
  path: string;
  size: number;
  modified: string;
  isMdx: boolean;
  isMd: boolean;
}

export interface ImageMeta {
  hash: string;
  width: number;
  height: number;
  size: number;
  format: string;
  compressed: boolean;
}

export interface SimilarImage {
  hash: string;
  name: string;
  isPrimary: boolean;
  distance: number;
}

export interface SimilarGroup {
  groupId: string;
  images: SimilarImage[];
}

export type EditorMode = 'wysiwyg' | 'source';

export type SidebarTab = 'files' | 'outline';

export interface ColorMap {
  [key: string]: string;
}

export const DEFAULT_COLOR_MAP: ColorMap = {
  R: '#E74C3C',
  G: '#2ECC71',
  B: '#3498DB',
  O: '#E67E22',
  P: '#9B59B6',
  Y: '#F1C40F',
  C: '#1ABC9C',
  K: '#2C3E50',
  W: '#95A5A6',
  H: '#E91E63',
};
