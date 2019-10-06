const assert = require('assert');
const app = require('../../src/app');

describe('\'partner\' service', () => {
  it('registered the service', () => {
    const service = app.service('partner');

    assert.ok(service, 'Registered the service');
  });
});
