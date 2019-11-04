const assert = require('assert');
const app = require('../../src/app');

describe('\'students_modules\' service', () => {
  it('registered the service', () => {
    const service = app.service('studentsToModules');

    assert.ok(service, 'Registered the service');
  });
});
