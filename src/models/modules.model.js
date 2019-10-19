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
}

module.exports = function() {
  return modules;
};
