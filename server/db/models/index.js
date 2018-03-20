const User = require('./user');
const Employee = require('./employee');
const Stub = require('./stub');
const Vendor = require('./vendor');
const Bill = require('./bill')
const LostProduct = require('./lostProduct');


Stub.belongsTo(Employee, { onDelete: 'CASCADE' });
Employee.hasMany(Stub);

Bill.belongsTo(Vendor, { onDelete: 'CASCADE' });
Vendor.hasMany(Bill);

LostProduct.belongsTo(User, { onDelete: 'CASCADE'})


// adds an EmployeeId key to User
// ok COOL
User.belongsTo(Employee);

module.exports = {
  User,
  Employee,
  Stub,
  Vendor,
  Bill,
  LostProduct
}
