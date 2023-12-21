import fs from 'fs'
export default function readSubtitle(path: string): string {
  try {
    const srtFile = fs.readFileSync(path, 'utf-8')
    return srtFile
  } catch (error) {
    return ''
  }
}
