const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('events_category', {
    events_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'events_category',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "events_category_pkey",
        unique: true,
        fields: [
          { name: "events_category_id" },
        ]
      },
    ]
  });
};
