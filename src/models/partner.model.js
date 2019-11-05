// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const softDelete = require('objection-soft-delete');

class partner extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'partner';
  }

  static get idColumn() {
    return 'idUtente';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['ragioneSociale'],

      properties: {
        ragioneSociale: { type: 'string' },

      }
    };
  }

  static get relationMappings() {
    const User = require('./users.model')();

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'partner.idUtente',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = function() {
  return partner;
};
