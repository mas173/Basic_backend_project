const express = require("express");
const detenv = require("dotenv").config();
const App = express();
const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT;
const Router = require("./routes/contactRoute");
const dbConnect = require("./config/dbConnection");

//body parser to accept the data in the body sent by the user
dbConnect()
App.use(express.json());
App.use("/api/contacts", Router);
App.use("/api/users",require("./routes/userRoutes"))
App.use(errorHandler);
App.listen(port, () => {
  console.log(`server started on ${port}`);
});
