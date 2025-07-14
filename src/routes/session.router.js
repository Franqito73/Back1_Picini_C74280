const  {Router}  = require ('express');
const {registerUser, loginUser}  = require ('../controllers/session.controller.js');
const passport = require('passport');

const router = Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
