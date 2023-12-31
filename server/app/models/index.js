const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../configs/connection.js');

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.bid = require("./bid.js")(sequelize, DataTypes);
db.event_services = require("./event_services.js")(sequelize, DataTypes);
db.events = require("./events.js")(sequelize, DataTypes);
db.events_category = require("./events_category.js")(sequelize, DataTypes);
db.roles = require("./roles.js")(sequelize, DataTypes);
db.service_category = require("./service_category.js")(sequelize, DataTypes);
db.services = require("./services.js")(sequelize, DataTypes);
db.users = require("./users.js")(sequelize, DataTypes);

//Assosiations
db.event_services.belongsTo(db.events, { as: "event", foreignKey: "event_id"});
db.events.hasMany(db.event_services, { as: "event_services", foreignKey: "event_id"});
db.events.belongsTo(db.events_category, { as: "event_category", foreignKey: "event_category_id"});
db.events_category.hasMany(db.events, { as: "events", foreignKey: "event_category_id"});
db.bid.belongsTo(db.event_services, { as: "event_service", foreignKey: "event_service_id"});
db.event_services.hasMany(db.bid, { as: "bids", foreignKey: "event_service_id"});
db.users.belongsTo(db.roles, { as: "role", foreignKey: "role_id"});
db.roles.hasMany(db.users, { as: "users", foreignKey: "role_id"});
db.bid.belongsTo(db.services, { as: "service", foreignKey: "service_id"});
db.services.hasMany(db.bid, { as: "bids", foreignKey: "service_id"});
db.event_services.belongsTo(db.service_category, { as: "service_category", foreignKey: "service_category_id"});
db.service_category.hasMany(db.event_services, { as: "event_services", foreignKey: "service_category_id"});
db.services.belongsTo(db.service_category, { as: "service_category", foreignKey: "service_category_id"});
db.service_category.hasMany(db.services, { as: "services", foreignKey: "service_category_id"});
db.events.belongsTo(db.users, { as: "user", foreignKey: "user_id"});
db.users.hasMany(db.events, { as: "events", foreignKey: "user_id"});
db.services.belongsTo(db.users, { as: "user", foreignKey: "user_id"});
db.users.hasMany(db.services, { as: "services", foreignKey: "user_id"});

module.exports = db;