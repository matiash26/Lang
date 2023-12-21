import { Link } from 'react-router-dom'
import './style.css'
export default function Header(): JSX.Element {
  return (
    <header>
      <nav>
        <ul className="menulist">
          <li>
            <Link to="/">Deck</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
