import { COUPLE, DATE_TEXT } from '../config.js'
import Countdown from './Countdown.jsx'
import { Divider, FloralCorner } from './Ornaments.jsx'
import Section from './Section.jsx'

export default function Hero() {
  return (
    <Section id="pocetak" className="hero">
      <div className="card hero-card">
        <FloralCorner className="corner tl" />
        <FloralCorner className="corner br" />

        <h1 className="names">
          <span className="name">{COUPLE.bride}</span>
          <span className="amp">&amp;</span>
          <span className="name">{COUPLE.groom}</span>
        </h1>

        <p className="date-big">{DATE_TEXT.long}</p>

        <Countdown />

        <Divider />
        <p className="quote">
          Postoje susreti koji promijene život, ljubavi koje traju zauvijek i trenuci koje želimo
          podijeliti s najdražima.
        </p>
        <p className="invite-text">
          S velikom ljubavlju i radošću pozivamo Vas da budete dio dana kada naše „zauvijek“ počinje.
        </p>
      </div>
    </Section>
  )
}
