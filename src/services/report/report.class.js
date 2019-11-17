const fs = require('fs');
const moment = require('moment');

/* eslint-disable no-unused-vars */
exports.Report = class Report {
  constructor (options) {
    this.options = options || {};
    this.html = fs.readFileSync('./template/pdf/report.html', 'utf8');
  }

  async find (params) {
    return this.html;
  }

  setup(app){
    this.app = app;
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  async get (id, params) {
    let file = this.html;

    //loading services
    const studentService = this.app.service('student');
    const certificatesService = this.app.service('certificates');
    const typingService = this.app.service('typing');
    //loading data
    const student = await studentService.get(id);
    const certificates = await certificatesService.find({ query: {idStudent:id}});
    const typingQuery = await typingService.find({ query: {idStudent:id}});
    const typing = typingQuery.data[0];
    const certificate = certificates[0];

    file = file.replace('$ID', this.pad(certificate.number,6));
    file = file.replace('$PUNTEGGIO', 70+'%');
    
    //answers
    let i=0;
    for (i = 1; i <= 30; i++) {
      file = file.replace('$DOMANDA'+i, "DOMANDA DI TEST "+i);
      let risposta1 = "<input checked type=\"radio\" > Risposta 1<br>";
      let risposta2 = "<input checked type=\"radio\" > Risposta 2<br>";
      let risposta3 = "<input checked type=\"radio\" > Risposta 3<br>";
      file = file.replace('$RISPOSTE'+i, risposta1+risposta2+risposta3);
    }
    
    //module 4 report
    if(typing!=null){
      file = file.replace('$HTMLMODULOSCRITTURAVELOCE', "<h4 style=\"text-align:left\">Modulo di scrittura veloce (Facoltativo) Superato.<br>Parole Corrette: " + typing.correctWords + "<br>Parole Errate: "+ typing.wrongWords +"<br>Tempo: " + typing.stopWatch + " </h4>");
    }else{
      file = file.replace('$HTMLMODULOSCRITTURAVELOCE', "<h4 style=\"text-align:left\">Modulo di scrittura veloce (Facoltativo) non pervenuto.</h4>");
    }
   
    //bottom of the report
    file = file.replace('$NOME', student.nome.toUpperCase());
    file = file.replace('$COGNOME', student.cognome.toUpperCase());
    file = file.replace('$NOME', student.nome.toUpperCase());
    file = file.replace('$COGNOME', student.cognome.toUpperCase());
    file = file.replace('$CF', student.codiceFiscale.toUpperCase());
    file = file.replace('$DOCUMENTO', student.numeroDocumento.toUpperCase());
    file = file.replace('$DATATEST', moment(certificate.issuedAt).format('DD/MM/YYYY'));
    
    return file;
  }
}
