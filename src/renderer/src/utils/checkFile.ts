import fs from 'fs'
export default function checkFile(path: string, payload?: any): any {
  const thereIs = fs.existsSync(path)
  if (!thereIs || payload) {
    const data = JSON.stringify({ ...payload })
    const dataPayload = payload ? data : JSON.stringify({})
    fs.writeFileSync(path, dataPayload)
  }
  return JSON.parse(fs.readFileSync(path, 'utf-8'))
}
