export default function Empty(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        color: 'white',
        gap: '1rem',
        textTransform: 'uppercase',
        textAlign: 'center'
      }}
    >
      <h2>All revisions have now been completed!</h2>
      <h3>wait until the next day or come back later!</h3>
    </div>
  )
}
