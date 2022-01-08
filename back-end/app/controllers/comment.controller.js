//--- Définition logique métier pour la ressource "comment" ---//

const db = require("../models");
const Comment = db.comment;
const User = db.user;
const Op = db.Sequelize.Op;
const { comment } = require("../models");


// Création d'un commentaire
exports.createComment = (req, res, next) => {
    const PostId = req.params.id;
    Comment.create({
        content: req.body.content,
        userId: req.body.userId,
        postId: PostId
    })
        .then(() => res.status(201).json({ message: 'Commentaire ajouté !' }))
        .catch(error => res.status(400).json({ error }));
};


// Lecture de tous les commentaires
exports.getAllComments = (req, res, next) => {

    Comment.findAll({
        include: [

            "user", "post"

        ],
        order: [["date", "ASC"]],
    })
        .then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error))
}


// Lecture d'un commentaire
exports.getOneComment = (req, res, nest) => {

    Comment.findOne({
        where: { id: req.params.id },
        include: [

            "user", "post"

        ],
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }))
}


// Modification d'un commentaire
exports.modifyComment = (req, res, next) => {
    Comment.update({ content: req.body.content }, { where: { id: req.params.id } })

        .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        .catch(error => res.status(400).json({ error }));
};


// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {

    Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {

            if (comment.userId == req.body.userId || req.body.isAdmin === 1) {

                Comment.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: "Commentaire supprimé !" });
            } else {
                res.status(404).json({ message: "Suppression impossible !" });
            }
        })
        .catch((error) => console.log(error));
}


