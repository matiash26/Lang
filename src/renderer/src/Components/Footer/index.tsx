import { ReactNode } from 'react'
import './style.css'
export default function Footer({ children }: { children: ReactNode }): JSX.Element {
  return <footer className="buttons">{children}</footer>
}
