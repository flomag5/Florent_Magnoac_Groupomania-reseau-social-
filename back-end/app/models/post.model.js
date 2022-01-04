//--- Définition du modèle de ressource "post" ---//

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
    });

    return Post;
};

