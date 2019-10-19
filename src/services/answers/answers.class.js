const { Service } = require('feathers-objection');

exports.Answers = class Answers extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
