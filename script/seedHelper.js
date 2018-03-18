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
    start: '01/01/2018',
    end:'01/08/2018',
    payDate: '01/08/2018',
  },{
    start: '01/09/2018',
    end:'01/15/2018',
    payDate: '01/15/2018',
  },{
    start: '01/16/2018',
    end:'01/22/2018',
    payDate: '01/22/2018',
  },{
    start: '01/23/2018',
    end:'01/29/2018',
    payDate: '01/29/2018',
  },{
    start: '01/30/2018',
    end:'02/05/2018',
    payDate: '02/05/2018',
  },{
    start: '02/06/2018',
    end:'02/12/2018',
    payDate: '02/12/2018',
  },{
    start: '02/13/2018',
    end:'02/19/2018',
    payDate: '02/19/2018',
  },{
    start: '02/20/2018',
    end:'02/26/2018',
    payDate: '02/26/2018',
  },{
    start: '02/27/2018',
    end:'03/05/2018',
    payDate: '03/05/2018',
  },{
    start: '03/06/2018',
    end:'03/12/2018',
    payDate: '03/12/2018',
  },{
    start: '03/13/2018',
    end:'03/19/2018',
    payDate: '03/19/2018',
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
