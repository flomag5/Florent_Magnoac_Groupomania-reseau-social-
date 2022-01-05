//--- SERVEUR ---//

// Import express pour construire API Rest
const express = require("express");

// Import middleware Express pour activer CORS avec options
const cors = require("cors");

// Utilitaire pour travailler avec les chemins de fichiers et de répertoires
const path = require('path');

// Gestion des variables d'environnement
require("dotenv").config()

const app = express();

var corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
};

app.use(cors(corsOptions));

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


// Port découte des requêtes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
