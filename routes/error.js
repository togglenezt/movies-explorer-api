const router = require('express').Router();

const NotFoundError = require('../errors/notFoundError');
const { errorMessages } = require('../utils/errorMessage');

router.all('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.universalNotFoundError));
});

module.exports = router;
