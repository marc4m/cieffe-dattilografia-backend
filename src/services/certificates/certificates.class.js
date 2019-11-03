const { Service } = require('feathers-objection');

exports.Certificates = class Certificates extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }

  // async create(data, params) {

  // }
};
