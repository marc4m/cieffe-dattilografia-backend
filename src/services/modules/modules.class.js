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
};
