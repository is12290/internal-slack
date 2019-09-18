module.exports = function (controller) {
    controller.hears(['^weekly Results', '^weekly Result', '^weekly results', '^weekly result', '^weekly Reports', '^weekly Report', '^weekly reports', '^weekly report',], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                console.log("error: ", error);
                bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
            }
            if (!user || typeof user == 'undefined') {
                controller.storage.teams.get(message.team, function (err, team) {
                    if (err) {
                        console.log(err);
                    }
                    bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        const newUser = {};
    
                        convo.addMessage("Greetings, <@" + message.user + ">! This is the first time we're meeting, so just give me a quick second to set you up on my end...", function (response, convo) {
                            bot.api.users.info({ user: reply.user }, (error, response) => {
                                if (error) {
                                    console.log("error: ", error);
                                }
                                let { name, real_name } = response.user;
                                newUser.name = real_name;
                                newUser.email = response.user.profile.email;
                                newUser.timezone = response.user.tz
                            })
                            bot.api.channels.invite({ token: bot.config.bot.app_token, channel: team.bot.channel, user: message.user }, function (err, outcome) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            });
                            newUser.channel = message.channel;
                            newUser.team = message.team;
                            newUser.status = 'employee';
                            newUser.id = message.user;
                            newUser.token = bot.config.token;
                        });
    
                        convo.addQuestion("All done! I've just got one quick question - what's your role here?", function (response, convo) {
                            newUser.role = response.text;
                            convo.next();
                        }, 'default');
    
                        convo.say("Cool! Thanks for humoring my shenanigans. Now the fun part...");
    
                        convo.activate();
    
                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                controller.storage.users.save(newUser);
    
                                bot.say({
                                    channel: convo.context.channel,
                                    text: "Choose what feature you'd like to check out! You can see this message when ever you want by sending me a message saying `Help`",
                                    attachments: [
                                        {
                                            title: 'Questionnaires',
                                            color: '#02D2FF',
                                            callback_id: 'questionnaire',
                                            attachment_type: 'default',
                                            text: "Record your headspace at the beginning and end of your workday",
                                            actions: [
                                                {
                                                    'name': 'checkin-button',
                                                    'value': 'Yes-CheckIn',
                                                    'text': 'Check In',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'reflect-button',
                                                    'value': 'Yes-Reflect',
                                                    'text': 'Reflect',
                                                    'type': 'button'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Reports',
                                            color: '#2A02FF',
                                            attachment_type: 'default',
                                            callback_id: 'report',
                                            text: "Monitor your emotional well-being overtime",
                                            actions: [
                                                {
                                                    'name': 'Weekly-Report-button',
                                                    'value': 'Weekly-Report',
                                                    'text': 'Weekly Report',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'Monthly-Report-button',
                                                    'value': 'Monthly-Report',
                                                    'text': 'Monthly Report',
                                                    'type': 'button'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Special Actions',
                                            color: '#8A02FF',
                                            callback_id: 'special',
                                            attachment_type: 'default',
                                            text: "Get the insights you're curious about",
                                            actions: [
                                                {
                                                    'name': 'Compare-Scores-button',
                                                    'value': 'Compare-Scores',
                                                    'text': 'Compare Scores',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'Historic-Search-button',
                                                    'value': 'Historic-Search',
                                                    'text': 'Historic Search',
                                                    'type': 'button'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Customizations',
                                            color: '#CF02FF',
                                            callback_id: 'custom',
                                            attachment_type: 'default',
                                            text: "Choose times to be automatically sent reports and questionnaires",
                                            actions: [
                                                {
                                                    'name': 'Customize-Questionnaires-button',
                                                    'value': 'Customize-Questionnaires',
                                                    'text': 'Customize Questionnaires',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'Customize-Reports-button',
                                                    'value': 'Customize-Reports',
                                                    'text': 'Customize Reports',
                                                    'type': 'button'
                                                }
                                            ]
                                        }
                                    ]
                                })
                            }
                        })
                    })
                })
            }

            else {
                if (!user) {
                    bot.reply(message, 'Nothing to report! I don\'t seem to have any logs to report from :thinking_face:\nTry doing your `Check In` and `Check Out` logs or email support@getinternal.co for help!');
                } else {
                    results = getWeeklyOutput(user);
                    if (results == 404) {
                        bot.reply(message, 'I apologize, but I do not have anything to report - I need at least one day\'s worth of logs to report results\nIf I\'m wrong, please email support@getinternal.co for help!');
                    } else {
                        bot.reply(message, {
                            text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
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
            }
        })
    });
}

function getWeeklyOutput(results) {
    const moment = require('moment');
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');

    var day = startOfWeek;
    var days = [];
    while (day <= endOfWeek) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var startOfLastWeek = startOfWeek.subtract(7, 'd');
    var endOfLastWeek = endOfWeek.subtract(7, 'd');

    var lastWeekDay = startOfLastWeek;

    var lastWeekDays = [];
    while (lastWeekDay <= endOfLastWeek) {
        lastWeekDays.push(lastWeekDay.format('L'));
        lastWeekDay = lastWeekDay.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var lastWeekCount = [];

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

    for (var k = 0; k < lastWeekDays.length; k++) {
        if (lastWeekDays[k] in results.logs) {
            if (typeof results.logs[lastWeekDays[k]].check_in == 'undefined' || results.logs[lastWeekDays[k]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[lastWeekDays[k]].check_in;
                var checkOut = results.logs[lastWeekDays[k]].check_out;

                if (checkIn == 'undefined' || checkOut == 'undefined') {
                    // Pass
                } else {
                    lastWeekCount.push(checkIn[4] / 4);
                    lastWeekCount.push(checkOut[4] / 4);
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

        if (lastWeekCount.length > 0) {
            var lastWeek = ((lastWeekCount.reduce(function (a, b) { return a + b; }, 0) * 25) / lastWeekCount.length).toFixed(2);
        }

        if (overall < 50) {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *negative*';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallAnalysis = overallAnalysis +'\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        } else {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *positive*!';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallAnalysis = overallAnalysis +'\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        }

        var returnArray = [analysisOutcome, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
}