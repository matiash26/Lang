import { ICard } from '../../../types/type'
import ffmpegStatic from 'ffmpeg-static'
import getTimer from './getTimer'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

export default function parseVideo(pathFile: string, subtitle: ICard, save: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (ffmpegStatic) {
      ffmpeg.setFfmpegPath(ffmpegStatic)
    }

    if (!fs.existsSync(pathFile)) {
      reject(new Error('file not found'))
      return
    }

    const startConvert = getTimer(subtitle.start)
    const endConvert = getTimer(subtitle.end)
    const start = subtitle.start.replace(',', '.').trim()
    const end = Math.ceil(endConvert - startConvert)
    const folder = save + subtitle.name
    ffmpeg()
      .input(pathFile)
      .setStartTime(start)
      .setDuration(end)
      .videoBitrate('800k')
      .size('640x360')
      .output(folder)
      .on('end', () => {
        try {
          resolve('')
        } catch (err) {
          reject(err)
        }
      })
      .on('error', (err) => {
        reject(err)
      })
      .run()
  })
}
