const router = require('express').Router();
const { Stub, Employee } = require('../db/models');


router.get('/', (req, res, next) => {
  Stub.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [ Employee ],
  })
    .then(stubs => res.json(stubs))
    .catch(next)
})


module.exports = router;
