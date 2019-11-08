const { Service } = require('feathers-objection');

exports.Certificates = class Certificates extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }

  setup(app) {
    this.app = app;
  }

  async removeCredit(user) {
    const { id, credits } = user;

    if (user.credits <= 0) {
      throw new Error('Non hai abbastanza crediti');
    }

    const userService = this.app.service('users');

    return await userService.patch(id, { credits: credits - 1 });
  }

  async patch(id, data, params) {
    const { user, permitted } = params;
    const { enabled } = data;

    // Non sono admin quindi controllo e rimuovo crediti
    if (!permitted && enabled) await this.removeCredit(user);

    const result = await super.patch(id, data, params);

    return result;
  }
};
