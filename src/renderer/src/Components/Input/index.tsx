import { ChangeEventHandler } from 'react'
import './style.css'

type IProps = {
  changeValue?: ChangeEventHandler<HTMLInputElement>
  name?: string
  value?: string
  placeholder?: string
  label?: string
}
export default function Input({
  changeValue,
  name,
  value,
  placeholder,
  label
}: IProps): JSX.Element {
  return (
    <div>
      <label htmlFor={name} id="label">
        {label}
      </label>
      <input
        type="text"
        id={name}
        className="input"
        name={name}
        onChange={changeValue}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}
