import { isInAppBrowser } from '../utils/appLaunch.js'

// Uputa kada se WhatsApp ne otvori nakon klika.
export default function AppHint({ app, what = 'poruku' }) {
  return (
    <div className="app-hint" role="status">
      <p><b>{app} se nije otvorio?</b></p>
      <ul>
        {isInAppBrowser() ? (
          <li>Pozivnica je otvorena unutar aplikacije koja blokira linkove. Otvorite je u pregledniku: dodirnite <b>⋮</b> ili <b>…</b> gore desno → <b>Otvori u pregledniku</b> (Chrome / Safari).</li>
        ) : (
          <li>Provjerite da je {app} instaliran na ovom uređaju.</li>
        )}
        <li>Ili ovdje kopirajte {what} i zalijepite u {app} ručno.</li>
      </ul>
    </div>
  )
}
