# Beauty Salon – Backend API

This is the backend for the **Beauty Salon Booking Website**, built using **Node.js**, **Express**, and **MongoDB**. It handles booking appointments, managing salon services, user authentication, and admin operations.

---

## 📁 Folder Structure

```
server/
├── node_modules/
├── src/
│   ├── controllers/    # API logic
│   ├── db/             # DB connection setup
│   ├── middlewares/    # Auth & error handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   ├── app.js          # Express app configuration
│   ├── constants.js    # App constants/configs
│   └── index.js        # Entry point
├── .env                # Environment variables
├── .gitignore
├── .prettierrc
├── .prettierignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT & bcrypt
- **Environment Management:** dotenv

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Configure environment

Create a `.env` file in the root of `/server` and add:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

### 3. Run the server

```bash
npm run dev
```

Server runs at: `http://localhost:8000`

---

## 🛡 Features

- Password hashing with `bcrypt`
- JWT-based user authentication
- Modular folder structure
- Middleware for error & auth handling

---

## 📦 Deployment Suggestions

| Layer    | Platform         |
| -------- | ---------------- |
| Backend  | Render / Railway |
| Database | MongoDB Atlas    |
| Frontend | Vercel / Netlify |

---

## 👤 Author

Made by **Rajkishor Thakur**

---
