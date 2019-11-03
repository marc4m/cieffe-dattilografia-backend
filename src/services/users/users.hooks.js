const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  protect,
  hashPassword
} = require('@feathersjs/authentication-local').hooks;

const { iff } = require('feathers-hooks-common');
const checkPermissions = require('feathers-permissions');

const isPartner = () => async context => context.params.user.role == 'partner';

module.exports = {
  before: {
    all: [
      async context => {
        context.params.query = {
          ...context.params.query,
          $eager: '[student, student.certificates, partner]'
        };
        return context;
      }
    ],
    find: [],
    get: [authenticate('jwt')],
    create: [
      authenticate('jwt'),
      hashPassword('password'),
      checkPermissions({
        roles: ['admin', 'partner'],
        field: 'role'
      }),
      iff(isPartner(), async context => {
        context.data.role = 'student';
        return context;
      })
    ],
    update: [
      authenticate('jwt'),
      hashPassword('password'),
      iff(isPartner(), async context => {
        context.data.role = 'student';
        return context;
      })
    ],
    patch: [
      authenticate('jwt'),
      hashPassword('password'),
      iff(isPartner(), async context => {
        context.data.role = 'student';
        return context;
      })
    ],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [protect('password')],
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
