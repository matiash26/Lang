import { ChangeEvent, useState, useEffect, useCallback, useContext } from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import { GlobalContext } from '@renderer/Contexts/Global'
import { Link } from 'react-router-dom'
import InputFile from '../../Components/InputFile'
import Button from '../../Components/Button'
import Footer from '../../Components/Footer'
import Input from '../../Components/Input'
import Spin from '../../Components/Spin'
import './style.css'

const inputInit = { pathMedia: '', pathNative: '', pathLearn: '' }
type TInput = {
  pathMedia: string
  pathNative: string
  pathLearn: string
}
export default function Create(): JSX.Element {
  const [deckList, setDeckList] = useState([])
  const [mediaName, setMediaName] = useState('')
  const [input, setInput] = useState<TInput>(inputInit)
  const [newDeck, setNewDeck] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAlert } = useContext(GlobalContext)
  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const path = event.target?.files?.[0].path
    const name = event.target.name as string
    setInput((prev) => ({ ...prev, [name]: path }))
  }
  const handleInputDecKName = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setNewDeck(value)
  }
  const handleCreateNewDeck = async (): Promise<void> => {
    const response = await window.api.Create(newDeck)
    if (!response.error) {
      setDeckList(response.data)
      setNewDeck('')
    }
  }
  const handleListDeck = (event: ChangeEvent): void => {
    const el = event.target as HTMLOptionElement
    setMediaName(el.value)
  }
  const onRender = async (): Promise<void> => {
    if (input && mediaName) {
      setLoading(true)
      try {
        const response = await window.api.Render(input, mediaName)
        console.log(response)
        setAlert(response)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
  }
  const fetchDeckList = useCallback(async () => {
    const response = await window.api.DeckList()
    if (!response.error) {
      setDeckList(response.data)
    }
  }, [])
  useEffect(() => {
    fetchDeckList()
  }, [])
  return (
    <div className="createContainer">
      <div className="createContent">
        <h2>Create Deck</h2>
        <div className="create">
          <div className="createLeft">
            <Input
              placeholder="Deck Name"
              changeValue={handleInputDecKName}
              name="deck"
              value={newDeck}
              label="Deck Name"
            />
            <div>
              <select name="deckList" id="deckList" onChange={handleListDeck}>
                <option disabled selected>
                  select an option
                </option>
                {deckList?.map((media, x) => (
                  <option key={x} value={media}>
                    {media}
                  </option>
                ))}
              </select>
            </div>
            <Button label="Create" contrast={true} onclick={handleCreateNewDeck} />
          </div>
          <div className="inputContainer">
            <InputFile
              label="Media"
              name="pathMedia"
              changeValue={handleInput}
              value={input.pathMedia}
              accept=".mp4, .mkv"
            />
            <InputFile
              label="Native"
              name="pathNative"
              changeValue={handleInput}
              value={input.pathNative}
              accept=".srt"
            />
            <InputFile
              label="Learn"
              name="pathLearn"
              changeValue={handleInput}
              value={input.pathLearn}
              accept=".srt"
            />
          </div>
        </div>
        {loading && <Spin />}
        <div className="btnOpt">
          <Button label="Render" onclick={onRender} contrast={false} />
        </div>
      </div>
      <Footer>
        <Link to="/" className="goBack">
          <Button label="Back" contrast={false} component={<MdKeyboardBackspace />} />
        </Link>
      </Footer>
    </div>
  )
}
