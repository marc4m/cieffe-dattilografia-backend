const fs = require('fs');
const moment = require('moment');

/* eslint-disable no-unused-vars */
exports.Pdf = class Pdf {
  constructor(options) {
    this.options = options || {};
    this.html = fs.readFileSync('./template/pdf/pdf.html', 'utf8');
  }

  async find(params) {
    return this.html;
  }

  setup(app){
    this.app = app;
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
    try{
      const student = this.app.service('certificates');
      const tmp = await student.get(1,{query:{$eager:'student'}});
      //const debug = await student.find();
      console.log(tmp);
    }catch(e){
      console.log(id);
      console.log(e);
    }

    let file = this.html;
    let now = moment().format('DD/MM/YYYY');
    //let partnerLogo = '<img style="margin-left: 10px; margin-top: 15px;" height="150" width="250" src="https://gecolife.files.wordpress.com/2019/03/picimagine.jpg?w=620"></img>';
    let partnerLogo = null;

    file = file.replace('$NOME', 'ENRICO');
    file = file.replace('$COGNOME', 'DITTO');
    file = file.replace('$CITTA', 'NAPOLI');
    file = file.replace('$DATA', '05/01/2019');
    file = file.replace('$PROTOCOLLO', '123456');
    file = file.replace('$DATARILASCIO', now);
    file = file.replace('XXXXXXX', now);

    if(partnerLogo!=null){
      file = file.replace('$PARTNERLOGO',partnerLogo);
    }else{
      file = file.replace('$PARTNERLOGO','<img style="margin-left: 10px; margin-top: 15px;" height="150" width="250" src="http://localhost:3030/background/default.jpg"></img>');
    }

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
