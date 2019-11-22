const { Router } = require("express");
const { comments } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router.route("/").post(protect, comments.create);
router.post("/upvote/:comment_id", protect, comments.upvote);
router.post("/downvote/:comment_id", protect, comments.downvote);
router.route("/post/:post_id").get(comments.getByPost);

module.exports = router;
