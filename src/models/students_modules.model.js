// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class studentsModules extends Model {
  static get tableName() {
    return 'students_modules';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['idStudent', 'idModule', 'corretAnswers', 'incorrectAnswers'],

      properties: {
        idStudent: { type: 'integer' },
        idModule: { type: 'integer' },
        corretAnswers: { type: 'integer' },
        incorrectAnswers: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const Student = require('./student.model')();
    const Modules = require('./modules.model')();

    return {
      students: {
        relation: Model.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'students_modules.idStudent',
          to: 'student.id'
        }
      },
      modules: {
        relation: Model.HasManyRelation,
        modelClass: Modules,
        join: {
          from: 'students_modules.idModule',
          to: 'modules.id'
        }
      }
    };
  }
}

module.exports = function() {
  return studentsModules;
};
