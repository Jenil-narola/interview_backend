
const Sequelize = require("sequelize");
const logger = require("../winston");
const { getENV } = require("../../helpers");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
    }
)

sequelize.authenticate()
    .then((res) => {
        logger.info('Service [postgres]: ' + `Database [${sequelize.getDatabaseName()}] Connected Successfully`);
    })
    .catch((error) => {
        logger.error(error)
    });

module.exports = sequelize;
