# Šejla & Edvin – digitalna pozivnica za vjenčanje

Luksuzna bijelo-zlatna digitalna pozivnica (React + Vite, čisti CSS).
Bez Supabasea, bez baze, bez servera, bez prijave.

## Šta pozivnica sadrži

- **Zapečaćena koverta** sa zlatnim voštanim pečatom **Š & E**. Dodir na pečat: pečat puca,
  koverta se rasklapa, pozivnica izlazi, lete latice bijelih ruža i zlatne iskre, zatim se otvara pozivnica.
- **Glavni ekran:** Šejla & Edvin, 23. januar 2027., odbrojavanje i uvodni tekst.
- **Odbrojavanje** do 23.01.2027. u 18:00 (Europe/Sarajevo) – računa se iz stvarnog vremena,
  pa radi i nakon osvježavanja stranice.
- **Program vjenčanja** sa zlatnim ikonama i dugmadima **Otvori navigaciju** (Google Maps).
- **Muzika** – Zdravko Čolić „Jedina“ (`public/audio/jedina.mp3`).
- **Potvrda dolaska** – dugme „Potvrdi dolazak“ otvara obrazac; odgovori se trajno spremaju na Netlifyju.
- **Privatni admin panel** na `/admin` – prijava šifrom, statistika, pretraga, izmjena, brisanje, Excel/CSV.
- Dodaj u kalendar, Podijeli pozivnicu, završni dio s animiranim srcima i laticama.

## Izmjena podataka

Svi tekstovi i podaci su u `src/config.js`: datum, brojevi telefona, program, muzika.

**Lokacije (`mapsQuery`)** – Google Maps traži po nazivu i adresi, bez koordinata:

| Događaj | Trenutna pretraga | Napomena |
|---|---|---|
| Okupljanje kod mladoženje | `Slijevnice, Kakanj` | |
| Okupljanje kod mlade | `Branilaca 10` | grad nije naveden – dopišite ga (npr. `Branilaca 10, Kakanj`) |
| Vjenčanje | – | lokacija ceremonije nije navedena, dugme se ne prikazuje dok je ne upišete |
| Večera i slavlje | `Restoran ADS` | grad nije naveden – preporučeno dopisati |

## Muzika

- Fajl: `public/audio/jedina.mp3` (podržan je i `jedina.m4a`).
- Pokreće se kada gost dodirne pečat. Dugme dolje desno je uključuje/isključuje, pjesma se ponavlja.
- Ako preglednik blokira reprodukciju, pojavi se dugme **Pusti našu pjesmu**.
- Ako fajl ne postoji, pojavi se dugme koje otvara pjesmu na Spotifyju (`MUSIC.fallbackUrl`).

## Potvrda dolaska i admin panel

**Gost:** klikne **Potvrdi dolazak** → upiše ime i prezime, Dolazim / Ne dolazim, broj osoba
(1, 2, 3, 4 ili više – kod „4 ili više“ bira tačan broj), opcionalnu poruku → **Pošalji potvrdu**.
Odgovor se sprema na server i prikazuje se poruka zahvalnosti. Ako server nije dostupan,
gost dobije poruku o grešci i mogućnost da potvrdu pošalje putem WhatsAppa – nikad lažno „poslano“.

**Admin (`/admin`):** prijava šifrom → broj osoba koje dolaze, broj potvrda, ne dolaze, ukupno
odgovora; pretraga po imenu; filter Svi / Dolaze / Ne dolaze; uređivanje i brisanje;
**Preuzmi Excel** (.xlsx) i **Preuzmi CSV** – otvaraju se na mobitelu bez instaliranog Excela
(pregled fajlova, Google Sheets, Numbers).

### Kako je napravljeno (bez Supabasea)

| Dio | Tehnologija |
|---|---|
| Spremanje odgovora | **Netlify Blobs** – trajna pohrana ugrađena u Netlify, nema vanjske baze |
| Server | **Netlify Functions**: `netlify/functions/rsvp.mjs` (`/api/rsvp`), `netlify/functions/admin.mjs` (`/api/admin/*`) |
| Šifra | Netlify environment variable **`ADMIN_PASSWORD`** – nikad u HTML-u ni JavaScriptu |
| Sesija | potpisani **HttpOnly** kolačić, vrijedi 7 dana; promjena šifre odjavljuje sve uređaje |
| Zaštita | 5 pogrešnih šifri → zaključavanje 15 min; ograničenje slanja; skriveno polje protiv spam-botova; admin stranica `noindex` |

### Promjena šifre

Netlify → vaša stranica → **Site configuration → Environment variables → ADMIN_PASSWORD → Edit**,
upišite novu šifru, sačuvajte, pa **Deploys → Trigger deploy → Deploy site**.

## Lokalno pokretanje

Potreban je Node.js 22.12 ili noviji.

```bash
npm install
npm run dev       # razvojni server
npm run build     # production build u folder dist/
npm run preview   # pregled builda
```

## Postavljanje na Netlify (korak po korak, s mobitela)

> **Važno:** potvrde dolaska i admin rade preko serverskih funkcija. Netlify ih pokreće samo kada
> je stranica povezana s GitHubom. Ručno prevlačenje foldera (Netlify Drop) objavljuje samo izgled –
> potvrde se tada NE bi spremale. Zato koristite korake ispod.

Sve se radi u pregledniku na mobitelu (Chrome ili Safari) na **app.netlify.com**.

**1. Povežite stranicu s GitHubom**

- *Ako već imate stranicu na Netlifyju (napravljenu prevlačenjem):* otvorite je →
  **Site configuration → Build & deploy → Continuous deployment → Link repository** →
  **GitHub** → odobrite pristup → izaberite repository **Vjencanje-sejla-edvin**.
  Link stranice ostaje isti.
- *Ako pravite novu stranicu:* **Add new site → Import an existing project → GitHub** →
  izaberite **Vjencanje-sejla-edvin**.

Kod izbora grane (*Branch to deploy*) izaberite **`claude/wedding-invitation-sejla-edvin-0pm1rv`**.
Ostale postavke se čitaju same iz `netlify.toml` (Build command `npm run build`, Publish directory `dist`).
Kliknite **Deploy**.

**2. Postavite admin šifru**

**Site configuration → Environment variables → Add a variable → Add a single variable**:

- Key: `ADMIN_PASSWORD`
- Value: vaša šifra (najmanje 8 znakova, preporuka 12+, npr. tri riječi i broj)
- Sačuvajte (**Create variable**).

**3. Ponovo objavite**

**Deploys → Trigger deploy → Deploy site**. Sačekajte da piše **Published** (1–2 minute).

**4. Provjera**

1. Otvorite pozivnicu, kliknite **Potvrdi dolazak** i pošaljite probnu potvrdu („Test“).
2. Otvorite **vaš-link.netlify.app/admin**, prijavite se šifrom – „Test“ mora biti na spisku.
3. Obrišite probni odgovor.

Šifru dajte samo Šejli i Edvinu. Na `/admin` se mogu prijaviti s oba telefona istovremeno.

