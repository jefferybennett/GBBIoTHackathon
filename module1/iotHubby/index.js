'use strict';

require('dotenv').config()
var program = require('commander');
var ListHandler = require('./list.js');
var TwinUpdateHandler = require('./twinUpdate.js');
var hubbyJson = require('./hubby.json');

var iotHubCS = process.env.IOTHUB;

program
    .version('1.0.0')
    .option('-l, --login [login]', 'Specify the IoT Hub connection string rather than using one specified in the .env file.')
    .option('-q, --query [query]', 'Specify an IoT Hub SQL query to apply to any applicable operation.')
    .option('-i, --list', 'List the devices which meet the specified query criteria.')
    .option('-u, --updatetwin [updatetwin]', 'Create an IoT Hub job to update the device twin of devices.')
    .option('-d, --devicequery [devicequery]', 'Specify the name of the saved device query in the hubby.json file.')
    .option('-t, --twinupdate [twinupdate]', 'Specify the name of the save twin update JSON in the hubby.json file.')
    .option('-s, --simulate [simulate]', 'Specify the name of the simulation group in the hubby.json file.')
    .parse(process.argv);

// Handle IoT Hub connection string passed in as argument
if (program.login) {
    if (program.login != "true") {
        iotHubCS = program.login;
    }
}

// Handle list devices
if (program.list) {
    // Handle listing devices using passed-in query
    if (program.query) {
        let list = new ListHandler(iotHubCS);
        list.queryDevices(program.query);
        return 0;
    }
    // Handle listing devices by group
    else {
        if (program.devicequery) {
            let list = new ListHandler(iotHubCS);
            list.queryDevices(getDeviceQuery(program.devicequery));
            return 0;
        }
    }
}

if (program.updatetwin) {
    if (program.query) {
        //nothing
    }
    else {
        if (program.devicequery) {
            var queryText = getDeviceQuery(program.devicequery);
            if (program.twinupdate) {
                let twinUpdate = new TwinUpdateHandler(iotHubCS);
                twinUpdate.scheduleTwinUpdate(queryText, getTwinPatch(program.twinupdate));
            }
            else {
                //nothing
            }
        }
    }
}

if (program.simulate) {
    
}

// Get device sql query from hubby.json
function getDeviceQuery(name) {
    for (var x = 0; x < hubbyJson.DeviceQueries.length; x++) {
        if (hubbyJson.DeviceQueries[x].Name == name) {
            return hubbyJson.DeviceQueries[x].Query;
        }
    }
}

// Get twin patch from hubby.json
function getTwinPatch(name) {
    for (var x = 0; x < hubbyJson.TwinUpdates.length; x++) {
        if (hubbyJson.TwinUpdates[x].Name == name) {
            return hubbyJson.TwinUpdates[x].JSON;
        }
    }
    throw new Error("Update to twin not found in hubby.json file.")
}

// Get simulation group from hubby.json
function getSimulationGroup(name) {
    for (var x = 0; x < hubbyJson.SimulationGroups.length; x++) {
        if (hubbyJson.SimulationGroups[x].Name == name) {
            return hubbyJson.SimulationGroups[x];
        }
    }
    throw new Error("Update to twin not found in hubby.json file.")
}