# AGENTS.md

## Project shape
- Full-stack "secret message" app: Spring Boot backend in `src/main/java/message/securitymessage` and React/Vite frontend in `frontend/`.
- The product flow is one-time reveal: create a message, share `/s/{token}`, then the backend marks the record `VIEWED` or `EXPIRED` after first read.

## Backend architecture
- API entry point is `MessageController` at `/api/messages`.
- Create flow: `POST /api/messages` accepts `MessageRequest { content, expiresInMinutes }` and returns `ApiResponse<MessageResponse>` with a share link and `expiresAt`.
- Reveal flow: `POST /api/messages/reveal-by-url` expects `{ "url": "..." }`; `TokenService.extractToken()` parses only `/s/{token}` URLs.
- Persistence is JPA/PostgreSQL via `MessageEntity` (`token`, `content`, `status`, `createdAt`, `expiresAt`) and `MessageRepository`.
- `MessageServiceImpl` enforces the core business rules: 16-character random token generation, one-view semantics, and expiry checks before returning content.
- Exceptions are normalized in `GlobalExceptionHandler` into `ApiResponse` objects; the frontend depends on `status/message/data/statusCode`.

## Frontend architecture
- Routing is in `frontend/src/App.jsx`: `/` create page, `/s/:token` reveal page, `/about` docs page.
- API calls live in `frontend/src/api/messageApi.js`; it throws when `response.ok` is false or `data.status` is false.
- Shared UI lives in `frontend/src/components/` and is Tailwind-first; pages are intentionally styled with utility classes rather than CSS modules.
- UI copy is mostly Uzbek, so keep wording and tone consistent when changing labels/errors.

## Integration points
- `frontend/src/pages/CreateMessagePage.jsx` uses the backend’s returned `result.link` directly and shows the expiry with `formatDate()`.
- `frontend/src/pages/RevealMessagePage.jsx` posts `window.location.href`, so backend URL parsing must continue accepting the public share URL shape.
- CORS is limited in `WebConfig` to `http://localhost:5173` and `http://localhost:3000` for `/api/**`.
- Reverse proxying is handled by `nginx/default.conf`, which forwards `/` to the frontend and `/api/` to the backend.

## Local workflows
- Backend: `./mvnw test` for verification, `./mvnw spring-boot:run` for local API work.
- Frontend: `cd frontend && npm install`, then `npm run dev`, `npm run build`, or `npm run lint`.
- Docker: root `Dockerfile` builds the backend; `frontend/Dockerfile` builds the SPA with `VITE_API_BASE_URL` at build time.
- Environment variables used by the app: `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `APP_BASE_URL`, and `VITE_API_BASE_URL`.

## Repo-specific caution
- `docker-compose.yml` describes postgres/backend/frontend/nginx, but the backend build context currently points at `./message` even though the Java backend lives at the repository root; verify that before relying on compose.

