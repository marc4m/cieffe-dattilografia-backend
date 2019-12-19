// Application hooks that run for every service
const logger = require('pino')();

// const logger = require('./logger');

const saveContextInLog = () => async context => {
  logger.info(context);
  return context;
};

module.exports = {
  before: {
    all: [saveContextInLog()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [saveContextInLog()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [saveContextInLog()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
