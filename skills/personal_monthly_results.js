module.exports = function(controller) {
    controller.hears(['Personal Monthly Results', 'Personal Monthly Result', 'Personal monthly results', 'Personal monthly result', 'personal monthly results', 'personal monthly result'], 'direct_message', function(bot, message) {
        controller.storage.users.get(message.user, function(error, output) {
            if (!output) {
                bot.reply(message, 'Nothing to report! I don\'t seem to have any logs to report from :thinking_face:\nTry doing your `Check In` and `Check Out` logs or email support@getinternal.co for help!');
            } else {
                results = getOutput(output);
                if (results == 404) {
                    bot.reply(message, 'I apologize, but I do not have anything to report - I need at least one day\'s worth of logs to report results\nIf I\'m wrong, please email support@getinternal.co for help!');
                } else {
                    if (results.length == 9) {
                        controller.storage.teams.get(message.team, function (err, info) {
                            if (typeof info.customization.question == 'undefined') {
                                var topic = "Deleted Custom Topic"
                            } else {
                                var topic = info.customization.question.topic;
                            }
                            bot.reply(message, {
                                text: 'Hey there! Here is your personal monthly report. Scores are out of 100%...\n',
                                attachments: [
                                    {
                                        title: 'Sleep',
                                        color: '#02D2FF',
                                        attachment_type: 'default',
                                        text: results[0] + '\n'
                                    },
                                    {
                                        title: 'Energy',
                                        color: '#2A02FF',
                                        attachment_type: 'default',
                                        text: results[2] + '\n'
                                    },
                                    {
                                        title: 'Mood',
                                        color: '#8A02FF',
                                        attachment_type: 'default',
                                        text: results[3] + '\n'
                                    },
                                    {
                                        title: 'Motivation',
                                        color: '#CF02FF',
                                        attachment_type: 'default',
                                        text: results[4] + '\n'
                                    },
                                    {
                                        title: 'Efficiency',
                                        color: '#FF029D',
                                        attachment_type: 'default',
                                        text: results[5] + '\n'
                                    },
                                    {
                                        title: 'Fulfillment',
                                        color: '#FF8402',
                                        attachment_type: 'default',
                                        text: results[6] + '\n'
                                    },
                                    {
                                        title: topic,
                                        color: '#02FF92',
                                        attachment_type: 'default',
                                        text: results[7] + '\n'
                                    },
                                    {
                                        title: 'Overall',
                                        color: '#02FF57',
                                        attachment_type: 'default',
                                        text: results[8]
                                    }
                                ]
                            });
                        });
                    } else {
                        bot.reply(message, {
                            text: 'Hey there! Here is your personal monthly report. Scores are out of 100%...\n',
                            attachments: [
                                {
                                    title: 'Sleep',
                                    color: '#02D2FF',
                                    attachment_type: 'default',
                                    text: results[0] + '\n'
                                },
                                {
                                    title: 'Energy',
                                    color: '#2A02FF',
                                    attachment_type: 'default',
                                    text: results[2] + '\n'
                                },
                                {
                                    title: 'Mood',
                                    color: '#8A02FF',
                                    attachment_type: 'default',
                                    text: results[3] + '\n'
                                },
                                {
                                    title: 'Motivation',
                                    color: '#CF02FF',
                                    attachment_type: 'default',
                                    text: results[4] + '\n'
                                },
                                {
                                    title: 'Efficiency',
                                    color: '#FF029D',
                                    attachment_type: 'default',
                                    text: results[5] + '\n'
                                },
                                {
                                    title: 'Fulfillment',
                                    color: '#FF8402',
                                    attachment_type: 'default',
                                    text: results[6] + '\n'
                                },
                                {
                                    title: 'Overall',
                                    color: '#02FF57',
                                    attachment_type: 'default',
                                    text: results[7]
                                }
                            ]
                        });
                    }
                }
            }
    
        });
    });

    function getOutput(results) {
        var moment = require('moment');
        var startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
        var endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

        var day = startOfMonth;

        var days = [];
        while (day <= endOfMonth) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
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

        for (var a = 0; a < days.length; a++) {
            if (days[a] in results.logs) {
                if (typeof results.logs[days[a]].check_in == 'undefined' || typeof results.logs[days[a]].check_out == 'undefined') {
                    // Pass
                } var checkIn = instance.logs[days[j]].check_in;
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