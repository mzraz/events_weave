const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bid', {
    bid_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    service_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'services',
        key: 'service_id'
      }
    },
    event_services_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'event_services',
        key: 'event_services_id'
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image_paths: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bid',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "bid_pkey",
        unique: true,
        fields: [
          { name: "bid_id" },
        ]
      },
    ]
  });
};
