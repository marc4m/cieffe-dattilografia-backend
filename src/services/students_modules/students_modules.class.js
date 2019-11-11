const { Service } = require('feathers-objection');

exports.StudentsModules = class StudentsModules extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
