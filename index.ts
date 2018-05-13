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

// Route
app.use('/api/record', (req, res) => {
  airBase('Table 1').create(req.body, { typecast: true }, (err: any, record: any) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(record.getId());
  });
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on port ${port}`);
