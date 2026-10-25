import { WEDDING_DATE } from '../config.js'
import { useCountdown } from '../hooks/useCountdown.js'
import { Divider } from './Ornaments.jsx'
import Section from './Section.jsx'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown() {
  const { done, days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)
  const units = [
    ['Dani', days],
    ['Sati', hours],
    ['Minute', minutes],
    ['Sekunde', seconds],
  ]

  return (
    <Section id="odbrojavanje" className="countdown">
      {done ? (
        <h2 className="section-title">Rekli smo sudbonosno DA!</h2>
      ) : (
        <>
          <h2 className="section-title">
            Do našeg sudbonosnog <em>DA</em> ostalo je još...
          </h2>
          <div className="cd-grid" role="timer" aria-live="off">
            {units.map(([label, value]) => (
              <div className="cd-cell" key={label}>
                <span className="cd-num" key={value}>{label === 'Dani' ? value : pad(value)}</span>
                <span className="cd-label">{label}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <Divider />
    </Section>
  )
}
