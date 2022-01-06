//--- Initialisation de Sequelize ---//

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);
db.like = require("./like.model.js")(sequelize, Sequelize);


// Jointures pour post / user
db.posts.hasMany(db.comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: "comment"
});
db.comment.belongsTo(db.posts, { foreignKey: 'postId', as: "post" });

db.user.hasMany(db.posts, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: "post"
});
db.posts.belongsTo(db.user, { foreignKey: 'userId', as: "user" });

// Jointures pour comment
db.user.hasMany(db.comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: "comment"
});
db.comment.belongsTo(db.user, { foreignKey: 'userId', as: "user" });


// Jointures pour likes
db.like.belongsTo(db.user, {
    onDelete: 'cascade',
    foreignKey: 'userId',
    as: "user"
});
db.user.hasMany(db.like, { foreignKey: 'userId', as: "like" });

db.like.belongsTo(db.posts, {
    onDelete: 'cascade',
    foreignKey: 'postId',
    as: "post"
});
db.posts.hasMany(db.like, { foreignKey: 'postId', as: "like" });

module.exports = db;