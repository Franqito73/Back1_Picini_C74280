const sessionService = require('../services/session.service');
const UserDTO = require('../dto/user.dto');
const userModel = require('../models/user.model');
const { createHash } = require('../utils/pass');
const { sendPasswordResetEmail } = require('../services/email.service');

const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await sessionService.register(userData);
    res.status(201).json({
      message: "Usuario registrado con éxito.",
      user
    });
  } catch (error) {
    console.error("Error en registerUser:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { token } = await sessionService.login(req.body);
    res.status(200).json({
      message: "Login exitoso",
      token
    });
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    res.status(401).json({ message: error.message });
  }
};

const getCurrentUser = (req, res) => {
  try {
    const userDTO = new UserDTO(req.user);
    res.status(200).json({
      message: "Usuario actual obtenido correctamente.",
      user: userDTO
    });
  } catch (error) {
    console.error("Error en getCurrentUser:", error.message);
    res.status(500).json({ message: "Error al obtener el usuario actual." });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await sendPasswordResetEmail(email);
    res.json({ message: 'Si el email está registrado, se ha enviado un enlace para restablecer la contraseña.' });
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error.message);
    res.status(500).json({ message: 'Error al procesar la solicitud.' });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    res.status(200).json({ message: "Token válido", email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar token" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    user.password = createHash(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error("Error en resetPassword:", error.message);
    res.status(500).json({ message: "Error al restablecer la contraseña." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  sendPasswordResetEmail
};
