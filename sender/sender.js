#!/usr/bin/env node

var http = require('http');
var amqp = require('amqplib/callback_api');
var counter = 1;

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  //    amqp.connect('amqp://192.168.56.101', function(err, conn) {
  amqp.connect('amqp://rabbitqueue', function (err, conn) {
    conn.createChannel(function (err, ch) {
      if (ch !== undefined) {
        var q = 'hello';
        var msg = 'Hello world ' + counter++;

        ch.assertQueue(q, { durable: false });
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer(msg));

        res.end('Sent messsage to RabbitMq');
  
        console.log(" [x] Sent %s", msg);
      } else {
        res.end('Channel could not be obtained');
      }
    });
    setTimeout(function () { conn.close(); }, 500);
  });
});

server.listen(1337, '0.0.0.0');
