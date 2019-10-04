module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == 'Compare-Scores') {
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
                                    'text': 'Yes',
                                    'type': 'button',
                                    'url': 'https://getinternal.co/subscribe'
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
                        if (response.text == 'No-Subscribe') {
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
                    });
                } else {
                    bot.createConversation(message, function (err, convo) {
                        if (err) {
                            console.log(err);
                        }
                        var endTimeframe = '';
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: 'Past',
                                    text: 'Against...',
                                    callback_id: 'timeframe',
                                    attachment_type: 'default',
                                    color: "#0294ff",
                                    actions: [
                                        {
                                            "name": "Past",
                                            "text": "Past",
                                            "type": "select",
                                            "options": [
                                                {
                                                    "text": "Yesterday",
                                                    "value": "Yesterday"
                                                },
                                                {
                                                    "text": "Last Week",
                                                    "value": "Week"
                                                },
                                                {
                                                    "text": "Last Month",
                                                    "value": "Month"
                                                },
                                                {
                                                    "text": "Last Year",
                                                    "value": "Year"
                                                },
                                                {
                                                    "text": "All Time",
                                                    "value": "All"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, function (response, convo) {
                            endTimeframe = endTimeframe + response.text;
                            convo.stop('completed');
                        }, {}, 'timeframe2');

                        var startTimeframe = '';
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: 'Current',
                                    text: 'You would like to compare...',
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
                                                    "text": "Today",
                                                    "value": "Today"
                                                },
                                                {
                                                    "text": "This Week",
                                                    "value": "Week"
                                                },
                                                {
                                                    "text": "This Month",
                                                    "value": "Month"
                                                },
                                                {
                                                    "text": "This Year",
                                                    "value": "Year"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, function (response, convo) {
                            startTimeframe = startTimeframe + response.text;
                            convo.gotoThread('timeframe2')
                        }, {}, 'timeframe1');

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

                        var users = [];
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
                            convo.gotoThread('timeframe1');
                        }, {}, 'channel_choice');

                        var style = '';
                        convo.addQuestion({
                            text: "Okay! Let's start this comparison",
                            attachments: [{
                                title: "Type",
                                text: "What kind of comparison?",
                                callback_id: 'comparison-style',
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
                                            text: "Okay! Let's start this comparison",
                                            attachments: [{
                                                title: "Type",
                                                text: "What kind of comparison?",
                                                callback_id: 'comparison-style',
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
                                        convo.gotoThread('timeframe1');
                                    }
                                },
                                {
                                    pattern: "Team",
                                    callback: function (response, convo) {
                                        bot.replyInteractive(response, {
                                            text: "Okay! Let's start this comparison",
                                            attachments: [{
                                                title: "Type",
                                                text: "What kind of comparison?",
                                                callback_id: 'comparison-style',
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
                                        convo.gotoThread('timeframe1');
                                    }
                                },
                                {
                                    pattern: "Channel",
                                    callback: function (response, convo) {
                                        bot.replyInteractive(response, {
                                            text: "Okay! Let's start this comparison",
                                            attachments: [{
                                                title: "Type",
                                                text: "What kind of comparison?",
                                                callback_id: 'comparison-style',
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
                                                        'style': 'primary',
                                                        'text': 'Specific Channel',
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
                                controller.storage.users.find({ team: message.team.id }, function (err, all_users) {
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
                                        var results = getComparison(messager, startTimeframe, endTimeframe, style);
                                    } else if (style == 'Channel') {
                                        var updated_input = [];
                                        for (var j = 0; j < users[0].length; j++) {
                                            for (var k = 0; k < all_users.length; k++) {
                                                if (all_users[k].id == users[0][j]) {
                                                    updated_input.push(all_users[k]);
                                                }
                                            }
                                        }

                                        var results = getComparison(updated_input, startTimeframe, endTimeframe, style);
                                    } else {
                                        var results = getComparison(all_users, startTimeframe, endTimeframe, style);
                                    }

                                    if (results == 404) {
                                        bot.reply(message, "Hey, make sure your inputs are correct - It doesn't appear that you have scores dating back that far");
                                    } else {
                                        bot.reply(message, {
                                            text: 'Here is *' + results[2][0] + '* compared to *' + results[2][1] + '*\n',
                                            attachments: [
                                                {
                                                    title: results[2][0],
                                                    color: '#02D2FF',
                                                    attachment_type: 'default',
                                                    text: 'Score: *' + results[0] + '%*' + '\n'
                                                },
                                                {
                                                    title: results[2][1],
                                                    color: '#2A02FF',
                                                    attachment_type: 'default',
                                                    text: 'Score: *' + results[1] + '%*' + '\n'
                                                },
                                                {
                                                    title: 'Comparison',
                                                    color: '#8A02FF',
                                                    attachment_type: 'default',
                                                    text: 'There has been a *' + (results[0] - results[1])+ '%* change in emotional health'
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


function getComparison(results, start, end, type) {
    var moment = require('moment');

    var timeframeMessage = [];
    var currentDays = [];
    // Get current timeframe
    if (start == 'Today') {
        currentDays.push(moment().format('MM/DD/YYY'));
        timeframeMessage.push('Today');
    } else if (start == 'Week') {
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');
        while (startOfWeek <= endOfWeek) {
            currentDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('This Week');
    } else if (start == 'Month') {
        var startOfMonth = moment().startOf('month');
        var endOfMonth = moment().endOf('month');

        while (startOfMonth <= endOfMonth) {
            currentDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('This Month');
    } else if (start == 'Year') {
        var startOfYear = moment().startOf('year');
        var today = moment();

        while (startOfYear <= today) {
            currentDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('This Year');
    }

    // Get past timeframe
    var pastDays = [];
    if (end == 'Yesterday') {
        pastDays.push(moment().subtract(1, 'd').format('MM/DD/YYY'));
        timeframeMessage.push('Yesterday');
    } else if (end == 'Week') {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');

        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Week');
    } else if (end == 'Month') {
        var startOfMonth = moment().startOf('month').subtract(1, 'months');
        var endOfMonth = moment().endOf('month').subtract(1, 'months');

        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Month');
    } else if (end == 'Year') {
        var startOfYear = moment().startOf('year').subtract(1, 'year');
        var endOfYear = moment().endOf('year').subtract(1, 'year');

        while (startOfYear <= endOfYear) {
            pastDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Year');
    } else if (end == 'All') {
        var customStart = end[1];
        var customEnd = end[2];

        while (customStart <= customEnd) {
            pastDays.push(customStart.format('L'));
            customStart = customStart.clone().add(1, 'd');
        }
        timeframeMessage.push('*' + pastDays[0] + '-' + pastDays[pastDays.length - 1] + '*');
    }

    // Tallys
    var currentCount = [];
    var pastCount = [];

    if (type == "Personal") {
        for (var j = 0; j < currentDays.length; j++) {
            if (currentDays[j] in results.logs) {
                if (typeof results.logs[currentDays[j]].check_in == 'undefined' || typeof results.logs[currentDays[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = results.logs[currentDays[j]].check_in;
                    var checkOut = results.logs[currentDays[j]].check_out;

                    if (checkIn == 'undefined' || checkOut == 'undefined') {
                        // Pass
                    } else {
                        currentCount.push(checkIn[4] / 4);
                        
                        if (checkOut.length == 5) {
                            currentCount.push(checkOut[4] / 4);
                        } else {
                            currentCount.push(checkOut[5] / 5);
                        }
                    }
                }
            }
        }

        for (var y = 0; y < pastDays.length; y++) {
            if (pastDays[y] in results.logs) {
                if (typeof results.logs[pastDays[y]].check_in == 'undefined' || typeof results.logs[pastDays[y]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = results.logs[pastDays[y]].check_in;
                    var checkOut = results.logs[pastDays[y]].check_out;

                    if (checkIn == 'undefined' || checkOut == 'undefined') {
                        // Pass
                    } else {
                        pastCount.push(checkIn[4] / 4);
                        
                        if (checkOut.length == 5) {
                            pastCount.push(checkOut[4] / 4);
                        } else {
                            pastCount.push(checkOut[5] / 5);
                        }
                    }
                }
            }
        }
    } else {
        for (var i = 0; i < results.length; i++) {
            var instance = results[i];

            for (var j = 0; j < currentDays.length; j++) {
                if (currentDays[j] in instance.logs) {
                    if (typeof instance.logs[currentDays[j]].check_in == 'undefined' || typeof instance.logs[currentDays[j]].check_out == 'undefined') {
                        // Pass
                    } else {
                        var checkIn = instance.logs[currentDays[j]].check_in;
                        var checkOut = instance.logs[currentDays[j]].check_out;

                        currentCount.push(checkIn[4] / 4);

                        if (checkOut.length == 5) {
                            currentCount.push(checkOut[4] / 4);
                        } else {
                            currentCount.push(checkOut[5] / 5);
                        }
                    }
                }
            }

            for (var y = 0; y < pastDays.length; y++) {
                if (pastDays[y] in instance.logs) {
                    if (typeof instance.logs[pastDays[y]].check_in == 'undefined' || typeof instance.logs[pastDays[y]].check_out == 'undefined') {
                        // Pass
                    } else {
                        var checkIn = instance.logs[pastDays[y]].check_in;
                        var checkOut = instance.logs[pastDays[y]].check_out;

                        pastCount.push(checkIn[4] / 4);

                        if (checkOut.length == 5) {
                            pastCount.push(checkOut[4] / 4);
                        } else {
                            pastCount.push(checkOut[5] / 5);
                        }
                    }
                }
            }
        }
    }

    if (currentCount.length > 0) {
        var currentScore = ((currentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / currentCount.length).toFixed(2);
        currentScore = Math.round(currentScore);
    } else {
        return 404;
    }

    if (pastCount.length > 0) {
        var pastScore = ((pastCount.reduce(function (a, b) { return a + b; }, 0) * 25) / pastCount.length).toFixed(2);
        pastScore = Math.round(pastScore);
    } else {
        return 404;
    }

    return [currentScore, pastScore, timeframeMessage];
}