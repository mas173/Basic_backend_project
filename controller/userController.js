const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//users/register
//meothod :post
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username, !email, !password)) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    res.status(400);
    throw new Error("user already registered");
  }

  // hash passowrd
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  //sending data to the database
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    console.log("registered user :", user);
    res.status(201).send({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("please enter valid details");
  }
});

//users/login
//meothod :post
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ Token: accessToken });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

//users/current
//meothod :get
const currentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  res.send({ message: "current user info" });
});

module.exports = { registerUser, loginUser, currentUser };
