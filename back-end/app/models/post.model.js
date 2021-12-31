//--- Définition du modèle de ressource "post" ---//

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        userId: {
            type: Sequelize.SMALLINT,
            allowNull: true
        },
    });

    return Post;
};

/*Post.hasMany(comment, { as: "comment" });
Comment.belongsto(Post, {
    foreignKey: "postId",
    as: "post",
});*/