// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class roles extends Model {
  static get tableName() {
    return 'users_roles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['idUser', 'actionType'],

      properties: {
        idUser: { type: 'number' },
        idEntity: { type: 'number' },
        actionType: { type: 'string' } //TODO: Enumarion
      }
    };
  }

  //TODO: Aggiungere relazioni
}

module.exports = function() {
  return roles;
};
