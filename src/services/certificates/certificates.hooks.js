const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

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
  context.data.enabled = false;

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
    all: [],
    find: [], //Ci possono stare solo codice fiscale, protocollo e tutti e due
    get: [
      /* admin, partner dello studente o studente e verificare se è abilitato*/
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
          enabled: true,
          $or: [{ idStudent: user.id }, { idPartner: user.id }]
        };

        return context;
      }
    ],
    create: [
      /* admin, partner dello studente */
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
        error: false
      }),
      checkPartner()
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
    create: [],
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
