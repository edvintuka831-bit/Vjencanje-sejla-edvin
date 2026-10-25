import { COUPLE, DATE_TEXT } from '../config.js'
import { Divider, FloralCorner, Monogram } from './Ornaments.jsx'
import Icon from './Icons.jsx'
import Section from './Section.jsx'

const HEARTS = Array.from({ length: 9 }, (_, i) => i)

export default function Finale() {
  return (
    <Section id="kraj" className="finale">
      <div className="card finale-card">
        <FloralCorner className="corner tr" />
        <FloralCorner className="corner bl" />
        <div className="hearts" aria-hidden="true">
          {HEARTS.map((i) => (
            <span key={i} className="heart" style={{ '--i': i }}><Icon name="heart" size={18} /></span>
          ))}
        </div>
        <Monogram />
        <Divider />
        <p className="quote">Najljepše uspomene nastaju kada ih dijelimo s ljudima koje volimo.</p>
        <p className="signature-pre">S ljubavlju,</p>
        <p className="signature">
          {COUPLE.bride} &amp; {COUPLE.groom} <span className="sig-heart">❤️</span>
        </p>
        <p className="date-big finale-date">{DATE_TEXT.short}</p>
      </div>
    </Section>
  )
}
