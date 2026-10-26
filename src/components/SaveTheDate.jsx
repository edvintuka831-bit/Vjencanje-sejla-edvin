import { useState } from 'react'
import { CALENDAR, SHARE } from '../config.js'
import { copyText } from '../utils/clipboard.js'
import { isInAppBrowser, watchAppLaunch } from '../utils/appLaunch.js'
import AppHint from './AppHint.jsx'
import Icon from './Icons.jsx'
import Section from './Section.jsx'
import Sheet from './Sheet.jsx'

const googleCalendarUrl = () => {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: CALENDAR.title,
    dates: `${CALENDAR.start}/${CALENDAR.end}`,
    details: CALENDAR.details,
    location: CALENDAR.location,
    ctz: 'Europe/Sarajevo',
  })
  return `https://calendar.google.com/calendar/render?${p}`
}

const pageUrl = () => window.location.origin + window.location.pathname

export default function SaveTheDate({ notify }) {
  const [sheet, setSheet] = useState(null)
  const [failedApp, setFailedApp] = useState(null)
  const close = () => {
    setSheet(null)
    setFailedApp(null)
  }
  // Panel se ne smije zatvoriti u istom trenutku kao klik na link –
  // neki mobilni preglednici tada otkažu otvaranje linka.
  const closeSoon = () => setTimeout(close, 600)

  const launch = (app) => {
    setFailedApp(null)
    watchAppLaunch(() => setFailedApp(app))
  }

  const share = async () => {
    const data = { title: SHARE.title, text: SHARE.text, url: pageUrl() }
    if (navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch (err) {
        if (err && err.name === 'AbortError') return
      }
    }
    setSheet('share')
  }

  const copyLink = async () => {
    const ok = await copyText(pageUrl())
    notify(ok ? 'Link pozivnice je kopiran.' : 'Kopiranje nije uspjelo – kopirajte link iz adresne trake.')
    if (ok) close()
  }

  const shareText = `${SHARE.text}\n${pageUrl()}`

  return (
    <Section id="sacuvajte-datum" className="actions">
      <p className="eyebrow">Sačuvajte datum</p>
      <div className="action-row">
        <button className="btn btn-gold" onClick={() => setSheet('calendar')}>
          <Icon name="calendar" size={20} /> Dodaj u kalendar
        </button>
        <button className="btn btn-outline" onClick={share}>
          <Icon name="share" size={20} /> Podijeli pozivnicu
        </button>
      </div>

      <Sheet open={sheet === 'calendar'} title="Dodaj u kalendar" onClose={close}>
        <div className="sheet-list">
          <a className="sheet-option" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" onClick={closeSoon}>
            <Icon name="google" /> <span><b>Google Kalendar</b><small>Android i web</small></span>
          </a>
          <a className="sheet-option" href={CALENDAR.icsFile} download="vjencanje-sejla-edvin.ics" onClick={closeSoon}>
            <Icon name="apple" /> <span><b>Apple / Outlook kalendar</b><small>iPhone, iPad, Mac, Windows (.ics)</small></span>
          </a>
        </div>
      </Sheet>

      <Sheet open={sheet === 'share'} title="Podijeli pozivnicu" onClose={close}>
        <div className="sheet-list">
          <a className="sheet-option" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`} target={isInAppBrowser() ? undefined : '_blank'} rel="noopener noreferrer" onClick={() => launch('WhatsApp')}>
            <Icon name="whatsapp" /> <span><b>WhatsApp</b><small>Odaberite kome šaljete</small></span>
          </a>
          <button className="sheet-option" onClick={copyLink}>
            <Icon name="link" /> <span><b>Kopiraj link</b><small>Zalijepite ga u bilo koju poruku</small></span>
          </button>
        </div>
        {failedApp && <AppHint app={failedApp} what="link" />}
      </Sheet>
    </Section>
  )
}
