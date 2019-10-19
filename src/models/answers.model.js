// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class answers extends Model {
  static get tableName() {
    return 'answers';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['idQuestion', 'text'],

      properties: {
        id: { type: 'integer' },
        idQuestion: { type: 'integer' },
        text: { type: 'string' },
        correct: { type: 'integer', minimum: 0, maximum: 1 }
      }
    };
  }

  static get relationMappings() {
    const Question = require('./questions.model')();

    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'answers.idQuestion',
          to: 'questions.id'
        }
      }
    };
  }
}

module.exports = function() {
  return answers;
};
