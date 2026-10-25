import { COUPLE, DATE_TEXT } from '../config.js'
import { Divider, FloralCorner } from './Ornaments.jsx'
import Section from './Section.jsx'

export default function Hero() {
  return (
    <Section id="pocetak" className="hero">
      <div className="card hero-card">
        <FloralCorner className="corner tl" />
        <FloralCorner className="corner br" />

        <p className="kicker">Jedna ljubav. Dva srca. Jedno zauvijek.</p>
        <Divider />
        <p className="quote">
          Ljubav ne broji dane, već trenutke koji postaju vječnost.
          <br />
          Naša vječnost počinje ovdje.
        </p>

        <h1 className="names">
          <span className="name">{COUPLE.bride}</span>
          <span className="amp">&amp;</span>
          <span className="name">{COUPLE.groom}</span>
        </h1>

        <p className="invite-text">
          S velikom radošću pozivamo Vas da budete dio našeg najljepšeg dana,
          kada ćemo svoju ljubav krunisati brakom.
        </p>

        <Divider />
        <p className="date-big">{DATE_TEXT.long}</p>
      </div>
    </Section>
  )
}
