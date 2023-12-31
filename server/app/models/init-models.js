var DataTypes = require("sequelize").DataTypes;
var _bid = require("./bid");
var _event_services = require("./event_services");
var _events = require("./events");
var _events_category = require("./events_category");
var _roles = require("./roles");
var _service_category = require("./service_category");
var _services = require("./services");
var _users = require("./users");

function initModels(sequelize) {
  var bid = _bid(sequelize, DataTypes);
  var event_services = _event_services(sequelize, DataTypes);
  var events = _events(sequelize, DataTypes);
  var events_category = _events_category(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var service_category = _service_category(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  bid.belongsTo(event_services, { as: "event_service", foreignKey: "event_services_id"});
  event_services.hasMany(bid, { as: "bids", foreignKey: "event_services_id"});
  event_services.belongsTo(events, { as: "event", foreignKey: "event_id"});
  events.hasMany(event_services, { as: "event_services", foreignKey: "event_id"});
  events.belongsTo(events_category, { as: "event_category", foreignKey: "event_category_id"});
  events_category.hasMany(events, { as: "events", foreignKey: "event_category_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  event_services.belongsTo(service_category, { as: "service_category", foreignKey: "service_category_id"});
  service_category.hasMany(event_services, { as: "event_services", foreignKey: "service_category_id"});
  services.belongsTo(service_category, { as: "service_category", foreignKey: "service_category_id"});
  service_category.hasMany(services, { as: "services", foreignKey: "service_category_id"});
  bid.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(bid, { as: "bids", foreignKey: "service_id"});
  events.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(events, { as: "events", foreignKey: "user_id"});
  services.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(services, { as: "services", foreignKey: "user_id"});

  return {
    bid,
    event_services,
    events,
    events_category,
    roles,
    service_category,
    services,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
