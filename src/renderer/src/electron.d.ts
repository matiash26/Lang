// electron.d.ts
declare module 'electron' {
  interface Remote {
    app: {
      getAppPath: () => string
    }
  }

  const remote: Remote
}
