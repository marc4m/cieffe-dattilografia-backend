const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  protect,
  hashPassword
} = require('@feathersjs/authentication-local').hooks;
const { iff } = require('feathers-hooks-common');

const { setField } = require('feathers-authentication-hooks');
const checkPermissions = require('feathers-permissions');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
