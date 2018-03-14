/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {default as EmployeeList } from './employee/employeeList';
export {default as EmployeeDetail } from './employee/employeeDetail';
export {default as VendorList } from './vendor/vendorList';
export {default as VendorDetail } from './vendor/vendorDetail';
export {default as PaystubDetail } from './paystub/paystubDetail';
export {default as LostProductList } from './lostProduct/lostProductList';
export {default as PaystubList } from './paystub/paystubList';
