module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('applications', {
    company: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.TEXT,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    applied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    interview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Application.associate = (models) => {
    models.applications.belongsTo(models.tests);
    models.tests.belongsTo(models.users);
  };

  Application.prototype.toJSON = function () {
    const copy = { ...this.get() };
    delete copy.userId;
    return copy;
  };

  return Application;
};
