import { useMemo, useState } from 'react'
import { CONTACTS, DATE_TEXT } from '../config.js'
import { copyText } from '../utils/clipboard.js'
import { buildRsvpMessage, smsLink, viberChatLink, viberForwardLink } from '../utils/rsvp.js'
import Icon from './Icons.jsx'
import { Divider } from './Ornaments.jsx'
import Section from './Section.jsx'
import Sheet from './Sheet.jsx'

const MAX_GUESTS = 10

export default function Rsvp({ notify }) {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState(null)
  const [guests, setGuests] = useState(1)
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)
  const [sentTo, setSentTo] = useState(null)
  const [copied, setCopied] = useState(false)

  const message = useMemo(
    () => buildRsvpMessage({ name, attending: attending === true, guests, note }),
    [name, attending, guests, note],
  )

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (name.trim().length < 2) next.name = 'Molimo upišite ime i prezime.'
    if (attending === null) next.attending = 'Molimo odaberite da li dolazite.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSentTo(null)
    setCopied(false)
    setOpen(true)
  }

  const copy = async () => {
    const ok = await copyText(message)
    setCopied(ok)
    notify(ok ? 'Poruka je kopirana.' : 'Kopiranje nije uspjelo – označite tekst poruke i kopirajte ga ručno.')
    return ok
  }

  // Link se otvara normalno (pravi <a>), a poruka se istovremeno kopira.
  const openViber = (contact) => {
    copy()
    setSentTo(contact)
  }

  const recipient = sentTo && CONTACTS.find((c) => c.id === sentTo.id)

  return (
    <Section id="potvrda" className="rsvp">
      <div className="card rsvp-card">
        <p className="eyebrow">Potvrda dolaska</p>
        <h2 className="section-title">Vaše prisustvo učinit će naš dan još posebnijim.</h2>
        <p className="rsvp-deadline">
          Molimo Vas da potvrdite svoj dolazak najkasnije do <strong>{DATE_TEXT.rsvpDeadline}</strong>
        </p>
        <Divider />

        <form className="form" onSubmit={submit} noValidate>
          <label className="field">
            <span className="field-label">Ime i prezime</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Upišite ime i prezime"
              aria-invalid={!!errors.name}
              maxLength={80}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <fieldset className="field">
            <legend className="field-label">Dolazak</legend>
            <div className="choice-row">
              <button type="button" className={`choice ${attending === true ? 'is-active' : ''}`} aria-pressed={attending === true} onClick={() => setAttending(true)}>
                Dolazim
              </button>
              <button type="button" className={`choice ${attending === false ? 'is-active' : ''}`} aria-pressed={attending === false} onClick={() => setAttending(false)}>
                Ne mogu doći
              </button>
            </div>
            {errors.attending && <span className="field-error">{errors.attending}</span>}
          </fieldset>

          {attending !== false && (
            <div className="field">
              <span className="field-label" id="guests-label">Broj osoba</span>
              <div className="stepper" role="group" aria-labelledby="guests-label">
                <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label="Smanji broj osoba">
                  <Icon name="minus" size={20} />
                </button>
                <output aria-live="polite">{guests}</output>
                <button type="button" onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))} disabled={guests >= MAX_GUESTS} aria-label="Povećaj broj osoba">
                  <Icon name="plus" size={20} />
                </button>
              </div>
            </div>
          )}

          <label className="field">
            <span className="field-label">Poruka mladencima <small>(neobavezno)</small></span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={500} placeholder="Vaše čestitke i želje..." />
          </label>

          <button type="submit" className="btn btn-gold btn-lg">Potvrdi dolazak</button>
        </form>
      </div>

      <Sheet open={open} title="Pošaljite potvrdu" onClose={() => setOpen(false)}>
        <p className="sheet-text">Odaberite kome šaljete potvrdu. Poruka će se kopirati i otvorit će se Viber razgovor.</p>

        <div className="send-grid">
          {CONTACTS.map((c) => (
            <a key={c.id} className={`btn btn-viber ${sentTo?.id === c.id ? 'is-active' : ''}`} href={viberChatLink(c.phone)} onClick={() => openViber(c)}>
              <Icon name="viber" size={22} /> Pošalji {c.dative} na Viber
            </a>
          ))}
        </div>

        {recipient ? (
          <div className="howto" role="status">
            <p className="howto-title"><Icon name="check" size={18} /> Poruka je kopirana</p>
            <ol>
              <li>U Viberu se otvara razgovor – {recipient.name}, {recipient.display}.</li>
              <li>Dugo pritisnite polje za poruku i odaberite <b>Zalijepi</b>.</li>
              <li>Pritisnite <b>Pošalji</b>. Potvrda je poslana tek kada je pošaljete u Viberu.</li>
            </ol>
          </div>
        ) : (
          <p className="sheet-note">Potvrda je poslana tek kada poruku pošaljete u Viberu.</p>
        )}

        <div className="preview">
          <div className="preview-head">
            <span>Vaša poruka</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
              <Icon name={copied ? 'check' : 'copy'} size={16} /> {copied ? 'Kopirano' : 'Kopiraj poruku'}
            </button>
          </div>
          <pre className="preview-body">{message}</pre>
        </div>

        <details className="alt">
          <summary>Viber se ne otvara? Ostale mogućnosti</summary>
          <a className="sheet-option" href={viberForwardLink(message)}>
            <Icon name="viber" />
            <span><b>Viber s već upisanom porukom</b><small>Poruka je upisana – u Viberu sami odaberite Edvina ili Šejlu</small></span>
          </a>
          {CONTACTS.map((c) => (
            <a key={c.id} className="sheet-option" href={smsLink(c.phone, message)}>
              <Icon name="sms" />
              <span><b>Pošalji SMS – {c.name}</b><small>{c.display}</small></span>
            </a>
          ))}
        </details>
      </Sheet>
    </Section>
  )
}
