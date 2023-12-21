import { useContext, useEffect, useState } from 'react'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { AiOutlineAlert } from 'react-icons/ai'
import { GlobalContext } from '@renderer/Contexts/Global'
import './style.css'

export default function Alert(): JSX.Element {
  const [open, setOpen] = useState(false)
  const { alert } = useContext(GlobalContext)

  useEffect(() => {
    if (alert.data.message) {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 5000)
    }
  }, [alert])
  return (
    <div className="alertContainer">
      <div className={`alert  ${open && 'open'} ${alert.error ? 'error' : 'ok'}`}>
        {alert.error ? <IoCheckmarkDoneCircleOutline /> : <AiOutlineAlert />}
        <span>{alert.data.message}</span>
      </div>
    </div>
  )
}
