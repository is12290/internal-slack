module.exports = function (controller) {
    controller.hears(['^weekly team result', '^weekly team results', '^weekly Team Results', '^weekly Team Result', '^weekly team report', '^weekly team Report', '^weekly Team Report'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (err, role) {
            if (err) {
                console.log("error: ", err);
                bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
            }
            if (typeof role.status == 'undefined' || role.status != 'manager') {
                bot.reply(message, 'Whoops! Weekly team results can only be reported to paid managers - look into upgrading on our site: https://getinternal.co');
            } else {
                controller.storage.users.find({ team: message.team }, function (error, output) {
                    if (error) {
                        console.log("error: ", error);
                        bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                    }
                    if (!output) {
                        bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                    } else {
                        var results = getWeeklyOutput(output);
                        if (results == 404) {
                            bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
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

        for (var k = 0; k < lastWeekDays.length; k++) {
            if (lastWeekDays[k] in instance.logs) {
                if (typeof instance.logs[lastWeekDays[k]].check_in == 'undefined' || instance.logs[lastWeekDays[k]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[lastWeekDays[k]].check_in;
                    var checkOut = instance.logs[lastWeekDays[k]].check_out;

                    lastWeekCount.push(checkIn[4] / 4);

                    lastWeekCount.push(checkOut[4] / 4);

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

        if (lastWeekCount.length > 0) {
            var lastWeek = (lastWeekCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek +'\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek +'\This week is down ' + difference + '% compared to last week';
            }
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek +'\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek +'\This week is down ' + difference + '% compared to last week';
            }
            weeklyReport.push(overallWeek);
        }

        var returnArray = [weeklyReport, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];

        return returnArray;
    } else {
        return 404;
    }
}