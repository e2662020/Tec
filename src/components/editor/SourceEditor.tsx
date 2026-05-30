import { useEffect, useRef, useCallback } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';
import { useEditorStore } from '../../store/editorStore';
import { useImageDrop } from '../../hooks/useImageDrop';
import { useImageOps } from '../../hooks/useImageOps';
import { createAssetBlobUrl } from '../../plugins/localImage';

interface SourceEditorProps {
  initialContent: string;
}

export function SourceEditor({ initialContent }: SourceEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const setContent = useEditorStore((s) => s.setContent);
  const setIsDirty = useEditorStore((s) => s.setIsDirty);
  const currentFilePath = useEditorStore((s) => s.currentFilePath);
  const { saveImageMd, saveImageMdx } = useImageOps();

  // 拖入图片：根据文件类型走不同流程
  const handleDropFiles = useCallback(async (paths: string[]) => {
    const view = viewRef.current;
    if (!view) return;

    if (!currentFilePath) {
      useEditorStore.getState().setStatusMessage('💡 请先保存文档，再拖入图片', 'info');
      return;
    }

    const isMdx = currentFilePath.endsWith('.mdx');
    for (const path of paths) {
      const result = isMdx ? await saveImageMdx(path) : await saveImageMd(path);
      if (!result) continue;

      // .mdx: 立即创建 blob URL 供 Milkdown 切换渲染时使用
      if (isMdx) {
        const assets = useEditorStore.getState().mdxAssets;
        const asset = assets[assets.length - 1];
        if (asset) createAssetBlobUrl(asset.hash, asset.data);
      }

      const insertText = result.imageMd + '\n';
      const pos = view.state.selection.main.head;
      view.dispatch({
        changes: { from: pos, insert: insertText },
      });
      // CodeMirror 的 updateListener 会自动更新 store
    }
  }, [saveImageMd, saveImageMdx, currentFilePath]);

  // 使用 Tauri 原生拖放事件
  useImageDrop(handleDropFiles);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const text = update.state.doc.toString();
        setContent(text);
        setIsDirty(true);
      }
    });

    const view = new EditorView({
      state: EditorState.create({
        doc: initialContent,
        extensions: [
          markdown(),
          oneDark,
          lineNumbers(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          keymap.of([...defaultKeymap, ...searchKeymap]),
          updateListener,
          EditorView.lineWrapping,
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="source-editor-wrapper" />;
}
