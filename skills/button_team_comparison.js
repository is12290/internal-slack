module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Compare-Team-Scores") {
            controller.storage.users.find({ team: message.team.id }, function (error, all_users) {
                if (error) {
                    console.log("error", error);
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
                            console.log('error: ', err);
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

                        var startTimeframe = [];
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: 'Current',
                                    text: 'You want to compare...',
                                    color: "#0294ff",
                                    callback_id: 'current',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            "name": "Current",
                                            "text": "Current",
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
                        }, [
                                {
                                    pattern: "Today",
                                    callback: function (reply, convo) {
                                        startTimeframe.push(1);
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: "Week",
                                    callback: function (reply, convo) {
                                        startTimeframe.push(2);
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: "Month",
                                    callback: function (reply, convo) {
                                        startTimeframe.push(3);
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: "Year",
                                    callback: function (reply, convo) {
                                        startTimeframe.push(4);;
                                        convo.next();
                                    }
                                }
                            ]);

                        var endTimeframe = [];
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: 'Past',
                                    text: 'Against...',
                                    callback_id: 'past',
                                    color: "#0294ff",
                                    attachment_type: 'default',
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
                        }, [
                                {
                                    pattern: "Yesterday",
                                    callback: function (reply, convo) {
                                        endTimeframe.push(1);
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: "Week",
                                    callback: function (reply, convo) {
                                        endTimeframe.push(2);
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: "Month",
                                    callback: function (reply, convo) {
                                        endTimeframe.push(3);
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: "Year",
                                    callback: function (reply, convo) {
                                        endTimeframe.push(4);;
                                        convo.next();
                                    }
                                }
                            ]);

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                if (channel_id != 'None') {
                                    var updated_input = [];
                                    bot.api.channels.info({ channel: channel_id }, function (err, response) {
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

                                var results = getTeamComparisonOutput(user_input, startTimeframe, endTimeframe);
                                console.log(results);
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
                                                text: 'Score: ' + results[0] + '%' + '\n'
                                            },
                                            {
                                                title: results[2][1],
                                                color: '#2A02FF',
                                                attachment_type: 'default',
                                                text: 'Score: ' + results[1] + '%' + '\n'
                                            },
                                            {
                                                title: 'Comparison',
                                                color: '#8A02FF',
                                                attachment_type: 'default',
                                                text: 'There has been a *' + ((results[0] - results[1]) / results[1]) * 100 + '%* change in emotional health'
                                            }
                                        ]
                                    });
                                }
                            }
                        })
                    })
                }
            });
        }
    })
}

function getTeamComparisonOutput(results, start, end) {
    var moment = require('moment');

    var timeframeMessage = [];
    var currentDays = [];
    // Get current timeframe
    if (start[0] == 1) {
        currentDays.push(moment().format('MM/DD/YYY'));
        timeframeMessage.push('Today');
    } else if (start[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');
        while (startOfWeek <= endOfWeek) {
            currentDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('This Week');
    } else if (start[0] == 3) {
        var startOfMonth = moment().startOf('month');
        var endOfMonth = moment().endOf('month');

        while (startOfMonth <= endOfMonth) {
            currentDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('This Month');
    } else if (start[0] == 4) {
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
    if (end[0] == 1) {
        pastDays.push(moment().subtract(1, 'd').format('MM/DD/YYY'));
        timeframeMessage.push('Yesterday');
    } else if (end[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');

        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Week');
    } else if (end[0] == 3) {
        var startOfMonth = moment().startOf('month').subtract(1, 'months');
        var endOfMonth = moment().endOf('month').subtract(1, 'months');

        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Month');
    } else if (end[0] == 4) {
        var startOfYear = moment().startOf('year').subtract(1, 'year');
        var endOfYear = moment().endOf('year').subtract(1, 'year');

        while (startOfYear <= endOfYear) {
            pastDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Year');
    } else if (end[0] == 5) {
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

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];

        for (var j = 0; j < currentDays.length; j++) {
            if (currentDays[j] in instance.logs) {
                if (typeof instance.logs[currentDays[j]].check_in == 'undefined' || instance.logs[currentDays[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[currentDays[j]].check_in;
                    var checkOut = instance.logs[currentDays[j]].check_out;

                    currentCount.push(checkIn[4] / 4);

                    currentCount.push(checkOut[4] / 4);
                }
            }
        }

        for (var y = 0; y < pastDays.length; y++) {
            if (pastDays[y] in instance.logs) {
                if (typeof instance.logs[pastDays[y]].check_in == 'undefined' || instance.logs[pastDays[y]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[pastDays[y]].check_in;
                    var checkOut = instance.logs[pastDays[y]].check_out;

                    pastCount.push(checkIn[4] / 4);

                    pastCount.push(checkOut[4] / 4);
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
    }

    return [currentScore, pastScore, timeframeMessage];
}