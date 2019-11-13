const assert = require('assert');
const app = require('../../src/app');

describe('\'generator\' service', () => {
  it('registered the service', () => {
    const service = app.service('generator');

    assert.ok(service, 'Registered the service');
  });
});
