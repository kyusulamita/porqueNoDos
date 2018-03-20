const router = require('express').Router();
const { Employee, Stub} = require('../db/models');
const { isLoggedIn, isAdmin, isAuthorized, adminOrSelf } = require('./utilFuncs');
// router.param('employeeId', async (req, res, next, id) => {
//   const employee = Employee.findById(req.params.employeeId, {
//     include: [ Stub ],
//   }).catch(next);
//   if (!employee){

//   }
//   req.employee = employee;
// })


router.get('/', isAdmin, async (req, res, next) => {
  const employees = await Employee.findAll({
    include: [ { model: Stub, attributes: ['rateType', 'id'] } ],
    attributes: ['firstName', 'lastName', 'phoneNumber', 'id'],
    order: ['firstName']
  }).catch(next);
  res.json(employees)
})

router.post('/', isAdmin, async (req, res, next) => {
  const createdEmployee = await Employee.create(req.body, {
    attributes: ['firstName', 'lastName', 'phoneNumber'],
  }).catch(next);
  res.json(createdEmployee)
})

router.get('/:employeeId', adminOrSelf, async (req, res, next) => {
  const employeeWithStubs = await Employee.findById(req.params.employeeId, {
    include: [ { model: Stub, order: ['start'] }]
  }).catch(next);
  res.json(employeeWithStubs)
})

router.put('/:employeeId', adminOrSelf, async (req, res, next) => {
  const [rowAffected, employeesAffected ] = await Employee.update(req.body, {
    where: { id : req.params.employeeId },
    returning: true
  }).catch(next);
  const updatedEmployee = await employeesAffected[0].reload({
    include: [ { model: Stub, order: ['start'] }]
  })
  res.json(updatedEmployee);
})

router.delete('/:employeeId', isAdmin, async(req, res, next) => {
  const employeesDeleted = await Employee.destroy({
    where: { id: req.params.employeeId }
  }).catch(next)
  res.json(employeesDeleted);
})

module.exports = router;
