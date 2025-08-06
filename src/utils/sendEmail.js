const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Franco" <${process.env.EMAIL_USER}>`,
    to: 'franco.picini@hotmail.com',
    subject: 'Correo de prueba',
    html:
    `<div>
    <h1>Esto es una prueba, vuelvas prontos</h1>
    </div>`
  });
};

module.exports = sendEmail;
