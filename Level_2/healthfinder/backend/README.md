# Healthfinder Backend

Simple Express API to serve facility data for the Healthfinder frontend.

Install and run:

```bash
cd backend
npm install
npm run dev   # requires nodemon, or npm start
```

Endpoints:

- `GET /facilities` - list facilities, supports `search`, `type`, `city` query params
- `GET /facilities/:id` - get single facility
