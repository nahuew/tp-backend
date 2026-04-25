const express = require("express");
const router = express.Router();

const {
  getLoginsView,
  postLogin
} = require("../controllers/loginController");


router.get("/", getLoginsView);
router.post("/", postLogin);


// logout


module.exports = router;