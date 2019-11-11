const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  protect,
  hashPassword
} = require('@feathersjs/authentication-local').hooks;
const checkPermissions = require('feathers-permissions');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role'
      }),
      async context => {
        context.params.query = {
          ...context.params.query,
          $eager: '[user]',
          deleted: false
        };
        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [hashPassword('user.password')],
    remove: []
  },

  after: {
    all: [protect('user.password', 'deleted')],
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
