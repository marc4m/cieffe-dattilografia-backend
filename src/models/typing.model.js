// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class typing extends Model {
  static get tableName() {
    return 'typing';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['textIndex', 'correctWords', 'wrongWords', 'stopWatch'],

      properties: {
        textIndex: { type: 'interger' },
        correctWords: { type: 'interger' },
        wrongWords: { type: 'interger' }
        //textIndex: { type: 'interger' },
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
          from: 'typing.idStudent',
          to: 'student.idUtente'
        }
      }
    };
  }
}

module.exports = function() {
  return typing;
};
