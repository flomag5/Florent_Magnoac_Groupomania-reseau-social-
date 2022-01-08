//--- Définition de la logique de routing pour la ressource "comment" ---//


module.exports = app => {
    // Import controllers "comment"
    const commentCtrl = require("../controllers/comment.controller.js");

    const router = require("express").Router();

    // Import du middleware d'authorisation pour vérification des tokens
    const auth = require('../middleware/auth');


    // Routes CRUD pour "comment" avec middleware d'authentification

    router.get("/", commentCtrl.getAllComments);

    router.get("/:id", commentCtrl.getOneComment);

    router.put("/:id", commentCtrl.modifyComment);

    router.delete("/:id", commentCtrl.deleteComment);


    app.use('/api/comment', router);
};