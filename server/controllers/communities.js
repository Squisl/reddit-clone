const { Communities } = require("../models");

const create = async (req, res) => {
  const { name } = req.body;
  const newCommunity = await Communities.create({ name, user: req.user._id });
  res.status(201).send(newCommunity);
};

module.exports = {
  create
};
