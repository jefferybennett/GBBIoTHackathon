# Azure IoT Hackathon

Created and maintained by the Microsoft Azure IoT Global Black Belts

>Note: This hackathon is designed for Global Black Belt Hackathons and is a work-in-progress (which is to say: there will be bugs!)

## Overview

This hands-on hacakathon is designed to provide a wide-ranging set of learning experiences leveraging various Azure service capabilities
to provide an end-to-end experience in creating an IoT solution.  The hackathon begins with a focus on the [Azure IoT Device Provisioning
Service](https://docs.microsoft.com/en-us/azure/iot-dps/about-iot-dps) and the [Azure IoT Hub Service](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-what-is-iot-hub).  Once data is acquired, various hot and cold path patterns
are explored.

## Hardware

This hackathon was primarily designed for IoT and software developers leverage a Windows 10 machine and a Raspberry Pi 3.

## Prerequisites

>Note: For the hacakthon exercises, you will need access to an Azure tenant and subscription for which you have administrative access.  Remember to delete any services you spin up at the end of the hackathon, so you won't continue to be charged for Azure consumption.

>Note: For in-person deliveries by the IoT GBBs, some of this may have been done for you.  Please check with your instructor

* Windows 10 Fall Creators Update (build 16299)

* [Visual Studio Code](https://code.visualstudio.com/)
* [.NET Core SDK](https://www.microsoft.com/net/core#windowscmd)
* [Open SSL](https://sourceforge.net/projects/openssl/)
    * for the lab instructions later, create a c:\utils folder and unzip the downloaded OpenSSL zip to c:\utils\ 
    (so you should a folder structure that looks like this->    c:\utils\OpenSSL)
* [git](https://git-scm.com/downloads/)   ** installation of the default components and default configurations are fine

### Monitoring Azure IoT Hub
Azure IoT Hub provides endpoints for its data and operational state to be monitored.  You can select from a few different clients
to monitor IoT Hub; ultimately, they're leverage the same endpoints.

* [IoT Hub Explorer](https://github.com/Azure/iothub-explorer)
    * Node.js based, you can install with the command "npm install -g iothub-explorer"
* [Windows Azure IoT Device Explorer](https://github.com/Azure/azure-iot-sdks/releases/download/2016-11-17/SetupDeviceExplorer.msi)
    * Simple Windows Form client, easy-to-use
* [Visual Code Azure IoT Hub Toolkit](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit)
    * Extension for Visual Code, provides most of the capabilities provided the above two clients.

## Raspberry Pi 3 Set-up

### Raspbian Set-up
This hackathon leverages a Raspberry Pi 3 Model B (RPI) running [Raspbian Stretch](https://www.raspberrypi.org/downloads/raspbian/).  A monitor (which supports HDMI), USB Keyboard and USB Mouse are needed to first access the RPI.  Once you've done this ...

* Update the RPI's WiFi settings to access an appropriate WiFi node.
* Open a terminal window and type the "hostname" command to determine the RPI's assigned IP address.
* Under System Preferences, enable SSH.
* From a terminal window on your PC, try the command **ssh pi@[ip address]**

### Node Js Set-up
Follow these instructions to install or update Nodejs.

* Run "sudo apt update"
* Run "apt list nodejs"
* Run "curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -"
* Run "sudo apt-get install nodejs"
* Run "node -v" and "npm -v" to ensure both Nodejs and Npm are properly installed.

### .Net Core Set-up
Use the following instructions to install .Net Core on the RPI.

* Run **sudo apt-get update**.
* Run **sudo apt-get install curl libunwind8 gettext**. This will use the apt-get package manager to install three prerequiste packages.
* Run **curl -sSL -o dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Runtime/release/2.0.0/dotnet-runtime-latest-linux-arm.tar.gz** to download the latest .NET Core Runtime for ARM32. This is refereed to as armhf on the Daily Builds page.
    * Run **sudo mkdir -p /opt/dotnet && sudo tar zxf dotnet.tar.gz -C /opt/dotnet** to create a destination folder and extract the downloaded package into it.
    * Run **sudo ln -s /opt/dotnet/dotnet /usr/local/bin** to set up a symbolic link (a shortcut to you Windows folks to the dotnet executabl
* Test the installation by typing dotnet --help.

### Installing Node.js

Node is utilized in some aspects of this hackathon content, and as alternative for developers who prefer it over .Net Core.

To determine if Node.js is already installed on your computer, open a terminal window and type the command "node --version".

To install Node.js on a PC, simply download the Latest Stable Version (LTS) at [NodeJs.Org](https://nodejs.org)

To install Node.js on Raspbian on a RPI, run the following commands:
```text
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
```

Run "node --version" to ensure the installation was successful.

### SFTP
We'll use SFTP to securely move files from our PC to the RPI.  To start a SFTP session ...

* Open a terminal window on your PC, and use the command **sftp pi@[ip address]**.
* To determine the working directory for your host (most likely your PC), type the command **lpwd**.
* To move files from your PC (host) to the RPI (remote), you'll use the **put** command.
* To move files from your RPI (remote) to the PC (host), you'll use the **get** command.