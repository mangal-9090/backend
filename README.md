# 🛠 Event Platform - Backend (Express + MongoDB)

This is the **Node.js Express backend** for the **Event Platform**, providing **user authentication, event management, and real-time attendee tracking**.

## 🚀 Features
- 🔹 **User Authentication** (Register, Login, JWT-based)
- 🔹 **Event CRUD API** (Create, Read, Update, Delete)
- 🔹 **MongoDB Atlas** for persistent data storage
- 🔹 **WebSockets (Socket.IO)** for **real-time attendee tracking**
- 🔹 **CORS enabled** for frontend communication

## 📦 Tech Stack
- 🚀 **Node.js + Express**
- 🗄 **MongoDB (Mongoose)**
- 🔐 **JWT Authentication**
- 🌍 **Socket.IO for real-time updates**
- 🛠 **Deployed on Render**

## 📂 Project Structure
backend/ │── models/ # Database schemas (User, Event) │── routes/ # API routes (Auth, Events) │── config/ # Environment config │── server.js # Main backend entry point │── package.json # Dependencies │── .env.example # Sample environment variables