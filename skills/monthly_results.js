module.exports  = function(controller) {
    controller.hears(['Monthly results', 'monthly results', 'Month results', 'month results'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.users.find({team: message.team}, function(error, output) {
            if (!output) {
                bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\nIf this is unusual behavior from me, email support@getinternal.co for help!');
            } else {
                var results = getOutput(output);
                if (results == 404) {
                    bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                } else {
                    if (results.length == 9) {
                        controller.storage.teams.get(message.team, function (err, info) {
                            if (typeof info.customization.question == 'undefined') {
                                var topic = "Deleted Custom Topic"
                            } else {
                                var topic = info.customization.question.topic;
                            }
                            bot.reply(message, {
                                text: 'Hey there! Here is you organization\'s monthly report...\n',
                                attachments: [
                                    {
                                        title: 'Sleep',
                                        color: '#02D2FF',
                                        attachment_type: 'default',
                                        text: results[1] + '\n'
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
                                        title: 'Confidence',
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
                            text: 'Hey there! Here is you organization\'s monthly report...\n',
                            attachments: [
                                {
                                    title: 'Sleep',
                                    color: '#02D2FF',
                                    attachment_type: 'default',
                                    text: results[1] + '\n'
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
                                    title: 'Confidence',
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
    })

    function getOutput(results) {
        const moment = require('moment');
        const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
        const endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

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
        var logTally = 0;

        for (var i = 0; i < results.length; i++) {
            var instance = results[i];
            var checkin = [];
            var checkout = [];

            for (var j = 0; j < days.length; j++) {
                if (days[j] in instance.logs) {
                    if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                        // Pass
                    } else {
                        checkin.push(instance.logs[days[j]].check_in);
                        checkout.push(instance.logs[days[j]].check_out);
                    }
                }
            }

            if (checkin[0].length == 5) {
                for (var k = 0; k < checkin.length; k++) {
                    var specific = checkin[k];
                    sleepCount = sleepCount + specific[0];
                    energyCount = energyCount + specific[1];
                    moodCount = moodCount + specific[2];
                    confidenceCount = confidenceCount + specific[3];
                    customCount = customCount + specific[4];
                    overallCount = overallCount + (specific[5] / 5);
                }
    
                for (var l = 0; l < checkout.length; l++) {
                    var specific = checkout[l];
                    efficiencyCount = efficiencyCount + specific[0];
                    confidenceCount = confidenceCount + specific[1];
                    moodCount = moodCount + specific[2];
                    fulfillmentCount = fulfillmentCount + specific[3];
                    customCount = customCount + specific[4];
                    overallCount = overallCount + (specific[5] / 5);
                }
    
                logTally = logTally + 1;
            } else {
                for (var k = 0; k < checkin.length; k++) {
                    var specific = checkin[k];
                    sleepCount = sleepCount + specific[0];
                    energyCount = energyCount + specific[1];
                    moodCount = moodCount + specific[2];
                    confidenceCount = confidenceCount + specific[3];
                    overallCount = overallCount + (specific[4] / 4);
                }
    
                for (var l = 0; l < checkout.length; l++) {
                    var specific = checkout[l];
                    efficiencyCount = efficiencyCount + specific[0];
                    confidenceCount = confidenceCount + specific[1];
                    moodCount = moodCount + specific[2];
                    fulfillmentCount = fulfillmentCount + specific[3];
                    overallCount = overallCount + (specific[4] / 4);
                }

                logTally = logTally + 1;
            }
        }

        if (customCount > 0) {
            var sleep = ((sleepCount / logTally) * 25).toFixed(2);
            var energy = ((energyCount / logTally) * 25).toFixed(2);
            var mood = ((moodCount / (logTally * 2)) * 25).toFixed(2);
            var confidence = ((confidenceCount / (logTally * 2)) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / logTally) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / logTally) * 25).toFixed(2);
            var custom = ((customCount / (logTally * 2)) * 25).toFixed(2);
            var overall = ((overallCount / (logTally * 2)) * 25).toFixed(2);

            var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];

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

        } else if (customCount == 0 && sleepCount > 0) {
            var sleep = ((sleepCount / logTally) * 25).toFixed(2);
            var energy = ((energyCount / logTally) * 25).toFixed(2);
            var mood = ((moodCount / (logTally * 2)) * 25).toFixed(2);
            var confidence = ((confidenceCount / (logTally * 2)) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / logTally) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / logTally) * 25).toFixed(2);
            var overall = ((overallCount / (logTally * 2)) * 25).toFixed(2);

            var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

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