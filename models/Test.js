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
  });

  Test.associate = (models) => {
    models.tests.belongsTo(models.users, { onDelete: 'CASCADE' });
    models.tests.hasMany(models.applications);
  };

  Test.prototype.toJSON = function () {
    const copy = { ...this.get() };
    delete copy.userId;
    return copy;
  };

  return Test;
};
