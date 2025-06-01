 const express = require('express');
const validate_token = require('../middleware/tokenHandler');
 const Router = express.Router();

  // controllers
const getAllContact = require('../controller/contactController').getAllContact
const getContact = require('../controller/contactController').getContact


// routes handling
Router.use(validate_token);
// validate route function makes all the routes private


 Router.route("/").get(getAllContact)

 Router.route("/:id").get(getContact)

 Router.route("/").post(require('../controller/contactController').addContact)
 
 Router.route("/:id").put(require('../controller/contactController').updateContact) 

 Router.route("/:id").delete(require('../controller/contactController').deleteContact)








module.exports = Router
