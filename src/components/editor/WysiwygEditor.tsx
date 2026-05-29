import { useEditor, Milkdown, MilkdownProvider } from '@milkdown/react';
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { history } from '@milkdown/kit/plugin/history';
import { clipboard } from '@milkdown/kit/plugin/clipboard';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { math } from '@milkdown/plugin-math';
import { useEditorStore } from '../../store/editorStore';
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

function MilkdownSetup() {
  const setContent = useEditorStore((s) => s.setContent);
  const setIsDirty = useEditorStore((s) => s.setIsDirty);
  const setWordCount = useEditorStore((s) => s.setWordCount);

  useEditor((root) => {
    const content = useEditorStore.getState().content;
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, content);
        const mgr = ctx.get(listenerCtx);
        mgr.markdownUpdated((_ctx, markdown) => {
          setContent(markdown);
          setIsDirty(true);
          const text = markdown.replace(/\s+/g, ' ').trim();
          setWordCount(text ? text.split(/\s+/).length : 0);
        });
      })
      .use(commonmark)
      .use(gfm)
      .use(history)
      .use(clipboard)
      .use(cursor)
      .use(listener)
      .use(math)
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

  return <Milkdown />;
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
