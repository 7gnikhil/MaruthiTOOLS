# Maruthi Toolings Website

Full-stack company website for **Maruthi Toolings** — a precision plastic injection mould manufacturer based in Hyderabad, India.
The main motivation to build this website is to Showcase their products and their services.

Click [here](https://maruthitools-1.onrender.com/) to view the deployed website.


## Tech Stack 
```bash
React
Node.js
Express.js
MongoDB
```

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


##Screenshots 

<img width="2839" height="1519" alt="Screenshot 2026-08-20 225327" src="https://github.com/user-attachments/assets/02eb153c-8e02-47f5-8ba7-8ba513dff4af" />

<img width="2834" height="1515" alt="Screenshot 2026-08-20 225356" src="https://github.com/user-attachments/assets/e18a808d-9e66-4ef2-a504-544c999e4787" />

<img width="2843" height="1514" alt="Screenshot 2026-08-20 225441" src="https://github.com/user-attachments/assets/3c851984-10c1-435d-9554-19483d7a1538" />

<img width="2822" height="1506" alt="Screenshot 2026-08-20 225418" src="https://github.com/user-attachments/assets/12ed21a9-7ff1-4f87-ae30-9ef991296ed3" />

<img width="616" height="866" alt="Screenshot 2026-08-20 225453" src="https://github.com/user-attachments/assets/38b6235c-30c9-4d1e-9e89-ac01e557b099" />

**
