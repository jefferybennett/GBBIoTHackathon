'use strict';

var iothub = require('azure-iothub');

class List {
    constructor(iotHubCS) {
        this.iotHubCS = iotHubCS;
        this.registry = iothub.Registry.fromConnectionString(iotHubCS);
    }

    queryDevices(queryText) {
        var query = this.registry.createQuery(queryText, 100);
        query.nextAsTwin(function(err, results) {
            if (err) {
                console.error('Failed to fetch the results: ' + err.message);
            } else {
                console.log("Results: " + results.map(function(twin) {return twin.deviceId}).join(','));
            }
        });
    }
}

module.exports = List;
