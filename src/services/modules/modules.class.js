const { Service } = require('feathers-objection');

exports.Modules = class Modules extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
