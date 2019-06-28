// 'use strict';
var http = require('http');
var fs = require('fs');
// var iothub = require('azure-iothub');
var port = process.env.PORT || 1337;

/*
const express = require('express');
const app = express();

const parkingInfo = [];

app.get('/parkingInfo', (req, res) => {
    res.send("Hello World!");
});

app.listen(port);
*/

http.createServer(function (req, res) {
    fs.readFile('Page1.html', function(err, data){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
}).listen(port, () => {
    console.log("running on port" + port);
});