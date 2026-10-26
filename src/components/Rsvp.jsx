import { useMemo, useRef, useState } from 'react'
import { CONTACTS, DATE_TEXT } from '../config.js'
import { copyText } from '../utils/clipboard.js'
import { isInAppBrowser, watchAppLaunch } from '../utils/appLaunch.js'
import { buildRsvpMessage, whatsappLink } from '../utils/rsvp.js'
import AppHint from './AppHint.jsx'
import Icon from './Icons.jsx'
import { Divider } from './Ornaments.jsx'
import Section from './Section.jsx'

const MAX_GUESTS = 10

export default function Rsvp({ notify }) {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState(null)
  const [guests, setGuests] = useState(1)
  const [note, setNote] = useState('')
  const [to, setTo] = useState(null)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null) // { app, contact }
  const [failedApp, setFailedApp] = useState(null)
  const [copied, setCopied] = useState(false)
  const formRef = useRef(null)
  const statusRef = useRef(null)

  const contact = CONTACTS.find((c) => c.id === to)
  const message = useMemo(
    () => buildRsvpMessage({ name, attending: attending === true, guests, note }),
    [name, attending, guests, note],
  )

  const validate = () => {
    const next = {}
    if (name.trim().length < 2) next.name = 'Molimo upišite ime i prezime.'
    if (attending === null) next.attending = 'Molimo odaberite da li dolazite.'
    if (!to) next.to = 'Molimo odaberite kome šaljete potvrdu.'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = formRef.current?.querySelector('[data-field="' + Object.keys(next)[0] + '"]')
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }

  const copy = async () => {
    const ok = await copyText(message)
    setCopied(ok)
    notify(ok ? 'Poruka je kopirana.' : 'Kopiranje nije uspjelo – označite tekst poruke i kopirajte ga ručno.')
    return ok
  }

  // Pravi <a> link otvara WhatsApp; ovdje samo provjera forme i uputstvo.
  const onSend = (e) => {
    if (!validate()) {
      e.preventDefault()
      return
    }
    setSent({ contact })
    setFailedApp(null)
    watchAppLaunch(() => setFailedApp('WhatsApp'))
    setTimeout(() => statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 400)
  }

  const reset = (setter) => (value) => {
    setter(value)
    setSent(null)
    setFailedApp(null)
    setCopied(false)
  }

  const waHref = contact ? whatsappLink(contact.phone, message) : '#potvrda'
  const waTarget = contact && !isInAppBrowser() ? '_blank' : undefined

  return (
    <Section id="potvrda" className="rsvp">
      <div className="card rsvp-card">
        <p className="eyebrow">Potvrda dolaska</p>
        <h2 className="section-title">Radujemo se Vašem dolasku!</h2>
        <p className="rsvp-deadline">
          Molimo Vas da svoj dolazak potvrdite najkasnije do <strong>{DATE_TEXT.rsvpDeadline}</strong>
        </p>
        <Divider />

        <div className="form" ref={formRef}>
          <label className="field" data-field="name">
            <span className="field-label">Ime i prezime</span>
            <input
              type="text"
              value={name}
              onChange={(e) => reset(setName)(e.target.value)}
              autoComplete="name"
              placeholder="Upišite ime i prezime"
              aria-invalid={!!errors.name}
              maxLength={80}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <fieldset className="field" data-field="attending">
            <legend className="field-label">Dolazak</legend>
            <div className="choice-row">
              <button type="button" className={`choice ${attending === true ? 'is-active' : ''}`} aria-pressed={attending === true} onClick={() => reset(setAttending)(true)}>
                Dolazim
              </button>
              <button type="button" className={`choice ${attending === false ? 'is-active' : ''}`} aria-pressed={attending === false} onClick={() => reset(setAttending)(false)}>
                Nisam u mogućnosti doći
              </button>
            </div>
            {errors.attending && <span className="field-error">{errors.attending}</span>}
          </fieldset>

          {attending !== false && (
            <div className="field">
              <span className="field-label" id="guests-label">Broj osoba</span>
              <div className="stepper" role="group" aria-labelledby="guests-label">
                <button type="button" onClick={() => reset(setGuests)(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="Smanji broj osoba">
                  <Icon name="minus" size={20} />
                </button>
                <output aria-live="polite">{guests}</output>
                <button type="button" onClick={() => reset(setGuests)(Math.min(MAX_GUESTS, guests + 1))} disabled={guests >= MAX_GUESTS} aria-label="Povećaj broj osoba">
                  <Icon name="plus" size={20} />
                </button>
              </div>
            </div>
          )}

          <label className="field">
            <span className="field-label">Poruka mladencima <small>(neobavezno)</small></span>
            <textarea value={note} onChange={(e) => reset(setNote)(e.target.value)} rows={3} maxLength={500} placeholder="Vaše čestitke i želje..." />
          </label>

          <fieldset className="field" data-field="to">
            <legend className="field-label">Kome šaljete potvrdu?</legend>
            <div className="choice-row">
              {CONTACTS.map((c) => (
                <button key={c.id} type="button" className={`choice choice-person ${to === c.id ? 'is-active' : ''}`} aria-pressed={to === c.id} onClick={() => reset(setTo)(c.id)}>
                  <b>{c.name}</b>
                  <small>{c.display}</small>
                </button>
              ))}
            </div>
            {errors.to && <span className="field-error">{errors.to}</span>}
          </fieldset>

          <div className="send-buttons">
            <a className="btn btn-whatsapp btn-lg" href={waHref} target={waTarget} rel="noopener noreferrer" onClick={onSend}>
              <Icon name="whatsapp" size={24} /> Potvrdi putem WhatsAppa
            </a>
          </div>

          <div ref={statusRef}>
            {sent && (
              <div className="howto howto-wa" role="status">
                <p className="howto-title"><Icon name="check" size={18} /> Otvara se WhatsApp – {sent.contact.name}, {sent.contact.display}</p>
                <ol>
                  <li>Poruka je već upisana u razgovor.</li>
                  <li>Pritisnite <b>Pošalji</b> u WhatsAppu. Potvrda je poslana tek tada.</li>
                </ol>
              </div>
            )}
            {failedApp && <AppHint app={failedApp} />}
          </div>

          {sent && (
            <div className="preview">
              <div className="preview-head">
                <span>Vaša poruka</span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
                  <Icon name={copied ? 'check' : 'copy'} size={16} /> {copied ? 'Kopirano' : 'Kopiraj poruku'}
                </button>
              </div>
              <pre className="preview-body">{message}</pre>
            </div>
          )}

        </div>
      </div>
    </Section>
  )
}
