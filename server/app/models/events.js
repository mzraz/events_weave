const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('events', {
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    event_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'events_category',
        key: 'events_category_id'
      }
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_paths: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'events',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "events_pkey",
        unique: true,
        fields: [
          { name: "event_id" },
        ]
      },
    ]
  });
};
