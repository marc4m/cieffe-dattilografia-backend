// Initializes the `student` service on path `/student`
const { Student } = require('./student.class');
const createModel = require('../../models/student.model');
const hooks = require('./student.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    id: 'idUtente',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[user, certificates]'
  };

  // Initialize our service with any options it requires
  app.use('/student', new Student(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student');

  service.hooks(hooks);
};
