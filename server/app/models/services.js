const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('services', {
    service_id: {
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
    service_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'service_category',
        key: 'service_category_id'
      }
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
    tableName: 'services',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "services_pkey",
        unique: true,
        fields: [
          { name: "service_id" },
        ]
      },
    ]
  });
};
