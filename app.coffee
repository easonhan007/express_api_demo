express = require('express')
path = require('path')
logger = require('morgan')
bodyParser = require('body-parser')
express_jwt = require('express-jwt')
jwt_secret = 'this is a bad secret'

routes = require('./routes/index')
auth = require('./routes/auth')
api = require('./routes/api')

app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
# app.use(express.static(path.join(__dirname, 'public')))

# app.set('views', path.join(__dirname, 'views'))
# app.set('view engine', 'jade')
app.set('x-powered-by', false)

# app.use('/', routes)
app.use(express_jwt(secret: jwt_secret).unless(path: ['/register', '/login']))
app.use('/', auth)
app.use('/api', api)


app.use (err, req, res, next) ->
  if err.name == 'UnauthorizedError'
    return res.status(401).json(msg: 'UnauthorizedError').end()

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error('Not Found')
  err.status = 404
  next err

# error handlers
#
# development error handler
# will print stacktrace

if app.get('env') == 'development'
  app.use (err, req, res, next) ->
    res.status(err.status || 500)
    res.render('error', {message: err.message, error: err})

app.use (err, req, res, next) ->
  res.status(err.status || 500)
  res.json({error: err.massage})

module.exports = app
