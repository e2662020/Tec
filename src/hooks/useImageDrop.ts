import { useEffect, useRef } from 'react';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import type { DragDropEvent } from '@tauri-apps/api/webviewWindow';

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'];

function hasImagePaths(event: DragDropEvent): event is DragDropEvent & { paths: string[] } {
  return 'paths' in event && Array.isArray(event.paths);
}

function isImagePath(path: string): boolean {
  const ext = path.split('.').pop()?.toLowerCase();
  return !!ext && IMAGE_EXTENSIONS.includes(ext);
}

/**
 * 使用 Tauri v2 原生拖放事件监听图片拖入
 *
 * 当 tauri.conf.json 中 dragDropEnabled: true（默认值）时，
 * HTML5 拖放事件在 Windows WebView2 上被抑制，必须使用
 * Tauri 的 onDragDropEvent 来监听文件拖放。
 *
 * @param onDropFiles  拖入文件时的回调（已过滤为图片文件路径列表）
 * @param onDragChange 拖拽状态变化的回调（可选，用于视觉反馈）
 */
export function useImageDrop(
  onDropFiles?: (paths: string[]) => void,
  onDragChange?: (isDragging: boolean) => void,
) {
  const isDraggingRef = useRef(false);
  const onDropRef = useRef(onDropFiles);
  const onDragChangeRef = useRef(onDragChange);
  const lastDropRef = useRef(0);

  // 始终保持回调引用最新，避免 effect 重新订阅
  onDropRef.current = onDropFiles;
  onDragChangeRef.current = onDragChange;

  useEffect(() => {
    let unlisten: (() => void) | null = null;

    getCurrentWebviewWindow().onDragDropEvent((event) => {
      const dragEvent = event.payload;

      switch (dragEvent.type) {
        case 'enter':
          if (hasImagePaths(dragEvent)) {
            const hasImage = dragEvent.paths.some(isImagePath);
            isDraggingRef.current = hasImage;
            onDragChangeRef.current?.(hasImage);
          }
          break;

        case 'over':
          break;

        case 'drop': {
          isDraggingRef.current = false;
          onDragChangeRef.current?.(false);

          // 防抖：Windows 上 onDragDropEvent 可能短时间触发两次
          const now = Date.now();
          if (now - lastDropRef.current < 300) break;
          lastDropRef.current = now;

          if (hasImagePaths(dragEvent)) {
            const imagePaths = dragEvent.paths.filter(isImagePath);
            if (imagePaths.length > 0) {
              onDropRef.current?.(imagePaths);
            }
          }
          break;
        }

        case 'leave':
          isDraggingRef.current = false;
          onDragChangeRef.current?.(false);
          break;
      }
    }).then((fn) => {
      unlisten = fn;
    });

    return () => {
      if (unlisten) unlisten();
    };
  }, []);

  return { isDraggingRef };
}
