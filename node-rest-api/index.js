let express = require('express'),
  path = require('path'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const answersRoute = require('./routes/answers.routes');
const answerRoute = require('./routes/answer.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// load built ng app
//app.use(express.static(path.join(__dirname, 'dist/angular-words')));

// API root
app.use('/api', answersRoute);
app.use('/api', answerRoute);

// PORT
const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log('Listening on port ' + port)
  })
  
  // 404 Handler
  app.use((req, res, next) => {
    res.status(404).send('Unable to find the requested resource!');
  });
  
  // Base Route
  app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });
  
  /*
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/angular-words/index.html'));
  });
  */
  
  // error handler
  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });