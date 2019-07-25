module.exports = function (controller) {
    controller.hears(['Week results', 'week results', 'Weekly results', 'weekly results'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, info) {
            if (typeof info.status != 'undefined' && info.status == 'top' || info.status == 'mid') {
                controller.storage.users.find({ team: message.team }, function (error, output) {
                    if (!output) {
                        bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                    } else {
                        var results = getWeeklyOutput(output, info.status);
                        if (results == 404) {
                            bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                        } else {
                            if (info.status == 'top') {
                                if (results[0].length == 9) {
                                    if (typeof info[i].customization.question == 'undefined') {
                                        var topic = "Deleted Custom Topic"
                                    } else {
                                        var topic = info[i].customization.question.topic;
                                    }
                                    bot.reply(message, {
                                        text: 'Hey there! Here are your weekly organization averages...\n',
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
                                } else {
                                    bot.reply(message, {
                                        text: 'Hey there! Here are your weekly organization averages...\n',
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
                                                title: 'Overall',
                                                color: '#02FF57',
                                                attachment_type: 'default',
                                                text: 'Logs Completed: ' + results[2] + '\n' + results[0][6]
                                            }
                                        ]
                                    });
                                }
                            } else {
                                if (results[0].length == 9) {
                                    if (typeof info.customization.question == 'undefined') {
                                        var topic = "Deleted Custom Topic"
                                    } else {
                                        var topic = info.customization.question.topic;
                                    }
                                    bot.reply(message, {
                                        text: 'Hey there! Here are your weekly organization averages...\n',
                                        attachments: [
                                            {
                                                title: 'Sleep',
                                                color: '#02D2FF',
                                                attachment_type: 'default',
                                                text: results[0][1] + '\n'
                                            },
                                            {
                                                title: 'Energy',
                                                color: '#2A02FF',
                                                attachment_type: 'default',
                                                text: results[0][2] + '\n'
                                            },
                                            {
                                                title: 'Mood',
                                                color: '#8A02FF',
                                                attachment_type: 'default',
                                                text: results[0][3] + '\n'
                                            },
                                            {
                                                title: 'Confidence',
                                                color: '#CF02FF',
                                                attachment_type: 'default',
                                                text: results[0][4] + '\n'
                                            },
                                            {
                                                title: 'Efficiency',
                                                color: '#FF029D',
                                                attachment_type: 'default',
                                                text: results[0][5] + '\n'
                                            },
                                            {
                                                title: 'Fulfillment',
                                                color: '#FF8402',
                                                attachment_type: 'default',
                                                text: results[0][6] + '\n'
                                            },
                                            {
                                                title: topic,
                                                color: '#02FF92',
                                                attachment_type: 'default',
                                                text: results[0][7] + '\n'
                                            },
                                            {
                                                title: 'Overall',
                                                color: '#02FF57',
                                                attachment_type: 'default',
                                                text: results[0][8]
                                            }
                                        ]
                                    });
                                } else {
                                    bot.reply(message, {
                                        text: 'Hey there! Here are your weekly organization averages...\n',
                                        attachments: [
                                            {
                                                title: 'Sleep',
                                                color: '#02D2FF',
                                                attachment_type: 'default',
                                                text: results[0][1] + '\n'
                                            },
                                            {
                                                title: 'Energy',
                                                color: '#2A02FF',
                                                attachment_type: 'default',
                                                text: results[0][2] + '\n'
                                            },
                                            {
                                                title: 'Mood',
                                                color: '#8A02FF',
                                                attachment_type: 'default',
                                                text: results[0][3] + '\n'
                                            },
                                            {
                                                title: 'Confidence',
                                                color: '#CF02FF',
                                                attachment_type: 'default',
                                                text: results[0][4] + '\n'
                                            },
                                            {
                                                title: 'Efficiency',
                                                color: '#FF029D',
                                                attachment_type: 'default',
                                                text: results[0][5] + '\n'
                                            },
                                            {
                                                title: 'Fulfillment',
                                                color: '#FF8402',
                                                attachment_type: 'default',
                                                text: results[0][6] + '\n'
                                            },
                                            {
                                                title: 'Overall',
                                                color: '#02FF57',
                                                attachment_type: 'default',
                                                text: results[0][7]
                                            }
                                        ]
                                    });
                                }
                            }
                        }
                    }
                });
            } else {
                bot.reply(message, "Lo siento, amigo - Monthly reporting is only available to paid subscribers! Check out plans on our site: https://getinternal.co");
            }
        });
    })
}

function getWeeklyOutput(results, status) {
    const moment = require('moment');
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');

    var day = startOfWeek;

    var days = [];
    while (day <= endOfWeek) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var efficiencyCount = [];
    var fulfillmentCount = [];
    var customCount = [];
    var overallCount = [];

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = results.logs[days[j]].check_in;
                    var checkOut = results.logs[days[j]].check_out;

                    sleepCount.push(checkIn[0]);
                    energyCount.push(checkIn[1]);
                    moodCount.push(checkIn[2]);
                    confidenceCount.push(checkIn[3]);
                    if (checkIn.length == 6) {
                        customCount.push(checkIn[4]);
                        overallCount.push(checkIn[5] / 5);
                    } else {
                        overallCount.push(checkIn[4] / 4);
                    }

                    efficiencyCount.push(checkOut[0]);
                    confidenceCount.push(checkOut[1]);
                    moodCount.push(checkOut[2]);
                    fulfillmentCount.push(checkOut[3]);
                    if (checkOut.length == 6) {
                        customCount.push(checkOut[4]);
                        overallCount.push(checkOut[5] / 5);
                    } else {
                        overallCount.push(checkOut[4] / 4);
                    }
                }
            }
        }
    }

    if (customCount.length > 0) {
        var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount, customCount];

        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var custom = (customCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var weeklyReport = [];
        weeklyReport.push(sleep);
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            weeklyReport.push(overallWeek);
        }

        if (status == 'top') {
            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        } else {
            var returnArray = [analysisOutcome];
        }
        return returnArray;

    } else if (customCount.length == 0) {
        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

        var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount];
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var weeklyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            weeklyReport.push(overallWeek);
        }

        if (status == 'top') {
            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        } else {
            var returnArray = [analysisOutcome];
        }
        return returnArray;
    } else {
        return 404;
    }
}