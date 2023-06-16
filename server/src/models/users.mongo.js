const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photoUrl: {type: String, required: true}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
