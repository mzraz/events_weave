const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event_services', {
    event_services_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'events',
        key: 'event_id'
      }
    },
    service_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'service_category',
        key: 'service_category_id'
      }
    }
  }, {
    sequelize,
    tableName: 'event_services',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "event_services_pkey",
        unique: true,
        fields: [
          { name: "event_services_id" },
        ]
      },
    ]
  });
};
