//--- Définition du modèle de ressource "user" ---//

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'default_user_profile.png'
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    });

    return User;
};