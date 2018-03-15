const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/bills', require('./bills'));
router.use('/employees', require('./employees'));
router.use('/stubs', require('./stubs'));
router.use('/vendors', require('./vendors'));
router.use('/lostproducts', require('./lostProduct'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
