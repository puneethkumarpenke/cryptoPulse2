# CryptoPulse

A portfolio-ready cryptocurrency market dashboard built with Next.js, React, Tailwind CSS, Redux Toolkit, Express, SQLite and CoinGecko.

## Requirements
- Node.js 18+ (Node 20 LTS recommended)
- npm
- VS Code

## Run
Open a terminal in this folder:

```powershell
npm install
npm run install:all
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000
Backend health: http://localhost:5000/api/health

The SQLite database is created automatically at:
`backend/database/crypto_pulse.db`

## Environment
Backend `.env` is included for local development. Change `JWT_SECRET` for real deployment.

Frontend uses `/api` through Next.js rewrites, so browser requests work without exposing the backend port in every component.

## Features
- Live market data
- Search and category filters
- Dashboard market overview
- Coin detail pages and charts
- Register/login with JWT
- SQLite user accounts
- Portfolio holdings
- Buy/sell transactions
- Watchlist
- Responsive professional dark UI
- Docker and GitHub Actions starter files
