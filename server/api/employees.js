const router = require('express').Router();
const { Employee, Stub} = require('../db/models');


router.get('/', async (req, res, next) => {
  const employees = await Employee.findAll({
    include: [ { model: Stub, attributes: ['start', 'end', 'pay']} ],
  })
  res.json(employees)
})

router.post('/', async (req, res, next) => {
  const createdEmployee = await Employee.create(req.body)
  res.json(createdEmployee)
})

router.get('/:employeeId', async (req, res, next) => {
  const employeeWithStubs = await Employee.findById(req.params.employeeId, {
    include: [ Stub ]
  })
  res.json(employeeWithStubs)
})

router.put('/:employeeId', async (req, res, next) => {
  const [rowAffected, employeesAffected ] = await Employee.update(req.body, {
    where: { id : req.params.employeeId },
    returning: true
  })
  // const employeeWeWant
  res.json(employeesAffected[0]);
})


module.exports = router;
