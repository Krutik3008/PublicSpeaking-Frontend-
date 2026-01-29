# 🎤 SpeakUp - Public Speaking Confidence App

## Walkthrough & Documentation

A full-stack MERN application that helps people **safely and confidently speak up in public situations** without fear, shame, or conflict.

---

## ✅ Project Completed Successfully

### What Was Built

**Backend (Node.js + Express + MongoDB):**
- Complete REST API with 4 models: User, Scenario, ConfidenceScript, Tip
- JWT authentication system
- 4 controllers with full CRUD operations
- 3 middleware layers (auth, error handling, validation)
- Seed data script with 6 scenarios, 18 scripts, and 16 community tips

**Frontend (React + Vite):**
- Modern, responsive design with calming color palette
- 7 pages: Home, Scenarios, Script Generator, Tips, Login, Register, Profile
- 6 reusable components: Navbar, Footer, Button, Card, Modal, Loading
- Context-based authentication
- API service layer with axios

---

## 🚀 How to Run

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally on port 27017)

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on: **http://localhost:5000**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

### Seed Database (Optional)

To populate the database with sample scenarios, scripts, and tips:

```bash
cd backend
npm run seed
```

---

## 📁 Project Structure

```
free/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # User authentication
│   │   ├── scenarioController.js # Public speaking scenarios
│   │   ├── scriptController.js   # Confidence scripts
│   │   └── tipController.js      # Anonymous tips
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── errorMiddleware.js    # Global error handler
│   │   └── validateMiddleware.js # Input validation
│   ├── models/
│   │   ├── User.js
│   │   ├── Scenario.js
│   │   ├── ConfidenceScript.js
│   │   └── Tip.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── scenarioRoutes.js
│   │   ├── scriptRoutes.js
│   │   └── tipRoutes.js
│   ├── utils/
│   │   ├── seedData.js
│   │   └── responseHelper.js
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/common/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Modal.jsx
    │   │   └── Loading.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Scenarios.jsx
    │   │   ├── ScriptGenerator.jsx
    │   │   ├── Tips.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Profile.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   └── helpers.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (Protected) |
| PUT | `/api/auth/profile` | Update profile (Protected) |

### Scenarios
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/scenarios` | Get all scenarios |
| GET | `/api/scenarios/:id` | Get scenario by ID |
| GET | `/api/scenarios/categories` | Get all categories |
| GET | `/api/scenarios/category/:cat` | Get by category |
| GET | `/api/scenarios/search?q=` | Search scenarios |

### Scripts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/scripts` | Get all scripts |
| GET | `/api/scripts/scenario/:id` | Get scripts for scenario |
| POST | `/api/scripts/generate` | **Generate quick script** |
| GET | `/api/scripts/saved` | Get saved scripts (Protected) |
| POST | `/api/scripts/save/:id` | Save script (Protected) |

### Tips
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tips` | Get all tips |
| GET | `/api/tips/categories` | Get tip categories |
| GET | `/api/tips/category/:cat` | Get tips by category |
| POST | `/api/tips` | Add new tip (Anonymous) |
| POST | `/api/tips/:id/like` | Like a tip |

---

## 🎯 Core Features

### 1. Quick Script Generator (Main Feature)
The core functionality that answers: **"How can I speak up without fear right now?"**

- User describes their situation
- Chooses a tone (Calm, Assertive, Friendly, Firm)
- Gets an instant script with:
  - Opening line
  - Body message
  - Closing line
  - Quick reminders
  - Body language tips
  - What to avoid

### 2. Scenario Browser
Pre-built scenarios for common situations:
- Billing Issues (overcharges, wrong bills)
- Unfair Treatment (queue cutting, rude behavior)
- Misinformation (wrong announcements)
- Safety Concerns (hazards, violations)
- Service Problems (poor service)

### 3. Community Tips
Anonymous wisdom from others who've learned to speak up:
- Categories: General, Body Language, Tone, Timing, Mindset, Preparation
- Like/upvote helpful tips
- Submit new tips anonymously

### 4. User Accounts
- Save favorite scripts
- Quick access to personal collection
- No login required for core features

---

## 🎨 Design Features

- **Calming Color Palette**: Soft blues, purples, and warm neutrals
- **Modern Typography**: Inter font family
- **Smooth Animations**: Fade-ins, floating elements, pulses
- **Mobile-First**: Responsive design for on-the-go situations
- **Encouraging Tone**: Supportive, non-judgmental language

---

## 📋 Ethical Guidelines (Built-In)

> ❌ **No exposing or shaming anyone**
> ❌ **No recording features**
> ❌ **No conflict escalation**
> ✅ **Focus only on confidence and clarity**

---

## 🔧 Environment Variables

Backend `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/speakup-db
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
```

---

## 📝 Notes

1. **MongoDB Required**: The backend requires MongoDB to be running. Start MongoDB before running the backend.

2. **API Proxy**: The Vite config proxies `/api` requests to the backend (port 5000).

3. **No Login Required**: Core features (script generator, scenarios, tips) work without authentication.

4. **Seed Data**: Run `npm run seed` in the backend folder to populate sample data.

---

## 🎉 Ready to Use!

Open **http://localhost:5173** in your browser to start using the app!

The app helps users:
1. Browse common speaking situations
2. Get instant scripts tailored to their scenario
3. Learn from community tips
4. Build confidence to speak up in public
