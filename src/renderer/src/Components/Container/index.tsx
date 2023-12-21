import './style.css'
import { ReactNode } from 'react'

type IProps = {
  children: ReactNode
  title: string
}
export default function Container({ children, title }: IProps): JSX.Element {
  return (
    <section className="sectionContainer">
      <h1>{title}</h1>
      <div className="containerContent">{children}</div>
    </section>
  )
}
