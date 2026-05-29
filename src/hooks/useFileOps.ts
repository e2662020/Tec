import { useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';
import { useEditorStore } from '../store/editorStore';
import type { FileInfo, MdxDocument } from '../types';

export function useFileOps() {
  const {
    setCurrentFile,
    setIsDirty,
    openFile: storeOpenFile,
    setFileList,
    setFolderPath,
    folderPath,
    currentFilePath,
  } = useEditorStore();

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

        const path = typeof selected === 'string' ? selected : selected;
        const fileInfo = await invoke<FileInfo>('get_file_info', {
          path,
        });

        if (fileInfo.isMdx) {
          const doc = await invoke<MdxDocument>('read_mdx', { path });
          const name = path.split(/[\\/]/).pop() || 'Untitled';
          storeOpenFile(path, name, doc.content);
        } else {
          const docContent = await invoke<string>('read_file', { path });
          const name = path.split(/[\\/]/).pop() || 'Untitled';
          storeOpenFile(path, name, docContent);
        }
      } catch (err) {
        console.error('Failed to open file:', err);
      }
    },
    [storeOpenFile],
  );

  const saveFile = useCallback(async () => {
    const path = currentFilePath;
    const currentContent = useEditorStore.getState().content;

    if (!path) {
      // Save as new file
      const savePath = await save({
        filters: [
          { name: 'Markdown', extensions: ['md'] },
          { name: 'Tec Document', extensions: ['mdx'] },
        ],
        defaultPath: 'untitled.md',
      });

      if (!savePath) return;

      setCurrentFile(savePath, savePath.split(/[\\/]/).pop() || 'Untitled');

      const isMdx = savePath.endsWith('.mdx');
      if (isMdx) {
        await invoke('write_mdx', {
          path: savePath,
          content: currentContent,
          theme: '',
          colorMap: JSON.stringify(useEditorStore.getState().colorMap),
          metaJson: JSON.stringify({
            version: '1.0',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            syntaxExtensions: ['colored-text', 'columns', 'align', 'latex'],
            pluginData: {},
          }),
          assetsData: [] as [string, number[]][],
        });
      } else {
        await invoke('write_file', { path: savePath, content: currentContent });
      }
      setIsDirty(false);
      return;
    }

    const isMdx = path.endsWith('.mdx');
    if (isMdx) {
      await invoke('write_mdx', {
        path,
        content: currentContent,
        theme: '',
        colorMap: JSON.stringify(useEditorStore.getState().colorMap),
        metaJson: JSON.stringify({
          version: '1.0',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
          syntaxExtensions: ['colored-text', 'columns', 'align', 'latex'],
          pluginData: {},
        }),
        assetsData: [] as [string, number[]][],
      });
    } else {
      await invoke('write_file', { path, content: currentContent });
    }
    setIsDirty(false);
  }, [currentFilePath, setCurrentFile, setIsDirty]);

  const openFolder = useCallback(async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Open Folder',
      });

      if (!selected) return;

      const folderPath = typeof selected === 'string' ? selected : selected;
      setFolderPath(folderPath);

      const files = await invoke<FileInfo[]>('list_folder', {
        path: folderPath,
      });
      setFileList(files);
    } catch (err) {
      console.error('Failed to open folder:', err);
    }
  }, [setFolderPath, setFileList]);

  const refreshFolder = useCallback(async () => {
    const currentFolder = folderPath;
    if (!currentFolder) return;

    try {
      const files = await invoke<FileInfo[]>('list_folder', {
        path: currentFolder,
      });
      setFileList(files);
    } catch (err) {
      console.error('Failed to refresh folder:', err);
    }
  }, [folderPath, setFileList]);

  return { openMdFile, saveFile, openFolder, refreshFolder };
}
