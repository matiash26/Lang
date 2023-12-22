import { useRef, useState, useEffect, useContext, MouseEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MdKeyboardBackspace } from 'react-icons/md'
import { GlobalContext } from '../../Contexts/Global'
import { BsPlayCircle } from 'react-icons/bs'
import { ICard } from './../../../../types/type'
import getDate from '@renderer/utils/getDate'
import Footer from '../../Components/Footer'
import Button from '../../Components/Button'
import Deck from '../../Components/Deck'
import Empty from '../../Components/Empty'
import './style.css'

export default function DeckPg(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [show, setShow] = useState(false)
  const [cards, setCards] = useState<ICard[]>([])
  const [params] = useSearchParams()
  const { settings } = useContext(GlobalContext)

  const rev = cards.reduce((acc, rev: ICard) => {
    if (rev.hits !== 1) {
      acc++
    }
    return acc
  }, 0)
  const newRev = cards.reduce((acc, rev: ICard) => {
    if (rev.hits === 1) {
      acc++
    }
    return acc
  }, 0)

  const labelWrong = (): string => {
    const card = cards[0]
    console.log(card?.hits, card.revision)
    if (card?.hits <= 4 && card.revision === 0) {
      return '1 min'
    }
    return getDate(card?.count, 'wrong')
  }
  const labelGood = (): string => {
    const card = cards[0]
    if (card?.hits < 3) {
      return '1 min'
    }
    return getDate(card?.count, 'Good')
  }
  const handlePlay = (): void => {
    const isPaused = videoRef.current?.paused
    if (!isPaused) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
  }
  const handleAnswer = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    const deckName = params.get('card') as string
    if (event.target instanceof HTMLButtonElement) {
      const answer = event.target?.innerText
      const current = cards?.[0] as ICard
      const copy = JSON.parse(JSON.stringify(current)) as ICard

      if (answer === 'Good' || copy.hits === 1 || (answer === 'Wrong' && copy.hits === 3)) {
        let hitNumber = 1
        if (answer === 'Good' && copy.hits === 1) {
          hitNumber = 2
        }
        copy.hits += hitNumber
      }
      if ((copy.hits === 4 && answer === 'Good') || (answer === 'Wrong' && copy.revision)) {
        await window.api.Answer(current, answer, deckName)
        setCards((prev) => prev.filter((el) => el.id !== prev[0].id))
        handleShow()
        return
      }

      const newListCard = cards.filter((el) => current.id !== el.id) as ICard[]
      setCards([...newListCard, copy])
      handleShow()
    }
  }
  const handleShow = (): void => {
    setShow((prev) => !prev)
  }
  const fetch = async (): Promise<void> => {
    const deckName = params.get('card') as string
    const { rev, newRev } = settings
    const fetch = await window.api.Fetch(rev, newRev, deckName)
    if (fetch.data.length) {
      const deck = fetch.data?.[0][deckName].deck
      if (deck) {
        const isNew = deck.map((card: ICard) => {
          if (card.revision === 0) {
            return { ...card, hits: 1 }
          }
          return { ...card, hits: 3 }
        })
        setCards(isNew)
      }
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <>
      {cards.length ? (
        <Deck card={cards?.[0]} useRef={videoRef} asnwer={show}>
          <Button label={'Play / Pause'} component={<BsPlayCircle />} onclick={handlePlay} />
        </Deck>
      ) : (
        <Empty />
      )}
      {show ? (
        <Footer>
          <Button label="Wrong" onclick={handleAnswer} />
          <ul className="deckTotal">
            <li>
              <span className="timerRev">| {labelWrong()} |</span>
              <span>{newRev}</span>
            </li>
            <li>-</li>
            <li>
              <span>{rev}</span>
              <span className="timerRev">| {labelGood()} |</span>
            </li>
          </ul>
          <Button label="Good" onclick={handleAnswer} />
        </Footer>
      ) : (
        <Footer>
          <Link to="/" className="goBack">
            <Button label="Back" component={<MdKeyboardBackspace />} />
          </Link>
          <Button label="Show Answer" onclick={handleShow} />
        </Footer>
      )}
    </>
  )
}
