import { DATE_TEXT } from '../config.js'

export function buildRsvpMessage({ name, attending, guests, note }) {
  const intro = attending
    ? `Pozdrav, potvrđujem dolazak na vjenčanje Šejle i Edvina ${DATE_TEXT.short}`
    : `Pozdrav, nažalost nisam u mogućnosti doći na vjenčanje Šejle i Edvina ${DATE_TEXT.short}`
  return [
    intro,
    '',
    `Ime i prezime: ${name.trim()}`,
    `Broj osoba: ${attending ? guests : 0}`,
    `Dolazak: ${attending ? 'Dolazim' : 'Nisam u mogućnosti doći'}`,
    `Poruka: ${note.trim() || '-'}`,
  ].join('\n')
}

const digits = (phone) => phone.replace(/[^\d]/g, '')
const ua = () => navigator.userAgent || ''

// Chrome i Samsung Internet na Androidu (ne ugrađeni preglednici aplikacija)
const isAndroidBrowser = () =>
  /Android/i.test(ua()) && /Chrome|SamsungBrowser/i.test(ua()) && !/; wv\)|Viber|FBAN|FBAV|Instagram/i.test(ua())

// Viber otvara razgovor s brojem, ali za taj način otvaranja ne podržava
// unaprijed upisanu poruku – zato se poruka kopira i gost je zalijepi.
// Na Androidu je intent link (paket com.viber.voip) provjereno radio.
export const viberChatLink = (phone) => {
  const number = `%2B${digits(phone)}`
  if (isAndroidBrowser()) {
    return `intent://chat?number=${number}#Intent;scheme=viber;package=com.viber.voip;end`
  }
  return `viber://chat?number=${number}`
}

// Viber s već upisanom porukom – gost u Viberu sam bira primaoca.
export const viberForwardLink = (text) => `viber://forward?text=${encodeURIComponent(text)}`

// WhatsApp podržava i primaoca i već upisanu poruku.
export const whatsappLink = (phone, text) => `https://wa.me/${digits(phone)}?text=${encodeURIComponent(text)}`

// "?&body=" radi i na Androidu i na iOS-u.
export const smsLink = (phone, text) => `sms:+${digits(phone)}?&body=${encodeURIComponent(text)}`
