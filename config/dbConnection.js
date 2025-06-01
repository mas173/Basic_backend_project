 const mongoose = require('mongoose')

 const dbConnect = async ()=>{
  const connect  = await mongoose.connect(process.env.CONNECTION_URL)
  console.log("connection sucessful")
  console.log(connect.connection.host)
  console.log(connect.connection.name)
 }

 module.exports=dbConnect