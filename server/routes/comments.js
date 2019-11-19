const { Router } = require("express");
const { comments } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router.route("/").post(protect, comments.create);
router.get("/post/:post_id", comments.getByPost);

module.exports = router;
