import { EVENTS } from '../config.js'
import Icon from './Icons.jsx'
import Section from './Section.jsx'

const mapsUrl = (q) =>
  /^https?:\/\//.test(q) ? q : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export default function Timeline() {
  return (
    <Section id="raspored" className="timeline-section">
      <p className="eyebrow">Subota, 23. januar 2027.</p>
      <h2 className="section-title">Raspored našeg dana</h2>
      <ol className="timeline">
        {EVENTS.map((ev, i) => (
          <li className="tl-item" key={i} style={{ '--i': i }}>
            <div className="tl-icon"><Icon name={ev.icon} size={26} /></div>
            <article className="tl-card">
              <p className="tl-time">{ev.time}</p>
              <h3 className="tl-title">{ev.title}</h3>
              <p className="tl-place">{ev.place}</p>
              {ev.mapsQuery && (
                <a className="btn btn-ghost btn-sm" href={mapsUrl(ev.mapsQuery)} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" size={18} /> Otvori mapu
                </a>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
