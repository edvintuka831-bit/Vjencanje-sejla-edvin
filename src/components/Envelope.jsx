import { useEffect, useRef, useState } from 'react'
import { COUPLE } from '../config.js'
import { FloralCorner, Monogram, WaxSeal } from './Ornaments.jsx'

// Faze: closed → seal (pečat puca) → flap (koverta se otvara)
//       → letter (pozivnica izlazi) → intro (romantični tekst) → kraj
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const TIMINGS = { seal: 750, flap: 1000, letter: 1500, intro: 3400 }

export default function Envelope({ onStart, onDone }) {
  const [stage, setStage] = useState('closed')
  const [leaving, setLeaving] = useState(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const open = () => {
    if (stage !== 'closed') return
    onStart?.()
    const k = reduced() ? 0.35 : 1
    let t = 0
    const at = (ms, fn) => timers.current.push(setTimeout(fn, (t += ms * k)))
    setStage('seal')
    at(TIMINGS.seal, () => setStage('flap'))
    at(TIMINGS.flap, () => setStage('letter'))
    at(TIMINGS.letter, () => setStage('intro'))
    at(TIMINGS.intro, () => setLeaving(true))
    at(900, () => onDone?.())
  }

  return (
    <div className={`env-screen stage-${stage} ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-label="Pozivnica u koverti">
      <FloralCorner className="corner tl" />
      <FloralCorner className="corner br" />

      <div className="env-heading">
        <p className="env-kicker">Pozivnica za vjenčanje</p>
        <p className="env-names">{COUPLE.bride} <span>&amp;</span> {COUPLE.groom}</p>
      </div>

      <div className="env-scene">
        <div className="envelope" onClick={open}>
          <div className="env-back" />
          <div className="env-letter">
            <div className="letter-inner">
              <Monogram className="letter-mono" />
              <p className="letter-line">Jedna ljubav. Dva srca. Jedno zauvijek.</p>
            </div>
          </div>
          <svg className="env-pocket" viewBox="0 0 400 264" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="pocketSide" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#f3e9d6" />
                <stop offset="1" stopColor="#fbf5ea" />
              </linearGradient>
              <linearGradient id="pocketSideR" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0" stopColor="#f1e6d1" />
                <stop offset="1" stopColor="#faf3e6" />
              </linearGradient>
              <linearGradient id="pocketBottom" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#f2e7d2" />
                <stop offset="1" stopColor="#fdf8ef" />
              </linearGradient>
            </defs>
            <path d="M0 0 L206 150 L0 264 Z" fill="url(#pocketSide)" />
            <path d="M400 0 L194 150 L400 264 Z" fill="url(#pocketSideR)" />
            <path d="M0 264 L200 120 L400 264 Z" fill="url(#pocketBottom)" />
            <path d="M0 264 L200 120 L400 264" fill="none" stroke="#d9c39a" strokeWidth="1" opacity="0.8" />
            <path d="M0 0 L192 140 M400 0 L208 140" fill="none" stroke="#e2d0ae" strokeWidth="0.8" opacity="0.7" />
            <path d="M14 250 L200 134 L386 250" fill="none" stroke="#c9a55e" strokeWidth="0.7" opacity="0.5" />
          </svg>
          <div className="env-flap">
            <div className="flap-face" />
          </div>
          <button className="seal" aria-label="Dodirnite pečat i otvorite pozivnicu" disabled={stage !== 'closed'}>
            <span className="seal-glow" />
            <span className="seal-whole"><WaxSeal initials={COUPLE.initials} /></span>
            <span className="seal-half left"><WaxSeal initials={COUPLE.initials} /></span>
            <span className="seal-half right"><WaxSeal initials={COUPLE.initials} /></span>
          </button>
        </div>
        <div className="env-shadow" />
      </div>

      <p className="env-hint">Dodirnite pečat i otvorite našu pozivnicu.</p>

      <div className="env-intro" aria-live="polite">
        {(stage === 'intro') && (
          <>
            <Monogram className="intro-mono" />
            <p className="intro-line">Jedna ljubav.</p>
            <p className="intro-line">Dva srca.</p>
            <p className="intro-line">Jedno zauvijek.</p>
          </>
        )}
      </div>
    </div>
  )
}
