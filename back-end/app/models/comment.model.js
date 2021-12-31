//--- Définition du modèle de ressource "comment" ---//

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
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
        post_id: {
            type: Sequelize.SMALLINT,
            allowNull: false
        },
    });

    return Comment;
};