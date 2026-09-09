# 🔐 User Authentication System — MERN Stack

A complete, production-ready User Authentication System built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring JWT-based authentication, bcrypt password hashing, protected routes, and a sleek dark UI.

---


## 📁 Folder Structure

```
User Authication System/
├── backend/
│   ├── controllers/
│   │   └── authController.js     # Register, Login, Profile logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   └── User.js               # Mongoose User schema
│   ├── routes/
│   │   └── authRoutes.js         # API route definitions
│   ├── .env                      # Environment variables (do NOT commit)
│   ├── .env.example              # Template for environment variables
│   ├── package.json
│   └── server.js                 # Express app entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── authAPI.js        # Axios API calls
│   │   ├── components/
│   │   │   └── PrivateRoute.js   # Frontend route guard
│   │   ├── context/
│   │   │   └── AuthContext.js    # Global auth state (React Context)
│   │   ├── pages/
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── Login.js          # Login page
│   │   │   └── Dashboard.js      # Protected dashboard page
│   │   ├── App.js                # Router + layout
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles
│   └── package.json
│
└── README.md
```

---


# ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier is enough)


---

# 🚀 Setup & Installation

### Step 1 — Clone / Open the project

Open the `User Authication System` folder in your terminal.

---

### Step 2 — Configure the Backend Environment

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Open the `.env` file and update your **MongoDB Atlas connection string**:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/authdb?retryWrites=true&w=majority
   JWT_SECRET=mySecretJWTKey2024AuthSystem
   ```

   > **How to get your MONGO_URI:**
   > 1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
   > 2. Create a free cluster (if you haven't already)
   > 3. Click **Connect** → **Connect your application**
   > 4. Copy the connection string and replace `<username>` and `<password>`
   > 5. Also go to **Network Access** → Add `0.0.0.0/0` to allow connections

---

### Step 3 — Install Backend Dependencies

```bash
cd backend
npm install
```

---

### Step 4 — Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

### Step 5 — Run the Backend Server

Open a terminal in the `backend` folder:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Atlas connected successfully
🚀 Server running on http://localhost:5000
```

---

### Step 6 — Run the Frontend

Open a **new** terminal in the `frontend` folder:

```bash
cd frontend
npm start
```

The React app will open at **http://localhost:3000**

---

## 🌐 API Endpoints

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| POST   | `/api/auth/register`  | Register a new user      | ❌ No         |
| POST   | `/api/auth/login`     | Login and get JWT token  | ❌ No         |
| GET    | `/api/auth/profile`   | Get current user profile | ✅ Yes (JWT)  |

### Example: Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Example: Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Example: Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer <your_jwt_token>
```

---

## 🔑 How Authentication Works

```
1. User registers  →  Password is hashed with bcrypt  →  User saved to MongoDB
2. User logs in    →  bcrypt compares password hash   →  JWT token generated & returned
3. Token stored    →  localStorage saves token         →  Sent in every protected request
4. Protected route →  authMiddleware verifies JWT      →  Access granted or 401 returned
5. Logout          →  Token removed from localStorage  →  User redirected to login
```

---

## 🛡️ Security Features

| Feature | Implementation |
|---------|---------------|
| Password Hashing | `bcryptjs` with 10 salt rounds |
| Authentication | JWT (JSON Web Token), expires in 7 days |
| Protected Routes | `authMiddleware.js` verifies token on every private request |
| Password hidden | `.select('-password')` in profile query |
| Duplicate email | Checked at controller + unique index at schema level |
| Input Validation | Both frontend (React) and backend (Express) |

---

## 📦 Tech Stack & Dependencies

### Backend
| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `mongoose` | MongoDB ODM |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT generation & verification |
| `dotenv` | Environment variable management |
| `cors` | Cross-Origin Resource Sharing |
| `nodemon` | Auto-restart during development |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP client for API calls |
| `bootstrap` | CSS framework |

---

## 🖥️ Pages & Features

### `/register` — Register Page
- Input: Name, Email, Password, Confirm Password
- Real-time password strength indicator
- Show/hide password toggle
- Client + server-side validation
- Error and success alert messages

### `/login` — Login Page
- Input: Email, Password
- Show/hide password toggle
- Redirects to dashboard on success
- Proper error messages for invalid credentials

### `/dashboard` — Protected Dashboard *(requires login)*
- Fetches user profile from the backend (verifies token)
- Displays: Name, Email, Member Since, User ID
- Active session badge
- Security features summary
- Logout button (clears token, redirects to login)

---

## 🧪 Testing the App

1. Go to `http://localhost:3000/register` and create an account
2. You'll be auto-redirected to the dashboard
3. Click **Logout** — you'll be sent to the login page
4. Try accessing `http://localhost:3000/dashboard` directly — you'll be redirected to login
5. Log in again — dashboard is now accessible


---

## 🐛 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| `MongoServerError: bad auth` | Check your MONGO_URI username & password |
| `Network Error` on frontend | Make sure the backend is running on port 5000 |
| `EADDRINUSE: port 5000` | Kill the process using port 5000 or change `PORT` in `.env` |
| Blank page on React | Check browser console for errors; ensure `npm install` ran |


---

## 👨‍💻 Author

Built for internship project submission.  
Stack: MongoDB Atlas · Express.js · React.js · Node.js · JWT · bcrypt · Bootstrap
