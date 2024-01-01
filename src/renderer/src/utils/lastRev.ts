export default function lastRev(date: number): boolean {
  const dayRev = new Date(date).getDate()
  const today = new Date().getDate()
  return today !== dayRev || date === 0
}
