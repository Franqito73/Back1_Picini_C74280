const express = require('express');
const router = express.Router();
const sendSMS = require('../utils/twilio');

router.get('/test-sms', async (req, res) => {
  try {
    await sendSMS('xxx', 'Holas, gracias y vuelvas prontos!');
    res.send('SMS enviado!');
  } catch (error) {
    res.status(500).send('Error al enviar el SMS');
  }
});

module.exports = router;
