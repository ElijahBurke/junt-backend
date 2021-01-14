module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });

  User.prototype.toJSON = function () {
    const copy = { ...this.get() };
    delete copy.password;
    return copy;
  };

  User.associate = (models) => {
    models.users.hasMany(models.tests);
    models.users.hasMany(models.applications);
  };

  return User;
};
