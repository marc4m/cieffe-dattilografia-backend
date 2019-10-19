const { authenticate } = require('@feathersjs/authentication').hooks;
const { protect } = require('@feathersjs/authentication-local').hooks;
const { iff } = require('feathers-hooks-common');

const { setField } = require('feathers-authentication-hooks');
const checkPermissions = require('feathers-permissions');

const isNotAdmin = () => async context => context.params.user.role !== 'admin';

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin', 'partner'],
        field: 'role',
        error: false
      })
    ],
    find: [
      iff(
        isNotAdmin(),
        setField({
          from: 'params.user.id',
          as: 'params.query.idPartner'
        })
      )
    ],
    get: [
      iff(
        isNotAdmin(),
        setField({
          from: 'params.user.id',
          as: 'params.query.idPartner'
        })
      )
    ],
    create: [
      setField({
        from: 'params.user.id',
        as: 'data.idPartner'
      })
    ],
    update: [
      iff(isNotAdmin(), [
        setField({
          from: 'params.user.id',
          as: 'params.query.idPartner'
        }),
        setField({
          from: 'params.user.id',
          as: 'data.idPartner'
        })
      ])
    ],
    patch: [
      iff(isNotAdmin(), [
        setField({
          from: 'params.user.id',
          as: 'params.query.idPartner'
        }),
        setField({
          from: 'params.user.id',
          as: 'data.idPartner'
        })
      ])
    ],
    remove: [
      iff(
        isNotAdmin(),
        setField({
          from: 'params.user.id',
          as: 'params.query.idPartner'
        })
      )
    ]
  },

  after: {
    all: [protect('user.password')],
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
