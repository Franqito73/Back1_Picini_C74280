const transporter = require('../utils/nodemailer');

async function sendPasswordResetEmail(email) {
  const mailOptions = {
    from: `"Soporte" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Restablecer contraseña',
    html: `<p>Hola, haz clic <a href="http://localhost:8000/reset-password">aquí</a> para restablecer tu contraseña.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendPasswordResetEmail,
};
