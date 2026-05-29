import { useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';
import { useEditorStore } from '../../store/editorStore';

interface SourceEditorProps {
  initialContent: string;
}

export function SourceEditor({ initialContent }: SourceEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const setContent = useEditorStore((s) => s.setContent);
  const setIsDirty = useEditorStore((s) => s.setIsDirty);

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
