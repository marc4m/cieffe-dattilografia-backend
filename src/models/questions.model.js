// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class questions extends Model {
  static get tableName() {
    return 'questions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'type', 'point'],

      properties: {
        id: { type: 'integer' },
        idModule: { type: 'integer' },
        text: { type: 'string' },
        type: { type: 'string', enum: ['text'] },
        point: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const Answers = require('./answers.model')();

    return {
      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answers,
        join: {
          from: 'questions.id',
          to: 'answers.idQuestion'
        }
      }
    };
  }
}

module.exports = function() {
  return questions;
};
