// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class partner extends Model {
  static get tableName() {
    return 'partner';
  }

  // static get idColumn() {
  //   return 'idUtente';
  // }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['ragioneSociale'],

      properties: {
        ragioneSociale: { type: 'string' }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
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

module.exports = function(app) {
  if (app) {
    const db = app.get('knex');

    db.schema
      .hasTable('partner')
      .then(exists => {
        if (!exists) {
          db.schema
            .createTable('partner', table => {
              table.engine('InnoDB');

              table.integer('idUtente').unsigned();

              table.string('ragioneSociale').notNullable();
              table.timestamp('createdAt');
              table.timestamp('updatedAt');

              table.foreign('idUtente').references('users.id');
            })
            .then(() => console.log('Created partner table')) // eslint-disable-line no-console
            .catch(e => console.error('Error creating partner table', e)); // eslint-disable-line no-console
        }
      })
      .catch(e => console.error('Error creating partner table', e)); // eslint-disable-line no-console
  }

  return partner;
};
