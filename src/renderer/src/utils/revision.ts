export default function revision(count: number, options: string): [number, number] {
  const dateTime = new Date()
  const day = dateTime.getDate()
  const goodOrWrong = options === 'Good' ? 2 : 0.5
  const nextRev = count === 0 ? day + 1 : count * goodOrWrong + day
  dateTime.setDate(nextRev)
  return [dateTime.getTime(), count + 1]
}
