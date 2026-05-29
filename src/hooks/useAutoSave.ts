import { useEffect, useRef } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useFileOps } from './useFileOps';

export function useAutoSave(intervalMs = 30000) {
  const currentFilePath = useEditorStore((s) => s.currentFilePath);
  const { saveFile } = useFileOps();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!currentFilePath) return;

    timerRef.current = setInterval(() => {
      if (useEditorStore.getState().isDirty) {
        saveFile();
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentFilePath, saveFile, intervalMs]);
}
