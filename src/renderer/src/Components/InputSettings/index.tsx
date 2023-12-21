import './style.css'
import { ChangeEvent } from 'react'
type IProps = {
  labelExtend: string
  label: string
  value: number
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export default function InputSettings({
  labelExtend,
  label,
  value,
  name,
  onChange
}: IProps): JSX.Element {
  return (
    <div className="inputSettings">
      <h4>{labelExtend}</h4>
      <div className="inputField">
        <span>{label}</span>
        <input type="text" value={value} onChange={onChange} name={name} />
      </div>
    </div>
  )
}
