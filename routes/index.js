const router = require('express').Router();
const auth = require('../midllewares/auth');
const errorRouter = require('./error');

const { signinValidation, signupValidation } = require('../midllewares/validation');
const { login, createUser } = require('../controllers/users');

// Краш тест сервера
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('/', auth, errorRouter);

module.exports = router;
