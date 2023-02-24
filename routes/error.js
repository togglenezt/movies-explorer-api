const router = require('express').Router();

const NotFoundError = require('../errors/notFoundError');
const { errorMessages } = require('../utils/errorMessage');

// eslint-disable-next-line no-unused-vars
router.all('*', (req, res) => {
  throw new NotFoundError(errorMessages.universalNotFoundError);
});

module.exports = router;
