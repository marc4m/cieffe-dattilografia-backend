// Initializes the `modules` service on path `/modules`
const { Modules } = require('./modules.class');
const createModel = require('../../models/modules.model');
const hooks = require('./modules.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  // const paginate = app.get('paginate');

  const options = {
    Model,
    whitelist: [
      '$eager',
      '$joinRelation',
      '$leftJoinRelation',
      '$joinEager',
      '$pick',
      '$select'
    ],
    allowedEager: '[students, slides]',
    allowedInsert: '[students]',
    allowedUpsert: '[students]',
    insertGraphOptions: {
      relate: true
    },
    upsertGraphOptions: {
      relate: true,
      // unrelate: true
      noDelete: true
    }
  };

  // Initialize our service with any options it requires
  app.use('/modules', new Modules(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('modules');

  service.hooks(hooks);
};
