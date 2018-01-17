require('dotenv').config()
const express       = require  ('express');
const path          = require  ('path');
const logger        = require  ('morgan');
const cookieParser  = require  ('cookie-parser');
const bodyParser    = require  ('body-parser');
const mongoose      = require  ('mongoose')
const cors          = require('cors');

const index         = require  ('./routes/index');
const users         = require  ('./routes/users');
const props         = require  ('./routes/props');

const app = express();
app.use(cors())


// Mongo DB with Atlas Server
const dbName = 'proplisting';
const atlasdbURL  = `mongodb://wahibhacktiv8:${process.env.DB_PASSWORD}@wahib-hacktiv8-shard-00-00-uyl7c.mongodb.net:27017,wahib-hacktiv8-shard-00-01-uyl7c.mongodb.net:27017,wahib-hacktiv8-shard-00-02-uyl7c.mongodb.net:27017/${dbName}?ssl=true&replicaSet=wahib-hacktiv8-shard-0&authSource=admin`;
mongoose.connect(atlasdbURL);
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers 
app.use('/', index);
app.use('/users', users);
app.use('/props', props);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(err)
});

module.exports = app;
