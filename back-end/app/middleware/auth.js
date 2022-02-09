//----- Middleware d'authorisation, validation des token -----//

// Module d'échange sécurisé de token
const jwt = require('jsonwebtoken');
// Module de stockage de la configuration dans l'environnement
const dotenv = require('dotenv');
require('dotenv').config()


// Exportation fonction du middleware
/*module.exports = (req, res, next) => {
    try {
        // Récupération du token dans le headers authorization et décodage 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);

        // Récupération userId du token déchiffré et comparaison avec userId
        const userId = decodedToken.userId;

        req.auth = { userId };

        // Comparaison userId de la requête et userId du token
        if (req.body.userId && req.body.userId !== userId) {

            throw '403: Unauthorized request';
        } else {
            next(); // si user authentifié, on passe à l'exécution
        }
    } catch (error) {
        res.status(401).json({
            error: error,
            message: "Requête non authentifiée !"
        });
    }
};*/

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        console.log(userId, "USEEEEEEEEEEEEEEEEEEER");
        console.log(isAdmin, "ADMIIIIIIIIIIIIIIn");
        req.auth = { userId, isAdmin };

        if ((req.body.userId && req.body.userId == userId) || isAdmin === true) {
            next();
        } else {
            throw 'Forbidden request'
        }
    } catch (error) {
        res.status(403).json({ error: error.message });
    }

};

