# Production env kintamieji – kaip nustatyti ir patikrinti

Prieš paleidžiant svetainę live, nustatykite šiuos kintamuosius **production** aplinkoje (pvz. Vercel → Project → Settings → Environment Variables).

---

## 1. Domenas (NEXT_PUBLIC_SITE_URL)

**Kam:** canonical URL, sitemap.xml, OpenGraph, robots.txt.

| Kintamasis             | Pvz. reikšmė           | Kur naudojama                    |
| ---------------------- | ---------------------- | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://samogitia.lt` | layout.js, sitemap.js, robots.js |

**Kaip nustatyti (Vercel):**

- Settings → Environment Variables → Add:
  - Name: `NEXT_PUBLIC_SITE_URL`
  - Value: `https://samogitia.lt` (arba jūsų tikras domenas)
  - Environment: Production (ir Preview, jei norite)

**Kaip patikrinti po deploy:**

- Atidarykite `https://jusu-domenas.lt/sitemap.xml` – URL turi būti su jūsų domenu.
- Puslapio šaltinyje (View Source) `<link rel="canonical">` turi rodyti jūsų domeną.

---

## 2. Resend (kontaktų forma)

**Kam:** el. laiškų siuntimas iš kontaktų formos.

| Kintamasis         | Aprašymas                         |
| ------------------ | --------------------------------- |
| `RESEND_API_KEY`   | Resend API raktas (re\_...)       |
| `CONTACT_TO_EMAIL` | Adresas, į kurį siunčiami laiškai |

**Kaip gauti Resend raktą:**

1. [resend.com](https://resend.com) – prisijunkite / sukurkite paskyrą.
2. API Keys → Create API Key → nukopijuokite raktą (re\_...).
3. Domains – pridėkite savo domeną ir patvirtinkite (kad „from“ būtų jūsų domenas).

**Kaip nustatyti (Vercel):**

- `RESEND_API_KEY` = jūsų Resend API raktas (ne NEXT*PUBLIC*, kad neatsidurtų kliente).
- `CONTACT_TO_EMAIL` = pvz. `samogitiagroup@gmail.com`.

**Kaip patikrinti:**

- Užpildykite ir išsiųskite kontaktų formą production svetainėje.
- Turėtumėte gauti laišką į `CONTACT_TO_EMAIL`. Jei ne – žiūrėkite Vercel → Logs arba Resend dashboard klaidas.

---

## 3. Sanity (turinys)

**Kam:** puslapių turinys (paslaugos, projektai, nuoma ir kt.).

| Kintamasis                      | Aprašymas                      |
| ------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity projekto ID (dashboard) |

**Kaip rasti:**

1. [sanity.io](https://sanity.io) → savo projektas.
2. Project ID matosi URL arba Project Settings → Project ID.

**Kaip nustatyti (Vercel):**

- Name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Value: jūsų Sanity project ID (pvz. `abc123de`).
- Environment: Production (ir Preview).

**Kaip patikrinti:**

- Atidarykite production svetainę – paslaugos, projektai, nuoma turi krautis iš Sanity (ne „Informacija ruošiama“ visur). Jei viskas tuščia – tikrinkite Project ID ir CORS Sanity projekte (Hosting → CORS origins: pridėkite `https://jusu-domenas.lt`).

---

## 4. Google Analytics (neprivaloma)

| Kintamasis                      | Aprašymas               |
| ------------------------------- | ----------------------- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 matavimo ID (G-...) |

Įsijungia tik po slapukų sutikimo („Sutinku“). Jei nenustatysite – analitika tiesiog neveiks, svetainė veiks normaliai.

---

## Santrauka – minimalus production set

| Kintamasis                      | Būtina?                    | Pvz.                 |
| ------------------------------- | -------------------------- | -------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Taip                       | https://samogitia.lt |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Taip                       | jūsų_sanity_id       |
| `RESEND_API_KEY`                | Taip (jei naudojate formą) | re\_...              |
| `CONTACT_TO_EMAIL`              | Taip (jei naudojate formą) | el@pastas.lt         |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Ne                         | G-...                |

Po pakeitimų padarykite **redeploy** (Vercel: Deployments → … → Redeploy), kad nauji env būtų įkelti.
