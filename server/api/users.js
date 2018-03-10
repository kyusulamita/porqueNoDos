const router = require('express').Router();
const {User} = require('../db/models');


router.get('/', async (req, res, next) => {
  const users = await User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  }).catch(next);
  res.json(users);
})

router.get('/:userId', async(req, res, next) => {
  const user = await User.findById(req.params.userId).catch(next);
  if (!user) {
    console.log('Hello hi');
    const err = Error('User not found');
    err.status = 404;
    next(err);
  }
  res.json(user)
});


module.exports = router;
