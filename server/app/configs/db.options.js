const commonPoolOptions = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};
// Data base config only for developement use
const dbConfig = {
    development: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: 'postgres',
        pool: commonPoolOptions
    }
};

module.exports = { dbConfig }