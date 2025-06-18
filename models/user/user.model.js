const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const addressSchema = require('../shared/address.schema');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    name: String,
  },
  address: addressSchema,
  identification: {
    type: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'IdentificationType' },
      name: String,
    },
    number: String,
    documentUrl: String,
  },
}, { timestamps: true });

/** 🔐 Hash password before save */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordMatch = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};


module.exports = mongoose.model('User', userSchema);
