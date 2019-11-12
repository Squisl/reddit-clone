const { Router } = require("express");
const { posts } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router
  .route("/")
  .get(posts.getAll)
  .post(protect, posts.create);

module.exports = router;
