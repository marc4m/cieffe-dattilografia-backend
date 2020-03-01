// Initializes the `report` service on path `/report`
const { Report } = require('./report.class');
const hooks = require('./report.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/report', new Report(options, app), (req, res) => {
    const { data } = res;

    res.type('html');
    res.end(data);
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('report');

  service.hooks(hooks);
};
