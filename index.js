const express = require('express');
const bodyParser = require('body-parser');
const api = require('./src/api');

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use('/api/v1', api);

app.listen(port, () => console.log(`App listening on port ${port}`));

