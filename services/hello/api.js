"use strict";

const status = require("http-status");
const Model = require("./model");

module.exports = async function(app, prefix) {
  const model = new Model();

  app.get(prefix + "/:text", (req, res) => {
    const text = model.helloWorld(req.params.text);
    console.log(text);
    res.status(status.OK).json(text);
    return res;
  });
};
