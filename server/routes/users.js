const cookieParser = require("cookie-parser");
const { Router } = require("express");
const { users } = require("../controllers");
const { schemas, check } = require("../middlewares/validations");

const router = Router();

router.post("/register", check(schemas.register, "body"), users.register);
router.post("/login", check(schemas.login, "body"), users.login);
router.get("/refresh_token", cookieParser(), users.refresh_token);

module.exports = router;
