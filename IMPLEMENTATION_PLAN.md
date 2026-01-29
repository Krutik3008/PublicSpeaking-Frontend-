# Public Speaking Confidence App - Implementation Plan

A full-stack MERN application that helps people **safely and confidently speak up in public situations** without fear, shame, or conflict.

## 🎯 Core Mission

**Answer this question instantly:** *"How can I speak up without fear right now?"*

## 📋 Key Principles

> [!IMPORTANT]
> **Ethical Guidelines Built Into Every Feature:**
> - ❌ Do NOT expose or shame anyone
> - ❌ Do NOT record people
> - ❌ Do NOT escalate conflict
> - ✅ Focus ONLY on confidence and clarity to speak up

---

## 🏗️ Project Structure

```
c:\Users\KRUTIK\Desktop\mern\free\
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # User authentication
│   │   ├── scenarioController.js # Public speaking scenarios
│   │   ├── scriptController.js   # Confidence scripts
│   │   └── tipController.js      # Anonymous tips & support
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── errorMiddleware.js    # Global error handler
│   │   └── validateMiddleware.js # Input validation
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Scenario.js           # Situation scenarios
│   │   ├── ConfidenceScript.js   # Pre-written helpful scripts
│   │   └── Tip.js                # Community tips
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── scenarioRoutes.js
│   │   ├── scriptRoutes.js
│   │   └── tipRoutes.js
│   ├── utils/
│   │   └── responseHelper.js     # Standardized responses
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Button.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   └── Footer.jsx
    │   │   ├── home/
    │   │   │   ├── Hero.jsx
    │   │   │   ├── QuickHelp.jsx
    │   │   │   └── HowItWorks.jsx
    │   │   ├── scenarios/
    │   │   │   ├── ScenarioCard.jsx
    │   │   │   └── ScenarioDetail.jsx
    │   │   └── scripts/
    │   │       ├── ScriptGenerator.jsx
    │   │       └── ScriptDisplay.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useFetch.js
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
    ├── package.json
    └── vite.config.js
```

---

## 📦 Backend Implementation

### [NEW] [db.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/config/db.js)
MongoDB connection configuration using mongoose.

---

### Models

#### [NEW] [User.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/models/User.js)
```javascript
{
  name: String,           // Display name
  email: String,          // Unique email
  password: String,       // Hashed password
  savedScripts: [ObjectId], // Favorite scripts
  createdAt: Date
}
```

#### [NEW] [Scenario.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/models/Scenario.js)
Pre-defined public speaking scenarios:
```javascript
{
  title: String,          // "Overcharged at Store"
  description: String,    // Detailed situation
  category: String,       // billing, safety, unfair-treatment, misinformation
  difficulty: String,     // easy, medium, challenging
  emotionalContext: String, // Fear type description
  suggestedScripts: [ObjectId],
  icon: String,
  createdAt: Date
}
```

#### [NEW] [ConfidenceScript.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/models/ConfidenceScript.js)
Pre-written scripts to help users speak up:
```javascript
{
  scenario: ObjectId,     // Related scenario
  openingLine: String,    // "Excuse me, I noticed..."
  bodyScript: String,     // Main message
  closingLine: String,    // Polite ending
  tone: String,           // calm, assertive, friendly
  tips: [String],         // Body language tips
  doNot: [String],        // What to avoid
  createdAt: Date
}
```

#### [NEW] [Tip.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/models/Tip.js)
Anonymous community wisdom:
```javascript
{
  category: String,       // general, body-language, tone, timing
  content: String,        // The actual tip
  likes: Number,          // Community votes
  isAnonymous: Boolean,   // Always true by default
  createdAt: Date
}
```

---

### Middlewares

#### [NEW] [authMiddleware.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/middlewares/authMiddleware.js)
- JWT token verification
- Attach user to request object
- Optional auth for guest access

#### [NEW] [errorMiddleware.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/middlewares/errorMiddleware.js)
- Global error handler
- Standardized error responses
- Development vs production error details

#### [NEW] [validateMiddleware.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/middlewares/validateMiddleware.js)
- Input validation using express-validator
- Sanitization of user inputs

---

### Controllers

#### [NEW] [authController.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/controllers/authController.js)
| Function | Description |
|----------|-------------|
| `register` | Create new user account |
| `login` | Authenticate and return JWT |
| `getProfile` | Get current user details |
| `updateProfile` | Update user information |

#### [NEW] [scenarioController.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/controllers/scenarioController.js)
| Function | Description |
|----------|-------------|
| `getAllScenarios` | List all speaking scenarios |
| `getScenarioById` | Get specific scenario with scripts |
| `getScenariosByCategory` | Filter by category |
| `searchScenarios` | Search scenarios by keyword |

