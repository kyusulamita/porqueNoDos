const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
module.exports = app


if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

/*
req: {
  ...,
  session: {
    sId: //
    passport: {
      user: userId
    }
  }
}
*/

/*
  const userId = req.session.passport.user;
  const user = await user.findById(userId);

  req.user = user;
  
*/


passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  app.use((req, res, next) => {
    console.log("BEFORE SESSION");
    console.log(req.sessionID);
    console.log(req);
    console.log(req.session);
    console.log(req.user);
    next();
  })


  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use((req, res, next) => {
    console.log("AFTER SESSION SESSION");
    console.log(req.sessionID);
    console.log(req.session);
    // console.log(req.user);
    next();
  })
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    console.log("AFTER PASSPORT SESSION SESSION");
    console.log(req.sessionID);
    console.log(req.session);
    // console.log(req.user);
    next();
  })

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // sends index.html
  app.use('*', (req, res) => {
    // console.log(req.sessionID, req.session);
    // console.log(req.user);
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}
