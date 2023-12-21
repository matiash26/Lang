import { ChangeEventHandler } from 'react'
import Input from '../Input'
import { BsFolder } from 'react-icons/bs'
import './style.css'

type IProps = {
  changeValue: ChangeEventHandler<HTMLInputElement>
  name: string
  label: string
  value: string
  accept: string
}
export default function InputFile({
  changeValue,
  name,
  label,
  value,
  accept
}: IProps): JSX.Element {
  return (
    <div className="inputContent">
      <label id="inputTitle">{label}</label>
      <div className="inputs">
        <Input value={value} />
        <label htmlFor={name} id="svgFile">
          <BsFolder />
        </label>
        <input
          type="file"
          id={name}
          name={name}
          className="file"
          onChange={changeValue}
          accept={accept}
        />
      </div>
    </div>
  )
}
