//--- Définition du modèle de ressource "like" ---//

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("like", {
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
    });

    return Like;
};