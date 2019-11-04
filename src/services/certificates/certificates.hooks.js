const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { populate } = require('feathers-hooks-common');

const certificateStudentSchema = {
  include: [
    {
      service: 'student',
      nameAs: 'student',
      parentField: 'idUtente',
      childField: 'idStudent'
    }
  ]
};

const { iff } = require('feathers-hooks-common');

const isPartner = () => async context => context.params.user.role == 'partner';
const isStudent = () => async context => context.params.user.role == 'student';

const checkCredits = () => async context => {
  const { params } = context;
  const { permitted, user } = params;

  // Sono admin quindi non ho il vincolo sui crediti
  if (permitted) return context;

  // Controllo se l'utente ha i crediti per create l'attestato.
  if (user.credits <= 0) throw new Error('Non hai abbastanza crediti');

  return context;
};

const removeCredits = () => async context => {
  const { params, app } = context;
  const { permitted, user } = params;

  // Sono admin quindi non tolgo il credito
  if (permitted) return context;

  const { id, credits } = user;

  await app.service('users').patch(id, { credits: credits - 1 });

  return context;
};

const checkPartner = () => async context => {
  const { params, app, data } = context;
  const { permitted, user } = params;

  context.data.idPartner = user.id;
  // context.data.enabled = 0;

  // Sono admin
  if (permitted) return context;

  //Prendo tutti i miei studenti
  const students = await app.service('student').find({
    query: {
      idPartner: user.id,
      idUtente: data.idStudent,
      $select: ['idUtente']
    }
  });

  if (students.total <= 0) {
    throw new Error('Non sei partner di questo studente');
  }

  return context;
};

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
    find: [], //Ci possono stare solo codice fiscale, protocollo e tutti e due
    get: [
      /* admin, partner dello studente o studente e verificare se è abilitato*/
      /*authenticate('jwt'),
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
      /* admin, partner dello studente + rimozione credito */
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
        error: false
      }),
      checkPartner(),
      checkCredits()
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [removeCredits()],
    update: [],
    patch: [removeCredits()],
    remove: []
  }

  // error: {
  //   all: [],
  //   find: [],
  //   get: [],
  //   create: [],
  //   update: [],
  //   patch: [],
  //   remove: []
  // }
};
