/* eslint-disable no-unused-vars */
exports.Generator = class Generator {
  setup(app){
    this.app = app;
  }

  async create (data, params) {

    const certificatesServ = this.app.service('certificates');

    try {
      // Creo il certificato
      const certificateResult = await certificatesServ.create(data, params);

      // Creo i moduli fake

      // Creo le risposte fake

      return certificateResult;
    } catch(e){
      console.log(e);
    }
  }
};
