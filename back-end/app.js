//--- Contient application Express de gestion des réponses du serveur aux requêtes ---//

// Import express pour construire API Rest
const express = require("express");

// Import middleware Express pour activer CORS avec options
const cors = require("cors");

// Import de morgan (logger http)
const morgan = require('morgan');

// Import module express-rate-limit
const rateLimit = require('express-rate-limit');

// Utilitaire pour travailler avec les chemins de fichiers et de répertoires
const path = require('path');

// Gestion des variables d'environnement
require("dotenv").config();

// Création de l'application Express
const app = express();

// Logger les requests et les responses
app.use(morgan('dev'));

// Gestion des CORS
var corsOptions = {
    origin: '*', //process.env.ORIGIN,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
};

app.use(cors(corsOptions));

// Middleware de limitation des demandes répétées à l'API ou aux endpoints
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300 // limite de requête par IP pour windowsMs
});
app.use(limiter);


// Analyse les req de type de contenu - application/json
app.use(express.json());

// idem - appli/url encoded
app.use(express.urlencoded({ extended: true }));


// Import de l'objet base de données
const db = require("./app/models");


db.sequelize.sync().then(() => {
    console.log("Re-sync db.");
});


// Gestionnaire de routage
// Configuration du serveur pour renvoyer des fichiers statiques
app.use("/images", express.static(path.join(__dirname, 'images')));

// ROUTES
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/comment.routes")(app);


// Exportation de l'application
module.exports = app;