#### [NEW] [scriptController.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/controllers/scriptController.js)
| Function | Description |
|----------|-------------|
| `getScriptsForScenario` | Get all scripts for a scenario |
| `generateQuickScript` | AI-like quick script based on input |
| `saveScript` | Save favorite script |
| `getSavedScripts` | Get user's saved scripts |

#### [NEW] [tipController.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/controllers/tipController.js)
| Function | Description |
|----------|-------------|
| `getAllTips` | Get community tips |
| `getTipsByCategory` | Filter tips |
| `addTip` | Submit anonymous tip |
| `likeTip` | Upvote a helpful tip |

---

### Routes

#### [NEW] [authRoutes.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/routes/authRoutes.js)
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/profile` | Protected |
| PUT | `/api/auth/profile` | Protected |

#### [NEW] [scenarioRoutes.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/routes/scenarioRoutes.js)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/scenarios` | Public |
| GET | `/api/scenarios/:id` | Public |
| GET | `/api/scenarios/category/:category` | Public |
| GET | `/api/scenarios/search` | Public |

#### [NEW] [scriptRoutes.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/routes/scriptRoutes.js)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/scripts/scenario/:scenarioId` | Public |
| POST | `/api/scripts/generate` | Public |
| POST | `/api/scripts/save` | Protected |
| GET | `/api/scripts/saved` | Protected |

#### [NEW] [tipRoutes.js](file:///c:/Users/KRUTIK/Desktop/mern/free/backend/routes/tipRoutes.js)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/tips` | Public |
| GET | `/api/tips/category/:category` | Public |
| POST | `/api/tips` | Public (anonymous) |
| POST | `/api/tips/:id/like` | Public |

---

## 🎨 Frontend Implementation

### Design Philosophy
- **Calming Colors**: Soft blues, greens, and warm neutrals
- **Instant Access**: No login required for core features
- **Mobile-First**: Works perfectly on phones (for real-time situations)
- **Encouraging Tone**: Supportive, non-judgmental language

### Core Pages

#### [NEW] [Home.jsx](file:///c:/Users/KRUTIK/Desktop/mern/free/frontend/src/pages/Home.jsx)
- Hero section with empowering message
- **"Need Help Now?"** quick action button
- Common scenarios grid (4-6 most common)
- How it works section
- Testimonials/encouragement

#### [NEW] [Scenarios.jsx](file:///c:/Users/KRUTIK/Desktop/mern/free/frontend/src/pages/Scenarios.jsx)
- Browse all speaking scenarios
- Filter by category
- Search functionality
- Click to see suggested scripts

#### [NEW] [ScriptGenerator.jsx](file:///c:/Users/KRUTIK/Desktop/mern/free/frontend/src/pages/ScriptGenerator.jsx)
- **THE CORE FEATURE**
- User describes their situation
- Instant script suggestions
- Copy-to-clipboard functionality
- Tips for delivery (tone, body language)

#### [NEW] [Tips.jsx](file:///c:/Users/KRUTIK/Desktop/mern/free/frontend/src/pages/Tips.jsx)
- Community wisdom
- Categories: General, Body Language, Tone, Timing
- Upvote helpful tips
- Submit new tips anonymously

---

## 🔐 Security & Privacy

> [!CAUTION]
> **Privacy is paramount in this app:**
> - No recording features
> - Anonymous tip submissions
> - Minimal data collection
> - No social sharing that could expose others

---

## ✅ Verification Plan

### Backend Testing
1. Test all API endpoints with Postman/Thunder Client
2. Verify JWT authentication flow
3. Test database operations

### Frontend Testing
1. Navigate all pages
2. Test script generation flow
3. Verify responsive design on mobile
4. Test without login (guest access)

### Integration Testing
1. Full user journey: Home → Scenario → Script → Copy
2. Auth flow: Register → Login → Save Script → View Saved
3. Anonymous tip submission

---

## 📝 Sample Data

The app will be seeded with common scenarios:
1. **Billing Issues** - Overcharged, wrong bill, hidden fees
2. **Unfair Treatment** - Queue jumping, rude behavior, discrimination
3. **Safety Concerns** - Unsafe conditions, rule violations
4. **Misinformation** - Wrong announcements, incorrect directions
5. **Service Problems** - Poor service, unmet expectations

Each with 2-3 script variations (calm, assertive, friendly tones).

---

## 🚀 Next Steps After Approval

1. Initialize backend project
2. Create all backend files
3. Initialize React frontend with Vite
4. Create all frontend components
5. Seed database with sample scenarios
6. Test complete flow
