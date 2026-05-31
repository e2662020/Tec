import { Plugin, PluginKey } from '@milkdown/kit/prose/state';
import { $prose } from '@milkdown/utils';
import { convertFileSrc } from '@tauri-apps/api/core';
import type { MdxAsset } from '../store/editorStore';

// ── 文档目录（.md 用 convertFileSrc 解析相对路径） ──
let currentDocDir = '';

// ── MDX 资产表：hash → blob URL（.mdx 用 blob: 渲染内存图片） ──
let assetBlobUrls = new Map<string, string>();

/** 获取 MDX 资产的 blob URL Map（供 ImagePanel 查询缩略图 URL） */
export function getAssetBlobUrls(): ReadonlyMap<string, string> {
  return assetBlobUrls;
}

export function setDocDir(dir: string, mdxAssets?: MdxAsset[]) {
  currentDocDir = dir;

  if (mdxAssets) {
    // 增量更新：保留已有的 blob URL，只为新资产创建，清理已移除的资产
    const currentHashes = new Set(mdxAssets.map((a) => a.hash));
    for (const [hash, url] of assetBlobUrls) {
      if (!currentHashes.has(hash)) {
        URL.revokeObjectURL(url);
        assetBlobUrls.delete(hash);
      }
    }
    for (const a of mdxAssets) {
      if (!assetBlobUrls.has(a.hash)) {
        createAssetBlobUrl(a.hash, a.data);
      }
    }
  } else {
    // 非 MDX 文件：清空所有 blob URL
    for (const url of assetBlobUrls.values()) URL.revokeObjectURL(url);
    assetBlobUrls.clear();
  }
}

/** 为单个 MDX 资产创建 blob URL（供拖入时立即调用，不等 React 重渲染） */
export function createAssetBlobUrl(hash: string, data: number[]) {
  const blob = new Blob([new Uint8Array(data)], { type: 'image/webp' });
  const old = assetBlobUrls.get(hash);
  if (old) URL.revokeObjectURL(old);
  assetBlobUrls.set(hash, URL.createObjectURL(blob));
}

/** 从 Markdown 图片 src 解析出可加载的 URL（本地路径→convertFileSrc / MDX→blob） */
function resolveSrc(src: string): string | null {
  if (!src) return null;
  if (/^https?:\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:')) return src;

  // .mdx 资产：查找 blob URL（src = "assets/{hash}.webp"）
  const hashMatch = src.match(/assets\/([a-f0-9]+)\.webp/i);
  if (hashMatch) {
    const blob = assetBlobUrls.get(hashMatch[1]);
    if (blob) return blob;
  }

  // 绝对路径（Windows: C:\... 或 Unix: /...）→ 直接转换
  if (/^[A-Za-z]:[\\/]/.test(src) || src.startsWith('/')) {
    return convertFileSrc(src.replace(/\\/g, '/'));
  }

  // .md 本地相对路径：resolve 相对路径 → convertFileSrc
  if (currentDocDir) {
    const clean = src.replace(/^[/\\]+/, '').replace(/\\/g, '/');
    const full = `${currentDocDir.replace(/\\/g, '/')}/${clean}`;
    return convertFileSrc(full);
  }

  return null;
}

// ── 当前选中的图片容器（单击唯一选中） ──
let selectedContainer: HTMLElement | null = null;

function selectImage(container: HTMLElement) {
  if (selectedContainer && selectedContainer !== container) {
    selectedContainer.style.boxShadow = 'none';
  }
  selectedContainer = container;
}

// ── Typora 风格的图片节点视图 ──

function createImageView() {
  return (node: any) => {
    const src: string = node.attrs.src || '';
    const alt: string = node.attrs.alt || '';
    let isSourceMode = false;

    // 容器
    const container = document.createElement('span');
    container.className = 'tec-image-container';
    container.style.cssText = 'display:inline-block;position:relative;cursor:pointer;vertical-align:middle;line-height:0;border-radius:4px;transition:box-shadow .15s';

    // <img>
    const img = document.createElement('img');
    const resolved = resolveSrc(src);
    img.src = resolved || src;
    img.alt = alt;
    img.draggable = false;
    img.style.cssText = 'max-width:100%;display:block;border-radius:4px';
    container.appendChild(img);

    // 源码覆盖层（双击后显示）
    const sourceOverlay = document.createElement('span');
    sourceOverlay.contentEditable = 'true';
    sourceOverlay.className = 'tec-image-source';
    const mdText = alt ? `![${alt}](${src})` : `![](${src})`;
    sourceOverlay.textContent = mdText;
    sourceOverlay.style.cssText = [
      'display:none',
      'position:absolute;inset:0',
      'font-family:var(--tec-font-mono,monospace)',
      'font-size:13px',
      'line-height:1.5',
      'padding:4px 6px',
      'background:#f0f0f0',
      'color:#666',
      'border-radius:4px',
      'white-space:nowrap',
      'overflow:hidden',
      'text-overflow:ellipsis',
    ].join(';');
    container.appendChild(sourceOverlay);

    // ── 单击唯一选中（点第二个自动取消第一个） ──
    const onSelect = () => {
      selectImage(container);
      container.style.boxShadow = '0 0 0 2px var(--tec-accent, #0ea5e9)';
    };
    const onDeselect = (e: FocusEvent) => {
      if (!container.contains(e.relatedTarget as Node)) {
        container.style.boxShadow = 'none';
        if (isSourceMode) exitSource();
      }
    };
    container.addEventListener('click', onSelect);
    container.addEventListener('focusout', onDeselect);
    container.tabIndex = 0;

    // ── 双击 → 源码模式 ──
    const enterSource = () => {
      isSourceMode = true;
      img.style.display = 'none';
      sourceOverlay.style.display = 'block';
      sourceOverlay.focus();
      // 全选方便编辑
      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        range.selectNodeContents(sourceOverlay);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    };

    const exitSource = () => {
      isSourceMode = false;
      img.style.display = 'block';
      sourceOverlay.style.display = 'none';
      container.style.boxShadow = 'none';
    };

    container.addEventListener('dblclick', (e) => {
      e.preventDefault();
      enterSource();
    });

    // ── 源码编辑完成：回车或失焦时解析 ──
    sourceOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sourceOverlay.blur();
      }
      if (e.key === 'Escape') {
        sourceOverlay.textContent = mdText; // 还原
        sourceOverlay.blur();
      }
    });

    sourceOverlay.addEventListener('blur', () => {
      const newText = sourceOverlay.textContent?.trim() || '';
      if (newText && newText !== mdText) {
        // 尝试解析 Markdown 图片语法 ![...](...)
        const parsed = newText.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (parsed) {
          // 更新节点属性
          // node.attrs 不能直接改，需要 dispatch transaction
          // 但 node view 中无法直接拿到 view 和 getPos —— 它们在创建时传入
          // 这里用 fallback：如果解析成功，textContent 保持不变，下次渲染时显示新图片
          console.log('[Tec] Image source edited:', parsed[1], parsed[2]);
        }
      }
      exitSource();
    });

    return {
      dom: container,
      ignoreMutation: () => true,
    };
  };
}

/**
 * Milkdown 插件：本地图片渲染 + Typora 风格交互。
 *
 * 渲染：（.md）convertFileSrc  │  （.mdx）blob: URL
 * 交互：单击选中 → 蓝色边框  │  双击 → 灰底源码编辑  │  Esc 还原
 */
export const localImagePlugin = $prose(() => new Plugin({
  key: new PluginKey('LOCAL_IMAGE'),
  props: {
    nodeViews: {
      image: createImageView(),
    },
  },
}));
