#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var q = 'hello';
var channel = undefined;

function threadPool() {
    channel.get(q, { noAck: true }, function (err, msg) {
        if (msg !== false) {
            console.log(msg.content.toString());
        }
    });
}

function runQueue(err, ch) {
    channel = ch;

    ch.assertQueue(q, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    var myTimer = setInterval(threadPool, 1000);
}

amqp.connect('amqp://rabbitqueue', function (err, conn) {
    conn.createChannel(runQueue);
});
