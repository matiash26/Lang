export type IPath = {
  join(__dirname: string, arg1: string): unknown
  pathMedia: string
  pathNative: string
  pathLearn: string
}
export type ICard = {
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

interface IDeckHome {
  [key: string]: {
    newRev: number
    rev: number
    done: number
    total: number
    deck: ICard[]
  }
}
export interface IDeck {
  [key: string]: {
    newRev: number
    rev: number
    newRevDone: number
    revDone: number
    done: number
    total: number
    deck: ICard[]
  }
}
export type IData = {
  error: boolean
  data: any
}
export type IPromise = {
  [key: string]: any | undefined
  error: boolean
}
export type IRev = {
  rev: number
  newRev: number
}
