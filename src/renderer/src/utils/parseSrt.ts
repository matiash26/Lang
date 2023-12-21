import { ICard } from '../../../types/type'

export default function parseSrt(srt: string): ICard[] {
  const subtitle = {
    id: 0,
    start: '',
    end: '',
    front: '',
    back: '',
    name: '',
    revision: 0,
    count: 0
  }
  const subtitleList: ICard[] = []
  const splitLines = srt.split(/\r?\n/)
  let id = 0
  for (const line of splitLines) {
    const isNewLine = Number.isInteger(+line) && !isNaN(parseInt(line))
    const isTimer = line.split('-->')
    const isFilled = subtitle.start && subtitle.end

    if (isNewLine && line !== '1' && isFilled) {
      const name = new Date().getTime()
      const seconds = subtitle.end.split(':')[2]
      subtitle.id = id++
      subtitle.name = name + seconds + '.mp4'
      subtitle.count = 0
      const copyObject = JSON.parse(JSON.stringify(subtitle))
      subtitleList.push(copyObject)
      subtitle.id = 0
      subtitle.start = ''
      subtitle.end = ''
      subtitle.name = ''
      subtitle.front = ''
      subtitle.back = ''
    }
    if (isTimer.length === 2) {
      subtitle.start = isTimer[0].trim()
      subtitle.end = isTimer[1]
    } else {
      if (!isNewLine) {
        subtitle.front += `${line} `
      }
    }
  }

  return subtitleList
}
