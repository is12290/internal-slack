module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Daily-Team-Report") {
            controller.storage.users.find({ team: message.team.id }, function (error, output) {
                var role;
                for (var z = 0; z < output.length; z++) {
                    var output_instance = output[z];
                    if (output_instance.id == message.user) {
                        role = output_instance;
                        break;
                    }
                }
                if (error) {
                    console.log("error: ", error);
                    bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                }
                if (!role || typeof role.status == 'undefined' || role.status != 'manager') {
                    bot.reply(message, 'My deepest condolences, but you need to be a manager in order to report team fitness results! If you\'re interested in upgrading, visit our site: https://getinternal.co');
                } else {
                    if (!output) {
                        bot.reply(message, 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!')
                    } else {
                        var results = getDailyOutput(output);
                        if (results == 404) {
                            bot.reply(message, 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!')
                        } else {
                            bot.reply(message, {
                                text: 'Hey there! Here are your team results for the day...\n',
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
        } else {
            // Pass
        }
    })
}

function getDailyOutput(input) {
    const moment = require('moment');
    var today = moment();
    today = today.format("MM/DD/YYYY");
    var yesterday = moment();
    yesterday = yesterday.subtract(1, 'd');
    yesterday = yesterday.format("MM/DD/YYYY");

    // Necessary variables
    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var yesterday = 0;

    for (var i = 0; i < input.length; i++) {
        var instance = input[i];
        if (typeof instance.logs[today] == 'undefined') {
            // Pass
        } else if (typeof instance.logs[today] != 'undefined') {
            var checkIn = instance.logs[today].check_in;
            var checkOut = instance.logs[today].check_out;

            if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                // Pass
            } else {
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

        if (typeof instance.logs[yesterday] == 'undefined') {
            // Pass
        } else if (typeof instance.logs[yesterday] != 'undefined') {
            var checkIn = instance.logs[yesterday].check_in;
            var checkOut = instance.logs[yesterday].check_out;

            if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                // Pass
            } else {
                yesterdayCount = [];

                yesterdayCount.push(checkIn[4] / 4);
                yesterdayCount.push(checkOut[4] / 4);

                yesterday = yesterday + ((yesterdayCount.reduce(function (a, b) { return a + b; }, 0) * 25) / yesterdayCount.length).toFixed(2);

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

        var dailyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            var loopInstance = Math.round(loopArray[z]);
            if (loopInstance > 50) {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                dailyReport.push(message);
            } else {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                dailyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness today was *positive*!';
            if (!yesterday || typeof yesterday == 'undefined' || yesterday == 0) {
                overallWeek = overallWeek + '\nNo logs yesterday to compare against :rowboat:';
            } else if (overall > yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is up ' + difference + '% compared to yesterday';
            } else if (overall < yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is down ' + difference + '% compared to yesterday';
            }
            dailyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness today was *negative*';
            if (!yesterday || typeof yesterday == 'undefined' || yesterday == 0) {
                overallWeek = overallWeek + '\nNo logs yesterday to compare against :rowboat:';
            } else if (overall > yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is up ' + difference + '% compared to yesterday';
            } else if (overall < yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is down ' + difference + '% compared to yesterday';
            }
            dailyReport.push(overallWeek);
        }

        var returnArray = [dailyReport, inDepthArray];
        return returnArray;
    } else {
        return 404;
    }
}