const pdf = require('html-pdf');
const convertHTMLToPDF = require('pdf-puppeteer');

// Initializes the `pdf` service on path `/pdf`
const { Pdf } = require('./pdf.class');
const hooks = require('./pdf.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/pdf', new Pdf(options, app), (req, res) => {
    const { data } = res;

    res.type('html');
    res.end(data);

    // convertHTMLToPDF(
    //   data,
    //   pdf => {
    //     res.type('pdf');
    //     res.end(pdf);
    //   },
    //   null,
    //   null,
    //   true
    // ).catch(err => {
    //   console.log(err);
    //   res.status(500).send(err);
    // });

    // pdf.create(data).toBuffer(function(err, buffer) {
    //   console.log('This is a buffer:', Buffer.isBuffer(buffer));

    //   res.type('pdf');
    //   res.end(buffer);
    // });
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('pdf');

  service.hooks(hooks);
};
