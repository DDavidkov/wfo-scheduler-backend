module.exports = (sequelize, DataTypes) => {
  const WFORequest = sequelize.define(
    "WFORequest",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: false
    }
  );

  WFORequest.associate = (models) => {
    models.WFORequest.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      allowNull: false
    });
  };

  return WFORequest;
};
