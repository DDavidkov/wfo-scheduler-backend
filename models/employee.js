const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: ["Admin", "Manager", "Employee"],
        allowNull: false
      },
      manager_id: DataTypes.UUID,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
        beforeBulkUpdate: async (options) => {
          options.attributes.password = await bcrypt.hash(
            options.attributes.password,
            10
          );
        }
      }
    }
  );

  Employee.associate = (models) => {
    models.Employee.belongsTo(models.Team, {
      foreignKey: "team_id"
    });

    models.Employee.belongsTo(models.Team, {
      foreignKey: "managed_team_id"
    });
  };

  return Employee;
};
