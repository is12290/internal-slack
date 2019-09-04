module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.actions[0].value == "Compare-Scores") {
            controller.storage.users.find({ team: message.team }, function (error, all_users) {
                if (error) {
                    bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
                }
                var role;
                for (var z = 0; z < all_users.length; z++) {
                    var output_instance = all_users[z];
                    if (output_instance.id == message.user) {
                        role = output_instance;
                        break;
                    }
                }
                if (!role || typeof role.status == 'undefined' || role.status != 'manager') {
                    bot.reply(message, 'My deepest condolences, but you need to be a manager in order to report team fitness results! If you\'re interested in upgrading, visit our site: https://getinternal.co');
                } else {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.reply(message, "There's been a slight problem on my end");
                        }

                        var users = [];
                        var channels = [];
                        var channel_name = '';
                        bot.api.channels.list({}, function (err, res) {
                            if (err) {
                                console.log("error: ", err)
                            }
                            var list = res.channels;
                            for (i = 0; i < list.length; i++) {
                                var instance = list[i];
                                channels.push({ "text": "#" + instance.name, "value": instance.id });
                            }
                            channels.push({ "text": "None", "value": "None" });
                        });
                        convo.addQuestion({
                            attachments: [
                                {
                                    text: "Select a desired channel or choose 'None'",
                                    callback_id: 'channel',
                                    attachment_type: 'default',
                                    color: '#0294ff',
                                    actions: [
                                        {
                                            "name": "channel",
                                            "text": "Channel",
                                            "type": "select",
                                            "options": channels
                                        }
                                    ]
                                }
                            ]
                        }, function (response, convo) {
                            bot.api.channels.info({
                                channel: response.text
                            }, function (err, res) {
                                if (err) {
                                    console.log("error: ", err);
                                    bot.reply(message, "Try one more time?");
                                }
                                users.push(res.channel.members);
                            });
                            for (var q = 0; q < users.length; q++) {
                                var channel_instance = users[0];
                                if (channel_instance.id == response.text) {
                                    channel_name = channel_name + channel_instance.text;
                                }
                            }
                            convo.next();
                        });

                        var time = '';
                        convo.addQuestion({
                            attachments: [
                                {
                                    text: 'What time frame are you interested in?',
                                    callback_id: 'time-frame',
                                    attachment_type: 'default',
                                    color: '#0294ff',
                                    actions: [
                                        {
                                            "name": "time-frame",
                                            "text": "Time Frame",
                                            "type": "select",
                                            "options": [
                                                {
                                                    "text": "Daily",
                                                    "value": "Daily"
                                                },
                                                {
                                                    "text": "Weekly",
                                                    "value": "Weekly",
                                                },
                                                {
                                                    "text": "Monthly",
                                                    "value": "Monthly",
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, function (response, convo) {
                            time = time + response.text;
                            convo.next();
                        });

                        const timeframe = time;

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                var data = [];
                                var info = users[0];
                                for (var i = 0; i < info.length; i++) {
                                    var user = info[i];
                                    for (var j = 0; j < all_users.length; j++) {
                                        var instance = all_users[j];
                                        if (instance.id == user) {
                                            data.push(instance);
                                        }
                                    }
                                }

                                var results = getChannelSpecificOutput(data, timeframe);
                                if (results == 404) {
                                    bot.reply(message, "Are you sure those dates are correct? I can't find logs back that far :thinking_face:");
                                } else {
                                    bot.reply(message, {
                                        text: "Here is your report for " + channel_name + "...",
                                        attachments: [
                                            {
                                                title: 'Sleep',
                                                color: '#02D2FF',
                                                attachment_type: 'default',
                                                text: results[0][0] + '\n*Perfect:* ' + results[1][0][4] + ' | *Sufficient:* ' + results[1][0][3] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][1] + '\n'
                                            },
                                            {
                                                title: 'Energy',
                                                color: '#2A02FF',
                                                attachment_type: 'default',
                                                text: results[0][1] + '\n*Full:* ' + results[1][1][4] + ' | *Alright:* ' + results[1][1][3] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][1] + '\n'
                                            },
                                            {
                                                title: 'Mood',
                                                color: '#8A02FF',
                                                attachment_type: 'default',
                                                text: results[0][2] + '\n*Happy:* ' + results[1][2][4] + ' | *Calm:* ' + results[1][2][3] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][1] + '\n'
                                            },
                                            {
                                                title: 'Confidence',
                                                color: '#CF02FF',
                                                attachment_type: 'default',
                                                text: results[0][3] + '\n*Crushing It:* ' + results[1][3][4] + ' | *Okay:* ' + results[1][3][3] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][1] + '\n'
                                            },
                                            {
                                                title: 'Presence',
                                                color: '#FF029D',
                                                attachment_type: 'default',
                                                text: results[0][4] + '\n*Grounded:* ' + results[1][4][4] + ' | *Aware:* ' + results[1][4][3] + ' | *Out of It:* ' + results[1][4][2] + ' | *Disconnected:* ' + results[1][4][1] + '\n'
                                            },
                                            {
                                                title: 'Fulfillment',
                                                color: '#FF8402',
                                                attachment_type: 'default',
                                                text: results[0][5] + '\n*Complete:* ' + results[1][5][4] + ' | *Present:* ' + results[1][5][3] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][1] + '\n'
                                            },
                                            {
                                                title: 'Overall',
                                                color: '#02FF57',
                                                attachment_type: 'default',
                                                text: results[0][6]
                                            }
                                        ]
                                    });
                                }
                            }
                        })
                    })
                }
            })
        }
    })
}

