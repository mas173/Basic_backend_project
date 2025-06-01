const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validate_token = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("auth failed");
      } else {
        console.log(decoded);
        req.user = decoded.user;
        next();
      }

    });

    if(!token){
      res.status(401);
      throw new Error("token not found")
    }
  }

});

module.exports = validate_token;

// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");

// const validate_token = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers.Authorization || req.headers.authorization;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
//       req.user = decoded.user;
//       next();
//     } catch (err) {
//       res.status(401);
//       throw new Error("Invalid token");
//     }
//   } else {
//     res.status(401);
//     throw new Error("No token provided");
//   }
// });

// module.exports = validate_token;
