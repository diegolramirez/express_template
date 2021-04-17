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
    const morgan = require("morgan");

    // express y middlewares init
    this.app = express();
    this.app.use(helmet());
    this.app.use(morgan("combined"));

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

    // documentacion
    const swaggerJsDoc = require("swagger-jsdoc");
    const swaggerUi = require("swagger-ui-express");
    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          version: "1.0.0",
          title: "Express Template",
          description: "Express template for server repos",
          contact: {
            name: "Diegol Ramírez-Milano"
          },
          servers: ["http://localhost:3000"]
        }
      },
      apis: ["services/*/api.js"]
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // APIs init
    let dirServices = "./services";
    let dirss = fs.readdirSync(dirServices);
    for (let i = 0; i < dirss.length; i++) {
      let path = dirss[i];
      let pathTabla = `${dirServices}/${path}`;
      let pathApi = `${pathTabla}/api.js`;
      if (fs.lstatSync(pathTabla).isDirectory() && fs.existsSync(pathApi)) {
        let api = require(pathApi);
        api(this.app, `/express_template/${path}`);
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
  }
}

module.exports = new Server();
