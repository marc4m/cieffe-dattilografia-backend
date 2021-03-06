const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

const apiKey = require('../../hooks/api-key');


module.exports = {
  before: {
    all: [
      apiKey(),
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin', 'partner'],
        field: 'role',
        error: true
      })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
