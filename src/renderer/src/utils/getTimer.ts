export default function getTimer(timer: string): number {
  const [hours, minutes, seconds, milliseconds] = timer.split(/[:.,]/)
  return (
    parseInt(hours, 10) * 3600 +
    parseInt(minutes, 10) * 60 +
    parseInt(seconds, 10) +
    parseFloat(`0.${milliseconds}`)
  )
}
