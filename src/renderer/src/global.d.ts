interface IPath {
  pathMedia: string
  pathNative: string
  pathLearn: string
}
interface ISrt {
  parseSrt(subtitle: string): ISrtObj[]
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
    deck: ICard[]
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
  error: boolean
  data: IDeck[]
}
interface Window {
  api: {
    Fetch(rev: number, newRev: number, deckName?: string): Promise<IFetch>
    Answer(current: ICard, answer: string, deckName?: string): Promise<IPromise>
    Settings(payload?: IRev): Promise<IData>
    Render(input: IPath, mediaName: string): Promise<IData>
    DeckList(): Promise<IData>
    Create(newDeck: string): Promise<IData>
    Delete(mediaName: string, rev: number, newRev: number): avoid
    openFolder(): void
  }
}
