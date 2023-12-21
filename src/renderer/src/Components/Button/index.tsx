import { MouseEvent, ReactNode } from 'react'
import './style.css'

type IProps = {
  label: string
  component?: ReactNode
  onclick?: (event: MouseEvent<HTMLButtonElement>) => void
  contrast?: boolean
}

export default function Button({
  label,
  component,
  onclick,
  contrast = false
}: IProps): JSX.Element {
  const style = contrast ? 'primary' : 'secondary'
  return (
    <button className={`button ${style}`} onClick={onclick}>
      {component}
      {label}
    </button>
  )
}
