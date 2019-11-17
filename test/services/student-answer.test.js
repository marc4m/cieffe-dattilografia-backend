const assert = require('assert');
const app = require('../../src/app');

describe('\'studentAnswer\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-answer');

    assert.ok(service, 'Registered the service');
  });
});
