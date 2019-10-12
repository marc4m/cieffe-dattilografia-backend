const { Service } = require('feathers-objection');

exports.Roles = class Roles extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
