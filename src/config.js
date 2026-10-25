// Svi podaci pozivnice na jednom mjestu – izmjene se rade ovdje.

export const COUPLE = {
  bride: 'Šejla',
  groom: 'Edvin',
  initials: 'Š & E',
}

// Odbrojavanje: 23.01.2027. u 18:00 po vremenu Europe/Sarajevo.
// U januaru Sarajevo koristi CET (UTC+01:00), pa je ovo tačan trenutak.
export const WEDDING_DATE = new Date('2027-01-23T18:00:00+01:00')

export const DATE_TEXT = {
  long: '23. JANUAR 2027.',
  short: '23.01.2027.',
  rsvpDeadline: '02.01.2027.',
}

// Muzika: fajl public/audio/jedina.mp3 (ili jedina.m4a).
// Ako fajl ne postoji, prikazuje se dugme koje otvara pjesmu na muzičkom servisu (fallbackUrl).
export const MUSIC = {
  sources: ['/audio/jedina.mp3', '/audio/jedina.m4a'],
  title: 'Zdravko Čolić – Jedina',
  volume: 0.35,
  fallbackUrl: 'https://open.spotify.com/search/Zdravko%20%C4%8Coli%C4%87%20Jedina',
  fallbackLabel: 'Poslušajte našu pjesmu na Spotifyju',
}

export const CONTACTS = [
  { id: 'edvin', name: 'Edvin', dative: 'Edvinu', phone: '+387644107473', display: '+387 64 410 7473' },
  { id: 'sejla', name: 'Šejla', dative: 'Šejli', phone: '+387603292251', display: '+387 60 329 2251' },
]

// mapsQuery: naziv i adresa za Google Maps pretragu (bez koordinata).
// Prazno polje = nema dugmeta "Otvori navigaciju".
// Napomena: za "Branilaca 10" i "Restoran ADS" grad nije naveden –
// dopišite ga ovdje (npr. 'Branilaca 10, Kakanj') da navigacija bude tačna.
export const EVENTS = [
  {
    time: '11:00',
    title: 'Okupljanje kod mladoženje',
    place: 'Slijevnice, Kakanj',
    icon: 'groom',
    mapsQuery: 'Slijevnice, Kakanj',
  },
  {
    time: '11:00',
    title: 'Okupljanje kod mlade',
    place: 'Branilaca 10',
    icon: 'bride',
    mapsQuery: 'Branilaca 10',
  },
  {
    time: '15:00',
    title: 'Vjenčanje',
    place: 'Svečana ceremonija',
    icon: 'rings',
    // Lokacija ceremonije nije navedena – upišite je kada bude poznata.
    mapsQuery: '',
  },
  {
    time: '18:00',
    title: 'Večera i slavlje',
    place: 'Restoran ADS',
    icon: 'cheers',
    mapsQuery: 'Restoran ADS',
  },
]

export const CALENDAR = {
  title: 'Vjenčanje Šejla & Edvin',
  details: 'Vjenčanje u 15:00, večera i slavlje u 18:00 – Restoran ADS.',
  location: 'Restoran ADS',
  // UTC: 15:00 CET = 14:00Z, kraj u ponoć = 23:00Z
  start: '20270123T140000Z',
  end: '20270123T230000Z',
  icsFile: '/vjencanje-sejla-edvin.ics',
}

export const SHARE = {
  title: 'Šejla & Edvin – Pozivnica za vjenčanje',
  text: 'S radošću Vas pozivamo na vjenčanje Šejle i Edvina, 23.01.2027.',
}
