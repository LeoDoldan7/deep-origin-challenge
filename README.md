# 🔗 Deep Origin URL Shortener Challenge – by Leo Doldan

This project is a full-stack URL shortener built with **React + TypeScript** on the frontend and **Node.js + NestJS + Prisma** on the backend. It allows users to sign up, shorten URLs, customize slugs, track visits, and manage their personal dashboard.

---

## ✅ Features Implemented

### ✅ Base Requirements

- [x] Build a React application that allows you to enter a URL  
- [x] When the form is submitted, return a shortened version of the URL  
- [x] Save a record of the shortened URL to a database  
- [x] Ensure the slug of the URL is unique  
- [x] Redirect to the original URL when the short URL is accessed  
- [x] Display a 404 Not Found page for invalid slugs  
- [x] Display a list of all the user's saved URLs  

### 🌟 Extra Credit

- [x] Add support for accounts so people can view the URLs they have created  
- [x] Validate the URL provided is an actual URL (frontend + backend)  
- [x] Display an error message if the URL is invalid  
- [x] Make it easy to copy the shortened URL to the clipboard  
- [x] Allow users to modify the slug of their URL  
- [x] Track visits to the shortened URL  
- [x] Add a dashboard showing how popular your URLs are  
- [x] Add rate-limiting to prevent bad actors  
- [x] Build a Docker image for the application  

---

## 📦 Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query  
- **Backend**: Node.js, NestJS, Prisma, PostgreSQL, JWT, Class Validator  
- **Database**: PostgreSQL  
- **Auth**: Email + Password, JWT-based (no verification for simplicity)  
- **DevOps**: Docker & Docker Compose  

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18  
- [Docker](https://www.docker.com/) & Docker Compose

### Running with Docker (Recommended)

```bash
docker-compose up --build
```

This starts both the backend and frontend with appropriate environment configuration.

### Running Locally

```bash
# Terminal 1
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev

# Terminal 2
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000  
Backend API: http://localhost:8080/api/v1

---

## 📝 Notes

Some security or production concerns (e.g., email verification, strong password policies) were skipped intentionally to focus on functionality. Rate-limiting is simple and in-memory for demonstration.

Enjoy!