const { Service } = require('feathers-objection');

exports.Slides = class Slides extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
