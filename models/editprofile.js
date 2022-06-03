const mongoose = require("mongoose");

const editprofileSchema = new mongoose.Schema({
      fname: {
        type: String,
        required: true
      },
      lname: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
     city: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      image: {
        data: Buffer,
        contentType: String
      },
      date: {
        type: Date,
        default: Date.now
      }
});
 const product = mongoose.model("profile", editprofileSchema);

 module.exports = product;