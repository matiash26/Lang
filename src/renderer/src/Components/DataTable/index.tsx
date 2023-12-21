import { useState, Dispatch, useContext } from 'react'
import { GlobalContext } from '../../Contexts/Global'
import { PiGearSixLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { IDeckHome } from 'src/types/type'

type IState = {
  card: IDeckHome
  setState: Dispatch<React.SetStateAction<IDeckHome[]>>
}
export default function DataTable({ card, setState }: IState): JSX.Element {
  const [open, setOpen] = useState(false)
  const { settings } = useContext(GlobalContext)
  const mediaName = Object.keys(card)[0]
  const { rev, newRev, done, total } = card[mediaName]

  const handleOpen = (): void => {
    setOpen((prev) => !prev)
  }

  const handleDelete = async (): Promise<void> => {
    const { rev, newRev } = settings
    const response = await window.api.Delete(mediaName, rev, newRev)
    if (!response.error) {
      setState(response.data)
    }
  }
  return (
    <tr className="deckData">
      <td>
        <Link to={`/deck?card=${mediaName}`}>{mediaName}</Link>
      </td>
      <td className="rev">{rev}</td>
      <td className="new">{newRev}</td>
      <td>{done}</td>
      <td>{total}</td>
      <td onClick={handleOpen}>
        <PiGearSixLight />
        {open && (
          <ul className="opt">
            <li onClick={handleDelete}>delete</li>
          </ul>
        )}
      </td>
    </tr>
  )
}
