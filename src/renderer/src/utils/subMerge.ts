import getTimer from './getTimer'
import { ICard } from '../../../types/type'

export default function subMerge(nativeArr: ICard[], learnArr: ICard[]): ICard[] {
  const merge = nativeArr.map((native) => {
    const startNative = getTimer(native.start)
    const endNative = getTimer(native.end)

    const matchTimer = learnArr.find((sub) => {
      const startLearn = getTimer(sub.start)
      const endLearn = getTimer(sub.end)

      const isTheSame = Math.ceil(startLearn - startNative) === 0
      const isTheSame02 = Math.ceil(endNative - endLearn) === 0

      if (isTheSame || isTheSame02) {
        return sub
      }
      return false
    })

    if (matchTimer) {
      return { ...native, back: matchTimer.front }
    }

    return null
  })
  const clearUndefined = merge.filter(Boolean) as ICard[]
  return clearUndefined
}
