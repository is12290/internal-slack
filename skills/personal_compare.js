module.exports = function (controller) {
    controller.hears(['^compare', '^comparison'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
            }
            if (!user || typeof user == 'undefined') {
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                        bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                    }
                    const newUser = {};

                    bot.reply(message, "Hey! I am Internal, a bot used to monitor emotional fitness! Here's absolutely everything you need to know about me:\n\n\n*General Functionality: *\n_Check Ups:_\nCheck In – Send me a message saying `Check In` to initiate the check in log\nReflections – End of day reflections can be initiated by sending me a message saying `Reflect`\nAutomatic Check Ups – Look at the ‘_Customizations_’ section to learn how to set up your check ups to be automatically initiated so you don’t have to remember to message me everyday :grinning:\n\n_Results Reporting:_\n_A Quick Note – Only you have the capability of accessing your exact scores, managers (if plugged in) view aggregate scores so as to ensure nothing is personally identifiable_\nMonthly Reports – Send me a message saying `Monthly Report` to view your personal scores over the past month, as well as the amount of times you chose each topic response\nWeekly Reports - Send me a message saying `Weekly Report` to view your personal scores over the past week, as well as the amount of times you chose each topic response\nAutomatic Reports - Look at the ‘_Customizations_’ section to learn how to set up your reports to be automatically sent at the end of each week and month :+1:\n\n_Special Commands:_\nComparisons – Begin a score comparison by typing `Compare` which will initiate a conversation where I’ll ask you what two time frames you want to compare, then report the outcome\nHistorical Searching - Begin a historical search by typing `Search`, which will initiate a conversation where you will be asked to input the desired search time frame and I’ll report the outcome\n\n_Customizations:_\nCustom Check Ups – Send me a message saying `Customize Check Ups` where I will ask a few questions about your timezone and your desired times to be automatically sent Check In logs and the End of Day Question\nCustom Reporting – Send me a message saying `Customize Reports` where I will ask a few question about your timezone and your desired times to be automatically sent your reports\n\n*Manager-Specific Functionality: *\n_Verification:_\nManagers first need to be verified so I can add them to my memory for proper functionality. To verify yourself as a new manager, send me a message saying `New Manager`, where I’ll ask you to verify the email you used to purchase a subscription_Team Results Reporting:_\n_A Quick Note – I need to be added to private channels in order to see what employees are within the channel_\nDaily – Send me a message saying `Daily Team Report` to where you’ll be asked whether you want to see your entire Slack team’s aggregate daily scores or a specific Channel’s aggregate daily scores\nWeekly - Send me a message saying `Weekly Team Report` to where you’ll be asked whether you want to see your entire Slack team’s aggregate weekly scores or a specific Channel’s aggregate weekly scores\nMonthly - Send me a message saying `Monthly Team Report` to where you’ll be asked whether you want to see your entire Slack team’s aggregate monthly scores or a specific Channel’s aggregate monthly scores\n\n_Customizations:_\nCustom Team Reports – Send me a message saying `Customize Team Reports` where I will ask a few question about your timezone, desired times, and channel info in order to automatically send you your desired team reports\n\n_Special Commands:_\nChannel Specific Reporting – For a faster experience viewing a specific channel’s scores, send me a message saying `Specific Report` to initiate a conversation where I’ll ask for a few more details \nComparisons - Begin a score comparison by typing `Team Compare` which will initiate a conversation where I’ll ask you what two time frames you want to compare, as well as whether or not you desire the entire Slack team scores or a specific Channel, then report the outcome\nHistorical Searching - Begin a historical search by typing `Team Search`, which will initiate a conversation where you will be asked to input the desired search time frame, as well as whether or not you desire the entire Slack team scores or a specific Channel, and I’ll report the outcome\n\nIf you have any other questions or comments, feel free to reach out to my superiors at support@getinternal.co");

                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'new-user',
                                text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
                                color: "#0294ff",
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'yes-button',
                                        'value': 'Yes',
                                        'text': 'Yes',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'no-button',
                                        'value': 'No',
                                        'text': 'No',
                                        'type': 'button'
                                    }
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Yes',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'new-user',
                                                    text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
                                                    color: "#0294ff",
                                                    attachment_type: 'default',
                                                    actions: [
                                                        {
                                                            'name': 'yes-button',
                                                            'value': 'Yes',
                                                            'style': 'primary',
                                                            'text': 'Yes',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'no-button',
                                                            'value': 'No',
                                                            'text': 'No',
                                                            'type': 'button'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    )
                                    convo.next()
                                }
                            },
                            {
                                pattern: 'No',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'new-user',
                                                    text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
                                                    color: "#0294ff",
                                                    attachment_type: 'default',
                                                    actions: [
                                                        {
                                                            'name': 'yes-button',
                                                            'value': 'Yes',
                                                            'text': 'Yes',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'no-button',
                                                            'value': 'No',
                                                            'style': 'danger',
                                                            'text': 'No',
                                                            'type': 'button'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    bot.reply(message, "Better luck next time, I suppose! Sadly, you won't really be able to use my features until you're in my memory :zipper_mouth_face:");
                                    convo.stop();
                                }
                            }
                        ]
                    );


                    convo.addQuestion("What's your favorite book?", function (response, convo) {
                        bot.api.users.info({ user: response.user }, (error, response) => {
                            if (error) {
                                console.log("error: ", error);
                            }
                            let { name, real_name } = response.user;
                            newUser.name = real_name;
                        })
                        newUser.channel = message.channel;
                        newUser.team = message.team;
                        newUser.status = 'employee';
                        newUser.id = message.user;
                        convo.next();
                    }, 'default');

                    convo.addQuestion("What's your role here?", function (response, convo) {
                        newUser.role = response.text;
                        convo.next();
                    }, 'default');

                    convo.say("Thanks for that!\n\nNow, what was it you were looking to do?");

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            if (typeof newUser.name != 'undefined') {
                                controller.storage.users.save(newUser);
                            }
                        }

                    })
                })

            } else {
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log('error: ', err);
                    }
                    convo.say('I need a bit more information to compute the comparison...');

                    var startTimeframe = [];
                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Current',
                                text: 'You want to compare...',
                                callback_id: 'current',
                                attachment_type: 'default',
                                color: "#0294ff",
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
                    // convo.addQuestion({
                    //     text: 'Custom Timeframe',
                    //     blocks: [
                    //         {
                    //             "type": "section",
                    //             "block_id": "section1234",
                    //             "text": {
                    //                 "type": "mrkdwn",
                    //                 "text": "Would you be so kind as to select your custom timeframe?"
                    //             }
                    //         },
                    //         {
                    //             "type": "actions",
                    //             "elements": [
                    //                 {
                    //                     "type": "datepicker",
                    //                     "placeholder": {
                    //                         "type": "plain_text",
                    //                         "text": "Start Date",
                    //                         "emoji": true
                    //                     }
                    //                 },
                    //                 {
                    //                     "type": "datepicker",
                    //                     "placeholder": {
                    //                         "type": "plain_text",
                    //                         "text": "End Date",
                    //                         "emoji": true
                    //                     }
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // }, function (response, convo) {
                    //     endTimeframe.push(response.actions[0].selected_date);

                    //     if (endTimeframe.length == 2) {
                    //         convo.next();
                    //     } else {
                    //         convo.silentRepeat();
                    //     }
                    // }, 'custom');

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Past',
                                text: 'Against...',
                                callback_id: 'past',
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
                                            },
                                            // {
                                            //     "text": "Custom",
                                            //     "value": "Custom"
                                            // },
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
                            // {
                            //     pattern: "Custom",
                            //     callback: function (reply, convo) {
                            //         convo.addMessage({
                            //             text: 'Please pick the dates you would like to compare against',
                            //             action: 'custom'
                            //         });
                            //         endTimeframe.push(5);
                            //         convo.next();
                            //     }
                            // },
                        ]);

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            var results = getPersonalComparisonOutput(user, startTimeframe, endTimeframe);
                            if (results == 404) {
                                bot.reply(message, "Hmm... I checked my records and you don't seem to have info dating back that far");
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
                                            text: 'There has been a *' + ((results[0] - results[1]) / results[1]) * 100 + '%* change in emotional health'
                                        }
                                    ]
                                });
                            }
                        }
                    })
                })

            }
        })
    })
}

function getPersonalComparisonOutput(results, start, end) {
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

    for (var j = 0; j < currentDays.length; j++) {
        if (currentDays[j] in results.logs) {
            if (typeof results.logs[currentDays[j]].check_in == 'undefined' || results.logs[currentDays[j]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[currentDays[j]].check_in;
                var checkOut = results.logs[currentDays[j]].check_out;

                currentCount.push(checkIn[4] / 4);

                currentCount.push(checkOut[4] / 4);
            }
        }
    }

    for (var y = 0; y < pastDays.length; y++) {
        if (pastDays[y] in results.logs) {
            if (typeof results.logs[pastDays[y]].check_in == 'undefined' || results.logs[pastDays[y]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[pastDays[y]].check_in;
                var checkOut = results.logs[pastDays[y]].check_out;

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


    return [currentScore, pastScore, timeframeMessage];
}