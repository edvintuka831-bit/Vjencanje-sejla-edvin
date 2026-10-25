import { DATE_TEXT } from '../config.js'

export function buildRsvpMessage({ name, attending, guests, note }) {
  const lines = [
    '💍 POTVRDA DOLASKA',
    '',
    'Vjenčanje Šejla & Edvin',
    '',
    `Ime i prezime: ${name.trim()}`,
    '',
    `Dolazak: ${attending ? 'Dolazim' : 'Ne mogu doći'}`,
    '',
    `Broj osoba: ${attending ? guests : 0}`,
    '',
    `Poruka: ${note.trim() || '-'}`,
    '',
    `Datum vjenčanja: ${DATE_TEXT.short}`,
  ]
  return lines.join('\n')
}

const digits = (phone) => phone.replace(/[^\d]/g, '')

const ua = () => navigator.userAgent || ''
// Chrome i Samsung Internet na Androidu (ne ugrađeni preglednici aplikacija)
const isAndroidBrowser = () =>
  /Android/i.test(ua()) && /Chrome|SamsungBrowser/i.test(ua()) && !/; wv\)|Viber|FBAN|FBAV|Instagram/i.test(ua())

// Otvara Viber razgovor s brojem (poruka se kopira, gost je zalijepi).
// Na Androidu se koristi intent link koji Chrome pouzdanije otvara;
// ako Viber nije instaliran, otvara se Viber u Play Storeu.
export const viberChatLink = (phone) => {
  const number = `%2B${digits(phone)}`
  if (isAndroidBrowser()) {
    return `intent://chat?number=${number}#Intent;scheme=viber;package=com.viber.voip;end`
  }
  return `viber://chat?number=${number}`
}

// WhatsApp podržava i primaoca i već upisanu poruku.
export const whatsappLink = (phone, text) => `https://wa.me/${digits(phone)}?text=${encodeURIComponent(text)}`

// Otvara Viber s već upisanom porukom – gost bira primaoca.
export const viberForwardLink = (text) => `viber://forward?text=${encodeURIComponent(text)}`

// "?&body=" radi i na Androidu i na iOS-u.
export const smsLink = (phone, text) => `sms:+${digits(phone)}?&body=${encodeURIComponent(text)}`
