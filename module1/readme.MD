# Module 1

## Set-Up IoT Hub, Device Provisioning Service

After first creating a new Resource Group, first create an instance of Azure IoT Hub and then an instance of the Device Provisioning Service (DPS).

Once both services have provisioned, link the IoT Hub instance in the new DPS instance.

## Understanding the Device Provisioning Service (DPS)

DPS is designed to enable devices which are not yet registered to communicate with a particular Azure IoT Hub instance (non-provisioned) or
which need to be re-gistered (re-provisioned) to do securely any where in the world.

To be provisioned, a device must be able to attest (prove via cryptographic evidence) that it's part of a group or individual enrollment in DPS.

Click [here](https://docs.microsoft.com/en-us/azure/iot-dps/about-iot-dps) for a more detailed overview of DPS.

Click [here](https://azure.microsoft.com/en-us/blog/device-provisioning-identity-attestation-with-tpm/) for a detailed overview of TPM's, or 
[here](https://azure.microsoft.com/en-us/blog/device-provisioning-a-manufacturing-timeline-for-tpm-devices/) to better understand TPM in the
device manufacturing process.

## Enroll and Simulate Device

### Enrolling
Enrollment is the first step of establishing a device's ability to be provisioned via DPS.  Enrollments can be completed manually in the 
Azure Management Portal, but in most production scenarios enrollment will occur programatically.

Select one of the following approaches to enroll a device (you can change the programming language at the top of each page in the language dropdown).

* [Enroll via x509](https://docs.microsoft.com/en-us/azure/iot-dps/quick-enroll-device-x509-csharp)
* [Enroll via TPM](https://docs.microsoft.com/en-us/azure/iot-dps/quick-enroll-device-tpm-csharp)

### Provisioning
Provisioning is the final step with DPS: a device attests to its identity to DPS, and DPS registers it with the appropriate IoT Hub instance.

Select one of the following approaches to simulate a device:

* [Simulate via x509)(https://docs.microsoft.com/en-us/azure/iot-dps/quick-create-simulated-device-x509-csharp)
* [Simulate via TPM](https://docs.microsoft.com/en-us/azure/iot-dps/quick-create-simulated-device-tpm-csharp)

## Device Twins
Each device that is registered with Azure IoT Hub has its own device twin.  Device twins have the following structure:

* Tags: Cloud-side attributes which the device never sees.
* Properties
    * Desired Properties: Attributes which we desire the device to sync to.
    * Reported Properties: Attributes reported by the device.

Click [here](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-device-twins) for a deeper explanation of IoT Hub device twins.

Complete this [tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-node-twin-getstarted) for an introduction to
setting device twins.

## Direct Methods
Direct methods represent a request-reply interaction with a device similar to an HTTPS call in that they succeed or fail immediately (after a user-specified timeout) to let the user know the status of the call.  Direct Methods are useful for use cases such as firmware updates,
reboots and many others.

Complete this [tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-node-direct-methods) for an introduction to 
direct methods.

## Jobs
Azure IoT Hub jobs enable you to send updates (via device twin or direct methods) to multiple devices at once.

Complete this [tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-node-schedule-jobs) for an introduction to Azure IoT Hub jobs.

## iotHubby
iotHubby is a sample service client script which provides a flexible method to run multiple IoT Hub device updates.


