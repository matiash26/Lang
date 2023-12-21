import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../Contexts/Global'
import { IDeckHome } from '../../../../types/type'
import { Link } from 'react-router-dom'
import DataTable from '../../Components/DataTable'
import Button from '../../Components/Button'
import Footer from '../../Components/Footer'
import './style.css'

export default function Home(): JSX.Element {
  const [deckList, setDeckList] = useState<IDeckHome[]>([])
  const { settings } = useContext(GlobalContext)

  const handleOpenFolder = (): void => {
    window.api.openFolder()
  }
  const handleFetch = async (): Promise<void> => {
    const { rev, newRev } = settings
    const response = await window.api.Fetch(rev, newRev)
    if (!response.error) {
      setDeckList(response.data)
    }
  }
  useEffect(() => {
    handleFetch()
  }, [settings])
  return (
    <>
      <main className="homeDeck">
        <section className="homeContent">
          <table>
            <thead>
              <tr className="deckTitle">
                <th>name</th>
                <th>revision</th>
                <th>new</th>
                <th>done</th>
                <th>total</th>
                <th>opt</th>
              </tr>
            </thead>
            <tbody>
              {deckList?.map((deck: IDeckHome, x) => (
                <DataTable key={x} card={deck} setState={setDeckList} />
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <Footer>
        <Link to="/create" className="btnLink">
          <Button label="Create Deck" />
        </Link>
        <Button label="Open Folder" onclick={handleOpenFolder} />
      </Footer>
    </>
  )
}
