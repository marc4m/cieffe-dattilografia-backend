const { Service } = require('feathers-objection');

exports.Partner = class Partner extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
