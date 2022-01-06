//--- Définition logique métier pour la ressource "post" ---//

// Importation 
const db = require("../models");
const Post = db.posts;
const Comment = db.comment;
const User = db.user;
const Op = db.Sequelize.Op;
const fs = require("fs");


// Routes CRUD pour les posts

// Créer nouveau post
exports.createPost = (req, res, next) => {

    // Création d'un post
    const post = {
        title: req.body.title,
        content: req.body.content,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.body.userId
    };
    // Sauvegarde post dans la database
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la création du post."
            });
        });
};



// Lecture de l'ensemble des posts
exports.findAll = (req, res, next) => {

    Post.findAll({
        include: [
            "comment", "user"
        ],

        order: [["date", "DESC"]],
    })
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
}


// Trouver un seul post
exports.findPostById = (req, res, next) => {

    Post.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: User,
            },
            {
                model: Comment,

            }
        ],
    })
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
}


// Modifier un post par l'Id de la requête
exports.modifyPost = (req, res, next) => {
    const id = req.params.id;
    Post.findOne({ where: { id: id } })
        .then(post => {
            if (req.userId == post.UserId) {
                const updatePost = {
                    title: req.body.title,
                    content: req.body.content
                }
                if (req.file) {
                    updatePost.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    const filename = post.image.split('/images/')[1];
                    fs.unlinkSync(`images/${filename}`)
                    console.log(post.image);
                }
                Post.update(updatePost, { where: { id: id } })
                    .then(() => res.status(200).json({ message: 'Post modifié !' }))
                    .catch(error => res.status(400).json({ error }))
            } else {
                return res.status(403).json({
                    'error': 'UnAuthorize'
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};


// Supprimer un post 
exports.deletePost = (req, res, next) => {

    Post.findOne({
        where: {
            id: req.params.id,
        }
    })
        .then(post => {
            if (req.userId == post.UserId) {

                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then(() => res.status(200).json({
                        message: 'Post supprimé !'
                    }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                });
            } else {
                res.status(403).json({
                    'error': 'UnAuthorize'
                })
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
};

/*
//User.hasMany(Post)
//Post.belongsTo(User)

//Post.hasMany(Comment)
//Comment.belongsTo(Post)

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Post.belongsTo(User, { foreignKey: 'userId' });
*/
