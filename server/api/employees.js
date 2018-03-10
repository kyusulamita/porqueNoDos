const router = require('express').Router();
const { Employee, Stub} = require('../db/models');


router.get('/', (req, res, next) => {
  Employee.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [ Stub ],
  })
    .then(employees => res.json(employees))
    .catch(next)
})


router.get('/:employeeId', (req, res, next) => {
  Employee.findById(req.params.employeeId, {

  })
})

module.exports = router;
