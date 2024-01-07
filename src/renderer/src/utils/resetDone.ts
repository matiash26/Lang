import { IDeck } from './../../../types/type'
import checkFile from './checkFile'
import lastRev from './lastRev'

export default function resetDone(path: string): void {
  const updateDeck = {}
  const deckFile = JSON.parse(checkFile(path, 'utf-8')) as IDeck[]

  Object.keys(deckFile).forEach((key) => {
    const deck = deckFile[key]
    const thereIsToday = lastRev(deck?.lastRev) && deck.lastRev !== 0
    if (thereIsToday) {
      updateDeck[key] = { ...deck, newRevDone: 0, revDone: 0 }
    }
  })
  if (Object.keys(updateDeck)?.length) {
    checkFile(path, 'latin1', { ...deckFile, ...updateDeck })
  }
}
