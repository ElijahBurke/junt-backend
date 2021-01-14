const router = require('express').Router();
const authController = require('./controllers/auth.controller');
const testController = require('./controllers/test.controller');
const applicationController = require('./controllers/application.controller');

router.route('/users/create')
  .post(authController.addUser);

router.route('/users/login')
  .post(authController.login);

router.route('/test/add')
  .post(testController.addTest);

router.route('/application/add')
  .post(applicationController.addApplication);

module.exports = router;
