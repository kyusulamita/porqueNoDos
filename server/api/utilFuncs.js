const isLoggedIn  = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    const error = new Error('Not allowed!!')
    error.status = 401
    next(error)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    const error = new Error('Must have admin privileges')
    error.status = 401
    next(error)
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
