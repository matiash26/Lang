export type TCardObj = {
  mediaName: string
  rev: number
  newRev: number
}
export type TCard = {
  card: {
    [key: string]: TCardObj
  }
}
