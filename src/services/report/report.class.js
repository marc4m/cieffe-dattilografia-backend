const fs = require("fs");
const moment = require("moment");

/* eslint-disable no-unused-vars */
exports.Report = class Report {
  constructor(options) {
    this.options = options || {};
    this.html = fs.readFileSync("./template/cieffe/report.html", "utf8");
  }

  async find(params) {
    return this.html;
  }

  setup(app) {
    this.app = app;
  }

  pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  async get(id, params) {
    let file = this.html;

    //loading services
    const studentService = this.app.service("student");
    const certificatesService = this.app.service("certificates");
    const typingService = this.app.service("typing");
    const questionsService = this.app.service("questions");
    //loading data
    const certificates = await certificatesService.find({
      ...params,
      query: { idStudent: id },
    });
    const student = await studentService.get(id, {
      query: { $eager: "answers.[question]" },
    });
    const typingQuery = await typingService.find({ query: { idStudent: id } });
    const typing = typingQuery.data[0];
    const certificate = certificates[0];

    file = file.replace("$ID", this.pad(certificate.number, 6));

    //answers
    let percentage = 0;
    student.answers.map((answer, i) => {
      i = i + 1;
      file = file.replace("$DOMANDA" + i, answer.question.text);
      let risposta =
        '<input checked type="radio" > ' +
        answer.text +
        " " +
        (answer.isCorrect == 1
          ? '<strong style="color:green; margin-left:15px;">Corretta</strong>'
          : '<strong style="color:red; margin-left:15px; ">Errata</strong>') +
        "<br>";
      file = file.replace("$RISPOSTE" + i, risposta);
      if (answer.isCorrect == 1) {
        percentage++;
      }
    });

    percentage = ((percentage / 30) * 100).toFixed(2);
    file = file.replace("$PUNTEGGIO", percentage + "%");

    //module 4 report
    if (typing != null) {
      file = file.replace(
        "$HTMLMODULOSCRITTURAVELOCE",
        '<h4 style="text-align:left">Modulo di scrittura veloce (Facoltativo) Superato.<br>Parole Corrette: ' +
          typing.correctWords +
          "<br>Parole Errate: " +
          typing.wrongWords +
          "<br>Tempo: " +
          typing.stopWatch +
          " </h4>"
      );
    } else {
      file = file.replace(
        "$HTMLMODULOSCRITTURAVELOCE",
        '<h4 style="text-align:left">Modulo di scrittura veloce (Facoltativo) non pervenuto.</h4>'
      );
    }

    //bottom of the report
    file = file.replace("$NOME", student.nome.toUpperCase());
    file = file.replace("$COGNOME", student.cognome.toUpperCase());
    file = file.replace("$NOME", student.nome.toUpperCase());
    file = file.replace("$COGNOME", student.cognome.toUpperCase());
    file = file.replace("$CF", student.codiceFiscale.toUpperCase());
    file = file.replace("$DOCUMENTO", student.numeroDocumento.toUpperCase());
    file = file.replace(
      "$DATATEST",
      moment(certificate.issuedAt).format("DD/MM/YYYY")
    );

    return file;
  }
};
