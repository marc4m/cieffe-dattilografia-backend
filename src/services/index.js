const users = require('./users/users.service.js');

const partner = require('./partner/partner.service.js');

const student = require('./student/student.service.js');

const pdf = require('./pdf/pdf.service.js');

const certificates = require('./certificates/certificates.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(partner);
  app.configure(student);
  app.configure(pdf);
  app.configure(certificates);
};
