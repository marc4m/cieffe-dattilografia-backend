// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class slides extends Model {
  static get tableName() {
    return 'slides';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['idModule', 'text'],

      properties: {
        idModule: { type: 'interger' },
        text: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Module = require('./modules.model')();

    return {
      module: {
        relation: Model.BelongsToOneRelation,
        modelClass: Module,
        join: {
          from: 'slides.idModule',
          to: 'modules.id'
        }
      }
    };
  }
}

module.exports = function() {
  return slides;
};
