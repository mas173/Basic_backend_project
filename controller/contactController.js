const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsSchema");
//@desc get contacts
//@route GET  /api/contacts
// @public

const getAllContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id})

console.log(req.user.id)
  // const contacts = await Contact.find({user_id:req.user.id});

  res.status(200).json(contacts);
});

//@desc get contact
//@route GET  /api/contacts/id
// @public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

//@desc add contacts
//@route post  /api/contacts
// @public
const addContact = asyncHandler(async (req, res) => {
  // console.log(req.user)
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory !");
  }

  const contact = await Contact.create({ 
    name, 
    email,
     phone,
     user_id:req.user.id});
  res.status(201).json(contact);
});
//@desc delete contacts
//@route delete  /api/contacts/id
// @public
const deleteContact = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found ..!")
  }
if(contact.user_id.toString() !== req.user.id){
  res.status(401);
  throw new Error("Access denied to delete");
}else
{ const deletedDoc =await  Contact.findByIdAndDelete(req.params.id,{projection:{name: 1,email:1}})
res.status(200).json(deletedDoc)
}
});

//@desc update contacts
//@route put  /api/contacts/id
// @public
const updateContact = asyncHandler(async (req, res) => {
const contact = await Contact.findById(req.params.id)
if(!contact){
  res.status(404);
  throw new Error("contact not found");
}

if(contact.user_id.toString() !== req.user.id ){
  res.status(401);
  throw new Error("dont have permission to update")

}else{
    const UpdatedContact =await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.status(200).json(UpdatedContact);}

});

module.exports = {
  getAllContact,
  getContact,
  addContact,
  deleteContact,
  updateContact,
};
