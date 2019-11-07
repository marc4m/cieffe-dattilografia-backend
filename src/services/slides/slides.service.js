// Initializes the `slides` service on path `/slides`
const { Slides } = require('./slides.class');
const createModel = require('../../models/slides.model');
const hooks = require('./slides.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/slides', new Slides(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('slides');

  service.hooks(hooks);
};
