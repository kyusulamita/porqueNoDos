const router = require('express').Router();
const { LostProduct , User } = require('../db/models');

router.param('lostProductId', async (req, res, next, id) => {
  const lostProduct = await lostProduct.findById(id, {
    include: [ { model: User , attributes: ['name', 'id']}]
  }).catch(next);
  if (!lostProduct){
    const err = Error('Lost product not found')
    err.status = 404;
    throw err;
  }
  req.lostProduct = lostProduct;
  next();
})


router.get('/', async (req, res, next) => {
  const lostProducts = await LostProduct.findAll({
    include: [ { model: User, attributes: ['name', 'id'] }],
  })
  .catch(next);
  res.json(lostProducts);
})

router.post('/', async (req, res, next) => {
  const createdLostProduct = await LostProduct.create(req.body)
    .catch(next);
  res.json(createdLostProduct)
})

router.get('/:lostProductId', async (req, res, next) => {
  res.json(req.lostProduct);
})

router.put('/:lostProductId', async (req, res, next) => {
  const updatedStub = await req.lostProduct.update(req.body)
    .catch(next);
  const reloadedStub = await updatedStub.reload({
    include: [ { model: User , attributes: ['name', 'id']}]
  }).catch(next)
  res.json(reloadedStub);
})

router.delete('/:lostProductId', async (req, res, next) => {
  const productsDeleted = await req.lostProduct.destroy().catch(next);
  res.send(`Destroyed ${productsDeleted}`)
})

module.exports = router;
