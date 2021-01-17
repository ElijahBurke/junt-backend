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

const updateTest = async (req, res) => {
  try {
    const { toUpdate, testId } = req.body;
    const result = await models.applications.update(
      toUpdate,
      { returning: true, where: { id: testId } },
    );
    res.status(200);
    console.log(result);
    res.send(result[1][0]);
  } catch (e) {
    res.status(403);
    res.send(e);
  }
};

const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    await models.applications.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (e) {
    res.status(403);
    res.send(e);
  }
};

module.exports = {
  addTest,
  updateTest,
  deleteTest,
};
