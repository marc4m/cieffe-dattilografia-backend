const { Service } = require('feathers-objection');

exports.Certificates = class Certificates extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }

  // setup(app) {
  //   this.app = app;
  // }

  // async patch(id, data, params) {
  //   const {user} = params;

  //   // Faccio la modifica al database
  //   return super.patch(id, data, params);
  // }
};
