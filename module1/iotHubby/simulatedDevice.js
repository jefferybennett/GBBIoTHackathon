'use strict';

const RUNSTATUS_ON = 1, RUNSTATUS_OFF = 0;

class SimulatedDevice {
    constructor(iotHubCS, deviceConfig) {
        this.iotHubCS = iotHubCS;
        this.deviceConfig = deviceConfig;
        this.runStatus = RUNSTATUS_OFF;
    }

    async Start() {
        this.runStatus = RUNSTATUS_ON;
    }

    async Stop() {
        this.runStatus = RUNSTATUS_OFF;
    }
}

function StartSimulation(this) {
    
}

module.exports = SimulatedDevice;