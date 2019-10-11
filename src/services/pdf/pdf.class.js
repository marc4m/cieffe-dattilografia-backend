const fs = require('fs');

/* eslint-disable no-unused-vars */
exports.Pdf = class Pdf {
  constructor(options) {
    this.options = options || {};
    this.html = fs.readFileSync('./template/dattilografia.html', 'utf8');
  }

  async find(params) {
    return this.html;
  }

  async get(id, params) {
    // pdf.create(html, { format: 'Letter' }).toStream(function(err, stream) {
    //   if (err) {
    //     res.json({
    //       message: 'Sorry, we were unable to generate pdf'
    //     });
    //   }

    //   stream.pipe(res); // your response
    // });

    let file = this.html;

    file = file.replace('{NOMEVINCITORE}', 'Enrico Ditto');

    return file;
  }

  // async create (data, params) {
  //   if (Array.isArray(data)) {
  //     return Promise.all(data.map(current => this.create(current, params)));
  //   }

  //   return data;
  // }

  // async update (id, data, params) {
  //   return data;
  // }

  // async patch (id, data, params) {
  //   return data;
  // }

  // async remove (id, params) {
  //   return { id };
  // }
};
