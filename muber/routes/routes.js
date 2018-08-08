const DriversControllers = require('../controllers/drivers_controller');

module.exports = (app) => {
  //  Watch for incoming request of method GET
  // to the route http://localhost:3050/api
  app.get("/api", DriversControllers.greeting);

  app.post('/api/drivers', DriversControllers.create);
};
