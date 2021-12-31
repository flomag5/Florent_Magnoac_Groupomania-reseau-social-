//--- Définition de la logique de routing pour la ressource "comment" ---//

module.exports = app => {
    const commentCtrl = require("../controllers/comment.controller.js");

    const router = require("express").Router();


    router.post("/", commentCtrl.createComment);

    router.get("/", commentCtrl.getAllComments);

    router.get("/:id", commentCtrl.getOneComment);

    router.put("/:id", commentCtrl.modifyComment);

    router.delete("/:id", commentCtrl.deleteComment);


    app.use('/api/comment', router);
};