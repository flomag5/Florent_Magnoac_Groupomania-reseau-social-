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

// post
db.posts.hasMany(db.comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: "comment"
});
db.comment.belongsTo(db.posts, { foreignKey: 'postId' });

db.user.hasMany(db.posts, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: "post"
});
db.posts.belongsTo(db.user, { foreignKey: 'userId', as: "user" });

//comment
db.user.hasMany(db.comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: "comment"
});
db.comment.belongsTo(db.user, { foreignKey: 'userId' });
db.comment.belongsTo(db.posts, { foreignKey: 'postId' });

module.exports = db;