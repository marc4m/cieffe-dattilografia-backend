// Initializes the `students_modules` service on path `/studentsToModules`
const { StudentsModules } = require('./students_modules.class');
const createModel = require('../../models/students_modules.model');
const hooks = require('./students_modules.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    id: ['idStudent', 'idModule'],
    idSeparator: ',',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[students, modules]',
    allowedInsert: '[students, modules]',
    allowedUpsert: '[students, modules]',
    insertGraphOptions: {
      relate: true
    },
    createUseUpsertGraph: true,
    upsertGraphOptions: {
      relate: true,
      noDelete: true,
      noInsert: true
    }
  };

  // Initialize our service with any options it requires
  app.use('/studentsToModules', new StudentsModules(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('studentsToModules');

  service.hooks(hooks);
};
