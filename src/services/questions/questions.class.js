const { Service } = require('feathers-objection');

exports.Questions = class Questions extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
