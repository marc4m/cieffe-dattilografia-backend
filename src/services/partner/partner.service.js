// Initializes the `partner` service on path `/partner`
const { Partner } = require('./partner.class');
const createModel = require('../../models/partner.model');
const hooks = require('./partner.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  // const paginate = app.get('paginate');

  const options = {
    Model,
    id: 'idUtente',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: 'user',
    allowedUpsert: 'user'
  };

  // Initialize our service with any options it requires
  app.use('/partner', new Partner(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('partner');

  service.hooks(hooks);
};
