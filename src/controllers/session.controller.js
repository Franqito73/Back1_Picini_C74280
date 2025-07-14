const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils/pass.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    const hashedPassword = createHash(password);

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuario registrado con éxito.",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const SECRET_KEY = 'jwtSecretFranco123';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const passwordIsValid = isValidPassword(user, password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  registerUser,
   loginUser
};