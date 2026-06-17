# 🚀 FullStack App — TP 8

Application full-stack React + Express + MongoDB Atlas.

## Structure

```
fullstack-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── models/
│   │   └── User.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js
    │   ├── App.js
    │   ├── context/AuthContext.js
    │   ├── components/Navbar.js
    │   └── pages/
    │       ├── Home.js
    │       ├── Login.js
    │       ├── Register.js
    │       ├── Dashboard.js
    │       ├── Profile.js
    │       └── Users.js
    └── package.json
```

## Installation locale

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Remplir MONGO_URI et JWT_SECRET dans .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Build production

```bash
cd frontend
npm run build
```

Puis dans backend/.env :
```
NODE_ENV=production
```

Lancer : `node backend/server.js`

## API Routes

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| POST | /api/auth/register | Public | Inscription |
| POST | /api/auth/login | Public | Connexion |
| GET | /api/auth/me | Privé | Profil connecté |
| GET | /api/users | Admin | Liste utilisateurs |
| GET | /api/users/:id | Privé | Un utilisateur |
| PUT | /api/users/:id | Privé | Modifier profil |
| DELETE | /api/users/:id | Admin | Supprimer |
| GET | /api/health | Public | Santé serveur |

## Déploiement (Render)

1. Pousser sur GitHub
2. Créer un Web Service sur [render.com](https://render.com)
3. Build command : `npm install`
4. Start command : `node backend/server.js`
5. Variables d'environnement : `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`

## Technologies

- **Frontend** : React 18, React Router v6, Axios
- **Backend** : Node.js, Express 4, Mongoose
- **Base de données** : MongoDB Atlas
- **Auth** : JWT + bcryptjs
- **Sécurité** : Helmet, Rate Limiting, CORS
