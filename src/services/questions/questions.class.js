const { Service } = require('feathers-objection');
const shuffle = require('shuffle-array');

exports.Questions = class Questions extends Service {
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

  // Creo l'oggetto quiz
  async find(params) {
    // A seconda del modulo passato prendo le domande 10
    // Mi prendo anche le risposte

    const { data = [] } = await super.find({
      query: {
        ...params.query,
        $limit: 10,
        $eager: 'answers'
      }
    });

    const shuffledQuestions = shuffle(data);

    // Creo l'oggetto come lo vuole il frontend
    const questions = shuffledQuestions.map(question => {
      const { id, text, answers, point, type: questionType } = question;

      const shuffledAnswers = shuffle(answers);

      const answersShuffled = shuffledAnswers.map(({ id, text }) => ({
        id,
        text
      }));

      const correctAnswer = shuffledAnswers.find(
        ({ correct }) => correct === 1
      );

      return {
        id,
        point,
        text,
        questionType,
        answers: answersShuffled,
        answerSelectionType: 'single',
        correctAnswer: correctAnswer.id,
        messageForCorrectAnswer: 'Risposta corretta. Complimenti.',
        messageForIncorrectAnswer: 'Risposta sbagliata.',
        explanation: 'Spiegazione'
      };
    });

    return questions;
  }
};
