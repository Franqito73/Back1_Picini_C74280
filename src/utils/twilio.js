const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
    console.log('Mensaje enviado:', message.sid);
  } catch (error) {
    console.error('Error al enviar SMS:', error.message);
  }
};

module.exports = sendSMS;
