const User = require('./user');
const Employee = require('./employee');
const Stub = require('./stub');
const Vendor = require('./vendor');
const Bill = require('./bill')
const LostProduct = require('./lostProduct');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Stub.belongsTo(Employee, { onDelete: 'CASCADE' });
 Employee.hasMany(Stub);

Bill.belongsTo(Vendor, { onDelete: 'CASCADE' });
Vendor.hasMany(Bill);

LostProduct.belongsTo(User, { onDelete: 'CASCADE'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


module.exports = {
  User,
  Employee,
  Stub,
  Vendor,
  Bill,
  LostProduct
}
