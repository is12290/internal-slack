module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Historic-Team-Search") {
            controller.storage.users.find({ team: message.team.id }, function (err, all_users) {
                var role;
                for (var z = 0; z < all_users.length; z++) {
                    var output_instance = all_users[z];
                    if (output_instance.id == message.user) {
                        role = output_instance;
                        break;
                    }
                }
                if (err) {
                    console.log("error: ", err);
                    bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
                }
                if (!role || typeof role.status == 'undefined' || role.status != 'manager') {
                    bot.reply(message, 'My deepest condolences, but you need to be a manager in order to report team fitness results! If you\'re interested in upgrading, visit our site: https://getinternal.co');
                } else {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
                        }
                        var channels = [];
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

                        var channel_id = '';
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
                            channel_id = channel_id + response.text;
                            convo.next();
                        });

                        var dates = [];
                        convo.addQuestion({
                            text: 'Search Timeframe',
                            blocks: [
                                {
                                    "type": "section",
                                    "block_id": "section1234",
                                    "text": {
                                        "type": "mrkdwn",
                                        "text": "Choose the date range you'd like the compute"
                                    }
                                },
                                {
                                    "type": "actions",
                                    "elements": [
                                        {
                                            "type": "datepicker",
                                            "placeholder": {
                                                "type": "plain_text",
                                                "text": "Start Date",
                                                "emoji": true
                                            }
                                        },
                                        {
                                            "type": "datepicker",
                                            "placeholder": {
                                                "type": "plain_text",
                                                "text": "End Date",
                                                "emoji": true
                                            }
                                        }
                                    ]
                                }
                            ]
                        }, function (response, convo) {
                            dates.push(response.actions[0].selected_date);

                            if (dates.length == 2) {
                                bot.reply(message, "One moment, computing the results...");
                                convo.next();
                            } else {
                                convo.silentRepeat();
                            }
                        });

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                if (channel_id != 'None') {
                                    var updated_input = [];
                                    bot.api.channels.info({ channel: channel_id }, function (err, response) {
                                        if (err) {
                                            console.log("error: ", err);
                                        }
                                        const users = response.channel.members;
                                        for (var j = 0; j < users.length; j++) {
                                            for (var k = 0; k < all_users.length; k++) {
                                                if (all_users[k].id == users[j]) {
                                                    updated_input.push(all_users[k]);
                                                }
                                            }
                                        }
                                    });
                                    var user_input = updated_input;
                                } else {
                                    var user_input = all_users;
                                }
                                var results = getTeamSearchOutput(user_input, dates);

                                if (results == 404) {
                                    bot.reply(message, "Results weren't able to be computed... Are you sure you selected the correct dates?");
                                } else {
                                    bot.reply(message, {
                                        text: 'Hey there! Here id your historical team search report...\n',
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
                                                title: 'Efficiency',
                                                color: '#FF029D',
                                                attachment_type: 'default',
                                                text: results[0][4] + '\n*Overdrive:* ' + results[1][4][4] + ' | *Normal:* ' + results[1][4][3] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][1] + '\n'
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
                    });
                }
            })
        }
    })
}

function getTeamSearchOutput(results, dates) {
    var moment = require('moment');
    var startOfMonth = moment(dates[0]);
    var endOfMonth = moment(dates[1]);

    var day = startOfMonth;

    var days = [];
    while (day <= endOfMonth) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    for (var j = 0; j < days.length; j++) {
        for (var i = 0; i < results.length; i++) {
            var resultsInstance = results[i];
            if (days[j] in resultsInstance.logs) {
                if (typeof resultsInstance.logs[days[j]].check_in == 'undefined' || resultsInstance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = resultsInstance.logs[days[j]].check_in;
                    var checkOut = resultsInstance.logs[days[j]].check_out;

                    sleepCount.push(checkIn[0]);
                    energyCount.push(checkIn[1]);
                    moodCount.push(checkIn[2]);
                    confidenceCount.push(checkIn[3]);
                    overallCount.push(checkIn[4] / 4);

                    presenceCount.push(checkOut[0]);
                    energyCount.push(checkOut[1]);
                    moodCount.push(checkOut[2]);
                    fulfillmentCount.push(checkOut[3]);
                    overallCount.push(checkOut[4] / 4);
                }
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

        var searchReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            var loopInstance = Math.round(loopArray[z]);
            if (loopInstance > 50) {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                searchReport.push(message);
            } else {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                searchReport.push(message);
            }
        }

        var lastDay = days.length - 1
        if (overall > 50) {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness between *' + days[0] + '* and *' + days[lastDay] + '* was *positive*!';
            searchReport.push(overallMonth);
        }
        else {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness between *' + days[0] + '* and *' + days[lastDay] + '* was *negative*';
            searchReport.push(overallMonth);
        }

        return [searchReport, inDepthArray];

    } else {
        return 404;
    }
}