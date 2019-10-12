// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class student extends Model {
  static get tableName() {
    return 'student';
  }

  static get idColumn() {
    return 'idUtente';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'cognome'],

      properties: {
        nome: { type: 'string' },
        cognome: { type: 'string' },
        genere: { type: 'number' },
        dataNascita: { type: 'data' },
        comuneNasciata: { type: 'string' },
        codiceFiscale: { type: 'string' },
        telefono: { type: 'string' }
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
    const User = require('./users.model')();
    const Certificates = require('./certificates.model')();

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'student.idUtente',
          to: 'users.id'
        }
      },
      certificates: {
        relation: Model.HasManyRelation,
        modelClass: Certificates,
        join: {
          from: 'student.idUtente',
          to: 'certificates.idStudent'
        }
      }
    };
  }
}

module.exports = function(app) {
  if (app) {
    const db = app.get('knex');

    db.schema
      .hasTable('student')
      .then(exists => {
        if (!exists) {
          db.schema
            .createTable('student', table => {
              table.engine('InnoDB');

              table.integer('idUtente').unsigned();

              table.string('nome').notNullable();
              table.string('cognome').notNullable();
              table.timestamp('createdAt');
              table.timestamp('updatedAt');

              table.foreign('idUtente').references('users.id');
            })
            .then(() => console.log('Created student table')) // eslint-disable-line no-console
            .catch(e => console.error('Error creating student table', e)); // eslint-disable-line no-console
        }
      })
      .catch(e => console.error('Error creating student table', e)); // eslint-disable-line no-console
  }
  return student;
};
