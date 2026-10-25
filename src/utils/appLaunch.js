// Preglednik ne javlja da li se aplikacija (Viber/WhatsApp) otvorila.
// Ako stranica nakon klika ostane vidljiva i aktivna, aplikacija se vjerovatno
// nije otvorila (nije instalirana ili ugrađeni preglednik blokira link).
export function watchAppLaunch(onFail, ms = 2000) {
  let left = false
  const mark = () => {
    left = true
  }
  const onVis = () => document.hidden && mark()
  window.addEventListener('blur', mark)
  window.addEventListener('pagehide', mark)
  document.addEventListener('visibilitychange', onVis)
  setTimeout(() => {
    window.removeEventListener('blur', mark)
    window.removeEventListener('pagehide', mark)
    document.removeEventListener('visibilitychange', onVis)
    if (!left && !document.hidden) onFail()
  }, ms)
}

// Ugrađeni preglednici (Viber, Facebook, Instagram...) često blokiraju
// otvaranje drugih aplikacija.
export const isInAppBrowser = () =>
  /Viber|FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|; wv\)/i.test(navigator.userAgent || '')
