module.exports = function (controller) {
    controller.hears(['^monthly team result', '^monthly team results', '^monthly Team Results', '^monthly Team Result', '^monthly team report', '^monthly team Report', '^monthly Team Report'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, role) {
            if (error) {
                console.log("error: ", error);
                bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
            }
            if (typeof role.status == 'undefined' || role.status != 'manager') {
                bot.reply(message, 'Slow down there, amigo! Monthly team reporting is only available to paid managers - you can upgrade your status here: https://getinternal.co');
            } else {
                controller.storage.users.find({ team: message.team }, function (err, output) {
                    if (err) {
                        console.log("error: ", err);
                        bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                    }
                    if (!output) {
                        bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                    } else {
                        var results = getMonthlyOutput(output);
                        if (results == 404) {
                            bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                        } else {
                            bot.reply(message, {
                                text: 'Hey there! Here is you organization\'s monthly report...\n',
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
                                        text: results[0][2] + '\n*Happy:* ' + results[1][2][0] + ' | *Calm:* ' + results[1][2][1] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][3] + '\n'
                                    },
                                    {
                                        title: 'Confidence',
                                        color: '#CF02FF',
                                        attachment_type: 'default',
                                        text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                    },
                                    {
                                        title: 'Presence',
                                        color: '#FF029D',
                                        attachment_type: 'default',
                                        text: results[0][4] + '\n*Grounded:* ' + results[1][4][0] + ' | *Aware:* ' + results[1][4][1] + ' | *Out of It:* ' + results[1][4][2] + ' | *Disconnected:* ' + results[1][4][3] + '\n'
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
                    }
                });
            }

        });
    })
}

function getMonthlyOutput(results) {
    var moment = require('moment');
    var startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
    var endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

    var day = startOfMonth;

    var days = [];
    while (day <= endOfMonth) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var startOfLastMonth = startOfMonth.subtract(7, 'd');
    var endOfLastMonth = endOfMonth.subtract(7, 'd');

    var lastMonthDay = startOfLastMonth;

    var lastMonthDays = [];
    while (lastMonthDay <= endOfLastMonth) {
        lastMonthDays.push(lastMonthDay.format('L'));
        lastMonthDay = lastMonthDay.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var lastMonthCount = [];

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
                    confidenceCount.push(checkOut[1]);
                    moodCount.push(checkOut[2]);
                    fulfillmentCount.push(checkOut[3]);
                    overallCount.push(checkOut[4] / 4);
                    
                }
            }
        }

        for (var k = 0; k < lastMonthDays.length; k++) {
            if (lastMonthDays[k] in instance.logs) {
                if (typeof instance.logs[lastMonthDays[k]].check_in == 'undefined' || instance.logs[lastMonthDays[k]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[lastMonthDays[k]].check_in;
                    var checkOut = instance.logs[lastMonthDays[k]].check_out;

                    lastMonthCount.push(checkIn[4] / 4);

                    lastMonthCount.push(checkOut[4] / 4);

                }
            }
        }
    }

    if (overallCount.length > 0) {
        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var presence = (presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, presence, fulfillment];

        var countArray = [sleepCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
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

        if (lastMonthCount.length > 0) {
            var lastMonth = (lastMonthCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        }

        if (overall > 50) {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *positive*!';
            if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth +'\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth +'\This week is down ' + difference + '% compared to last week';
            }
            monthlyReport.push(overallMonth);
        }
        else {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *negative*';
            if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth +'\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth +'\This week is down ' + difference + '% compared to last week';
            }
            monthlyReport.push(overallMonth);
        }

        var returnArray = [monthlyReport, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        
        return returnArray;
    } else {
        return 404;
    }
}
