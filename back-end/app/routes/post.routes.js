//--- Définition de la logique de routing pour la ressource "posts" ---//


module.exports = app => {
  const posts = require("../controllers/post.controller.js");
  const likesCtrl = require('../controllers/like.controller.js');
  const router = require("express").Router();

  // Import du middleware d'authorisation pour vérification des tokens
  const auth = require('../middleware/auth');
  // Import de gestion des fichiers téléchargés
  const multer = require('../middleware/multer-config');


  // Routes CRUD pour "post" avec middleware d'authentification
  router.post("/", multer, posts.createPost);

  router.get("/", posts.findAll);

  router.get("/:id", posts.findPostById);

  router.put("/:id", multer, posts.modifyPost);

  router.delete("/:id", auth, posts.deletePost);

  // Route de like/dislike
  router.post('/:id/like', likesCtrl.likePost);
  router.delete('/:postId/unlike', likesCtrl.unlikePost);




  app.use('/api/posts', router);
};