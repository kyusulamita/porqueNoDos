const router = require('express').Router();
const { Stub, Employee } = require('../db/models');


router.get('/', async (req, res, next) => {
  const stubs = Stub.findAll({ include: [ Employee ]})
  res.json(stubs))
})


module.exports = router;
