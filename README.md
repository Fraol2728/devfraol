<div align="center">

# 🚀 Niladri Chatterjee — Portfolio

[![Live](https://img.shields.io/badge/Live-niladri1.vercel.app-black?style=for-the-badge&logo=vercel)](https://niladri1.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

A full-stack personal portfolio with a **React + Vite** frontend, **Node.js + Express** backend, real-time visitor tracking, and a contact form — all backed by **MongoDB Atlas**.

</div>

---

## ✨ Features

- 🎨 &nbsp;Dark UI with 3D WebGL background (OGL)
- 📊 &nbsp;Real-time visitor tracking — browser, OS, device, pages visited
- 💬 &nbsp;Contact form with spam filtering, rate limiting & validation
- 🔍 &nbsp;`Ctrl+K` smart search across all pages
- 📈 &nbsp;Live GitHub repo count via SWR
- 🤖 &nbsp;Full SEO — sitemap, OG tags, JSON-LD, PWA manifest
- 🔐 &nbsp;Admin API key protected endpoints

---

## 🗂️ Project Structure

```
Personal-portfolio/
├── client/          # React + Vite frontend
└── server/          # Express + MongoDB backend
```

---

## ⚙️ Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

---

### 1. Clone the repo

```bash
git clone https://github.com/niladri-1/Personal-portfolio.git
cd Personal-portfolio
```

---

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev
```

#### `server/.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio
FRONTEND_URL=http://localhost:5173
ADMIN_API_KEY=your_strong_random_secret_here
```

---

### 3. Frontend Setup

```bash
cd client
npm install
cp .env.example .env   # fill in your values
npm run dev
```

#### `client/.env`

```env
VITE_GITHUB_USERNAME=your_github_username
VITE_API_URL=http://localhost:5000
VITE_TRACKER_API_URL=http://localhost:5000/api/v1
```

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/contact` | — | Submit contact form |
| `GET` | `/api/v1/contact` | Admin key | Get all messages |
| `POST` | `/api/v1/visitors/track` | — | Track page visit |
| `POST` | `/api/v1/visitors/heartbeat` | — | Keep session alive |
| `GET` | `/api/v1/visitors` | Admin key | Get all visitor data |
| `GET` | `/api/v1/health` | — | Server health check |

**Admin routes** require the header:
```
X-Admin-Key: your_admin_api_key
```

---

## 🚀 Deployment

> Deploy **server first**, then client.

**Project 1 — Server**

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Framework | Other |
| Build Command | `npm install` |
| Output Directory | *(leave blank)* |

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
FRONTEND_URL=http://localhost:5173
ADMIN_API_KEY=generate_a_strong_random_string_here
```

**Project 2 — Client**

| Setting | Value |
|---|---|
| Root Directory | `client` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

```env
VITE_GITHUB_USERNAME=your_github_username
VITE_API_URL=http://localhost:5000
VITE_TRACKER_API_URL=http://localhost:5000/api/v1
```

---

## 📞 Contact

[![Email](https://img.shields.io/badge/Email-code.niladri%40gmail.com-red?style=flat-square&logo=gmail)](mailto:code.niladri@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-niladri1-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/niladri1)
[![GitHub](https://img.shields.io/badge/GitHub-niladri--1-black?style=flat-square&logo=github)](https://github.com/niladri-1)

---

<div align="center">
  <sub>Built with ❤️ by Niladri Chatterjee</sub>
</div>