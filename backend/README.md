# Backend – Supabase + Render (MVP)

Tento návod vás provede: založením DB ve Supabase, nahráním migrací, lokálním během a deployem na Render. Vše je připravené pro Expo Go (API musí být přes HTTPS).

## 1) Postgres
- Pro Render použijte **Managed Postgres** (internal URL). Nastavte:
  - `SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:5432/<db>?sslmode=require`
  - `SPRING_DATASOURCE_USERNAME=<user>`
  - `SPRING_DATASOURCE_PASSWORD=<pass>`
- Pokud používáte Supabase, platí stejné hodnoty (jen jiný host).

### Převod connection string pro Spring
Supabase dává např. `postgresql://postgres:heslo@db.supabase.co:5432/postgres`. Pro Spring nastavte:
- `SPRING_DATASOURCE_URL=jdbc:postgresql://db.supabase.co:5432/postgres?sslmode=require`
- `SPRING_DATASOURCE_USERNAME=postgres`
- `SPRING_DATASOURCE_PASSWORD=heslo`

## 2) Lokální běh (docker-compose)
1. Vytvořte `.env.local` v `backend/` (viz příklad níže).
2. `docker compose --env-file .env.local up --build`
3. API poběží na `http://localhost:8080`, Postgres na portu 5432.

Příklad `.env.local`:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/domluveno
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=change-me
STORAGE_BUCKET=uploads
STORAGE_SERVICE_ROLE_KEY=change-me
ALLOWED_ORIGINS=*
```

## 3) Render (deploy backendu)
1. Pushněte repo na GitHub.
2. Na https://render.com → New → Web Service → připojte repo.
3. Environment: `Docker`. Auto-deploy z vybrané branche.
4. Nastavte env proměnné (viz níže).
5. Deploy spustí build a vygeneruje HTTPS URL (např. `https://appname.onrender.com`). To vložte do Expo jako `API_BASE_URL`.

### Env proměnné pro Render
- `SPRING_DATASOURCE_URL=jdbc:postgresql://db.supabase.co:5432/postgres?sslmode=require`
- `SPRING_DATASOURCE_USERNAME=postgres`
- `SPRING_DATASOURCE_PASSWORD=<supabase heslo>`
- `JWT_SECRET=<dlouhý náhodný string>`
- `STORAGE_BUCKET=uploads`
- `STORAGE_SERVICE_ROLE_KEY=<supabase service role key>`
- `ALLOWED_ORIGINS=*` (pro vývoj; později omezte)
- `PORT=8080` (Render ji předá, v Dockerfile se exponuje 8080)

## 4) Expo Go (client)
- Do `app.config.ts` dejte `API_BASE_URL` = Render HTTPS URL.
- CORS na backendu povolte pro toto URL (nebo `*` během vývoje).
- Tokeny ukládejte přes `expo-secure-store`, ne AsyncStorage.
- Upload fotek: `expo-image-picker` → PUT na podepsanou URL z backendu → metadata uložit přes API.

## 5) Bezpečnostní poznámky pro MVP
- Vynucujte TLS (Supabase + Render ho mají).
- Hesla hashovat (bcrypt/argon2), krátká exp. access tokenu, refresh tokeny uložené v DB (tabulka `refresh_tokens`).
- Idempotency-Key pro důležité POST (viz `request_log`).
- Bucket `uploads` musí zůstat private; přístup přes podepsané URL.

## 6) Struktura souborů zde
- `backend/application.yml` – šablona konfigurace pro Spring Boot (používá env proměnné).
- `backend/Dockerfile` – multi-stage build (Gradle → JRE).
- `backend/docker-compose.yml` – lokální Postgres + app.
- `backend/src/main/resources/db/migration` – migrace (V1 schéma, V2 seed kategorií).
- `backend/src/main/kotlin/com/domluveno` – zdrojáky (api, security, domain).

## 7) API (MVP)
- `GET /` – status
- `GET /health` – healthcheck
- Auth: `POST /auth/register`, `POST /auth/login` (JWT v response)
- Kategorie: `GET /categories`
- Poptávky: `GET /requests` (volitelně ?categoryId), `GET /requests/{id}`, `POST /requests`
- Nabídky: `POST /requests/{id}/offers`, `POST /offers/{id}/accept`, `POST /offers/{id}/reject`
- Konverzace: `POST /conversations` (requestId, withUserId)
- Zprávy: `GET /conversations/{id}/messages?after=ISO_INSTANT`, `POST /conversations/{id}/messages`

Poznámky:
- Auth je stateless JWT; předávej `Authorization: Bearer <token>`.
- Pro MVP zatím minimální validace vlastnictví (není vynucena). Pro produkci doplnit kontroly.


