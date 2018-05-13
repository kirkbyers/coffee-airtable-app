import * as airtable from 'airtable';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

const app = express();

// check for $AIRTABLE_API_KEY
if (!process.env.AIRTABLE_API_KEY) {
  console.warn('No $AIRTABLE_API_KEY set');
}

// check for $AIRTABLE_BASE
if (!process.env.AIRTABLE_BASE) {
  console.warn('No $AIRTABLE_BASE set');
}

// check for $AIRBASE_TABLE
if (!process.env.AIRTABLE_TABLE) {
  console.warn('NO $AIRBASE_TABLE set');
}

// logging
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // Set dev-mode express options
  app.use('/', morgan('tiny'));
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serve static conent
app.use(express.static('./public'));

// Airtable config
const airBase = new airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE);

const serverHTMLRes = (message: string) => `
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
</head>
<body>
  <div class="container">
    ${message}
    </div>
  <body/>
</html>
`;

// Route
app.use('/api/record', (req, res) => {
  airBase(process.env.AIRTABLE_TABLE).create(req.body, { typecast: true }, (err: any, record: any) => {
    if (err) {
      console.error(err);
      res.status(500);
      return res.send(serverHTMLRes('Airtable is not available at this time. <a href="/">Start over</a>'));
    }
    return res.send(serverHTMLRes(`Thanks for submitting a reading! <a href="/">Start over</a>`));
  });
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on port ${port}`);
