const Sequelize = require('sequelize');
const { dbConfig } = require('./db.options');

const sequelizeDb = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    pool: dbConfig.development.pool
});

// Establishing Data base Connection
const connectToDb = async () => {
    try {
        await sequelizeDb.authenticate();
        console.log(`Connected to ${dbConfig.development.database} Db`);
    } catch (error) {
        console.log(`${error} while connecting to ${dbConfig.development.database} Db`);
    }
}

connectToDb();

module.exports = sequelizeDb