const router = require('express').Router();
const { LostProduct , User } = require('../db/models');
const { isLoggedIn, isAdmin, isAuthorized, adminOrSelf } = require('./utilFuncs');

router.param('lostProductId', async (req, res, next, id) => {
  const lostProduct = await LostProduct.findById(id, {
    include: [ { model: User , attributes: ['name', 'id']}]
  }).catch(next);
  if (!lostProduct){
    const err = Error('Lost product not found')
    err.status = 404;
    throw err;
  } else {
    req.lostProduct = lostProduct;
  }
  next();
  return null;
})


router.get('/', isAuthorized, async (req, res, next) => {
  const lostProducts = await LostProduct.findAll({
    include: [ { model: User, attributes: ['name', 'id'] }],
  })
  .catch(next);
  res.json(lostProducts);
})

router.post('/', isAuthorized ,async (req, res, next) => {
  const createdLostProduct = await LostProduct.create(req.body)
    .catch(next);
  res.json(createdLostProduct)
})

router.get('/:lostProductId', isAuthorized , async (req, res, next) => {
  res.json(req.lostProduct);
})

router.put('/:lostProductId', isAuthorized , async (req, res, next) => {
  // console.log
  const updatedStub = await req.lostProduct.update(req.body)
    .catch(next);
  const reloadedStub = await updatedStub.reload({
    include: [ { model: User , attributes: ['name', 'id']}]
  }).catch(next)
  res.json(reloadedStub);
})

router.delete('/:lostProductId', isAuthorized, async (req, res, next) => {
  const productsDeleted = await req.lostProduct.destroy().catch(next);
  res.send(`Destroyed ${productsDeleted}`)
})

module.exports = router;
