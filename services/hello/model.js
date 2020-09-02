"use strict";

const axios = require("axios");

class Model {
  constructor() {
    // pass
  }

  helloWorld(str) {
    return str || "Hello World!";
  }
}

module.exports = Model;
