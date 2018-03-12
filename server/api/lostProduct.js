const router = require('express').Router();
const { LostProduct , User } = require('../db/models');


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
 const productWithUser = await LostProduct.findById(req.params.lostProductId, { include: [ User ]})
    .catch(next);
  res.json(productWithUser)
})

router.put('/:lostProductId', async (req, res, next) => {
  const [numOfProducts, productsAffected ] = await LostProduct.update(req.body, {
    where: { id: req.params.lostProductId },
    returning: true,
  })
    .catch(next);
   res.json(productsAffected[0]);
})

router.delete('/:lostProductId', (req, res, next) => {
  const productsDeleted = LostProduct.destroy({
    where: { id: req.params.lostProductId}
  }).catch(next);
  res.send(`Succesfully deleted ${productsDeleted.length} product => ${req.params.lostProductId}`)
})

module.exports = router;
