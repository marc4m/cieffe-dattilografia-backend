// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class studentsAnswers extends Model {
  static get tableName() {
    return 'students_answers';
  }

  static get jsonSchema() {
    return {
      type: 'object'
      //required: ['text'],

      // properties: {
      //   text: { type: 'string' }
      // }
    };
  }
}

module.exports = function() {
  return studentsAnswers;
};
