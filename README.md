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
- **Potvrda dolaska** putem Vibera ili WhatsAppa, s izborom kome se šalje (Edvin / Šejla).
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

## Potvrda dolaska – Viber i WhatsApp

Gost upiše ime i prezime, dolazak, broj osoba, poruku i izabere **Edvin** ili **Šejla**, pa klikne:

- **Potvrdi putem WhatsAppa** – otvara se WhatsApp razgovor s izabranom osobom (`wa.me` link)
  i poruka je već upisana. Gost pritisne Pošalji.
- **Potvrdi putem Vibera** – otvara se Viber razgovor s izabranom osobom. Viber za ovaj način
  otvaranja ne podržava unaprijed upisanu poruku, zato se poruka automatski kopira i gost dobije
  uputstvo da je zalijepi i pošalje. Na Androidu se koristi intent link (testirano: radi).

Rezervne opcije: Kopiraj poruku, Viber s već upisanom porukom (gost bira primaoca) i SMS.
Pozivnica nigdje ne tvrdi da je potvrda poslana – slanje gost završava u aplikaciji.

`/viber-test.html` je skrivena probna stranica za provjeru Viber linkova na telefonima (nije povezana
s pozivnicom). Može se obrisati iz `public/` kada više ne treba.

## Lokalno pokretanje

Potreban je Node.js 20.19 ili noviji.

```bash
npm install
npm run dev       # razvojni server
npm run build     # production build u folder dist/
npm run preview   # pregled builda
```

## Postavljanje na Netlify

### Opcija A – ručno, bez programiranja (najbrže)

1. Raspakujte **`pozivnica-dist.zip`**.
2. Otvorite <https://app.netlify.com/drop>.
3. Prevucite raspakovani folder (onaj u kojem je `index.html`).
4. Za ažuriranje postojeće stranice: Netlify → vaša stranica → **Deploys** → prevucite novi folder.

### Opcija B – iz izvornog koda / GitHuba

1. Netlify → **Add new site → Import an existing project → GitHub** → izaberite ovaj repository.
2. Postavke se čitaju iz `netlify.toml` (build: `npm run build`, publish: `dist`).
3. **Deploy**.

Izvorni kod (`pozivnica-izvorni-kod.zip`) se ne prevlači direktno na Netlify Drop –
prvo `npm install` i `npm run build`, pa se postavlja sadržaj foldera `dist`.
