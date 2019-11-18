// Initializes the `answers` service on path `/answers`
const { Answers } = require('./answers.class');
const createModel = require('../../models/answers.model');
const hooks = require('./answers.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/answers', new Answers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('answers');

  service.hooks(hooks);
};
