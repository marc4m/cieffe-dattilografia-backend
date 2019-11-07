const fs = require('fs');
const moment = require('moment');
const pdfhtml = require('html-pdf');

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
 
    const certificates = this.app.service('certificates');
    const partnerService = this.app.service('partner');
    const result = await certificates.get(id,{query:{$eager:'student'}});
    const student = result.student;
    const partner = await partnerService.get(student.idPartner);
    let partnerLogo = partner.logoLink;

    let file = this.html;
    let now = moment().format('DD/MM/YYYY');
    
    file = file.replace('$NOME', student.nome.toUpperCase());
    file = file.replace('$COGNOME', student.cognome.toUpperCase());
    file = file.replace('$CITTA', student.comuneNascita.toUpperCase());
    file = file.replace('$DATA', moment(student.dataNascita).format('DD/MM/YYYY'));
    file = file.replace('$PROTOCOLLO', result.number);
    file = file.replace('$DATARILASCIO', moment(result.createdAt).format('DD/MM/YYYY'));
    file = file.replace('$datasuperamento', moment(result.createdAt).format('DD/MM/YYYY'));
    file = file.replace('XXXXXXX', now);
    if(partnerLogo!=null){ 
      file = file.replace('$PARTNERLOGO','<img style="margin-left: 10px; margin-top: 15px;" height="150" width="250" src="'+partnerLogo+'"></img>');
    }else{
      file = file.replace('$PARTNERLOGO','<img style="margin-left: 10px; margin-top: 15px;" height="150" width="250" src="http://localhost:3030/background/default.jpg"></img>');
    }
    return file;
  }
};
