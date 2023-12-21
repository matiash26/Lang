import fs from 'fs'
export function deleteFile(fileName: string): void {
  const thereIs = fs.existsSync(fileName)
  if (thereIs) {
    fs.unlinkSync(fileName)
  }
}
