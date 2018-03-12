'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var messageType2 = require('./messageType2');
var messageType3 = require('./messageType3');

var connectionString = 'HostName=hachiothack-jb1.azure-devices.net;DeviceId=testRpi1;SharedAccessKey=A8VevdCXerOlb4CSZz4U88uOv7osi3GiaQJJC72iO54=';

var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
      if (err) console.log(op + ' error: ' + err.toString());
      if (res) console.log(op + ' status: ' + res.constructor.name);
    };
  }

  var connectCallback = function (err) {
    if (err) {
      console.log('Could not connect: ' + err);
    } else {
      console.log('Client connected');
  
      // Create a message and send it to the IoT Hub every second
      setInterval(function(){
          var message3 = new Message(new messageType3().getMessage());
          console.log("sending Message Type 3");
          client.sendEvent(message3, printResultFor('send'));

          var message2 = new Message(new messageType2().getMessage());
          console.log("sending Message Type 2");
          client.sendEvent(message2, printResultFor('send'));

      }, 5000);
    }
  };

  client.open(connectCallback);