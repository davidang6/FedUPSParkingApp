// 'use strict';
var http = require('http');
var fs = require('fs');
// var iothub = require('azure-iothub');
var port = process.env.PORT || 1337;

//var connectionString = 'HostName=FedUPS.azure-devices.net;SharedAccessKeyName=FedUPS-iot-hub;SharedAccessKey=aA06gd7aqFKjbG9xOshttDRI36eh1fBcpgNLwtFc1eY=';

//var registry = iothub.Registry.fromConnectionString(connectionString);

/*
var device = {
    deviceId: 'sample-device-' + Date.now()
};
*/

/*
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

pubsub.getSubscriptions(function(err, subscriptions){
    subscriptions.forEach(subscription => console.log(subscription.name));
})
*/

pubsub
  .subscription('parking_sub')
  .on(`message`, message => {
    try {
      const msg = JSON.parse(message.data);
      const deviceId = msg.deviceID;
      console.log(`Received message with ID: ${message.id}`);
      message.ack();
    } catch (err) {
      console.log(`Error ocurred while processing message: ${err}`);
    }
  })
  .on(`error`, err => {
    console.log(`Error ocurred while receiving message: ${err}`);
  })
  .on('close', () => {
    lconsole.log(`subscription closed unexpectedly`);
  })

http.createServer(function (req, res) {
    fs.readFile("Page1.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.write(Date());
        res.end('Hello World\n');
    });
}).listen(port, () => {
    console.log("running on port" + port);
});