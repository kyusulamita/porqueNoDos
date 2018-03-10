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

const stubTemplates = [{ rate: '13', rateType: 'HOURLY', hours: '40', start: '12/24/15', end: '12/31/15'},
                  { rate: '400', rateType: 'WEEKLY', start: '12/12/15', end: '12/19/15'}];
const billTemplates = [{ total: '213.45', date: '11/13/16' }, { total: '413.12', date: '10/12/15' }];

const Promise = require('bluebird')
const db = require('../server/db')
const {User, Vendor, Employee, Stub, Bill } = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', name:'Cody', password: '123', admin: true}),
    User.create({email: 'murphy@email.com', name:'Murphy', password: '123'}),
    User.create({email: 'admin@me.com', name: 'Alvaro', password: 'hellohi', admin: true })
  ])
  const vendors = await Promise.all([
    Vendor.create({name: 'La Michacoana', address: '1234 Some Ave', city: 'Grand Rapids', state: 'MI', zipcode: '49509', phoneNumber: '9999999'}),
    Vendor.create({name: 'Vendor 2', address: '1234 Some Ave', city: 'Grand Rapids', state: 'MI', zipcode: '49509', phoneNumber: '9999999'}),
  ])
  const employees = await Promise.all([
    Employee.create({firstName: 'Izai', lastName: 'Morales', address: '2119 Horton Ave', city: 'Grand Rapids', state: 'MI', zipcode: '49507', phoneNumber: '6167068577'}),
    Employee.create({firstName: 'Alvaro', lastName: 'Morales', address: '2119 Horton Ave', city: 'Grand Rapids', state: 'MI', zipcode: '49507', phoneNumber: '6167068577'}),
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  const stubs = await Promise.map(employees, (employee) => {
    return Promise.map(stubTemplates, (temp) => {
      return Stub.create(temp)
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

  // console.log(`${employees[0]}`)
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
