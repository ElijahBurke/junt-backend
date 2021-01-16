const models = require('../models');

const addApplication = async (req, res) => {
  try {
    // const {
    //   company, role, url, cover, testId, userId, notes,
    // } = req.body;
    const result = await models.applications.create({
      ...req.body, applied: true,
    });
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(403);
    res.send(e);
  }
};

const updateApplication = async (req, res) => {
  try {
    const { toUpdate, applicationId } = req.body;
    const result = await models.applications.update(
      toUpdate,
      { returning: true, where: { id: applicationId } },
    );
    res.status(200);
    console.log(result);
    res.send(result[1][0]);
  } catch (e) {
    res.status(403);
    res.send(e);
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.applications.destroy({ where: { id } });
    console.log(result);
    res.sendStatus(204);
  } catch (e) {
    res.status(403);
    res.send(e);
  }
};

module.exports = {
  addApplication,
  updateApplication,
  deleteApplication,
};
