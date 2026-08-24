# Fleet Operations Platform

Scaffolded Fleet Operations and Predictive Vehicle Maintenance Platform.

Services:
- Frontend: static HTML dashboard served by nginx in Docker
- Backend: Node.js + Express API
- Database: PostgreSQL

Run locally (requires Docker):

```bash
docker compose build
docker compose up -d
```

Backend API: `http://localhost:5000/api/vehicles`
Frontend: `http://localhost:8080`

Notes: Backend currently uses an in-memory store for demo. Connect to a real Postgres by updating `backend/server.js` and `config`.
