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


    return Comment;
}