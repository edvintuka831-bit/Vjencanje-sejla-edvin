import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { HttpError } from './http.mjs'

// Šifra se postavlja isključivo u Netlify: Site configuration → Environment variables → ADMIN_PASSWORD.
// Nikada nije u HTML-u ni JavaScriptu stranice.
const COOKIE = 'admin_session'
const SESSION_DAYS = 7

const password = () => process.env.ADMIN_PASSWORD || ''

// Ključ za potpis sesije izveden iz šifre: promjena šifre automatski odjavljuje sve uređaje.
const sessionKey = () =>
  createHash('sha256').update(`sejla-edvin-admin:${process.env.ADMIN_SESSION_SECRET || ''}:${password()}`).digest()

const sign = (payload) => createHmac('sha256', sessionKey()).update(payload).digest('base64url')

const safeEqual = (a, b) => {
  const ha = createHash('sha256').update(String(a)).digest()
  const hb = createHash('sha256').update(String(b)).digest()
  return timingSafeEqual(ha, hb)
}

export function assertPasswordConfigured() {
  if (password().length < 8) {
    throw new HttpError(503, 'Admin šifra nije postavljena na Netlifyju (ADMIN_PASSWORD, najmanje 8 znakova).')
  }
}

export const checkPassword = (input) => safeEqual(input, password())

export function createSessionCookie(req) {
  const exp = Date.now() + SESSION_DAYS * 86400_000
  const payload = `${exp}.${randomBytes(12).toString('base64url')}`
  const token = `${payload}.${sign(payload)}`
  const secure = new URL(req.url).protocol === 'https:' ? '; Secure' : ''
  return `${COOKIE}=${token}; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}${secure}`
}

export const clearSessionCookie = () => `${COOKIE}=; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=0`

function readCookie(req, name) {
  const header = req.headers.get('cookie') || ''
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return v.join('=')
  }
  return ''
}

export function isAuthenticated(req) {
  if (password().length < 8) return false
  const token = readCookie(req, COOKIE)
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [exp, nonce, mac] = parts
  if (!safeEqual(mac, sign(`${exp}.${nonce}`))) return false
  return Number(exp) > Date.now()
}

export function requireAdmin(req) {
  assertPasswordConfigured()
  if (!isAuthenticated(req)) throw new HttpError(401, 'Prijava je istekla. Prijavite se ponovo.')
  // Dodatna zaštita od lažnih zahtjeva s drugih stranica.
  if (req.method !== 'GET' && req.headers.get('x-admin-request') !== '1') {
    throw new HttpError(403, 'Zahtjev nije dozvoljen.')
  }
}
