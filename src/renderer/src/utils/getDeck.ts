import { ICard, IDeckHome } from '../../../types/type'
import getRevision from './getRevision'
import lastRev from './lastRev'

export default function getDeck(
  properties: string[],
  deckList: IDeckHome[],
  newRev: number,
  rev: number
): IDeckHome[] {
  const cardsToday = properties.map((name: string): IDeckHome => {
    let done = 0
    let countRev = 0
    let countNew = 0

    const deckData = deckList[name]
    const total = deckData.deck.length
    const totalNew = newRev - deckData.newRevDone
    const totalRev = rev - deckData.revDone

    const getCard = deckData.deck.filter((revision: ICard): ICard | boolean => {
      const isEmpty = revision.revision === 0
      const isToday = lastRev(deckList[name].lastRev)
      if (!isEmpty) {
        done++
      }
      if (isToday) {
        const thereIsRevToday = getRevision(revision.revision)
        if (isEmpty && countNew < totalNew) {
          countNew++
          return revision
        }
        if (thereIsRevToday && countRev < totalRev) {
          countRev++
          return revision
        }
      }
      return false
    })
    return {
      [name]: {
        newRev: countNew,
        rev: countRev,
        done,
        deck: [...getCard],
        total
      }
    }
  })
  return cardsToday
}
