// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class certificates extends Model {
  static get tableName() {
    return 'certificates';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['idStudent', 'idQuiz', 'type'],

      properties: {
        id: { type: 'integer' },
        idStudent: { type: 'integer' },
        type: { type: 'string' },
        number: { type: 'integer' },
        year: { type: 'integer' },
        enabled: { type: 'integer', minimum: 0, maximum: 1 }
      }
    };
  }

  static get relationMappings() {
    const Student = require('./student.model')();

    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: Student,
        join: {
          from: 'certificates.idStudent',
          to: 'student.idUtente'
        }
      }
    };
  }
}

module.exports = function() {
  return certificates;
};
