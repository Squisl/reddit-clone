const { Communities } = require("../models");

const create = async (req, res) => {
  const { name } = req.body;
  try {
    const newCommunity = await Communities.create({ name, user: req.user._id });
    res.status(201).send(newCommunity);
  } catch (e) {
    console.error(e);
  }
};

const getAll = async (_, res) => {
  try {
    const allCommunities = await Communities.find();
    res.send(allCommunities);
  } catch (e) {
    console.error(e);
  }
};

const getByName = async (req, res) => {
  try {
    const community = await Communities.find({
      name: new RegExp(`^${req.params.community_name}`, "i")
    });
    res.send(community);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  getAll,
  getByName
};
