const router = require('express').Router();
const {User} = require('../db/models');
const { isLoggedIn, isAdmin, isAuthorized, adminOrSelf } = require('./utilFuncs');

router.get('/', isAdmin, async (req, res, next) => {
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

router.put('/:userId', async(req, res, next) => {
  const [numOfUsersAffected, usersAffected ] = await User.update(req.body, {
    where: { id: req.params.userId },
    returning: true,
  }).catch(next);
  res.json(usersAffected[0])
});

router.delete('/:userId', async(req, res, next) => {
  const destroyed = await User.destroy({
    where: { id: req.params.userId }
  }).catch(next);
  res.json(`${destroyed} destroyed`)
});

module.exports = router;
