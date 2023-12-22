export default function revision(count: number, options: string): [number, number] {
  const dateTime = new Date()
  const day = dateTime.getDate()
  const goodOrWrong = options === 'Good' ? 2 : 0.5
  const valueCount = Math.ceil(count * goodOrWrong)
  const nextRev = valueCount < 1 ? 1 : valueCount
  dateTime.setDate(nextRev + day)
  return [dateTime.getTime(), nextRev]
}
