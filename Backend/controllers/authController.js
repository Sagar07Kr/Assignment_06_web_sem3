const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const tokenBanao = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    const pehleSeUser = await User.findOne({ email });

    if (pehleSeUser) {
      return res.status(400).json({
        message: 'Email already registered'
      });
    }

    const nayaUser = await User.create({
      name,
      email,
      password,
      role: 'student',
      phone
    });

    const token = tokenBanao(nayaUser);

    res.status(201).json({
      message: 'Registration successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const passwordSahiHai = await bcrypt.compare(password, user.password);

    if (!passwordSahiHai) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = tokenBanao(user);

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  getMe
};