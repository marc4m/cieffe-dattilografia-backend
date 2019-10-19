const assert = require('assert');
const app = require('../../src/app');

describe('\'modules\' service', () => {
  it('registered the service', () => {
    const service = app.service('modules');

    assert.ok(service, 'Registered the service');
  });
});
