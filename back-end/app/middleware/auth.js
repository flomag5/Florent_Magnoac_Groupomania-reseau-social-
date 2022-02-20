//----- Middleware d'authorisation, validation des token -----//

// Module d'échange sécurisé de token
const jwt = require('jsonwebtoken');
// Module de stockage de la configuration dans l'environnement
const dotenv = require('dotenv');
require('dotenv').config()


// Exportation fonction du middleware

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        console.log(userId, "USEEEEEEEEEEEEEEEEEEER");
        console.log(isAdmin, "ADMIIIIIIIIIIIIIIn");


        if ((req.body.userId && req.body.userId !== userId) || req.body.isAdmin && isAdmin === true) {
            throw '403: Unauthorized request';
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({ error: error.message });
    }

};