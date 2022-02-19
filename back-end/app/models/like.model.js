//--- Définition du modèle de ressource "like" ---//

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("like", {
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            references: {
                model: "post",
                key: "id"
            }
        },
    });

    return Like;
};