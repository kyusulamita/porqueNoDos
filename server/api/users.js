const router = require('express').Router();
const {User} = require('../db/models');


router.get('/', async (req, res, next) => {
  const users = await User.findAll({
    attributes: ['id', 'email', 'name', 'adminLevel', 'employeeId']
  }).catch(next);
  res.json(users);
})

router.get('/:userId', async(req, res, next) => {
  const user = await User.findById(req.params.userId, { attributes: ['id', 'email', 'name', 'adminLevel', 'employeeId'] }).catch(next);
  if (!user) {
    console.log('Hello hi');
    const err = Error('User not found');
    err.status = 404;
    next(err);
  }
  res.json(user)
});


module.exports = router;
