module.exports = function (controller) {
    controller.hears(['Personal Weekly Results', 'Personal Weekly Result', 'Personal weekly results', 'Personal weekly result', 'personal weekly results', 'personal weekly result'], 'direct_message', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, info) {
            controller.storage.users.get(message.user, function (error, output) {
                if (!output) {
                    bot.reply(message, 'Nothing to report! I don\'t seem to have any logs to report from :thinking_face:\nTry doing your `Check In` and `Check Out` logs or email support@getinternal.co for help!');
                } else {
                    results = getWeeklyOutput(output, info.status);
                    if (results == 404) {
                        bot.reply(message, 'I apologize, but I do not have anything to report - I need at least one day\'s worth of logs to report results\nIf I\'m wrong, please email support@getinternal.co for help!');
                    } else {
                        if (info.status == 'top') {
                            if (results[0].length == 9) {
                                if (typeof all_teams[i].customization.question == 'undefined') {
                                    var topic = "Deleted Custom Topic"
                                } else {
                                    var topic = all_teams[i].customization.question.topic;
                                }
                                bot.reply(message, {
                                    text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
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
                                            text: results[0][6] + '\n*' + all_teams[i].customization.question.choices[0] + ':* ' + results[1][6][0] + ' | *' + all_teams[i].customization.question.choices[1] + ':* ' + results[1][6][1] + ' | *' + all_teams[i].customization.question.choices[2] + ':* ' + results[1][6][2] + ' | *' + all_teams[i].customization.question.choices[3] + ':* ' + '\n'
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
                                    text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
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
                                    text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
                                    attachments: [
                                        {
                                            title: 'Sleep',
                                            color: '#02D2FF',
                                            attachment_type: 'default',
                                            text: results[0][0] + '\n'
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
                                            title: 'Motivation',
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
                                    text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
                                    attachments: [
                                        {
                                            title: 'Sleep',
                                            color: '#02D2FF',
                                            attachment_type: 'default',
                                            text: results[0][0] + '\n'
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
                                            title: 'Motivation',
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
        })
    });
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
        } else {
            // Pass
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

        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var analysisOutcome = [];
        var analysisArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
        for (var a = 0; a < analysisArray.length; a++) {
            if (analysisArray[a] < 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                analysisOutcome.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                analysisOutcome.push(message);
            }
        }

        if (overall < 50) {
            var overallAnalysis = 'Hmm.. It seems as though this week was not the best for you. I\'m sorry about that. There\'s always next week - Improve them scores!';
            analysisOutcome.push(overallAnalysis);
        } else {
            var overallAnalysis = 'Way to have a positive week! Shoot to keep it up :)';
            analysisOutcome.push(overallAnalysis);
        }

        if (status == 'top') {
            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        } else {
            var returnArray = [analysisOutcome];
        }

        return returnArray;

    } else if (customCount.length == 0) {
        var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount];

        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var analysisOutcome = [];
        var analysisArray = [sleep, energy, mood, confidence, efficiency, fulfillment];
        for (var a = 0; a < analysisArray.length; a++) {
            if (analysisArray[a] < 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                analysisOutcome.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                analysisOutcome.push(message);
            }
        }

        if (overall < 50) {
            var overallAnalysis = 'Hmm.. It seems as though this week was not the best for you. I\'m sorry about that. There\'s always next week - Improve them scores!'
            analysisOutcome.push(overallAnalysis)
        } else {
            var overallAnalysis = 'Way to have a positive week! Shoot to keep it up :)'
            analysisOutcome.push(overallAnalysis)
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