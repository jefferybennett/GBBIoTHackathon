'use strict';
  
var uuid = require('uuid');
var JobClient = require('azure-iothub').JobClient;
var jobClient;

class TwinUpdate {
    constructor(iotHubCS) {
        this.iotHubCS = iotHubCS;
        this.startTime = new Date();
        this.maxExecutionTimeInSeconds = 3600;
        this.jobClient = JobClient.fromConnectionString(iotHubCS);
        jobClient = this.jobClient;
    }

    async scheduleTwinUpdate(queryText, twinPatch) {

        var twinJobId = uuid.v4();
        var result;

        console.log(JSON.stringify(twinPatch));

        this.jobClient.scheduleTwinUpdate(twinJobId, queryText, twinPatch, this.startTime, this.maxExecutionTimeInSeconds,
            function(err) {
                if (err) {
                    console.error('Could not schedule twin update job: ' + err.message);
                } else {
                    monitorJob(twinJobId, jobClient, function(err, result) {
                        if (err) {
                            console.error('Could not monitor twin update job: ' + err.message);
                        } else {
                            console.log(JSON.stringify(result, null, 2));
                        }
                    });
                }
        });
    }
}

function monitorJob(jobId, jobClient, callback) {
    var jobMonitorInterval = setInterval(function() {
        jobClient.getJob(jobId, function(err, result) {
            if (err) {
                console.error('Could not get job status: ' + err.message);
            } else {
                console.log('Job: ' + jobId + ' - status: ' + result.status);
                if (result.status === 'completed' || result.status === 'failed' || result.status === 'cancelled') {
                    clearInterval(jobMonitorInterval);
                    callback(null, result);
                }
            }
        });
    }, 5000);
}

module.exports = TwinUpdate;