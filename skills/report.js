module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Generate-Report") {
            controller.storage.teams.get(message.team.id, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                if (team.status.subscription.status == 'inactive' && team.status.trial.status == 'inactive') {
                    if (team.status.trial.status == 'inactive' && team.status.subscription.seats_used == 0) {
                        var text = "Your trial is up! Would you like to purchase a subscription?"
                    } else if (team.status.subscription.status == 'inactive' && team.status.subscription.seats_used > 0) {
                        var text = "It looks like your subscription is up! Would you like to renew?"
                    }
                    bot.reply(message, {
                        attachments: [{
                            title: "Subscribe",
                            text: text,
                            callback_id: 'subscribe',
                            color: "#0294ff",
                            attachment_type: 'default',
                            actions: [
                                {
                                    'name': 'yes-button',
                                    'value': 'Yes-Subscribe',
                                    'text': 'Yes',
                                    'type': 'button'
                                },
                                {
                                    'name': 'no-button',
                                    'value': 'No-Subscribe',
                                    'text': 'No',
                                    'type': 'button'
                                }
                            ]
                        }]
                    }, function (err, response) {
                        if (response.text == 'Yes-Subscribe') {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    title: "Subscribe",
                                    text: text,
                                    callback_id: 'subscribe',
                                    color: "#0294ff",
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes-Subscribe',
                                            'style': 'primary',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'value': 'No-Subscribe',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            })
                        } else if (response.text == 'No-Subscribe') {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    title: "Subscribe",
                                    text: text,
                                    callback_id: 'subscribe',
                                    color: "#0294ff",
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes-Subscribe',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'value': 'No-Subscribe',
                                            'style': 'danger',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            })
                        }
                    })
                } else {
                    bot.createConversation(message, function (err, convo) {
                        if (err) {
                            console.log(err);
                        }
                        var timeframe = '';
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: 'Timeframe',
                                    text: 'What is the timeframe for the report?',
                                    callback_id: 'timeframe',
                                    attachment_type: 'default',
                                    color: "#0294ff",
                                    actions: [
                                        {
                                            "name": "timeframe",
                                            "text": "Timeframe",
                                            "type": "select",
                                            "options": [
                                                {
                                                    "text": "Daily",
                                                    "value": "daily"
                                                },
                                                {
                                                    "text": "Weekly",
                                                    "value": "weekly",
                                                },
                                                {
                                                    "text": "Monthly",
                                                    "value": "monthly",
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, function (response, convo) {
                            timeframe = timeframe + response.text;
                            convo.stop('completed');
                        }, {}, 'timeframe');

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
                        });
                        convo.addQuestion({
                            attachments: [
                                {
                                    text: "Select a desired channel",
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
                            convo.gotoThread('timeframe');
                        }, {}, 'channel_choice');

                        var style = '';
                        convo.addQuestion({
                            attachments: [{
                                text: "What kind of report is this?",
                                callback_id: 'report-style',
                                color: "#0294ff",
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'personal-button',
                                        'value': 'Personal',
                                        'text': 'Personal',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'team-button',
                                        'value': 'Team',
                                        'text': 'Entire Team',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'channel-button',
                                        'value': 'Channel',
                                        'text': 'Specific Channel',
                                        'type': 'button'
                                    }
                                ]
                            }]
                        }, [
                                {
                                    pattern: "Personal",
                                    callback: function (response, convo) {
                                        bot.replyInteractive(response, {
                                            attachments: [{
                                                text: "What kind of report is this?",
                                                callback_id: 'report-style',
                                                color: "#0294ff",
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'personal-button',
                                                        'value': 'Personal',
                                                        'style': 'primary',
                                                        'text': 'Personal',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'team-button',
                                                        'value': 'Team',
                                                        'text': 'Entire Team',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'channel-button',
                                                        'value': 'Channel',
                                                        'text': 'Specific Channel',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }]
                                        })
                                        style = style + 'Personal';
                                        convo.gotoThread('timeframe');
                                    }
                                },
                                {
                                    pattern: "Team",
                                    callback: function (response, convo) {
                                        bot.replyInteractive(response, {
                                            attachments: [{
                                                text: "What kind of report is this?",
                                                callback_id: 'report-style',
                                                color: "#0294ff",
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'personal-button',
                                                        'value': 'Personal',
                                                        'text': 'Personal',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'team-button',
                                                        'value': 'Team',
                                                        'style': 'primary',
                                                        'text': 'Entire Team',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'channel-button',
                                                        'value': 'Channel',
                                                        'text': 'Specific Channel',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }]
                                        })
                                        style = style + 'Team';
                                        convo.gotoThread('timeframe');
                                    }
                                },
                                {
                                    pattern: "Channel",
                                    callback: function (response, convo) {
                                        bot.replyInteractive(response, {
                                            attachments: [{
                                                text: "What kind of report is this?",
                                                callback_id: 'report-style',
                                                color: "#0294ff",
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'personal-button',
                                                        'value': 'Personal',
                                                        'text': 'Personal',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'team-button',
                                                        'value': 'Team',
                                                        'text': 'Entire Team',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'channel-button',
                                                        'value': 'Channel',
                                                        'text': 'Specific Channel',
                                                        'style': 'primary',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }]
                                        })
                                        style = style + 'Channel';
                                        convo.gotoThread('channel_choice');
                                    }
                                }
                            ], {}, 'default');

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                controller.storage.users.find({ team: message.team }, function (err, all_users) {
                                    if (err) {
                                        console.log("error: ", err);
                                    }

                                    for (var t = 0; t < all_users.length; t++) {
                                        if (all_users[t].id == message.user) {
                                            var messager = all_users[t];
                                        } else {
                                            // Pass
                                        }
                                    }

                                    if (style == 'Personal') {
                                        var results = getReport(messager, timeframe, style);
                                        var text = "Here is your personal " + timeframe + " report";
                                    } else if (style == 'Channel') {
                                        var updated_input = [];
                                        bot.api.channels.info({ channel: channel_name }, function (err, response) {
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

                                        var results = getReport(updated_input, timeframe, style);
                                        var text = "Here is the " + timeframe + " report for " + channel_name;
                                    } else {
                                        var results = getReport(all_users, timeframe, style);
                                        var text = "Here is the " + timeframe + " report for your team"
                                    }

                                    if (results == 404) {
                                        bot.reply(message, "Are you sure those dates are correct? I can't find logs back that far :thinking_face:");
                                    } else {
                                        bot.reply(message, {
                                            text: text,
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

                                })
                            }
                        })
                    })
                }
            })
        }
    })
}

