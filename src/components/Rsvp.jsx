import { useCallback, useEffect, useRef, useState } from 'react'
import { CONTACTS, DATE_TEXT } from '../config.js'
import { buildRsvpMessage, whatsappLink } from '../utils/rsvp.js'
import Icon from './Icons.jsx'
import { Divider } from './Ornaments.jsx'
import Section from './Section.jsx'
import Sheet from './Sheet.jsx'

const GUEST_CHOICES = [1, 2, 3, 4]
const MAX_GUESTS = 20
const SAVED_KEY = 'rsvp-poslano'

const readSaved = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || 'null')
  } catch {
    return null
  }
}

const writeSaved = (value) => {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(value))
  } catch {
    // privatni način rada – potvrda je svejedno spremljena na serveru
  }
}

export default function Rsvp() {
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(null)

  const [name, setName] = useState('')
  const [attending, setAttending] = useState(null)
  const [guests, setGuests] = useState(1)
  const [note, setNote] = useState('')
  const [website, setWebsite] = useState('') // skriveno polje protiv spama
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)

  useEffect(() => setSaved(readSaved()), [])

  const openForm = () => {
    setStatus('idle')
    setServerError('')
    setOpen(true)
  }
  const close = useCallback(() => setOpen(false), [])

  const pickAttending = (value) => {
    setAttending(value)
    setErrors((er) => ({ ...er, attending: undefined }))
  }

  const validate = () => {
    const next = {}
    if (name.trim().length < 2) next.name = 'Molimo upišite ime i prezime.'
    if (attending === null) next.attending = 'Molimo odaberite da li dolazite.'
    setErrors(next)
    if (Object.keys(next).length) {
      formRef.current?.querySelector(`[data-field="${Object.keys(next)[0]}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || !validate()) return
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), attending, guests: attending ? guests : 0, note, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Slanje nije uspjelo.')
      const record = { name: name.trim(), attending, guests: attending ? guests : 0, at: new Date().toISOString() }
      writeSaved(record)
      setSaved(record)
      setStatus('done')
      // Prazan obrazac za sljedeću potvrdu s istog uređaja.
      setName('')
      setAttending(null)
      setGuests(1)
      setNote('')
      setErrors({})
    } catch (err) {
      setServerError(err.message === 'Failed to fetch' ? 'Nema internet veze. Provjerite vezu i pokušajte ponovo.' : err.message)
      setStatus('error')
    }
  }

  // Rezerva ako server nije dostupan: ista poruka putem WhatsAppa.
  const fallbackMessage = buildRsvpMessage({ name, attending: attending === true, guests, note })

  return (
    <Section id="potvrda" className="rsvp">
      <div className="card rsvp-card">
        <p className="eyebrow">Potvrda dolaska</p>
        <h2 className="section-title">Radujemo se Vašem dolasku!</h2>
        <p className="rsvp-deadline">
          Molimo Vas da svoj dolazak potvrdite najkasnije do <strong>{DATE_TEXT.rsvpDeadline}</strong>
        </p>
        <Divider />

        {saved && (
          <p className="rsvp-saved">
            <Icon name="check" size={18} /> Vaša potvrda je zabilježena{saved.name ? ` – ${saved.name}` : ''}. Hvala!
          </p>
        )}

        <button type="button" className="btn btn-gold btn-lg rsvp-open" onClick={openForm}>
          <Icon name="heart" size={20} /> {saved ? 'Pošalji novu potvrdu' : 'Potvrdi dolazak'}
        </button>
      </div>

      <Sheet open={open} title={status === 'done' ? 'Hvala Vam!' : 'Potvrda dolaska'} onClose={close}>
        {status === 'done' ? (
          <div className="thanks" role="status">
            <div className="thanks-icon"><Icon name="heart" size={34} /></div>
            {saved?.attending ? (
              <>
                <p className="thanks-title">Hvala, {saved.name}!</p>
                <p>Vaša potvrda je zabilježena (broj osoba: {saved.guests}). Radujemo se što ćemo zajedno proslaviti 23. januara 2027.</p>
              </>
            ) : (
              <>
                <p className="thanks-title">Hvala, {saved?.name}!</p>
                <p>Žao nam je što nećete moći doći. Hvala što ste nam javili – bit ćete u našim mislima.</p>
              </>
            )}
            <p className="thanks-sign">S ljubavlju, Šejla &amp; Edvin</p>
            <button type="button" className="btn btn-outline" onClick={close}>Zatvori</button>
          </div>
        ) : (
          <form className="form" ref={formRef} onSubmit={submit} noValidate>
            <label className="field" data-field="name">
              <span className="field-label">Ime i prezime</span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors((er) => ({ ...er, name: undefined }))
                }}
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
                <button type="button" className={`choice ${attending === true ? 'is-active' : ''}`} aria-pressed={attending === true} onClick={() => pickAttending(true)}>
                  Dolazim
                </button>
                <button type="button" className={`choice ${attending === false ? 'is-active' : ''}`} aria-pressed={attending === false} onClick={() => pickAttending(false)}>
                  Ne dolazim
                </button>
              </div>
              {errors.attending && <span className="field-error">{errors.attending}</span>}
            </fieldset>

            {attending !== false && (
              <fieldset className="field">
                <legend className="field-label">Broj osoba</legend>
                <div className="guest-row">
                  {GUEST_CHOICES.map((n) => {
                    const active = n === 4 ? guests >= 4 : guests === n
                    return (
                      <button key={n} type="button" className={`choice ${active ? 'is-active' : ''}`} aria-pressed={active} onClick={() => setGuests(n)}>
                        {n === 4 ? '4 ili više' : n}
                      </button>
                    )
                  })}
                </div>
                {guests >= 4 && (
                  <div className="stepper" role="group" aria-label="Tačan broj osoba">
                    <button type="button" onClick={() => setGuests((g) => Math.max(4, g - 1))} disabled={guests <= 4} aria-label="Smanji broj osoba">
                      <Icon name="minus" size={20} />
                    </button>
                    <output aria-live="polite">{guests}</output>
                    <button type="button" onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))} disabled={guests >= MAX_GUESTS} aria-label="Povećaj broj osoba">
                      <Icon name="plus" size={20} />
                    </button>
                  </div>
                )}
              </fieldset>
            )}

            <label className="field">
              <span className="field-label">Poruka mladencima <small>(neobavezno)</small></span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={500} placeholder="Vaše čestitke i želje..." />
            </label>

            <label className="hp" aria-hidden="true">
              Web stranica
              <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>

            {status === 'error' && (
              <div className="app-hint" role="alert">
                <p><b>Potvrda nije poslana.</b> {serverError}</p>
                <p>Pokušajte ponovo ili pošaljite potvrdu putem WhatsAppa:</p>
                <div className="fallback-row">
                  {CONTACTS.map((c) => (
                    <a key={c.id} className="btn btn-ghost btn-sm" href={whatsappLink(c.phone, fallbackMessage)} target="_blank" rel="noopener noreferrer">
                      <Icon name="whatsapp" size={16} /> {c.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-gold btn-lg" disabled={status === 'sending'}>
              {status === 'sending' ? <span className="spinner" aria-hidden="true" /> : <Icon name="check" size={20} />}
              {status === 'sending' ? 'Šaljem...' : 'Pošalji potvrdu'}
            </button>
          </form>
        )}
      </Sheet>
    </Section>
  )
}
