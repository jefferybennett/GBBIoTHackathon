'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=unifiediothub.azure-devices.net;DeviceId=testVehicle1;SharedAccessKey=vbWZhKYOuzN1DR+wLLUVEUsR3qPI4BhtFA30q84q4HM=';

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
          var MessageType = "VehicleStatus";
          var Latitude = 45.748008;
          var Longitude = -108.571689;
          var VehicleSID = "1";
          var EventTimeUTC = new Date().toISOString();
          var temperature = 20 + (Math.random() * 15);
          var humidity = 60 + (Math.random() * 20);            
          var data = JSON.stringify({ deviceId: 'testVehicle1', MessageType: MessageType, Latitude: Latitude, Longitude: Longitude, 
                                      VehicleSID: VehicleSID, EventTimeUTC: EventTimeUTC, temperature: temperature, humidity: humidity });
          var message = new Message(data); 
          console.log("Sending message: " + message.getData());
          client.sendEvent(message, printResultFor('send'));
      }, 5000);
    }
  };

  client.open(connectCallback);