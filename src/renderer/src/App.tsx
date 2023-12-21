import { HashRouter, Routes, Route } from 'react-router-dom'
import SettingsProvider from './Contexts/Global'
import Settings from './pages/Settings'
import DeckPg from './pages/Deck'
import Create from './pages/Create'
import Header from './Components/Header'
import Home from './pages/Home'
import Alert from './Components/Alert'
function App(): JSX.Element {
  return (
    <SettingsProvider>
      <HashRouter>
        <Header />
        <main className="main">
          <Alert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deck" element={<DeckPg />} />
            <Route path="/create" element={<Create />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </HashRouter>
    </SettingsProvider>
  )
}

export default App
