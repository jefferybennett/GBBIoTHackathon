using System;
using Newtonsoft.Json;

namespace DeviceClient {
    public class MessageType3 {

        public static string GetMessage() {

            double minTemperature = 20;
            Random rand = new Random();

            double currentTemperature = minTemperature + rand.NextDouble() * 15;
            var eventTime = new DateTime().ToUniversalTime();

            var rawTelemetry = new {
                msg_type = "3",
                ver = "2.2",
                fid = "HL001_00999_000001327087",
                time = eventTime,
                hold = 1,
                fid_status = 1,
                fid_status_remaining = 489,
                data = new []
                {
                    new {c = 0, p = "e12cf96c-5fb7-4edc-91e6-bf66a4c1cc8e", u = "c56a4d05-a3b4-e511-82c1-000c29b494b6", v = 1.12},
                    new {c = 0, p = "e12cf96c-5fb7-4edc-91e6-bf66a4c1cc8e", u = "c56a4d05-a3b4-e511-82c1-000c29b494b6", v = 0.98},
                    new {c = 0, p = "6a08d7c1-58bc-4fda-bc97-007d535f5265", u = "36e13afd-8942-4263-962a-1ac02675be33", v = currentTemperature}
                }
            };

            var messageString = JsonConvert.SerializeObject(rawTelemetry);
            return messageString;
        }
    }
}