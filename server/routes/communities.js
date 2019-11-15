const { Router } = require("express");
const { communities } = require("../controllers");
const { protect } = require("../middlewares/authentication");

const router = Router();

router
  .route("/")
  .get(communities.getAll)
  .post(protect, communities.create);
router.get("/:community_name", communities.getByName);

module.exports = router;
