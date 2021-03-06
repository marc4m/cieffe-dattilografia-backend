const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { iff } = require('feathers-hooks-common');

const apiKey = require('../../hooks/api-key');
const allowAnonymous = require('../../hooks/allow-anonymous');

const isPartner = () => async context =>
  context.params.user && context.params.user.role == 'partner';

const isStudent = () => async context =>
  context.params.user && context.params.user.role == 'student';

module.exports = {
  before: {
    all: [
      async context => {
        context.params.query = {
          ...context.params.query,
          $eager: '[student]'
        };
        return context;
      }
    ],
    find: [
      apiKey(),
      allowAnonymous(),
      authenticate('jwt', 'anonymous'),
      checkPermissions({
        roles: ['admin', 'partner'],
        field: 'role',
        error: false
      }),
      async context => {
        const { params } = context;
        const { permitted } = params;

        // Sono admin oppure partner
        if (permitted) return context;

        // Sono un utente comune, devo passare numero e/o codice fiscale

        const { query } = params;

        if (!('codiceFiscale' in query) && !('number' in query)) {
          throw new Error('Parametri non validi');
        }

        return context;
      }
    ], //Ci possono stare solo codice fiscale, protocollo e tutti e due
    get: [
      /* admin, partner dello studente o studente e verificare se è abilitato 
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
        error: false
      }),
      async context => {
        const { params } = context;
        const { permitted, user } = params;

        // Sono admin
        if (permitted) return context;

        // Metto le registrizioni
        context.params.query = {
          enabled: 1,
          $or: [{ idStudent: user.id }, { idPartner: user.id }]
        };

        return context;
      }*/
    ],
    create: [
      /* admin, partner dello studente */
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin', 'partner', 'student'],
        field: 'role',
        error: true
      }),
      iff(isPartner(), async context => {
        // Devo controllare che idStudent è un mio studente
        context.data.idPartner = context.params.user.id;
        context.data.enabled = 0;

        return context;
      }),
      iff(isStudent(), async context => {
        // Posso inserire solo i certificati miei
        context.data.idPartner = context.params.user.student.idPartner;
        context.data.idStudent = context.params.user.id;
        context.data.enabled = 0;
        return context;
      })
    ],
    patch: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
        error: false
      })
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
