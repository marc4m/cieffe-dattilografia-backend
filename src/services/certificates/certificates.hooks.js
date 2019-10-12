const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

const checkCredits = () => async context => {
  const { params } = context;
  const { user } = params;

  // Controllo se l'utente ha i crediti per create l'attestato.
  if (user.credits <= 0) {
    throw new Error('Non hai abbastanza crediti');
  }

  return context;
};

const removeCredits = async context => {
  const { params, app } = context;
  const { user } = params;

  const { id, credits } = user;

  await app.service('users').patch(id, { credits: credits - 1 });

  return context;
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    get: [
      /* admin, partner dello studente o studente */
      checkPermissions({
        roles: context => {
          return [`${context.params.user.id}:get`];
        }
      })
    ],
    create: [
      /* admin, partner dello studente */
      checkPermissions({
        roles: context => {
          return [`${context.params.user.id}:create`];
        }
      })
    ],
    patch: [
      /* admin, partner dello studente + rimozione credito */
      checkPermissions({
        roles: context => {
          return [`${context.params.user.id}:patch`];
        }
      }),
      checkCredits()
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [removeCredits],
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
