# 🚀  School Management System

A full-stack **School Management System** built using the **MERN Stack** with **TypeScript** for scalability and type safety.

---

## 🌐 Live Demo

👉 **Frontend Live:**
🔗 [Open SchoolFlow App](https://gridedu.netlify.app/)

> Experience the live application with full UI and features deployed on Netlify.

---

## 🧩 Tech Stack

* **Frontend:** React + Vite + TypeScript
* **Backend:** Node.js + Express + TypeScript
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT

---

## 📁 Project Structure

This project follows a **monorepo structure**:

```
root/
│
├── Backend/      # Express server (TypeScript)
├── frontend/     # React app (Vite + TypeScript)
```

---

## 🛠️ Local Setup Guide

### 🔹 1. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/` and add:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

---

### 🔹 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/` and add:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```


## 🌐 Environment Variables

### Backend (`Backend/.env`)

* `PORT`
* `MONGO_URI`
* `JWT_SECRET`
* `NODE_ENV`

### Frontend (`frontend/.env`)

* `VITE_API_URL`

---

## ⚡ Features

* 🔐 User Authentication (JWT)
* 🎓 Student Management
* 📋 Task Management
* 🔒 Secure REST APIs
* 📱 Responsive UI

---

## 🧠 Notes

* Built fully with **TypeScript (Frontend + Backend)**
* Uses modern deployment practices (Render + Netlify)
* Make sure environment variables are properly configured
