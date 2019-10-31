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
        idUtente: { type: 'integer' },
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

  static get relationMappings() {
    const User = require('./users.model')();
    const Certificates = require('./certificates.model')();
    const Modules = require('./modules.model')();

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
      },
      modules: {
        relation: Model.ManyToManyRelation,
        modelClass: Modules,
        join: {
          from: 'student.idUtente',
          through: {
            from: 'students_modules.idStudent',
            to: 'students_modules.idModule',
            extra: ['corretAnswers', 'incorrectAnswers']
          },
          to: 'modules.id'
        }
      }
    };
  }

  static get namedFilters() {
    return {
      aaa(builder) {
        // builder.select('idUtente');
        builder
          .where('idUtente', 1)
          .select('idUtente')
          .pluck('idUtente');
        // builder.pluck('idUtente');
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
