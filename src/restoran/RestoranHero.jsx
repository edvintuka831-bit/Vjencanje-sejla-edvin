import { COUPLE, DATE_TEXT } from '../config.js'
import Countdown from '../components/Countdown.jsx'
import Icon from '../components/Icons.jsx'
import { Divider, FloralCorner } from '../components/Ornaments.jsx'
import Section from '../components/Section.jsx'
import { VENUE, venueNavUrl } from './config.js'

export default function RestoranHero() {
  return (
    <Section id="pocetak" className="hero">
      <div className="card hero-card r-hero">
        <FloralCorner className="corner tl" />
        <FloralCorner className="corner br" />

        <h1 className="names">
          <span className="name">{COUPLE.bride}</span>
          <span className="amp">&amp;</span>
          <span className="name">{COUPLE.groom}</span>
        </h1>

        <p className="invite-text r-invite">
          S ljubavlju vas pozivamo da svojim prisustvom uljepšate naše svadbeno slavlje.
        </p>

        <Divider />

        <p className="date-big">{DATE_TEXT.long}</p>

        <p className="r-arrival">
          <span>Dolazak u restoran</span>
          <span className="r-dash" aria-hidden="true">—</span>
          <b>{VENUE.arrival}</b>
        </p>

        <p className="r-venue">{VENUE.name}</p>
        <p className="r-address">{VENUE.address}</p>

        <a className="btn btn-gold r-nav" href={venueNavUrl()} target="_blank" rel="noopener noreferrer">
          <Icon name="pin" size={20} /> Otvori navigaciju
        </a>

        <Countdown />

        <Divider />
        <p className="quote">Radujemo se što ćete ovaj poseban dan podijeliti s nama!</p>
      </div>
    </Section>
  )
}
