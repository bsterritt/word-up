let express = require('express'),
  path = require('path'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session');

  const app = express();
  const wordRoute = express.Router();

  const myDb = require('./database/db');

/*
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({   
    secret: 'belligerent wookie',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
  }));
*/


const apiBase = '/api';

const answersRoute = require('./routes/answers.routes');
const answerRoute = require('./routes/answer.routes');
const checkAnswerRoute = require('./routes/checkAnswer.routes');
const saveAnswerRoute = require('./routes/saveAnswer.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

console.log(`connecting to mongoDB at ${myDb.url}`);


// load built ng app
//app.use(express.static(path.join(__dirname, 'dist/angular-words')));

app.use(
  session({
    secret: 'belligerent wookie',
    resave: false,
    saveUninitialized: false,
    store: new (require('express-sessions'))({
      storage: myDb.storage,
      instance: mongoose,
      host: myDb.host,
      port: myDb.port,
      db: myDb.db,
      collection: 'sessions',
      expire: 86400
    })
}));

// API root
app.use(apiBase, answersRoute);
app.use(apiBase, answerRoute);
app.use(apiBase, checkAnswerRoute);
app.use(apiBase, saveAnswerRoute);

wordRoute.route('/').get((req,res) => {
  res.sendFile(path.join(__dirname, '../dist/word-up/index.html'));
});

wordRoute.route('/:fileName.:fileExt').get((req,res) => {
  res.sendFile(path.join(__dirname, `../dist/word-up/${req.params.fileName}.${req.params.fileExt}`));
});

app.use(wordRoute);

// PORT
const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log('Listening on port ' + port)
});


  /* 

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/word-up/index.html'));
  });

  */
  
// 404 Handler
app.use((req, res, next) => {
  console.log('unmacthed route ' + req.url);       
  res.status(404).send('Unable to find the requested resource!');
});
  
// Base Route
/*
app.get('/', (req, res) => {

  res.send('invaild endpoint');
});
*/  

  
  
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});