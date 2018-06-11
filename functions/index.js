'use strict';
const functions = require('firebase-functions');

exports.conversationComponent = functions.https.onRequest((req, res) => {
  res.send("hello from request");
});

/*
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

// to send form data in body
server.use(bodyParser.json());

// to access assets like images
// server.use(express.static('public'));

server.post('/', app);
server.get('/', app);

server.listen(8010, () => {
  console.log('Example server listening on port 8010!')
});
*/
