// 'use strict';
var http = require('http');
var fs = require('fs');
// var iothub = require('azure-iothub');
var port = process.env.PORT || 1337;

/*
const express = require('express');
const app = express();

app.use(express.json());

var parkingInfo = [
    {id: 1, status: "a", time: "fake date1"},
    {id: 2, status: "f", time: "fake date2"},
    {id: 3, status: "f", time: "fake date3"}
];

app.get('/', (req, res) => {
    fs.readFile('Page1.html', function(err, data){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
});

app.get('/parkingInfo', (req, res) => {
    res.send(parkingInfo);
});

app.post('/parkingInfo', (req, res) => {
    var inf = {
        id: parkingInfo.length + 1,
        status: req.body.status, 
        time: req.body.time
    };
    parkingInfo.push(inf);
    res.send(inf);
});

app.put('/parkingInfo/:id', (req, res) => {
    const inf = parkingInfo.find(c => c.id === parseInt(req.params.id));
    if (!inf) res.status(404).send("The parking info with the given status was not found");

    inf.status = req.body.status;
    inf.time = req.body.time;

    res.send(inf);
});

app.get('/parkingInfo/:id', (req, res) => {
    const inf = parkingInfo.find(c => c.id === parseInt(req.params.id));
    if (!inf) res.status(404).send("The parking info with the given status was not found");
    res.send(inf);
});

app.listen(port, () => console.log("Listening on port " + port));

*/

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

pubsub
    .subscription('parking_sub')
    .on(`message`, message => { 
        try {
            var msg = JSON.parse(message.data);
            console.log("Received message with status: " + msg.status);
            var time1 = new Date(parseInt(msg.time)*1000).toString();
            /*
            const sender = {
                id: 1,
                status: msg.status, 
                time: time1
            };
            */
            // parkingInfo.push(sender);
            // console.log("Parking Info" + parkingInfo.toString());
            console.log("Received message with time: " + time1);
            // res.write("Status: " + msg.status + "\n");
            // res.write("Time: " + time + "\n");
            // $("#display").html("<br>Status: "+msg.status);
            message.ack();
        } catch (err) {
            console.log("Error occurred while processing message: " + err);
        }
    })
    .on(`error`, err => {
        console.log("Error occurred while receiving message: " + err);
    })
    .on(`close`, () => {
        console.log("subscription closed unexpectedly");
    })

http.createServer(function (req, res) {
    fs.readFile('Page1.html', function(err, data){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
}).listen(port, () => console.log("Listening on port " + port));
