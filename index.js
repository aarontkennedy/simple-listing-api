const url = require('url');
const http = require('http');
const express = require('express');
const app = express();
const port = 3000;

require('./apiRoutes.js')(app);

app.listen(port, () => {
  console.log(`Simple Listing API listening at http://localhost:${port}`);
});
