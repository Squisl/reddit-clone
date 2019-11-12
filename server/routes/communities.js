const { Router } = require("express");
const { communities } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router.route("/").post(protect, communities.create);

module.exports = router;
