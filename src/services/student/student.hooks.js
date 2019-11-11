const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  protect,
  hashPassword
} = require('@feathersjs/authentication-local').hooks;

const { iff } = require('feathers-hooks-common');

const { setField } = require('feathers-authentication-hooks');
const checkPermissions = require('feathers-permissions');

const isNotAdmin = () => async context =>
  context.params.user && context.params.user.role !== 'admin';

const isPartner = () => async context =>
  context.params.user && context.params.user.role == 'partner';

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin', 'partner'],
        field: 'role',
        error: false
      }),
      async context => {
        context.params.query = {
          ...context.params.query,
          $eager: '[user, partner]',
          deleted: false
        };
        return context;
      }
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
        iff(
          isPartner(),
          setField({
            from: 'params.user.id',
            as: 'params.query.idPartner'
          })
        ).else(
          setField({
            from: 'params.user.id',
            as: 'params.query.idUtente'
          })
        )
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
      ]),
      hashPassword('user.password')
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
      ]),
      hashPassword('user.password')
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
