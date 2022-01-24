//--- Définition de la logique de routing pour la ressource "POST" ---//


module.exports = app => {
  // Import controllers "post" et "like"
  const posts = require("../controllers/post.controller.js");
  const commentCtrl = require("../controllers/comment.controller.js");
  const likesCtrl = require('../controllers/like.controller.js');

  // Création du routeur
  const router = require("express").Router();

  // Import du middleware d'authorisation pour vérification des tokens
  const auth = require('../middleware/auth');
  // Import du middleware de gestion des fichiers téléchargés
  const multer = require('../middleware/multer-config');


  // Routes CRUD pour "post" avec middleware d'authentification
  router.post("/", multer, posts.createPost);

  router.get("/", posts.findAll);

  router.get("/:id", posts.findPostById);

  router.put("/:id", auth, multer, posts.modifyPost);

  router.delete("/:id", posts.deletePost);

  // Route commentaire de post
  router.post('/:id/comment', commentCtrl.createComment);

  // Route de like/unlike
  router.post('/:id/like', auth, likesCtrl.likePost);
  router.delete('/:postId/unlike', auth, likesCtrl.unlikePost);


  app.use('/api/posts', router);
};