# Maruthi Toolings Website

Full-stack company website for **Maruthi Toolings** — a precision plastic injection mould manufacturer based in Hyderabad, India.

## Project Structure

```
MaruthiTOOLS/
├── frontend/          # React + Vite (client)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── ...
│   └── package.json
├── backend/           # Express + MongoDB (server)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── config/
│   │   └── ...
│   └── package.json
├── .env               # Environment variables (shared)
└── package.json       # Root orchestrator
```

## Getting Started

### Install Dependencies

```bash
npm run install:all
```

### Development

Run both frontend and backend simultaneously:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:frontend   # Vite dev server (default: http://localhost:5173)
npm run dev:backend    # Express API server (default: http://localhost:5000)
```

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
