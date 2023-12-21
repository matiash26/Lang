import { ElectronAPI } from '@electron-toolkit/preload'

interface IPath {
  pathMedia: string
  pathNative: string
  pathLearn: string
}
interface ICard {
  id: number
  start: string
  end: string
  back: string
  front: string
  name: string
  revision: number
  count: number
  hits: number
}

interface IDeck {
  [key: string]: {
    newRev: number
    rev: number
    done: number
    total: number
    card: ICard[]
  }
}
interface IRev {
  rev: number
  newRev: number
}
interface IPromise {
  error: boolean
  message: string
}
interface IData {
  error: boolean
  data: any
}
interface IFetch {
  data: IDeck[]
  error: boolean
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      Fetch(rev: number, newRev: number, deckName?: string): Promise<IFetch>
      Answer(current: ICard, answer: string, deckName?: string): avoid
      Settings(payload?: IRev): Promise<IData>
      Render(input: IPath, mediaName: string): Promise<IDeck[]>
      DeckList(): Promise<IData>
      Create(newDeck: string): Promise<IData>
      Delete(mediaName: string, rev: number, newRev: number): Promise<avoid>
      openFolder(): Promise<void>
    }
  }
}
