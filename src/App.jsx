import { useCallback, useEffect, useRef, useState } from 'react'
import Envelope from './components/Envelope.jsx'
import Finale from './components/Finale.jsx'
import Hero from './components/Hero.jsx'
import MusicControls from './components/MusicButton.jsx'
import { OrnamentDefs } from './components/Ornaments.jsx'
import Particles from './components/Particles.jsx'
import { FallingPetals } from './components/Petals.jsx'
import Rsvp from './components/Rsvp.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'
import Timeline from './components/Timeline.jsx'
import { useMusic } from './hooks/useMusic.js'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(0)
  const music = useMusic()

  useEffect(() => {
    document.body.classList.toggle('envelope-open', !opened)
    if (opened) window.scrollTo(0, 0)
  }, [opened])

  const notify = useCallback((text) => {
    clearTimeout(toastTimer.current)
    setToast(text)
    toastTimer.current = setTimeout(() => setToast(''), 2800)
  }, [])

  return (
    <>
      <OrnamentDefs />
      <div className="bg" aria-hidden="true" />
      <Particles />
      <FallingPetals />

      {!opened && <Envelope onStart={music.play} onDone={() => setOpened(true)} />}

      {opened && (
        <main className="invitation">
          <Hero />
          <Timeline />
          <SaveTheDate notify={notify} />
          <Rsvp />
          <Finale />
        </main>
      )}

      {opened && <MusicControls music={music} />}

      <div className={`toast ${toast ? 'is-shown' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  )
}
