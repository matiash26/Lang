import revision from './revision'
export default function getDate(count: number, answer: string): string {
  const [getTimestamp] = revision(count, answer)
  const date = new Date(getTimestamp)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${month + 1}/${day}/${year}`
}
