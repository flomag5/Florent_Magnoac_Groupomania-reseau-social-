//--- SERVER ---//
/* Serveur pour écouter les requêtes frontend et servir une réponse en retour */

// Import package http comme outils pour créer server
const http = require('http');

// Import de l'application express
const app = require('./app');
/*
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
    origin: process.env.ORIGIN,
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

/*
// Port découte des requêtes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
*/

// Retourne un port valide qu'il soit sous forme de numéro ou chaîne de caractères
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
// Réglage du port d'écoute des requêtes par l'application
app.set('port', port);

// Recherche et support des erreurs de manière appropriée
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Création du server
const server = http.createServer(app);
// Ecouteur d'évènements, port sur lequel le serveur s'exécute
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    console.log('Listening on ' + bind);
});
// Ecoute et attente des requêtes envoyées
server.listen(port);