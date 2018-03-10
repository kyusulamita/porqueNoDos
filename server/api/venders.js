const router = require('express').Router();
const { Bill, Vendor } = require('../db/models');


router.get('/', (req, res, next) => {
  Vendor.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [ Bill ],
  })
    .then(Vendors => res.json(Vendors))
    .catch(next)
})


module.exports = router;
