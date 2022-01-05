//--- Définition du modèle de ressource "like" ---//

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("like", {
        like: {
            type: DataTypes.BOOLEAN,
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
    });

    return Like;
};