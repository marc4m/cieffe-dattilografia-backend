const { Service } = require('feathers-objection');

exports.Modules = class Modules extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }

  /*
  
SELECT * 
FROM modules m
LEFT JOIN students_modules sm ON (
	sm.idModule = m.id AND sm.idStudent = 1
)
WHERE m.enabled = 1

  */

  convertImageToBase64(slide) {
    const { image } = slide;

    if (!image) return slide;

    let imageBase64 = image.toString('base64');

    return { ...slide, image: imageBase64 };
  }

  async get(id, params) {
    const result = await super.get(id, params);

    const { slides } = result;

    if (!slides) return result;

    const slidesConverted = slides.map(this.convertImageToBase64);

    return { ...result, slides: slidesConverted };
  }
};
