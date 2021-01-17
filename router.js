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

router.route('/test/update')
  .post(testController.updateTest);

router.route('/test/delete/:id')
  .delete(testController.deleteTest);

router.route('/application/add')
  .post(applicationController.addApplication);

router.route('/application/update')
  .post(applicationController.updateApplication);

router.route('/application/delete/:id')
  .delete(applicationController.deleteApplication);

router.route('/auth/')
  .get(authController.loginSuccess);

router.route('/auth/check')
  .get(authController.checkCookie);

router.route('/failure')
  .get(authController.loginFailure);

module.exports = router;
