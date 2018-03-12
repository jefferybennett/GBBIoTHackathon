class messageType2 {

    getMessage() {

        var rawMessage = {
            msg_type: 2,
            ver: "3.0",
            fid: "HL001_00114_111100001111",
            time_stamp: new Date().toISOString(),
            "prognosys":
             {
              measurement_ind: 74,
              service_ind: 0,
              prognosys_data:[
               {
                h_id: "3",
                percent: 74,
                days: 0
            }, {
            h_id: "4",
            days: 313 }
            ] },
            errors:[
             {db: "sensor",index: 287083958},
             {db: "sensor",index: 287083957}
            ],
            warnings:[
             {db: "sensor",index: 287083958},
             {db: "sensor",index: 287083957}
            ],
            processevents:[
             {db: "sensor",index: 1234},
             {db: "sensor",index: 12345}
            ],
            reminders:[
             {db: "sensor",index:123},
             {db: "sensor",index:1234}
            ] };

            return JSON.stringify(rawMessage);

    }
}

module.exports = messageType2;