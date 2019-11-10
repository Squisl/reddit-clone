const mongoose = require("mongoose");

const connect = (url, options = {}) =>
  mongoose.connect(url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

module.exports = connect;
