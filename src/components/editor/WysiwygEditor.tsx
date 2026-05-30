import { useCallback } from 'react';
import { useEditor, Milkdown, MilkdownProvider } from '@milkdown/react';
import { Editor, rootCtx, defaultValueCtx, editorViewCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { history } from '@milkdown/kit/plugin/history';
import { clipboard } from '@milkdown/kit/plugin/clipboard';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { math } from '@milkdown/plugin-math';
import { useEditorStore } from '../../store/editorStore';
import { useGalleryStore } from '../../store/galleryStore';
import { useImageDrop } from '../../hooks/useImageDrop';
import { useImageOps } from '../../hooks/useImageOps';
import { preprocessMdx, postprocessMdx } from '../../utils/mdxProcessor';
import { headingMarkerPlugin } from '../../plugins/headingMarker';
import { localImagePlugin, setDocDir, createAssetBlobUrl } from '../../plugins/localImage';
import { $prose } from '@milkdown/utils';
import {
  coloredTextMark,
  columnsNode,
  alignNode,
  highlightMark,
  superscriptMark,
  subscriptMark,
  frontmatterNode,
  footnoteRefNode,
  footnoteDefNode,
  tocNode,
  emojiNode,
} from '../../extensions';
import 'katex/dist/katex.min.css';
import '../../styles/editor-theme.css';

const headingMarker = $prose(() => headingMarkerPlugin());

/** 从 markdown 文本中提取标题结构，用于大纲面板 */
function extractOutline(markdown: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const outline: { level: number; text: string; id: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = `heading-${text.toLowerCase().replace(/[^a-z0-9一-鿿]+/g, '-').replace(/(^-|-$)/g, '')}`;
    outline.push({ level, text, id });
  }
  return outline;
}

function MilkdownSetup() {
  const setContent = useEditorStore((s) => s.setContent);
  const setIsDirty = useEditorStore((s) => s.setIsDirty);
  const setWordCount = useEditorStore((s) => s.setWordCount);
  const setOutline = useEditorStore((s) => s.setOutline);
  const currentFilePath = useEditorStore((s) => s.currentFilePath);
  const mdxAssets = useEditorStore((s) => s.mdxAssets);
  const { saveImageMd, saveImageMdx } = useImageOps();

  // 每当文档路径变化时更新本地图片解析目录
  const docDir = currentFilePath
    ? currentFilePath.split(/[\\/]/).slice(0, -1).join('/')
    : '';
  setDocDir(docDir, mdxAssets);

  // 获取 Milkdown 编辑器实例（拖入图片时用于插入文本）
  const { get: getEditor } = useEditor((root) => {
    const rawContent = useEditorStore.getState().content;
    const content = preprocessMdx(rawContent);
    // 初始化大纲：markdownUpdated 只在用户编辑时触发，不在初始加载时触发
    if (rawContent) {
      setOutline(extractOutline(rawContent));
    }
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, content);
        const mgr = ctx.get(listenerCtx);
        mgr.markdownUpdated((_ctx, markdown) => {
          const mdx = postprocessMdx(markdown);
          setContent(mdx);
          setIsDirty(true);
          const text = mdx.replace(/\s+/g, ' ').trim();
          setWordCount(text ? text.split(/\s+/).length : 0);
          setOutline(extractOutline(mdx));
        });
      })
      .use(commonmark)
      .use(gfm)
      .use(history)
      .use(clipboard)
      .use(cursor)
      .use(listener)
      .use(math)
      .use(headingMarker)
      .use(localImagePlugin)
      .use(coloredTextMark)
      .use(columnsNode)
      .use(alignNode)
      .use(highlightMark)
      .use(superscriptMark)
      .use(subscriptMark)
      .use(frontmatterNode)
      .use(footnoteRefNode)
      .use(footnoteDefNode)
      .use(tocNode)
      .use(emojiNode);
  }, []);

  // 拖入图片：根据文件类型走不同流程
  const handleDropFiles = useCallback(async (paths: string[]) => {
    if (!currentFilePath) {
      useEditorStore.getState().setStatusMessage('💡 请先保存文档，再拖入图片', 'info');
      return;
    }

    const isMdx = currentFilePath.endsWith('.mdx');

    for (const path of paths) {
      // .md: 直接引用原路径  /  .mdx: 压缩为 WebP 存内存
      const result = isMdx ? await saveImageMdx(path) : await saveImageMd(path);
      if (!result) continue;

      // .mdx: 立即创建 blob URL，不等 React 重渲染（否则图片节点创建时找不到 blob）
      if (isMdx) {
        const assets = useEditorStore.getState().mdxAssets;
        const asset = assets[assets.length - 1];
        if (asset) createAssetBlobUrl(asset.hash, asset.data);
        // 拖入图片时自动打开图片库
        useGalleryStore.getState().setVisible(true);
      }

      const editor = getEditor();
      if (!editor) continue;

      editor.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const insertText = result.imageMd + '\n';
        const pos = view.state.selection.from;
        view.dispatch(view.state.tr.insertText(insertText, pos));
      });
    }
  }, [saveImageMd, saveImageMdx, getEditor, currentFilePath]);

  // 使用 Tauri 原生拖放事件（绕过 Milkdown 内部事件拦截）
  useImageDrop(handleDropFiles);

  return (
    <div className="wysiwyg-editor-wrapper">
      <Milkdown />
    </div>
  );
}

export function WysiwygEditor() {
  const filePath = useEditorStore((s) => s.currentFilePath);
  return (
    <MilkdownProvider key={filePath ?? 'new'}>
      <MilkdownSetup />
    </MilkdownProvider>
  );
}

export default WysiwygEditor;
