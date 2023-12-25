import { ICard } from '../../../types/type'
import checkFile from './checkFile'
import getTimer from './getTimer'
import fs from 'fs'

export default function speechFix(subtitle: ICard[], mediaName: string, path: string): ICard[] {
  const skipId: number[] = []
  const card: ICard = {
    id: 0,
    front: '',
    back: '',
    start: '',
    end: '',
    name: '',
    count: 0,
    revision: 0,
    hits: 0
  }
  const newList: ICard[] = []
  for (let s = 0; s < subtitle.length; s++) {
    const sub = subtitle[s]
    if (skipId.includes(sub.id)) {
      continue
    }
    card.id = s
    card.front = `${sub.front}`
    card.back = `${sub.back}`
    card.start = `${sub.start}`
    card.end = `${sub.end}`
    card.name = `${sub.name}`
    for (let n = s; n < subtitle.length; n++) {
      const next = subtitle[n + 1]
      const isTheEnd = !next
      if (isTheEnd) {
        newList.push(card)
        continue
      }
      const prev = subtitle[n]
      const subEnd = getTimer(prev.end)
      const nextStart = getTimer(next.start)
      const isTheSameSpeech = nextStart - subEnd
      if (isTheSameSpeech < 1) {
        card.front += `${next.front}`
        card.back += `${next.back}`
        card.end = `${next.end}`
        skipId.push(next.id)
      } else {
        if (card.start !== '') {
          const deepCopy = JSON.parse(JSON.stringify(card))
          newList.push(deepCopy)
          card.front = ''
          card.back = ''
          card.start = ''
          card.end = ''
        }
        break
      }
    }
  }
  const deck = checkFile(path + 'langDeck.json')
  const create = JSON.stringify({
    ...deck,
    [mediaName]: { ...deck[mediaName], deck: [...deck[mediaName].deck, ...newList] }
  })
  fs.writeFileSync(path + 'langDeck.json', create)
  return newList
}
