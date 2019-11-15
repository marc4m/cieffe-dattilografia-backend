const assert = require('assert');
const app = require('../../src/app');

describe('\'typing\' service', () => {
  it('registered the service', () => {
    const service = app.service('typing');

    assert.ok(service, 'Registered the service');
  });
});
