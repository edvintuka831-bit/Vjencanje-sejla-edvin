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

// WhatsApp podržava i primaoca i već upisanu poruku.
export const whatsappLink = (phone, text) => `https://wa.me/${digits(phone)}?text=${encodeURIComponent(text)}`

