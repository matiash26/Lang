import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactNode,
  ChangeEvent
} from 'react'
import { IData, IRev } from 'src/types/type'

type IContext = {
  settings: IRev
  setSettings: Dispatch<SetStateAction<IRev>>
  handleFillInput: (event: ChangeEvent<HTMLInputElement>) => void
  handleSave: (payload?: IRev) => void
  setAlert: Dispatch<SetStateAction<IData>>
  alert: IData
}
export const GlobalContext = createContext<IContext>({
  settings: { rev: 0, newRev: 0 },
  alert: { error: false, data: { message: null } },
  setAlert: () => {},
  setSettings: () => {},
  handleFillInput: () => {},
  handleSave: () => {}
})

const RevInit = { rev: 0, newRev: 0 }
const alertInit = { error: false, data: { message: null } }

export default function GlobalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [settings, setSettings] = useState<IRev>(RevInit)
  const [alert, setAlert] = useState(alertInit)

  const fetchSettings = async (): Promise<void> => {
    const response = await window.api.Settings()
    if (!response.error) {
      setSettings(response.data)
    }
  }
  const handleFillInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    const name = event.target.name
    setSettings((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const handleSave = async (payload?: IRev): Promise<void> => {
    await window.api.Settings(payload)
  }
  useEffect(() => {
    fetchSettings()
  }, [])
  return (
    <GlobalContext.Provider
      value={{ alert, setAlert, settings, setSettings, handleFillInput, handleSave }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
