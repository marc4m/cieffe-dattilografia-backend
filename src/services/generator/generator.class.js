const { Service } = require('feathers-objection');
/* eslint-disable no-unused-vars */
exports.Generator = class Generator {
  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const certificatesServ = this.app.service('certificates');
    const modulesServ = this.app.service('modules');
    const answersServ = this.app.service('answers');
    const studentAnswerServ = this.app.service('students_answers');
    //CI VORREBBE UNA GESTIONE DELLA TRANSAZIONE!
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
      await Promise.all([
        modulesServ.patch(1, mod),
        modulesServ.patch(2, mod),
        modulesServ.patch(3, mod)
      ]);

      // Creo le risposte fake
      const correctAnswer = await answersServ.find({
        query: {
          correct: 1
        }
      });

      const arr = correctAnswer.map(el => {
        const { id, correct, text, ...realEl } = el;

        return {
          idCertificate: certificateResult.id,
          idStudent: data.idStudent,
          idAnswer: id,
          isCorrect: 1,
          ...realEl
        };
      });

      const promises = arr.map(element => studentAnswerServ.create(element));

      await Promise.all(promises);

      return certificateResult;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
};
