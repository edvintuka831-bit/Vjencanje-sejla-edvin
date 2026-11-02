// Podaci verzije pozivnice za goste koji dolaze samo na svadbeno slavlje u restoran.
// Zajednički podaci (mladenci, datum, muzika, kontakti) dolaze iz ../config.js.

// Lokacija provjerena na Google Maps: „ADS Caffe & Restoran“, 311. lahke brigade, Kakanj.
// place_id vodi navigaciju tačno na objekat, bez oslanjanja na slobodnu pretragu.
export const VENUE = {
  name: 'ADS Caffe & Restaurant',
  mapsName: 'ADS Caffe & Restoran, Kakanj',
  address: '311. lahke brigade, Kakanj',
  placeId: 'ChIJpfvB3TQnX0cRFN6wGgUzB9E',
  arrival: '18:00',
}

export const venueNavUrl = () => {
  const p = new URLSearchParams({
    api: '1',
    destination: VENUE.mapsName,
    destination_place_id: VENUE.placeId,
  })
  return `https://www.google.com/maps/dir/?${p}`
}

export const RESTORAN_CALENDAR = {
  title: 'Svadbeno slavlje – Šejla & Edvin',
  details: 'Dolazak u restoran u 18:00 – ADS Caffe & Restaurant, 311. lahke brigade, Kakanj.',
  location: 'ADS Caffe & Restoran, 311. lahke brigade, Kakanj',
  // 18:00 CET = 17:00Z, kraj u ponoć = 23:00Z
  start: '20270123T170000Z',
  end: '20270123T230000Z',
  icsFile: '/slavlje-sejla-edvin.ics',
  icsName: 'slavlje-sejla-edvin.ics',
}

export const RESTORAN_SHARE = {
  title: 'Šejla & Edvin – Pozivnica na svadbeno slavlje',
  text: 'S ljubavlju Vas pozivamo na svadbeno slavlje Šejle i Edvina, 23.01.2027. u 18:00 – ADS Caffe & Restaurant.',
}
