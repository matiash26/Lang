import fs from 'fs'

export default function checkFile<T>(path: string, encode: BufferEncoding, payload?: T): string {
  const thereIs = fs.existsSync(path)

  if (!thereIs || payload) {
    const data = JSON.stringify({ ...payload })
    const dataPayload = payload ? data : JSON.stringify({})
    fs.writeFileSync(path, dataPayload)
  }

  const read = fs.readFileSync(path, encode)
  return read
}
