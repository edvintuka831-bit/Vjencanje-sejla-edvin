import { DATE_TEXT, EVENTS } from '../config.js'
import Icon from './Icons.jsx'
import Section from './Section.jsx'

// Google Maps navigacija do mjesta – pretraga po nazivu i adresi, bez koordinata.
const navUrl = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`

export default function Timeline() {
  return (
    <Section id="program" className="timeline-section">
      <p className="eyebrow">{DATE_TEXT.short}</p>
      <h2 className="section-title">Program vjenčanja</h2>
      <ol className="timeline">
        {EVENTS.map((ev, i) => (
          <li className="tl-item" key={i} style={{ '--i': i }}>
            <div className="tl-icon"><Icon name={ev.icon} size={26} /></div>
            <article className="tl-card">
              <p className="tl-time">{ev.time}</p>
              <h3 className="tl-title">{ev.title}</h3>
              <p className="tl-place">{ev.place}</p>
              {ev.mapsQuery && (
                <a className="btn btn-ghost btn-sm" href={navUrl(ev.mapsQuery)} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" size={18} /> Otvori navigaciju
                </a>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
