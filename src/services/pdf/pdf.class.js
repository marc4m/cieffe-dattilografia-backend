const fs = require("fs");
const moment = require("moment");

const { NotAuthenticated } = require("@feathersjs/errors");

/* eslint-disable no-unused-vars */
exports.Pdf = class Pdf {
  constructor(options) {
    this.options = options || {};
    this.html = fs.readFileSync(
      "./template/cieffe/attestato/attestatoPdf.html",
      "utf8"
    );
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
    const { user, permitted } = params;

    const certificates = this.app.service("certificates");
    const partnerService = this.app.service("partner");
    const result = await certificates.get(id, { query: { $eager: "student" } });
    const student = result.student;
    const partner = await partnerService.get(student.idPartner);
    let partnerLogo = partner.blobLogo;
    let file = this.html;
    let now = moment().format("DD/MM/YYYY");

    if (!permitted) {
      // Controllo se sono lo studente (deve essere il mio il certificato)
      if (user.student && user.student.idUtente !== student.idUtente) {
        throw new NotAuthenticated();
      }

      // Nel caso sono partner, ma non di questo studente
      if (user.partner && user.partner.idUtente !== partner.idUtente) {
        throw new NotAuthenticated();
      }
    }

    file = file.replace("$NOME", student.nome.toUpperCase());
    file = file.replace("$COGNOME", student.cognome.toUpperCase());
    file = file.replace("$CITTA", student.comuneNascita.toUpperCase());
    file = file.replace("$CF", student.codiceFiscale.toUpperCase());
    file = file.replace(
      "$DATA",
      moment(student.dataNascita).format("DD/MM/YYYY")
    );
    file = file.replace("$PROTOCOLLO", this.pad(result.number, 6));
    file = file.replace(
      "$DATARILASCIO",
      moment(result.createdAt).format("DD/MM/YYYY")
    );
    file = file.replace(
      "$datasuperamento",
      moment(result.createdAt).format("DD/MM/YYYY")
    );
    file = file.replace("XXXXXXX", now);
    if (partnerLogo != null) {
      file = file.replace(
        "$PARTNERLOGO",
        '<img style="margin-left: 10px; margin-top: 15px;" height="150" width="250" src="data:image/jpg;base64, ' +
          partnerLogo +
          '"></img>'
      );
    } else {
      file = file.replace(
        "$PARTNERLOGO",
        "<br><br><br><br><br><br><br><br><br><br>"
      );
    }
    return file;
  }
};
