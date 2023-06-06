const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  polySecret: { type: Array, default: [] },
  totalPeople: { type: Number, default: null },
  requiredPeople: { type: Number, default: null },
  shares: { type: mongoose.Schema.Types.Mixed, default: {} },
  isDownloaded: { type: Boolean, default: false },
});

const Secret = mongoose.model("Secret", secretSchema);

module.exports = Secret;