function getChannelSpecificOutput(results, timeframe) {
    var moment = require('moment');
    var days = [];
    if (timeframe == 'monthly') {
        var start = moment().startOf('month');
        var end = moment().endOf('month');
        var day = start;

        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'weekly') {
        var start = moment().startOf('isoWeek');
        var end = moment().endOf('isoWeek');
        var day = start;

        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'daily') {
        days.push(moment().format('DD/MM/YYY'));
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];


    for (var i = 0; i < results.length; i++) {
        var instance = results[i];
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[days[j]].check_in;
                    var checkOut = instance.logs[days[j]].check_out;

                    sleepCount = sleepCount + checkIn[0];
                    energyCount = energyCount + checkIn[1];
                    moodCount = moodCount + checkIn[2];
                    confidenceCount = confidenceCount + checkIn[3];
                    overallCount = overallCount + (checkIn[4] / 4);

                    efficiencyCount = efficiencyCount + checkOut[0];
                    confidenceCount = confidenceCount + checkOut[1];
                    moodCount = moodCount + checkOut[2];
                    fulfillmentCount = fulfillmentCount + checkOut[3];
                    overallCount = overallCount + (checkOut[4] / 4);
                    tally = tally + 1;
                }
            }
        }

        if (overallCount.length > 0) {
            var sleep = ((sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25) / sleepCount.length).toFixed(2);
            var energy = ((energyCount.reduce(function (a, b) { return a + b; }, 0) * 25) / energyCount.length).toFixed(2);
            var mood = ((moodCount.reduce(function (a, b) { return a + b; }, 0) * 25) / moodCount.length).toFixed(2);
            var confidence = ((confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / confidenceCount.length).toFixed(2);
            var presence = ((presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / presenceCount.length).toFixed(2);
            var fulfillment = ((fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / fulfillmentCount.length).toFixed(2);
            var overall = ((overallCount.reduce(function (a, b) { return a + b; }, 0) * 25) / overallCount.length).toFixed(2);
            overall = Math.round(overall);

            var countArray = [sleepCount, energyCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];

            var inDepthArray = [];
            for (var i = 0; i < countArray.length; i++) {
                var insight = countArray[i];
                var map = { '1': 0, '2': 0, '3': 0, '4': 0 }
                for (var x = 0; x < insight.length; x++) {
                    map[insight[x]] = map[insight[x]] + 1
                }
                inDepthArray.push(map);
            }

            var loopArray = [sleep, energy, mood, confidence, presence, fulfillment];

            var report = [];
            for (var z = 0; z < loopArray.length; z++) {
                var loopInstance = Math.round(loopArray[z]);
                if (loopArray[z] > 50) {
                    var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                    report.push(message);
                } else {
                    var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                    report.push(message);
                }
            }

            if (overall > 50) {
                var overallResult = 'Score: *' + overall + '%*\nThe overall emotional fitness this ' + timeframe + ' was *positive*!';
                report.push(overallResult);
            }
            else {
                var overallResult = 'Score: *' + overall + '%*\nThe overall emotional fitness this ' + timeframe + ' was *negative*';
                report.push(overallResult);
            }

            return [report, inDepthArray];

        } else {
            return 404;
        }
    }
}