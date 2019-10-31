// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class modules extends Model {
  static get tableName() {
    return 'modules';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'description'],
      properties: {
        idPreModule: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Student = require('./student.model')();
    const Slides = require('./slides.model')();

    return {
      slides: {
        relation: Model.HasManyRelation,
        modelClass: Slides,
        join: {
          from: 'modules.id',
          to: 'slides.idModule'
        }
      },

      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: 'modules.id',
          through: {
            from: 'students_modules.idModule',
            to: 'students_modules.idStudent',
            extra: ['corretAnswers', 'incorrectAnswers']
          },
          to: 'student.idUtente'
        }
      }
    };
  }

  static get namedFilters() {
    return {
      abc(builder) {
        builder.where('idUtente', '=', 1);
      }
    };
  }
}

module.exports = function() {
  return modules;
};
