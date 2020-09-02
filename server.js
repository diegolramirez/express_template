"use strict";

class Server {
  constructor() {
    // pass
  }

  start() {
    const fs = require("fs");
    // external dependencies
    const express = require("express");
    const bodyParser = require("body-parser");
    const helmet = require("helmet");

    // express y middlewares init
    this.app = express();
    this.app.use(helmet());

    // config bodyParser
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    this.app.use(bodyParser.text());
    this.app.use(
      bodyParser.json({
        type: "application/json",
        limit: "20mb"
      })
    );

    // //documentacion
    // this.app.use("/", express.static("doc"));
    // //Se incorpora carpeta para las imagenes
    // this.app.use("/", express.static("files"));

    // APIs init
    let dirServices = "./services";
    let dirss = fs.readdirSync(dirServices);
    for (let i = 0; i < dirss.length; i++) {
      let path = dirss[i];
      let pathTabla = `${dirServices}/${path}`;
      let pathApi = `${pathTabla}/api.js`;
      if (fs.lstatSync(pathTabla).isDirectory() && fs.existsSync(pathApi)) {
        let api = require(pathApi);
        api(this.app, `/meli_scrapper/${path}`);
      }
    }

    // server init
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Sever initialized in env: ${process.env.NODE_ENV ||
          "test"} and port: ${process.env.PORT || 3000}`
      );
    });
  }

  close() {
    this.app.close();
    this.appPublico.close();
  }
}

module.exports = new Server();
