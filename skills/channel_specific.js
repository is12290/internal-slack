module.exports = function (controller) {
    controller.on('slash_command', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (typeof team.status != 'undefined' && team.status == 'top') {
                if (message.command == '/report') {
                    var timeframe = message.text[0];
                    var users = [];
                    bot.api.channel.info({
                        channel: message.text[1]
                    }, function (err, res) {
                        if (err) {
                            bot.reply(message, "Try one more time?");
                        }
                        users.push(res.members);
                    });

                    controller.storage.users.find({ team: message.team }, function (err, all_users) {
                        if (err) {
                            bot.reply(message, "There's been a slight problem on my end");
                        }

                        var data = [];
                        for (var i = 0; i < users.length; i++) {
                            var user = users[i];
                            for (var j = 0; j < all_users.length; j++) {
                                var instance = all_users[j];
                                if (instance.id == user) {
                                    data.push(instance);
                                }
                            }
                        }

                        var output = getOutput(data, timeframe);
                        if (output == 404) {
                            bot.startPrivateConversation({ user: message.user }, function (err, dm) {
                                if (err) {
                                    console.log(err);
                                }
                                dm.say("I'm sorry, I don't appear to have sufficient info to report these metrics");
                            });
                        } else {
                            bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                                if (err) {
                                    dm.say("Sorry, fam! Something went wrong");
                                }
                                convo.say({
                                    attachments: [
                                        {
                                            title: 'Sleep',
                                            color: '#02D2FF',
                                            attachment_type: 'default',
                                            text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                        },
                                        {
                                            title: 'Energy',
                                            color: '#2A02FF',
                                            attachment_type: 'default',
                                            text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                        },
                                        {
                                            title: 'Mood',
                                            color: '#8A02FF',
                                            attachment_type: 'default',
                                            text: results[0][2] + '\n*Ecstatic:* ' + results[1][2][0] + ' | *Positive:* ' + results[1][2][1] + ' | *Indifferent:* ' + results[1][2][2] + ' | *Miserable:* ' + results[1][2][3] + '\n'
                                        },
                                        {
                                            title: 'Confidence',
                                            color: '#CF02FF',
                                            attachment_type: 'default',
                                            text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                        },
                                        {
                                            title: 'Efficiency',
                                            color: '#FF029D',
                                            attachment_type: 'default',
                                            text: results[0][4] + '\n*Overdrive:* ' + results[1][4][0] + ' | *Normal:* ' + results[1][4][1] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][3] + '\n'
                                        },
                                        {
                                            title: 'Fulfillment',
                                            color: '#FF8402',
                                            attachment_type: 'default',
                                            text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                        },
                                        {
                                            title: topic,
                                            color: '#FDFF02',
                                            attachment_type: 'default',
                                            text: results[0][6] + '\n*' + info.customization.question.choices[0] + ':* ' + results[1][6][0] + ' | *' + info.customization.question.choices[1] + ':* ' + results[1][6][1] + ' | *' + info.customization.question.choices[2] + ':* ' + results[1][6][2] + ' | *' + info.customization.question.choices[3] + ':* ' + '\n'
                                        },
                                        {
                                            title: 'Overall',
                                            color: '#02FF57',
                                            attachment_type: 'default',
                                            text: 'Logs Completed: ' + results[2] + '\n' + results[0][7]
                                        }
                                    ]
                                });
                            })
                        }
                    });
                }
            } else {
                bot.reply(message, "Sorry to break it to you, but this functionality is only for top tier subscribers :confused");
            }
        });
    })
}

function getOutput(results, timeframe) {
    var moment = require('moment');
    if (timeframe == 'monthly') {
        var start = moment().startOf('month').format('DD/MM/YYYY');
        var end = moment().endOf('month').format('DD/MM/YYYY');
        var day = start;

        var days = [];
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'weekly') {
        var start = moment().startOf('isoWeek').format('DD/MM/YYYY');
        var end = moment().endOf('isoWeek').format('DD/MM/YYYY');
        var day = start;

        var days = [];
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'daily') {
        days = [moment().format('DD/MM/YYY')]
    }
    
    var sleepCount = 0;
    var energyCount = 0;
    var moodCount = 0;
    var confidenceCount = 0;
    var efficiencyCount = 0;
    var fulfillmentCount = 0;
    var customCount = 0;
    var overallCount = 0;
    var tally = 0;
    var customTally = 0;

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
                    if (checkIn.length == 6) {
                        customCount = customCount + checkIn[4]
                        overallCount = overallCount + (checkIn[5] / 5);
                        tally = tally + 1;
                        customTally = customTally + 1;
                    } else {
                        overallCount = overallCount + (checkIn[4] / 4);
                        tally = tally + 1;
                    }


                    efficiencyCount = efficiencyCount + checkOut[0];
                    confidenceCount = confidenceCount + checkOut[1];
                    moodCount = moodCount + checkOut[2];
                    fulfillmentCount = fulfillmentCount + checkOut[3];
                    if (checkOut.length == 6) {
                        customCount = customCount + checkOut[4];
                        overallCount = overallCount + (checkOut[5] / 5);
                    } else {
                        overallCount = overallCount + (checkOut[4] / 4);
                    }
                }
            }
        }

        if (tally > 0) {
            var sleep = ((sleepCount / tally) * 25).toFixed(2);
            var energy = ((energyCount / tally) * 25).toFixed(2);
            var mood = ((moodCount / (tally * 2)) * 25).toFixed(2);
            var confidence = ((confidenceCount / (tally * 2)) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / tally) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / tally) * 25).toFixed(2);
            var overall = ((overallCount / (tally * 2)) * 25).toFixed(2);

            if (customTally > 0) {
                var custom = ((customCount / (customTally * 2)) * 25).toFixed(2);
                var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
            } else {
                var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];
            }



            var monthlyReport = [];
            monthlyReport.push(sleep);
            for (var z = 0; z < loopArray.length; z++) {
                if (loopArray[z] > 50) {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                    monthlyReport.push(message);
                } else {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                    monthlyReport.push(message);
                }
            }

            if (overall > 50) {
                var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *positive*!';
                monthlyReport.push(overallMonth);
            }
            else {
                var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *negative*';
                monthlyReport.push(overallMonth);
            }

            return monthlyReport;

        } else {
            return 404;
        }
    }
}