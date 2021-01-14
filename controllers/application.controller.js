const models = require('../models');

const addApplication = async (req, res) => {
  try {
    const {
      company, role, url, cover, testId, userId,
    } = req.body;
    console.log(req.body);
    const result = await models.applications.create({
      company, role, url, cover, testId, userId,
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
  addApplication,
};
