export default function revision(count: number, options: string): [number, number] {
  const dateTime = new Date()
  const day = dateTime.getDate()
  const goodOrWrong = options === 'Good' ? 2 : 0.5
  const nextRev = count < 1 ? day + 1 : count * goodOrWrong + day
  const countNew = Math.ceil(count * goodOrWrong)
  const date = nextRev < day ? day + 1 : Math.ceil(nextRev)
  dateTime.setDate(date)
  return [dateTime.getTime(), countNew]
}
