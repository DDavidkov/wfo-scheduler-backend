module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );

  return Team;
};
