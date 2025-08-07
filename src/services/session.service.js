const userModel = require('../models/user.model.js');
const { createHash, isValidPassword } = require('../utils/pass.js');
const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.JWT_SECRET || 'jwtSecretFranco123';

const register = async ({ first_name, last_name, email, age, password,phoneNumber }) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error('El usuario ya existe.');
  }

  const hashedPassword = createHash(password);
  const newUser = new userModel({
    first_name,
    last_name,
    email,
    age,
    password: hashedPassword,
    phoneNumber
  });

  await newUser.save();

  return {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
    phoneNumber: newUser.phoneNumber
  };
};

const login = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error('Usuario no encontrado');

  const isPasswordValid = isValidPassword(user, password);
  if (!isPasswordValid) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  return { token };
};

module.exports = { register, login };
