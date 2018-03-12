using System;
using System.Threading.Tasks;
using Microsoft.Azure.Devices.Client;
using Newtonsoft.Json;
using System.Text;

namespace DeviceClient
{
    class Program
    {
        static Microsoft.Azure.Devices.Client.DeviceClient deviceClient;
        static string iotHubHostName= "hachiothack-jb1.azure-devices.net";
        static string deviceId = "testRpi1";
        static string deviceKey = "A8VevdCXerOlb4CSZz4U88uOv7osi3GiaQJJC72iO54=";

        static void Main(string[] args)
        {
            deviceClient = Microsoft.Azure.Devices.Client.DeviceClient.Create(iotHubHostName,
                                            new DeviceAuthenticationWithRegistrySymmetricKey (deviceId, deviceKey), TransportType.Amqp);

            StartClient();
        }

        static async void StartClient() {
            await sendTelemetry();
        }

        private static async Task<bool> sendTelemetry() {

            while (true) {
    
                var messageType3String = MessageType3.GetMessage();
                var d2cMessageType3 = new Message(Encoding.ASCII.GetBytes(messageType3String));
                try {
                    await deviceClient.SendEventAsync(d2cMessageType3);
                }
                catch (Exception ex) {
                    Console.WriteLine(string.Format("Exception sending D2C message: {0}", ex.Message));
                }

                await Task.Delay(1000);
            }

        }
    }
}
