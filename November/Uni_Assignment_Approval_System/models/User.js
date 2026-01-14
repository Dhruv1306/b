const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // admin email
  password: { type: String, required: true }, // bcrypt hashed password
  role: { type: String, default: "admin" }, // role, default admin
  createdAt: { type: Date, default: Date.now }, // record created time
});

// Hash password before saving if modified
UserSchema.pre("save", async function (next) {
  // use function() so `this` is the document
  if (!this.isModified("password")) return next(); // skip if password not changed
  try {
    const saltRounds = 12; // bcrypt cost factor (10-12 common). Higher -> more CPU work -> slower but stronger.
    const hashed = await bcrypt.hash(this.password, saltRounds); // hash password with saltRounds
    this.password = hashed; // store hash
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare plaintext password with stored hash
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // returns Promise<boolean>
};

module.exports = mongoose.model("User", UserSchema);
