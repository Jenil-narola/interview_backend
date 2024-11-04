const { logger, sequelize } = require('../services');
const fs = require("fs");
const path = require("path");

const ProductSchema = require('./product.schema')(sequelize);

/** 
 * @type {{ [key: string]: import('sequelize').Model & { associate?: (db: object) => void } }}
 */
const db = {
    [ProductSchema.name]: ProductSchema,
};

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

db.sequelize
    .sync({ alter: true })
    .then(() => {
        logger.info("Database Synced Successfully");
    })
    .catch((error) => {
        logger.error(error);
    });

module.exports = db;