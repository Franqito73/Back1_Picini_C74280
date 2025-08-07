const sendEmail = require('../utils/sendEmail');

async function sendPasswordResetEmail(email) {
  const htmlContent = `
    <p>Hola, haz clic <a href="http://localhost:8000/reset-password">aquí</a> para restablecer tu contraseña.</p>
  `;

  await sendEmail({
    to: email,
    subject: 'Restablecer contraseña',
    html: htmlContent,
  });
}

module.exports = {
  sendPasswordResetEmail,
};
