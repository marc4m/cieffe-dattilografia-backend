/* eslint-disable no-unused-vars */
exports.Generator = class Generator {
  setup(app){
    this.app = app;
  }

  async create (data, params) {

    const certificatesServ = this.app.service('certificates');
    const modulesServ = this.app.service('modules');
    

    try {
      // Creo il certificato
      const certificateResult = await certificatesServ.create(data, params);

      // Creo i moduli fake
      const mod = {
        students: [
          {
            idUtente: data.idStudent,
            corretAnswers: 10,
            incorrectAnswers: 0
          }
        ]
      };
      await Promise.all([modulesServ.patch(1,mod),modulesServ.patch(2,mod),modulesServ.patch(3,mod)]);

      // Creo le risposte fake

      return certificateResult;
    } catch(e){
      //console.log(e);
    }
  }
};
