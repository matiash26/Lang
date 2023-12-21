import { LegacyRef, ReactNode, useState, useEffect } from 'react'
import { ICard } from './../../../../types/type'
import './style.css'

type IProps = {
  useRef: LegacyRef<HTMLVideoElement>
  children: ReactNode
  asnwer: boolean
  card: ICard
}

export default function Deck({ useRef, children, card, asnwer }: IProps): JSX.Element {
  const [video, setVideo] = useState('')
  useEffect(() => {
    if (card.name) {
      setVideo(`../../../app/src/renderer/src/assets/videos/${card.name}`)
    }
  }, [card.name])
  return (
    <div className="deck">
      <div className="video">
        <video src={video} ref={useRef} autoPlay></video>
        {children}
      </div>
      <ul className="listOfDeck">
        <li className="front">{card?.front}</li>
        {asnwer && <li className="back">{card?.back}</li>}
      </ul>
    </div>
  )
}
