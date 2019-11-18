const assert = require('assert');
const app = require('../../src/app');

describe('\'studentsAnswers\' service', () => {
  it('registered the service', () => {
    const service = app.service('students_answers');

    assert.ok(service, 'Registered the service');
  });
});
