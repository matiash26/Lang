export default function getRevision(date: number): boolean {
  const dataTimestamp = new Date(date)

  const currentDate = new Date()

  const sameDay =
    dataTimestamp.getFullYear() <= currentDate.getFullYear() &&
    dataTimestamp.getMonth() <= currentDate.getMonth() &&
    dataTimestamp.getDate() <= currentDate.getDate()

  return sameDay
}
