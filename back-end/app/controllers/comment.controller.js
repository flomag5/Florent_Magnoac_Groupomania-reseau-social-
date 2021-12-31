//--- Définition logique métier pour la ressource "comment" ---//

const db = require("../models");
const Comment = db.comment;
const Op = db.Sequelize.Op;
const { comment } = require("../models");


// Création d'un commentaire
exports.createComment = (req, res, next) => {
    Comment.create({
        content: req.body.content,
        userId: req.body.userId,
        post_id: req.body.post_id
    })
        .then(() => res.status(201).json({ message: 'Commentaire ajouté !' }))
        .catch(error => res.status(400).json({ error }));
};

// Lecture de tous les commentaires
exports.getAllComments = (req, res, next) => {
    Comment.findAll({ order: [["id", "ASC"]] })

        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }))
};

// Lecture d'un commentaire
exports.getOneComment = (req, res, nest) => {
    Comment.findOne({ where: { id: req.params.id } })
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
    Comment.destroy({ where: { id: req.params.id } })

        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};