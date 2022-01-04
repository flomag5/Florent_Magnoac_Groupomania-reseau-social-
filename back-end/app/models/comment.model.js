//--- Définition du modèle de ressource "comment" ---//


module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
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
        postId: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
    });

    return Comment;
};