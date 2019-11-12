const { Service } = require('feathers-objection');

exports.Slides = class Slides extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }

  // Creo l'oggetto quiz
  async find(params) {
    const result = await super.find(params);

    const imagesToBase64 = result.map(item => {
      const { image } = item;

      if (!image) return item;

      //const imageToBase64 = ;

      console.log(image);

      return { ...item, image: null };
    });

    return imagesToBase64;
  }
};
