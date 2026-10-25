import { WEDDING_DATE } from '../config.js'
import { useCountdown } from '../hooks/useCountdown.js'

const pad = (n) => String(n).padStart(2, '0')

// Računa se iz stvarnog vremena, pa radi ispravno i nakon osvježavanja stranice.
export default function Countdown() {
  const { done, days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)
  if (done) return <p className="cd-done">Naše „zauvijek“ je počelo!</p>

  const units = [
    ['Dani', days],
    ['Sati', hours],
    ['Minute', minutes],
    ['Sekunde', seconds],
  ]
  return (
    <div className="cd-grid" role="timer" aria-label="Odbrojavanje do vjenčanja">
      {units.map(([label, value]) => (
        <div className="cd-cell" key={label}>
          <span className="cd-num" key={value}>{label === 'Dani' ? value : pad(value)}</span>
          <span className="cd-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
