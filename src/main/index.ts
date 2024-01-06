import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { IPath, ICard, IDeck } from './../types/type'
import { IRev, IData } from './../types/type'
import { deleteFile } from '../renderer/src/utils/delete'
import { join } from 'path'
import parseVideo from '../renderer/src/utils/parseVideo'
import speechFix from '../renderer/src/utils/speechFix'
import checkFile from '../renderer/src/utils/checkFile'
import resetDone from '../renderer/src/utils/resetDone'
import parseSrt from '../renderer/src/utils/parseSrt'
import subMerge from '../renderer/src/utils/subMerge'
import revision from '../renderer/src/utils/revision'
import getDeck from '../renderer/src/utils/getDeck'
import icon from '../../resources/icon.png?asset'
import path from 'node:path'
import fs from 'fs'

const joinPath = path.join(__dirname, './../../src/renderer/src/assets/videos/') as string
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//API

ipcMain.handle('openFolder', (): any => {
  const assetsPath = path.join(joinPath)
  shell.openPath(assetsPath)
})

ipcMain.handle('fetch', (_, rev, newRev, deckName): IData => {
  const deckPath = joinPath + 'langDeck.json'
  resetDone(deckPath)
  const readDeck = JSON.parse(checkFile(deckPath, 'utf-8'))
  const keys = deckName ? [deckName] : Object.keys(readDeck)
  const data = getDeck(keys, readDeck, newRev, rev)
  return { error: false, data }
})
ipcMain.handle('Render', async (_, path: IPath, mediaName: string): Promise<IData> => {
  const pathNative = path.pathNative
  const pathLearn = path.pathLearn
  const pathMedia = path.pathMedia
  const readDeck = JSON.parse(checkFile(joinPath + 'langDeck.json', 'latin1'))

  if (mediaName && pathMedia && !pathLearn && !pathNative) {
    const getDeck = readDeck[mediaName].deck
    for (const deck of getDeck) {
      try {
        await parseVideo(pathMedia, deck, joinPath)
      } catch (err) {
        return { error: true, data: { message: 'there was a problem rendering' } }
      }
    }
    return { error: false, data: { message: 'Done!' } }
  }
  if (pathNative && pathLearn && pathMedia) {
    const readNative = checkFile(pathNative, 'latin1')
    const readLearn = checkFile(pathLearn, 'latin1')
    const subNative = parseSrt(readNative)
    const subLearn = parseSrt(readLearn)
    const merge = subMerge(subLearn, subNative)
    const speech = speechFix(merge, mediaName, joinPath)
    for (const sub of speech) {
      try {
        await parseVideo(pathMedia, sub, joinPath)
      } catch (err) {
        return { error: true, data: { message: 'there was a problem rendering!' } }
      }
    }
    return { error: false, data: { message: 'Done!' } }
  }
  return { error: true, data: { message: 'fill in all fields!' } }
})
ipcMain.on('answer', (_, card: ICard, asnwer, deckName): void => {
  let today = 0
  const deckFile = joinPath + 'langDeck.json'
  const settingsFile = joinPath + 'settings.json'

  const cardId = card.id
  const cardCount = card.count
  const [timestamp, count] = revision(cardCount, asnwer)

  const deck = JSON.parse(checkFile(deckFile, 'latin1')) as IDeck
  const settings = JSON.parse(checkFile(settingsFile, 'latin1')) as IRev
  const newRevDone = card.count === 0 ? (deck[deckName].newRevDone += 1) : 0
  const revDone = card.count !== 0 ? (deck[deckName].revDone += 1) : 0
  const deckUpdate = deck[deckName].deck.map((el: ICard) => {
    if (el.id === cardId) {
      return { ...el, revision: timestamp, count }
    }
    return el
  })
  if (+settings.newRev === +newRevDone) {
    today = new Date().getTime()
  }
  const convertToString = JSON.stringify({
    ...deck,
    [deckName]: { lastRev: today, newRevDone, revDone, deck: deckUpdate }
  })
  fs.writeFileSync(deckFile, convertToString)
})
ipcMain.handle('create', (_, deckName): any => {
  if (deckName) {
    const file = joinPath + 'langDeck.json'
    const deck = JSON.parse(checkFile(file, 'latin1'))
    const newJson = { ...deck, [deckName]: { lastRev: 0, newRevDone: 0, revDone: 0, deck: [] } }
    checkFile(file, 'latin1', newJson)

    const getkeys = Object.entries(newJson).map((el) => el[0])
    return { error: false, data: getkeys }
  }
})
ipcMain.handle('delete', (_, deckName, newRev, rev): IData | undefined => {
  if (deckName && newRev && rev) {
    const file = joinPath + 'langDeck.json'
    const deckJson = JSON.parse(checkFile(file, 'latin1'))
    for (const media of deckJson[deckName].deck) {
      deleteFile(joinPath + media.name)
    }
    delete deckJson[deckName]
    const convertToString = JSON.stringify(deckJson)
    const keys = Object.keys(deckJson)
    const deckList = getDeck(keys, deckJson, newRev, rev)

    checkFile(file, 'latin1', convertToString)
    return { error: false, data: deckList }
  }
  return
})
ipcMain.handle('deckList', (): IData => {
  const file = joinPath + 'langDeck.json'
  const deckJson = JSON.parse(checkFile(file, 'latin1'))
  const keys = Object.keys(deckJson)
  return { error: false, data: keys }
})
ipcMain.handle('settings', (_, payload: any): IData => {
  const file = joinPath + 'settings.json'
  const data = JSON.parse(checkFile(file, 'latin1', payload))
  return { error: false, data }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
