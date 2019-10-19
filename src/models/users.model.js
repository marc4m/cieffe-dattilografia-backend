// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class users extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        email: { type: 'string' },
        password: 'string'
      }
    };
  }

  // $beforeInsert() {
  //   this.createdAt = this.updatedAt = new Date().toISOString();
  // }

  // $beforeUpdate() {
  //   this.updatedAt = new Date().toISOString();
  // }

  static get relationMappings() {
    const Student = require('./student.model')();
    const Partner = require('./partner.model')();

    return {
      student: {
        relation: Model.HasOneRelation,
        modelClass: Student,
        join: {
          from: 'users.id',
          to: 'student.idUtente'
        }
      },
      partner: {
        relation: Model.HasOneRelation,
        modelClass: Partner,
        join: {
          from: 'users.id',
          to: 'partner.idUtente'
        }
      }
    };
  }
}

module.exports = function(app) {
  if (app) {
    const db = app.get('knex');

    db.schema
      .hasTable('users')
      .then(exists => {
        if (!exists) {
          db.schema
            .createTable('users', table => {
              table.engine('InnoDB');

              table.increments('id');

              table.string('email').unique();
              table.string('password');

              table.timestamp('createdAt');
              table.timestamp('updatedAt');
            })
            .then(() => console.log('Created users table')) // eslint-disable-line no-console
            .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console
        }
      })
      .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console
  }

  return users;
};
