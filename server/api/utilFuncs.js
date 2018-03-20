const isLoggedIn  = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    const error = new Error('Not allowed!!')
    error.status = 401
    next(error)
  }
}

// use in api calls that only ADMIN can access
const isAdmin = (req, res, next) => {
  if (req.user.adminLevel === 'ADMIN') {
    next()
  } else {
    const error = new Error('Must have admin privileges')
    error.status = 401
    next(error)
  }
}

// use in API Calls where WRITE or ADMIN can access
const isAuthorized = (req, res, next) => {
  if (req.user.adminLevel === 'ADMIN' || req.user.adminLevel === 'WRITE'){
    next();
  } else {
    const error = new Error('Must have admin or write privileges')
    error.status = 401
    next(error)
  }
}

const adminOrSelf = (req, res, next) => {
  if (req.user.adminLevel === 'ADMIN'){
    next();
  } else if ((req.params.employeeId) && (+req.params.employeeId === +req.user.employeeId)){
        next();
  } else if ((req.params.stubId) && (+req.paystub.employeeId === +req.user.employeeId)){
    next();
  } else {
    const error = new Error('Must have admin privileges or be the employee')
    error.status = 401
    next(error)
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isAuthorized,
  adminOrSelf
};
