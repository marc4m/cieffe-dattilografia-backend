const { Service } = require('feathers-objection');

exports.Users = class Users extends Service {
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
    try {
      return await super.patch(id, { credits: credits - 1 }, {});
    } catch (error) {
      console.log(error);
    }
  }

  async create(data, params) {
    const { user, permitted } = params;

    if (permitted && user.role === 'partner') await this.removeCredit(user);

    const result = await super.create(data, params);
    return result;
  }
};
