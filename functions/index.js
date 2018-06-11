'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

// to send form data in body
server.use(bodyParser.json());

// to access assets like images
// server.use(express.static('public'));

server.post('/', (req, res) => {
  res.send("hello from post");
});
server.get('/', (req, res) => {
  res.send("hello from get");
});

server.listen(8010, () => {
  console.log('Example server listening on port 8010!')
});

