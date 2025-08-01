const sessionService = require('../services/session.service');

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

module.exports = {
  registerUser,
  loginUser
};
