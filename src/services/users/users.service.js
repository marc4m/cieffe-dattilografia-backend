// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[partner, student, certificates, permissions]',
    allowedInsert: '[partner, student, certificates]',
    allowedUpsert: '[partner, student, certificates]'
    // insertGraphOptions: true,
    // upsertGraphOptions: {
    //   relate: true
    // }
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
