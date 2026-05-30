import { useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';
import { useEditorStore } from '../store/editorStore';
import { useGalleryStore } from '../store/galleryStore';
import type { FileInfo, MdxDocument } from '../types';

function showError(action: string, err: unknown): void {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[Tec] ${action}:`, err);
  useEditorStore.getState().setStatusMessage(`❌ ${action}失败: ${message}`, 'error');
}

const UNTITLED = '未命名';

export function useFileOps() {
  const {
    openFile: storeOpenFile,
    setFileList,
    setFolderPath,
    folderPath,
  } = useEditorStore();

  // 新建空白文件
  const newFile = useCallback(() => {
    useEditorStore.getState().newFile();
  }, []);

  const openMdFile = useCallback(
    async (filePath?: string) => {
      try {
        const selected = filePath
          ? filePath
          : await open({
              filters: [
                {
                  name: 'Markdown',
                  extensions: ['md', 'mdx'],
                },
              ],
              multiple: false,
            });

        if (!selected) return;

        // Tauri v2 dialog 可能返回 string 或 FilePath 对象
        const path = typeof selected === 'string' ? selected : String(selected);
        console.log('[Tec] openMdFile: selected path =', path);

        const fileInfo = await invoke<FileInfo>('get_file_info', { path });
        const name = path.split(/[\\/]/).pop() || UNTITLED;

        if (fileInfo.isMdx) {
          const doc = await invoke<MdxDocument>('read_mdx', { path });
          // 将 ZIP 内的资产加载到编辑器 store
          useEditorStore.getState().setMdxAssets(
            doc.assets.map((a) => ({
              hash: a.name.replace(/\.\w+$/, ''),
              name: a.name,
              data: Array.from(a.data),
              width: 0,
              height: 0,
            })),
          );
          storeOpenFile(path, name, doc.content);
          // MDX 文件有图片库，自动打开
          useGalleryStore.getState().setVisible(true);
        } else {
          const docContent = await invoke<string>('read_file', { path });
          storeOpenFile(path, name, docContent);
          // MD 文件没有图片库，自动关闭
          useGalleryStore.getState().setVisible(false);
        }

        useEditorStore.getState().setStatusMessage(`📂 已打开: ${name}`, 'info');
      } catch (err) {
        showError('打开文件', err);
      }
    },
    [storeOpenFile],
  );

  const saveFile = useCallback(async () => {
    const state = useEditorStore.getState();
    const path = state.currentFilePath;
    const currentContent = state.content;

    console.log('[Tec] saveFile: path =', path, 'content length =', currentContent.length);

    // 没有路径 → 弹出"另存为"对话框
    if (!path) {
      try {
        const savePath = await save({
          filters: [
            { name: 'Markdown', extensions: ['md'] },
            { name: 'Tec Document', extensions: ['mdx'] },
          ],
          defaultPath: 'untitled.md',
        });

        console.log('[Tec] saveFile: dialog returned =', savePath, 'type =', typeof savePath);

        if (!savePath) {
          useEditorStore.getState().setStatusMessage('已取消保存', 'info');
          return;
        }

        // 确保 savePath 是普通字符串（有些 Tauri 版本可能返回对象）
        const finalPath = typeof savePath === 'string' ? savePath : String(savePath);
        const fileName = finalPath.split(/[\\/]/).pop() || UNTITLED;
        const isMdx = finalPath.endsWith('.mdx');

        console.log('[Tec] saveFile: writing to', finalPath, 'isMdx =', isMdx);

        const mdxAssets = useEditorStore.getState().mdxAssets;
        if (isMdx) {
          await invoke('write_mdx', {
            path: finalPath,
            content: currentContent,
            theme: '',
            colorMap: JSON.stringify(state.colorMap),
            metaJson: JSON.stringify({
              version: '1.0',
              created: new Date().toISOString(),
              modified: new Date().toISOString(),
              syntaxExtensions: ['colored-text', 'columns', 'align', 'latex'],
              pluginData: {},
            }),
            assetsData: mdxAssets.map((a) => [a.name, a.data] as [string, number[]]),
          });
        } else {
          await invoke('write_file', { path: finalPath, content: currentContent });
        }

        useEditorStore.getState().fileSaved(finalPath, fileName);
        useEditorStore.getState().setStatusMessage(`💾 已保存: ${fileName}`, 'info');
      } catch (err) {
        showError('保存文件', err);
      }
      return;
    }

    // 有路径 → 直接保存
    try {
      const isMdx = path.endsWith('.mdx');
      const mdxAssets = useEditorStore.getState().mdxAssets;
      if (isMdx) {
        await invoke('write_mdx', {
          path,
          content: currentContent,
          theme: '',
          colorMap: JSON.stringify(state.colorMap),
          metaJson: JSON.stringify({
            version: '1.0',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            syntaxExtensions: ['colored-text', 'columns', 'align', 'latex'],
            pluginData: {},
          }),
          assetsData: mdxAssets.map((a) => [a.name, a.data] as [string, number[]]),
        });
      } else {
        await invoke('write_file', { path, content: currentContent });
      }
      useEditorStore.getState().setIsDirty(false);
      useEditorStore.getState().setStatusMessage('💾 已保存', 'info');
    } catch (err) {
      showError('保存文件', err);
    }
  }, []);

  const openFolder = useCallback(async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Open Folder',
      });

      if (!selected) return;

      const fp = typeof selected === 'string' ? selected : String(selected);
      setFolderPath(fp);
      useEditorStore.getState().setStatusMessage(
        `📁 已打开文件夹: ${fp.split(/[\\/]/).pop() || fp}`,
        'info',
      );
      // 打开文件夹时自动显示侧边栏
      useEditorStore.getState().setSidebarVisible(true);

      const files = await invoke<FileInfo[]>('list_folder', { path: fp });
      setFileList(files);
    } catch (err) {
      showError('打开文件夹', err);
    }
  }, [setFolderPath, setFileList]);

  const refreshFolder = useCallback(async () => {
    const currentFolder = folderPath;
    if (!currentFolder) return;

    try {
      const files = await invoke<FileInfo[]>('list_folder', { path: currentFolder });
      setFileList(files);
    } catch (err) {
      showError('刷新文件夹', err);
    }
  }, [folderPath, setFileList]);

  return { newFile, openMdFile, saveFile, openFolder, refreshFolder };
}
