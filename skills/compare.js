module.exports = function (controller) {
    controller.on('slash_command', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (typeof team.status != 'undefined' && team.status == 'top') {
                if (message.command == '/compare') {
                    controller.storage.users.find({ team: message.team_id }, function (err, all_users) {
                        if (err) {
                            bot.startPrivateConversation({ user: message.user_id }, function (err, convo) {
                                if (err) {
                                    console.log('error: ', err);
                                }
                                convo.say('I am sorry - I do not have enough information to compute this comparison');
                            });
                        }
                        bot.startPrivateConversation({ user: message.user_id }, function (err, convo) {
                            if (err) {
                                console.log('error: ', err);
                            }
                            convo.say('I need a bit more information to compute the comparison...');

                            var startTimeframe = [];
                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'current',
                                        text: 'You want to compare...',
                                        callback_id: 'current',
                                        attachment_type: 'default',
                                        color: '#02FF92',
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

                            // Custom Input
                            var endTimeframe = [];
                            convo.addQuestion({
                                text: 'Custom Timeframe',
                                blocks: [
                                    {
                                        "type": "section",
                                        "block_id": "section1234",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": "Would you be so kind as to select your custom timeframe?"
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
                                endTimeframe.push(response.actions[0].selected_date);

                                if (endTimeframe.length == 2) {
                                    convo.next();
                                } else {
                                    convo.silentRepeat();
                                }
                            }, 'custom');

                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'past',
                                        text: 'Against...',
                                        callback_id: 'past',
                                        attachment_type: 'default',
                                        color: '#02FF92',
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
                                                    },
                                                    {
                                                        "text": "Custom",
                                                        "value": "Custom"
                                                    },
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
                                    },
                                    {
                                        pattern: "Custom",
                                        callback: function (reply, convo) {
                                            convo.addQuestion({
                                                text: 'Please pick the dates you would like to compare against',
                                                action: 'custom'
                                            });
                                            endTimeframe.push(5);
                                            convo.next();
                                        }
                                    },
                                ]);

                            convo.activate();

                            convo.on('end', function (convo) {
                                if (convo.successful()) {
                                    var results = getOutput(all_users, startTimeframe, endTimeframe);

                                    bot.reply(message, {
                                        text: 'Here is ' + results[2][0] + ' compared to ' + results[2][1] + '\n',
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
                                                text: 'There was a *' + ((results[0] - results[1]) / results[1]) * 100 + '%* change in emotional health'
                                            }
                                        ]
                                    });
                                }
                            })
                        })
                    })
                } else {
                    //pass
                }
            } else {
                bot.reply(message, "Sorry to break it to you, but this functionality is only for top tier subscribers :confused");
            }
        })

    })
}

function getOutput(results, start, end) {
    var moment = require('moment');

    var timeframeMessage = [];
    // Get current timeframe
    if (start[0] == 1) {
        var currentDays = [moment().format('MM/DD/YYY')];
        timeframeMessage.push('*Today*');
    } else if (start[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');

        var currentDays = [];
        while (startOfWeek <= endOfWeek) {
            currentDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Week*');
    } else if (start[0] == 3) {
        var startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
        var endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

        var currentDays = [];
        while (startOfMonth <= endOfMonth) {
            currentDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Month*');
    } else if (start[0] == 4) {
        var startOfYear = moment().startOf('year');
        var today = moment();

        var currentDays = [];
        while (startOfYear <= today) {
            currentDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Year*');
    }

    // Get past timeframe
    if (end[0] == 1) {
        var pastDays = [moment().subtract(1, 'd').format('MM/DD/YYY')];
        timeframeMessage.push('*Yesterday*');
    } else if (end[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');

        var pastDays = [];
        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Week*');
    } else if (end[0] == 3) {
        var startOfMonth = moment().startOf('month').subtract(1, 'm');
        var endOfMonth = moment().endOf('month').subtract(1, 'm');

        var pastDays = [];
        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Month*');
    } else if (end[0] == 4) {
        var startOfYear = moment().startOf('year').subtract(1, 'year');
        var endOfYear = moment().endOf('year').subtract(1, 'year');

        var pastDays = [];
        while (startOfYear <= endOfYear) {
            pastDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Year*');
    } else if (start[0] == 5) {
        var customStart = start[1];
        var customEnd = start[2];

        var pastDays = [];
        while (customStart <= customEnd) {
            pastDays.push(customStart.format('L'));
            customStart = customStart.clone().add(1, 'd');
        }
        timeframeMessage.push('*' + pastDays[0] + '-' + pastDays[pastDays.length-1] + '*');
    }

    // Tallys
    var currentCount = 0;
    var pastCount = 0;
    var currentTally = 0;
    var pastTally = 0;

    // Scores
    var currentScore = 0;
    var pastScore = 0;

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];

        for (var j = 0; j < currentDays.length; j++) {
            if (currentDays[j] in instance.logs) {
                if (typeof instance.logs[currentDays[j]].check_in == 'undefined' || instance.logs[currentDays[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[currentDays[j]].check_in;
                    var checkOut = instance.logs[currentDays[j]].check_out;

                    if (checkIn.length == 6) {
                        currentCount = currentCount + (checkIn[5] / 5);
                        currentTally = currentTally + 1;
                    } else {
                        currentCount = currentCount + (checkIn[4] / 4);
                        currentTally = currentTally + 1;
                    }

                    if (checkOut.length == 6) {
                        currentCount = currentCount + (checkOut[5] / 5);
                        currentTally = currentTally + 1;
                    } else {
                        currentCount = currentCount + (checkOut[4] / 4);
                        currentTally = currentTally + 1;
                    }
                }
            }
        }

        for (var y = 0; y < currentDays.length; y++) {
            if (currentDays[y] in instance.logs) {
                if (typeof instance.logs[currentDays[y]].check_in == 'undefined' || instance.logs[currentDays[y]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[currentDays[y]].check_in;
                    var checkOut = instance.logs[currentDays[y]].check_out;

                    if (checkIn.length == 6) {
                        pastCount = pastCount + (checkIn[5] / 5);
                        pastTally = pastTally + 1;
                    } else {
                        pastCount = pastCount + (checkIn[4] / 4);
                        pastTally = pastTally + 1;
                    }

                    if (checkOut.length == 6) {
                        pastCount = pastCount + (checkOut[5] / 5);
                        pastTally = pastTally + 1;
                    } else {
                        pastCount = pastCount + (checkOut[4] / 4);
                        pastTally = pastTally + 1;
                    }
                }
            }
        }

        if (currentTally > 0) {
            var currentScore = currentScore + ((currentCount / (currentTally * 2)) * 25).toFixed(2);
        } else {
            return 404;
        }

        if (pastTally > 0) {
            var pastScore = pastScore + ((pastCount / (pastTally * 2)) * 25).toFixed(2);
        } else {
            return 404;
        }
    }

    return [currentScore, pastScore, timeframeMessage];
}