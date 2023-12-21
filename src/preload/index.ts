import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPath, ICard, IDeck, IData } from '../types/type'

// Custom APIs for renderer
const api = {
  openFolder: (): Promise<void> => ipcRenderer.invoke('openFolder'),
  Render: (path: IPath, mediaName: string): Promise<IData> =>
    ipcRenderer.invoke('Render', path, mediaName),
  Fetch: (rev: number, newRev: number, deckName?: string): Promise<IDeck[]> =>
    ipcRenderer.invoke('fetch', rev, newRev, deckName),
  Answer: (card: ICard, answer: string, deckName: string): void =>
    ipcRenderer.send('answer', card, answer, deckName),
  Create: (deckName: string): Promise<IData> => ipcRenderer.invoke('create', deckName),
  Delete: (deckName: string, rev: number, newRev: number): Promise<void> =>
    ipcRenderer.invoke('delete', deckName, rev, newRev),
  DeckList: (): Promise<IData> => ipcRenderer.invoke('deckList'),
  Settings: (payload: any): Promise<IData> => ipcRenderer.invoke('settings', payload)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
