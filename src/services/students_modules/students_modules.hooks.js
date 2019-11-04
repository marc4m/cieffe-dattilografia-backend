const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      // Setto l'id dell'utente con il mio di studente
      setField({
        from: 'params.user.id',
        as: 'data.idStudent'
      })
    ],
    update: [],
    patch: [
      setField({
        from: 'params.user.id',
        as: 'data.idStudent'
      })
    ],
    remove: []
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
