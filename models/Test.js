module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('tests', {
    name: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });

  Test.associate = (models) => {
    models.tests.belongsTo(models.users);
    models.tests.hasMany(models.applications);
  };

  Test.prototype.toJSON = function () {
    const copy = { ...this.get() };
    delete copy.userId;
    return copy;
  };

  return Test;
};
