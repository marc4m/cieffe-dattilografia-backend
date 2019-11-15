// Initializes the `typing` service on path `/typing`
const { Typing } = require('./typing.class');
const createModel = require('../../models/typing.model');
const hooks = require('./typing.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/typing', new Typing(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('typing');

  service.hooks(hooks);
};
