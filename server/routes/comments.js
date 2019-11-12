const { Router } = require("express");
const { comments } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router.route("/").post(protect, comments.create);

module.exports = router;
