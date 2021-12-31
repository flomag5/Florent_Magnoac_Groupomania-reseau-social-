//--- Définition de la logique de routing pour la ressource "posts" ---//



module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  const router = require("express").Router();

  // Import du middleware d'authorisation pour vérification des tokens
  const auth = require('../middleware/auth');
  const multer = require('../middleware/multer-config');


  router.post("/", multer, posts.createPost);

  router.get("/", posts.getAllPosts);

  router.get("/:id", posts.getOnePost);

  router.put("/:id", multer, posts.modifyPost);

  router.delete("/:id", auth, posts.deletePost);


  app.use('/api/posts', router);
};