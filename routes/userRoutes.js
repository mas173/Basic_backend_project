const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controller/userController');
const validate_token = require('../middleware/tokenHandler');

const router = express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",validate_token,currentUser)


module.exports = router;