function getReport(results, timeframe, style) {
    console.log(results);
    var moment = require('moment');
    var message = '';
    var days = [];
    if (timeframe == 'monthly') {
        var start = moment().startOf('month');
        var end = moment().endOf('month');
        var day = start;
        message = message + 'This month';
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'weekly') {
        var start = moment().startOf('isoWeek');
        var end = moment().endOf('isoWeek');
        var day = start;
        message = message + 'This week';
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'daily') {
        days.push(moment().format('DD/MM/YYY'));
        message = message + 'Today';
    }

    var pastDays = [];
    var message2 = '';
    if (timeframe == 'monthly') {
        pastDays.push(moment().subtract(1, 'd').format('MM/DD/YYY'));
        message2 = message2 + 'yesterday';
    } else if (timeframe == 'weekly') {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');
        message2 = message2 + 'last week';
        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Week');
    } else if (timeframe == 'monthly') {
        var startOfMonth = moment().startOf('month').subtract(1, 'months');
        var endOfMonth = moment().endOf('month').subtract(1, 'months');
        message2 = message2 + 'last month';
        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Month');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var pastCount = [];

    if (style == 'Personal') {
        for (var a = 0; a < days.length; a++) {
            if (days[a] in results.logs) {
                if (typeof results.logs[days[a]].check_in == 'undefined' || typeof results.logs[days[a]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = results.logs[days[a]].check_in;
                    var checkOut = results.logs[days[a]].check_out;

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

        for (var k = 0; k < pastDays.length; k++) {
            if (pastDays[k] in results.logs) {
                if (typeof results.logs[pastDays[k]].check_in == 'undefined' || results.logs[pastDays[k]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = results.logs[pastDays[k]].check_in;
                    var checkOut = results.logs[pastDays[k]].check_out;

                    if (checkIn == 'undefined' || checkOut == 'undefined') {
                        // Pass
                    } else {
                        pastCount.push(checkIn[4] / 4);
                        pastCount.push(checkOut[4] / 4);
                    }
                }
            }
        }
    } else {
        for (var i = 0; i < results.length; i++) {
            var instance = results[i];
            for (var j = 0; j < days.length; j++) {
                if (days[j] in instance.logs) {
                    if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                        // Pass
                    } else {
                        var checkIn = instance.logs[days[j]].check_in;
                        var checkOut = instance.logs[days[j]].check_out;

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

            for (var k = 0; k < pastDays.length; k++) {
                if (pastDays[k] in instance.logs) {
                    if (typeof instance.logs[pastDays[k]].check_in == 'undefined' || instance.logs[pastDays[k]].check_out == 'undefined') {
                        // Pass
                    } else {
                        var checkIn = instance.logs[pastDays[k]].check_in;
                        var checkOut = instance.logs[pastDays[k]].check_out;

                        pastCount.push(checkIn[4] / 4);

                        pastCount.push(checkOut[4] / 4);

                    }
                }
            }
        }
    }

    if (overallCount.length > 0) {
        var countArray = [sleepCount, energyCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];

        var sleep = ((sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25) / sleepCount.length).toFixed(2);
        var energy = ((energyCount.reduce(function (a, b) { return a + b; }, 0) * 25) / energyCount.length).toFixed(2);
        var mood = ((moodCount.reduce(function (a, b) { return a + b; }, 0) * 25) / moodCount.length).toFixed(2);
        var confidence = ((confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / confidenceCount.length).toFixed(2);
        var presence = ((presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / presenceCount.length).toFixed(2);
        var fulfillment = ((fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / fulfillmentCount.length).toFixed(2);
        var overall = ((overallCount.reduce(function (a, b) { return a + b; }, 0) * 25) / overallCount.length).toFixed(2);
        overall = Math.round(overall);

        var inDepthArray = [];
        for (var i = 0; i < countArray.length; i++) {
            var insight = countArray[i];
            var map = { '1': 0, '2': 0, '3': 0, '4': 0 }
            for (var x = 0; x < insight.length; x++) {
                map[insight[x]] = map[insight[x]] + 1
            }
            inDepthArray.push(map);
        }

        var analysisOutcome = [];
        var analysisArray = [sleep, energy, mood, confidence, presence, fulfillment];
        for (var a = 0; a < analysisArray.length; a++) {
            var analysisInstance = Math.round(analysisArray[a]);
            if (analysisArray[a] < 50) {
                var message = 'Score: *' + analysisInstance + '%*\nAverage: *Positive*';
                analysisOutcome.push(message);
            } else {
                var message = 'Score: *' + analysisInstance + '%*\nAverage: *Negative*';
                analysisOutcome.push(message);
            }
        }

        if (pastCount.length > 0) {
            var past = ((pastCount.reduce(function (a, b) { return a + b; }, 0) * 25) / pastCount.length).toFixed(2);
        }

        if (overall < 50) {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *negative*';
            if (!past || typeof past == 'undefined' || past == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs to compare against :rowboat:';
            } else if (overall > past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message + ' is up ' + difference + '% compared to ' + message2;
            } else if (overall < past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message + ' is down ' + difference + '% compared to ' + message2;
            }
            analysisOutcome.push(overallAnalysis);
        } else {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *positive*!';
            if (!past || typeof past == 'undefined' || past == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs to compare against :rowboat:';
            } else if (overall > past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message + ' is up ' + difference + '% compared to ' + message2;
            } else if (overall < past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message + ' is down ' + difference + '% compared to ' + message2;
            }
            analysisOutcome.push(overallAnalysis);
        }

        var returnArray = [analysisOutcome, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
}