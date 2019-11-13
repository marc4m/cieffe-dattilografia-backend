// Initializes the `generator` service on path `/generator`
const { Generator } = require('./generator.class');
const hooks = require('./generator.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/generator', new Generator(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('generator');

  service.hooks(hooks);
};
