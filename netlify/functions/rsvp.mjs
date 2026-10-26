import { fail, handle, json, readJson } from '../lib/http.mjs'
import { hashIp, newId, rsvpStore, securityStore, validateRsvp } from '../lib/store.mjs'

// Mobilni operateri često dijele istu IP adresu među mnogo korisnika, pa je granica velikodušna.
const MAX_PER_HOUR = 60

// POST /api/rsvp – gost šalje potvrdu dolaska; zapis se trajno sprema.
export default handle(async (req, context) => {
  if (req.method !== 'POST') return fail(405, 'Metoda nije dozvoljena.')
  const body = await readJson(req)

  // Skriveno polje koje popunjavaju samo spam-botovi.
  if (body.website) return json({ ok: true })

  const data = validateRsvp(body)

  // Zaštita od zloupotrebe: ograničen broj slanja po uređaju/mreži na sat.
  const security = securityStore()
  const hourKey = `submit/${hashIp(context.ip)}/${new Date().toISOString().slice(0, 13)}`
  const count = (await security.get(hourKey, { type: 'json' })) || 0
  if (count >= MAX_PER_HOUR) return fail(429, 'Previše pokušaja. Molimo pokušajte ponovo za sat vremena.')
  await security.setJSON(hourKey, count + 1)

  const now = new Date().toISOString()
  const record = { id: newId(), ...data, createdAt: now, updatedAt: now }
  await rsvpStore().setJSON(record.id, record)

  return json({ ok: true, id: record.id }, 201)
})

export const config = { path: '/api/rsvp' }
