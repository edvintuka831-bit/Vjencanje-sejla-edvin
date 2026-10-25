# Šejla & Edvin – digitalna pozivnica za vjenčanje

Luksuzna digitalna pozivnica (React + Vite, čisti CSS). Bez Supabasea, bez baze, bez backenda.

## Funkcije

- Zatvorena 3D koverta sa zlatnim voštanim pečatom **Š & E** – dodir na pečat otvara kovertu, pozivnica izlazi, prikazuje se romantični uvod, a zatim cijela pozivnica.
- Muzika (Zdravko Čolić – Jedina) kreće nakon otvaranja koverte, ponavlja se, ima dugme za uključivanje/isključivanje.
- Odbrojavanje do 23.01.2027. u 15:00 (Europe/Sarajevo), ažurira se svake sekunde.
- Raspored dana s ikonama i animacijama.
- Potvrda dolaska putem Vibera (Edvin / Šejla), kopiranje poruke, SMS kao rezervna opcija.
- Dodaj u kalendar (Google Kalendar i .ics za iPhone/Outlook), Podijeli pozivnicu.
- Zlatne čestice, cvjetni ukrasi, animirana srca, potpuno responzivno.

## Muzika

Pjesma **Zdravko Čolić – Jedina** je ugrađena: `public/audio/jedina.mp3` (128 kbps, 3:25).
Kreće kada gost dodirne pečat, ponavlja se, a dugme dolje desno je uključuje/isključuje.

Za zamjenu pjesme stavite novi fajl pod istim nazivom (`jedina.mp3` ili `jedina.m4a`) u `public/audio/`
i ponovo pokrenite `npm run build`. Ako fajla nema, dugme za muziku se ne prikazuje.

## Izmjena podataka

Svi tekstovi i podaci su u `src/config.js`:

- datum, brojevi telefona, raspored,
- `mapsQuery` – upišite tačnu adresu (npr. `"Branilaca 10, Grad"`) ili Google Maps link i automatski se pojavi dugme **Otvori mapu**. Trenutno nijedna lokacija nema naveden grad, pa su dugmad za mapu isključena.

## Lokalno pokretanje

Potreban je Node.js 20.19 ili noviji.

```bash
npm install
npm run dev       # razvojni server
npm run build     # production build u folder dist/
npm run preview   # pregled builda
```

## Postavljanje na Netlify

### Opcija A – povezivanje s GitHubom (preporučeno)

1. Na <https://app.netlify.com> kliknite **Add new site → Import an existing project → GitHub**.
2. Odaberite ovaj repository.
3. Postavke se čitaju iz `netlify.toml` automatski:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Kliknite **Deploy**. Svaka nova izmjena na GitHubu automatski se objavljuje.

### Opcija B – ručno (drag & drop)

1. Raspakujte `pozivnica-dist.zip` (ili sami pokrenite `npm install` i `npm run build`).
2. Na <https://app.netlify.com/drop> prevucite **sadržaj foldera `dist`** (folder u kojem je `index.html`).
3. Ne prevlačite izvorni kod (`src`, `package.json`...) – za ručno postavljanje treba samo `dist`.

### Naziv stranice

U Netlify postavkama (**Site configuration → Change site name**) možete postaviti npr. `sejla-i-edvin.netlify.app`.

## Viber – kako radi potvrda

Viber ne dozvoljava da link istovremeno odabere primaoca **i** upiše poruku. Zato:

1. Gost popuni formu i klikne **POTVRDI DOLAZAK**.
2. Klikne **Pošalji Edvinu na Viber** ili **Pošalji Šejli na Viber** – poruka se automatski kopira i otvara se Viber razgovor s tim brojem.
3. Gost zalijepi poruku i pošalje je.

Rezervne opcije: dugme **Kopiraj poruku**, Viber s već upisanom porukom (gost sam bira primaoca) i **SMS**.
Pozivnica nigdje ne tvrdi da je potvrda poslana – slanje završava gost u Viberu.
