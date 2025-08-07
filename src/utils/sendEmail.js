const transporter = require('./nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Franco" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar correo:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
