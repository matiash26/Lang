import { GlobalContext } from '../../Contexts/Global'
import { useContext } from 'react'
import InputSettings from '../../Components/InputSettings'
import Container from '../../Components/Container'
import Button from '../../Components/Button'
import './style.css'

export default function Settings(): JSX.Element {
  const { settings, handleFillInput, handleSave } = useContext(GlobalContext)

  return (
    <div className="settingsContainer">
      <Container title="review">
        <InputSettings
          name="rev"
          label="review"
          value={settings?.rev}
          labelExtend="review per deck"
          onChange={handleFillInput}
        />
        <InputSettings
          name="newRev"
          label="new cards"
          value={settings?.newRev}
          labelExtend="new cards per deck"
          onChange={handleFillInput}
        />
      </Container>
      <div className="settingsBtn">
        <Button label="save settings" contrast={true} onclick={() => handleSave(settings)} />
      </div>
    </div>
  )
}
