const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service_category', {
    service_category_id: {
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
    tableName: 'service_category',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "service_category_pkey",
        unique: true,
        fields: [
          { name: "service_category_id" },
        ]
      },
    ]
  });
};
