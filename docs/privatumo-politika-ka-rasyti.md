# Ar reikia privatumo politikos ir ką joje rašyti?

## Ar reikia privatumo politikos?

**Taip**, jei:

- Turite **kontaktų formą** (renkate vardą, el. paštą, žinutę) – tai asmens duomenų apdorojimas.
- Naudojate **slapukus** (įskaitant analitiką) – BDAR ir el. prekybos taisyklės reikalauja informuoti ir gauti sutikimą.
- Veikiate **Lietuvoje / ES** – BDAR (GDPR) taikomas ir reikalauja aiškios, skaitomos informacijos apie duomenų apdorojimą.

Net jei duomenų renkate nedaug, viena puslapyje pateikta privatumo politika padaro svetainę skaidresnę ir atitinkančią gaires.

## Ką įprastai rašyti privatumo politikoje

1. **Kas esate** – įmonės pavadinimas, kontaktai (adresas, el. paštas, telefonas).
2. **Kokius duomenis renkate** – pvz. kontaktų formos laukai (vardas, pavardė, el. paštas, žinutė), slapukai (būtini / analitikos), techninė informacija (IP, naršyklė), jei naudojate.
3. **Kodėl ir kaip naudojate** – atsakyti į užklausas, teikti paslaugas, pagerinti svetainę (analitika). Nurodyti teisėtą pagrindą (sutikimas, sutarties vykdymas ir pan.).
4. **Kiek laiko saugote** – pvz. „kol reikia atsakyti į užklausą“ arba konkretūs terminai; slapukų galiojimo laikai.
5. **Su kuo dalinatės** – ar duomenų neperduodate trečiesiems, ar naudojate el. pašto paslaugą / hostingą (nurodyti, kad jie veikia kaip apdorotojai, jei taikoma).
6. **Jūsų teisės (BDAR)** – teisė gauti kopiją, taisyti, trinti, apriboti apdorojimą, nesutikti, atšaukti sutikimą, skųstis VDAI. Kaip pasinaudoti (pvz. rašyti į jūsų el. paštą).
7. **Slapukai** – kokius naudojate (būtini / analitika), kaip sutikti ar atsisakyti (nuoroda į pranešimą svetainėje ar nustatymus).
8. **Pakeitimai** – kad politiką galite atnaujinti, apie reikšmingus pakeitimus pranešite (pvz. svetainėje).

## Šiame projekte

- **`/privatumas`** – jau sukurta puslapis su šablonu lietuviškai (1–7 punktai). Galite redaguoti **`app/privatumas/page.js`**: pakeisti tekstą, pridėti savo įmonės pavadinimą, kontaktus, konkretų el. paštą skundams.
- **Slapukų pranešimas** – turi „Sutinku“ ir „Atšaukti“; pasirinkimas išsaugomas ir naudojamas, kad analitika įsijungtų tik su sutikimu (žr. **`components/analytics-gate.js`** ir **`lib/cookie-consent.js`**).
- **Google Analytics** – jei norite GA, į **`.env.local`** įrašykite `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`; analitika įsijungs tik po „Sutinku“.

Jei norite, kad politiką tvirtintų teisininkas ar konsultantas, galite perduoti jiems šio puslapio turinį kaip pagrindą.
