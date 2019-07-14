const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({

username: {type: String, unique: true}, //email ex. wolf@woo.com
password: {type: String},
googleID: String,
name: String, // ex. Gaz Johnson
image: String,
position: String 

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;