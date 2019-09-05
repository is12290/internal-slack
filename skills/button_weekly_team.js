module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Weekly-Team-Report") {
            controller.storage.users.find({ team: message.team }, function (error, output) {
                if (error) {
                    console.log("error: ", err);
                    bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                }
                var role;
                for (var z = 0; z < output.length; z++) {
                    var output_instance = output[z];
                    if (output_instance.id == message.user) {
                        role = output_instance;
                        break;
                    }
                }
                if (typeof role.status == 'undefined' || role.status != 'manager') {
                    bot.reply(message, 'Whoops! Weekly team results can only be reported to paid managers - look into upgrading on our site: https://getinternal.co');
                } else {
                    if (!output) {
                        bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                    } else {
                        var results = getWeeklyOutput(output);
                        if (results == 404) {
                            bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                        } else {
                            bot.reply(message, {
                                text: 'Hey there! Here are your weekly team averages...\n',
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
            });
        } else {
            // Pass
        }
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
                    energyCount.push(checkOut[1]);
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
        var sleep = ((sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25) / sleepCount.length).toFixed(2);
        var energy = ((energyCount.reduce(function (a, b) { return a + b; }, 0) * 25) / energyCount.length).toFixed(2);
        var mood = ((moodCount.reduce(function (a, b) { return a + b; }, 0) * 25) / moodCount.length).toFixed(2);
        var confidence = ((confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / confidenceCount.length).toFixed(2);
        var presence = ((presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / presenceCount.length).toFixed(2);
        var fulfillment = ((fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / fulfillmentCount.length).toFixed(2);
        var overall = ((overallCount.reduce(function (a, b) { return a + b; }, 0) * 25) / overallCount.length).toFixed(2);
        overall = Math.round(overall);

        var loopArray = [sleep, energy, mood, confidence, presence, fulfillment];

        var countArray = [sleepCount, energyCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];
        var inDepthArray = [];
        for (var i = 0; i < countArray.length; i++) {
            var insight = countArray[i];
            var map = { '1': 0, '2': 0, '3': 0, '4': 0 }
            for (var x = 0; x < insight.length; x++) {
                map[insight[x]] = map[insight[x]] + 1
            }
            inDepthArray.push(map);
        }

        var weeklyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            var loopInstance = Math.round(loopArray[z]);
            if (loopInstance > 50) {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }

        if (lastWeekCount.length > 0) {
            var lastWeek = ((lastWeekCount.reduce(function (a, b) { return a + b; }, 0) * 25) / lastWeekCount.length).toFixed(2);
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallWeek = overallWeek + '\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is down ' + difference + '% compared to last week';
            }
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallWeek = overallWeek + '\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is down ' + difference + '% compared to last week';
            }
            weeklyReport.push(overallWeek);
        }

        var returnArray = [weeklyReport, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
}