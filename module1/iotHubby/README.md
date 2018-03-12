# IoT Hubby

## Set-up
To set-up IoT Hubby, first ensure Node.js is installed.

## Environment File
In the root of the IoT Hubby directory, create a file named ".env".  Current variables:
```text
IOTHUB=[IoT Hub Connection String]
```

## hubby.json
The hubby.json file provides a place to save often used device queries and device twin json updates.

## Command Line Arguments
- Login
    "-l" or "--login" with IoT Hub Connection String
- List
    "-li" or "--list"
- Device Query
    "-dq" or "--devicequery" with name from hubby.json.