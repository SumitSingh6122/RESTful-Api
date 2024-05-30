const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();

exports.register = async (username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.createUser(username, hashedPassword, email);
};

exports.login = async (email, password) => {
  const user = await User.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};
