const { Router } = require("express");
const { posts } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router
  .route("/")
  .get(posts.getAll)
  .post(protect, posts.create);
router.get("/community/:community_id", posts.getByCommunity);
router.post("/upvote/:post_id", protect, posts.upvote);

module.exports = router;
