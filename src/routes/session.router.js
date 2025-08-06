const  {Router}  = require ('express');
const sessionController  = require ('../controllers/session.controller.js');
const passport = require('passport');

const router = Router();

router.post('/signup', sessionController.registerUser);

router.post('/login', sessionController.loginUser);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

router.post('/forgot-password', sessionController.forgotPassword);

router.get('/reset-password/:token', sessionController.verifyResetToken);

router.post('/reset-password/:token', sessionController.resetPassword);

module.exports = router;
