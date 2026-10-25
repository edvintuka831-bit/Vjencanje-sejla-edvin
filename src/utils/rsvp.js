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

// Otvara Viber razgovor s brojem (poruku gost zalijepi sam).
export const viberChatLink = (phone) => `viber://chat?number=%2B${digits(phone)}`

// Otvara Viber s već upisanom porukom – gost bira primaoca.
export const viberForwardLink = (text) => `viber://forward?text=${encodeURIComponent(text)}`

// "?&body=" radi i na Androidu i na iOS-u.
export const smsLink = (phone, text) => `sms:+${digits(phone)}?&body=${encodeURIComponent(text)}`
