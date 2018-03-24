/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

// const stubTemplates = [{ rate: '13', rateType: 'HOURLY', hours: '40'},
                        // { rate: '400', rateType: 'WEEKLY'}];
const billTemplates = [{ total: '213.45', date: '11/13/16' }, { total: '413.12', date: '10/12/15' }];


const Promise = require('bluebird')
const db = require('../server/db')
const {User, Vendor, Employee, Stub, Bill, LostProduct } = require('../server/db/models')
const { employeeList, dateHelper, stubHelper } = require('./seedHelper');

// console.log(employeeList);

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!


  const employees = await Promise.map(employeeList, (employee) => Employee.create(employee));

  const users = await Promise.all([
    User.create({email: 'admin@me.com', name: 'Alvaro', password: 'hellohi', adminLevel:'ADMIN' ,employeeId: 3}),
    User.create({email: 'pleb@me.com', name: 'Sula', password: 'hellohi', employeeId: 4}),

  ])

  const perdidadas = await Promise.all([
    LostProduct.create({product: 'Takis', amount: 10, price: '1.19', userId:1}),
    LostProduct.create({product: 'Tortix', amount: 23, price: '.79', userId: 1}),
    LostProduct.create({product: 'Tomato', amount: 1, price: '13.34', userId:1}),
  ]);

  const vendors = await Promise.all([
    Vendor.create({name: 'La Michacoana', address: '1234 Some Ave', city: 'Grand Rapids', state: 'MI', zipcode: '49509', phoneNumber: '9999999'}),
    Vendor.create({name: 'Vendor 2', address: '1234 Some Ave', city: 'Grand Rapids', state: 'MI', zipcode: '49509', phoneNumber: '9999999'}),
  ]);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  const stubs = await Promise.map(employees, (employee) => {
    const extraInfo = stubHelper[employee.firstName];
    return Promise.map(dateHelper, (date) => {
      return Stub.create({...date, ...extraInfo})
      .then(createdStub => {
        createdStub.setEmployee(employee);
        employee.addStub(createdStub);
      });
    })
  });

  const bills = await Promise.map(vendors, (vendor) => {
    return Promise.map(billTemplates, (template) => {
      return Bill.create(template)
        .then(createdBill => {
          createdBill.setVendor(vendor);
          vendor.addBill(createdBill);
        })
    })
  })
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${vendors.length} vendors`)
  console.log(`seeded ${employees.length} employees`)
  console.log(`seeded ${stubs.length} stubs`)
  console.log(`seeded ${bills.length} bills`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
