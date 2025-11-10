const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();

// --- Sécurité globale ---
app.use(helmet()); // En-têtes HTTP sécurisées
app.use(express.json({ limit: '10kb' })); // Empêche les gros payloads
app.use(cors({ origin: 'http://localhost:3000' })); // Modifie ça si ton site a un autre domaine

// --- Limiteur de requêtes ---
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requêtes max par minute par IP
  message: 'Trop de requêtes — réessaie dans une minute.'
});
app.use(limiter);

// --- Servir les fichiers du site ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes simples ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- Port et démarrage ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur sécurisé lancé sur http://localhost:${PORT}`));
