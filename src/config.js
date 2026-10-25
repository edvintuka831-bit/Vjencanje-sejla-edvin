// Svi podaci pozivnice na jednom mjestu – izmjene se rade ovdje.

export const COUPLE = {
  bride: 'Šejla',
  groom: 'Edvin',
  initials: 'Š & E',
}

// 23.01.2027. u 15:00 po vremenu Europe/Sarajevo.
// U januaru Sarajevo koristi CET (UTC+01:00), pa je ovo tačan trenutak.
export const WEDDING_DATE = new Date('2027-01-23T15:00:00+01:00')

export const DATE_TEXT = {
  long: 'SUBOTA, 23. JANUAR 2027.',
  short: '23.01.2027.',
  rsvpDeadline: '02.01.2027.',
}

// Muzika: stavite fajl u public/audio/jedina.mp3 (ili jedina.m4a).
// Dugme za muziku pojavljuje se samo ako se fajl stvarno može reproducirati.
export const MUSIC = {
  sources: ['/audio/jedina.mp3', '/audio/jedina.m4a'],
  title: 'Zdravko Čolić – Jedina',
  volume: 0.35,
}

export const CONTACTS = [
  { id: 'edvin', name: 'Edvin', dative: 'Edvinu', phone: '+387644107473', display: '+387 64 410 7473' },
  { id: 'sejla', name: 'Šejla', dative: 'Šejli', phone: '+387603292251', display: '+387 60 329 2251' },
]

// mapsQuery: upišite tačnu adresu (ulica, broj, grad) ili Google Maps link.
// Dugme "Otvori mapu" prikazuje se samo kada je polje popunjeno.
// Trenutne lokacije nemaju naveden grad, pa dugmad za mapu nisu uključena.
export const EVENTS = [
  {
    time: '11:00',
    title: 'Okupljanje kod mladoženje',
    place: 'Slijevnice',
    icon: 'groom',
    mapsQuery: '',
  },
  {
    time: '11:00',
    title: 'Okupljanje kod mlade',
    place: 'Branilaca 10',
    icon: 'bride',
    mapsQuery: '',
  },
  {
    time: '15:00',
    title: 'Vjenčanje',
    place: 'Svečani čin vjenčanja',
    icon: 'rings',
    mapsQuery: '',
  },
  {
    time: '18:00',
    title: 'Večera i slavlje',
    place: 'Restoran ADS',
    icon: 'cheers',
    mapsQuery: '',
  },
]

export const CALENDAR = {
  title: 'Vjenčanje Šejla & Edvin',
  details: 'S velikom radošću pozivamo Vas da budete dio našeg najljepšeg dana. Vjenčanje u 15:00, večera i slavlje u 18:00 – Restoran ADS.',
  location: 'Restoran ADS',
  // UTC: 15:00 CET = 14:00Z, kraj u ponoć = 23:00Z
  start: '20270123T140000Z',
  end: '20270123T230000Z',
  icsFile: '/vjencanje-sejla-edvin.ics',
}

export const SHARE = {
  title: 'Šejla & Edvin – Pozivnica za vjenčanje',
  text: 'S radošću Vas pozivamo na vjenčanje Šejle i Edvina, subota, 23.01.2027.',
}
