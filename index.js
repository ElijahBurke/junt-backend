const app = require('./app');
// const db = require('../models/index');
require('dotenv').config();

const port = process.env.PORT || 3001;

(async () => {
  // await db.sequelize.authenticate();
  // await db.sequelize.sync();
  app.listen(port, () => {
    console.log(`Server clubbing at http://localhost:${port} 🕺`); // eslint-disable-line
  });
})();
