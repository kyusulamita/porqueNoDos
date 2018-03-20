const employeeList = [
  {
    firstName: 'Izai',
    lastName: 'Morales',
    address: '2119 Horton Ave',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(616) 570-7535'
  }, {
    firstName: 'Alvaro Obed',
    lastName: 'Morales',
    address: '2119 Horton Ave',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(XXX) XXX-XXXX'
  },{
    firstName: 'Alvaro',
    lastName: 'Morales Sr',
    address: '2717 Riley Ave',
    city: 'Wyoming',
    state: 'MI',
    zipcode: '49509',
    phoneNumber: '(616) 821-8399'
  },{
    firstName: 'Ceily',
    lastName: 'Aguilar',
    address: 'IDK',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(XXX) XXX-XXXX'
  },{
    firstName: 'Francisca',
    lastName: 'Roblero',
    address: 'IDK',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(XXX) XXX-XXXX'
  }, {
    firstName: 'Florencio',
    lastName: 'Aguilar',
    address: 'IDK',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(XXX) XXX-XXXX'
  }, {
    firstName: 'Eduard',
    lastName: 'Morales Galvez',
    address: '2119 Horton Ave',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(XXX) XXX-XXXX'
  },{
    firstName: 'Vicente',
    lastName: 'Castaneda',
    address: 'IDK',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(XXX) XXX-XXXX'
  },{
    firstName: 'Omar',
    lastName: 'Aguilar',
    address: '2119 Horton Ave',
    city: 'Grand Rapids',
    state: 'MI',
    zipcode: '49507',
    phoneNumber: '(XXX) XXX-XXXX'
  },
]
const dateHelper = [
  {
    start: '2018-01-01',
    end: '2018-01-08',
    payDate: '2018-01-08'
  },
  {
    start: '2018-01-09',
    end: '2018-01-15',
    payDate: '2018-01-15'
  },
  {
    start: '2018-01-16',
    end: '2018-01-22',
    payDate: '2018-01-22'
  },
  {
    start: '2018-01-23',
    end: '2018-01-29',
    payDate: '2018-01-29'
  },
  {
    start: '2018-01-30',
    end: '2018-02-05',
    payDate: '2018-02-05'
  },
  {
    start: '2018-02-06',
    end: '2018-02-12',
    payDate: '2018-02-12'
  },
  {
    start: '2018-02-13',
    end: '2018-02-19',
    payDate: '2018-02-19'
  },
  {
    start: '2018-02-20',
    end: '2018-02-26',
    payDate: '2018-02-26'
  },
  {
    start: '2018-02-27',
    end: '2018-03-05',
    payDate: '2018-03-05'
  },
  {
    start: '2018-03-06',
    end: '2018-03-12',
    payDate: '2018-03-12'
  },
  {
    start: '2018-03-13',
    end: '2018-03-19',
    payDate: '2018-03-19'
  }
];

const stubHelper = {
  "Izai": {
    rateType: 'WEEKLY',
    rate: '350',
  },
  "Alvaro Obed": {
    rateType: 'WEEKLY',
    rate: '400',
  },
  "Alvaro": {
    hours: '40',
    married: true,
  },
  "Ceily": {
    rate: '200',
    rateType: 'WEEKLY',
  },
  "Francisca": {
    hours: '30',
    married: true,
  },
  "Florencio": {
    rateType: 'WEEKLY',
    rate: '500',
  },
  "Eduard": {
    rateType: 'WEEKLY',
    rate: '400'
  },
  "Vicente": {
    hours: '40',
    married: true,
  },
  "Omar": {
    rateType: 'WEEKLY',
    rate: '400',
  }
}
module.exports = { employeeList, dateHelper, stubHelper };
