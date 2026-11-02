import { useCallback, useEffect, useRef, useState } from 'react'
import Envelope from '../components/Envelope.jsx'
import Finale from '../components/Finale.jsx'
import MusicControls from '../components/MusicButton.jsx'
import { OrnamentDefs } from '../components/Ornaments.jsx'
import Particles from '../components/Particles.jsx'
import { FallingPetals } from '../components/Petals.jsx'
import SaveTheDate from '../components/SaveTheDate.jsx'
import { useMusic } from '../hooks/useMusic.js'
import { RESTORAN_CALENDAR, RESTORAN_SHARE } from './config.js'
import RestoranHero from './RestoranHero.jsx'
import RestoranRsvp from './RestoranRsvp.jsx'

// Verzija pozivnice za goste koji dolaze samo na svadbeno slavlje u restoranu.
// Isti dizajn i efekti kao originalna pozivnica; bez okupljanja i ceremonije.
export default function RestoranApp() {
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
          <RestoranHero />
          <SaveTheDate notify={notify} calendar={RESTORAN_CALENDAR} share={RESTORAN_SHARE} />
          <RestoranRsvp />
          <Finale />
        </main>
      )}

      {opened && <MusicControls music={music} />}

      <div className={`toast ${toast ? 'is-shown' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  )
}
