const { Service } = require('feathers-objection');

exports.StudentsAnswers = class StudentsAnswers extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
