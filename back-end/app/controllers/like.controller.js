//--- Définition logique métier pour la ressource "like" ---//

// Importation 
const db = require("../models");
const Like = db.like;
const Op = db.Sequelize.Op;

// Logique de LIKE d'un post
exports.likePost = (req, res) => {
    try {
        console.log(req.body);
        let { like, userId, postId } = req.body;
        Like.create({ like, userId, postId })
            .then(addLike => {
                console.log("New like added");
                res.status(201).json(addLike);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

// Logique de UNLIKE d'un post
exports.unlikePost = (req, res) => {
    console.log(req.body)
    try {
        Like.destroy({ where: { postId: req.params.postId, userId: req.body.userId } })
            .then(like => {
                console.log(like, "Unlike post");
                res.status(200).end();
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* Logique pour récupérer les likes d'un post */
exports.getLikes = (req, res) => {
    try {
        Like.findAll({ where: { postId: req.params.postId }, include: User })
            .then(like => {
                res.status(200).json(like);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};