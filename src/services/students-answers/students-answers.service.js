// Initializes the `studentsAnswers` service on path `/students_answers`
const { StudentsAnswers } = require('./students-answers.class');
const createModel = require('../../models/students-answers.model');
const hooks = require('./students-answers.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app)
    //paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/students_answers', new StudentsAnswers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('students_answers');

  service.hooks(hooks);
};
