const { Service } = require('feathers-objection');

exports.Typing = class Typing extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
