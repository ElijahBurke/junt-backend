const models = require('../models');

const addTest = async (req, res) => {
  try {
    const {
      name, desc, cover, userId,
    } = req.body;
    const result = await models.tests.create({
      name, desc, cover, userId,
    });
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(403);
    res.send(e);
  }
};

module.exports = {
  addTest,
};
