var msg;

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

pubsub
    .subscription('parking_sub')
    .on(`message`, message => { 
        try {
            msg = JSON.parse(message.data);
            console.log("Thing received and IT's WORKING");
            console.log("Received message with status: " + msg.status);
            var time = new Date(parseInt(msg.time)*1000).toString();
            console.log("Received message with time: " + time);
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

$(document).ready(function(){
    $("#refresh").click(function(){
        $("#display").html(msg);
        alert("button has been clicked");
    });
});