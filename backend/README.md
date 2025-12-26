# Backend – Supabase + Render (MVP)

Tento návod vás provede: založením DB ve Supabase, nahráním migrací, lokálním během a deployem na Render. Vše je připravené pro Expo Go (API musí být přes HTTPS).

## 1) Supabase (Postgres + Storage)
1. Na https://supabase.com vytvořte projekt (EU region, free tier).
2. V menu **Database → Connection string** si uložte Postgres URI (postgresql://…).
3. V SQL editoru spusťte migraci z `backend/migrations/V1__init.sql` (zahrnuje refresh tokeny).
4. V menu **Storage** založte bucket `uploads` (Private).
5. V menu **Settings → API** zkopírujte **Service role key** – použije pouze backend (nikdy klient).

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
- `backend/migrations/V1__init.sql` – init migrace s tabulkami a refresh tokeny.


