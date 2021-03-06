const { Router } = require("express");
const { posts } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router
  .route("/")
  .get(posts.getAll)
  .post(protect, posts.create);
router.route("/:post_id").get(posts.getById);
router.get("/community/:community_name", posts.getByCommunity);
router.post("/upvote/:post_id", protect, posts.upvote);
router.post("/downvote/:post_id", protect, posts.downvote);

module.exports = router;
