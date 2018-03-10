const router = require('express').Router();
const { Employee, Stub} = require('../db/models');


router.get('/', async (req, res, next) => {
  const employees = await Employee.findAll({
    include: [ { model: Stub, attributes: ['start', 'end', 'pay']} ],
  }).catch(next);
  res.json(employees)
})

router.post('/', async (req, res, next) => {
  const createdEmployee = await Employee.create(req.body).catch(next);
  res.json(createdEmployee)
})

router.get('/:employeeId', async (req, res, next) => {
  const employeeWithStubs = await Employee.findById(req.params.employeeId, {
    include: [ Stub ]
  }).catch(next);
  res.json(employeeWithStubs)
})

router.put('/:employeeId', async (req, res, next) => {
  const [rowAffected, employeesAffected ] = await Employee.update(req.body, {
    where: { id : req.params.employeeId },
    returning: true
  }).catch(next);
  res.json(employeesAffected[0]);
})

router.delete('/:employeeId', async(req, res, next) => {
  const employeesDeleted = await Employee.destroy({
    where: { id: req.params.employeeId }
  }).catch(next)
  res.json(employeesDeleted);
})

module.exports = router;
