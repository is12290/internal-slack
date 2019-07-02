module.exports = function(controller) {
    controller.hears(['Personal Weekly Results', 'Personal Weekly Result', 'Personal weekly results', 'Personal weekly result', 'personal weekly results', 'personal weekly result'], 'direct_message', function(bot, message) {
        controller.storage.users.get(message.user, function(error, output) {
            if (!output) {
                bot.reply(message, 'Nothing to report! I don\'t seem to have any logs to report from :thinking_face:\nTry doing your `Check In` and `Check Out` logs or email support@getinternal.co for help!');
            } else {
                results = getOutput(output);
                if (isNaN(results[1])) {
                    bot.reply(message, 'I apologize, but I do not have anything to report - I need at least one day\'s worth of logs to report results\nIf I\'m wrong, please email support@getinternal.co for help!');
                } else {
                    if (results.length == 9) {
                        controller.storage.teams.get(message.team, function (err, info) {
                            var topic = info.customization.question.topic;
                            bot.reply(message, {
                                text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
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
                                        color: '#FDFF02',
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
                            text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
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
        const moment = require('moment');
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');

        var day = startOfWeek;
        var days = [];
        while (day <= endOfWeek) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }

        var checkin = [];
        var checkout = [];
        for (var a = 0; a < days.length; a++) {
            if (days[a] in results.logs) {
                if (typeof results.logs[days[a]].check_in == 'undefined' || typeof results.logs[days[a]].check_out == 'undefined') {
                    // Pass
                } else {
                    checkin.push(results.logs[days[a]].check_in);
                    checkout.push(results.logs[days[a]].check_out);
                }                
            } else {
                // Pass
            }
        }

        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var confidenceCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;
        var customCount = 0;
        var overallCount = 0;

        if (checkin[0].length == 5) {
            for (var j = 0; j < checkin.length; j++) {
                var checkinInstance = checkin[j];
                sleepCount = sleepCount + checkinInstance[0];
                energyCount = energyCount + checkinInstance[1];
                moodCount = moodCount + checkinInstance[2];
                confidenceCount = confidenceCount + checkinInstance[3];
                customCount = customCount + checkinInstance[4];
                overallCount = overallCount + (checkinInstance[5] / 5);
            }
    
            for (var m = 0; m < checkout.length; m++) {
                var checkoutInstance = checkout[m];
                efficiencyCount = efficiencyCount + checkoutInstance[0];
                confidenceCount = confidenceCount + checkoutInstance[1];
                moodCount = moodCount + checkoutInstance[2];
                fulfillmentCount = fulfillmentCount + checkoutInstance[3];
                customCount = customCount + checkoutInstance[4];
                overallCount = overallCount + (checkoutInstance[5] / 5);
            }

        } else {
            for (var j = 0; j < checkin.length; j++) {
                var checkinInstance = checkin[j];
                sleepCount = sleepCount + checkinInstance[0];
                energyCount = energyCount + checkinInstance[1];
                moodCount = moodCount + checkinInstance[2];
                confidenceCount = confidenceCount + checkinInstance[3];
                overallCount = overallCount + (checkinInstance[4] / 4);
            }
    
            for (var m = 0; m < checkout.length; m++) {
                var checkoutInstance = checkout[m];
                efficiencyCount = efficiencyCount + checkoutInstance[0];
                confidenceCount = confidenceCount + checkoutInstance[1];
                moodCount = moodCount + checkoutInstance[2];
                fulfillmentCount = fulfillmentCount + checkoutInstance[3];
                overallCount = overallCount + (checkoutInstance[4] / 4);
            }
        }

        if (customCount > 0) {
            var sleep = ((sleepCount / checkin.length) * 25).toFixed(2);
            var energy = ((energyCount / checkin.length) * 25).toFixed(2);
            var mood = ((moodCount / (checkin.length + checkout.length)) * 25).toFixed(2);
            var confidence = ((confidenceCount / (checkin.length * 2)) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / checkout.length) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / checkout.length) * 25).toFixed(2);
            var custom = ((customCount / (checkin.length + checkout.length)) * 25).toFixed(2);
            var overall = ((overallCount / (checkin.length + checkout.length)) * 25).toFixed(2);

            var analysisOutcome = [];
            var analysisArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
            for (var a = 0; a < analysisArray.length; a++) {
                if (analysisArray[a] < 50) {
                    analysisOutcome.push('Average: *Negative*');
                } else {
                    analysisOutcome.push('Average: *Positive*');
                }
            }

            if (overall < 50) {
                var overallAnalysis = 'Hmm.. It seems as though this week was not the best for you. I\'m sorry about that. There\'s always next week - Improve them scores!'
            } else {
                var overallAnalysis = 'Way to have a positive week! Shoot to keep it up :)'
            }

            var sleepMessage = 'Score: *' + sleep + '%*\n' + analysisOutcome[0];
            var energyMessage = 'Score: *' + energy + '%*\n' + analysisOutcome[1];
            var moodMessage = 'Score: *' + mood + '%*\n' + analysisOutcome[2];
            var confidenceMessage = 'Score: *' + confidence + '%*\n' + analysisOutcome[3];
            var efficiencyMessage = 'Score: *' + efficiency + '%*\n' + analysisOutcome[4];
            var fulfillmentMessage = 'Score: *' + fulfillment + '%*\n' + analysisOutcome[5];
            var customMessage = 'Score: *' + custom + '%*\n' + analysisOutcome[6];
            var overallMessage = 'Score: *' + overall + '%*\n' + overallAnalysis;

            var returnArray = [sleepMessage, sleep, energyMessage, moodMessage, confidenceMessage, efficiencyMessage, fulfillmentMessage, customMessage, overallMessage];
            return returnArray;

        } else {
            var sleep = ((sleepCount / checkin.length) * 25).toFixed(2);
            var energy = ((energyCount / checkin.length) * 25).toFixed(2);
            var mood = ((moodCount / (checkin.length + checkout.length)) * 25).toFixed(2);
            var confidence = ((confidenceCount / (checkin.length * 2)) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / checkout.length) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / checkout.length) * 25).toFixed(2);
            var overall = ((overallCount / (checkin.length + checkout.length)) * 25).toFixed(2);

            var analysisOutcome = [];
            var analysisArray = [sleep, energy, mood, confidence, efficiency, fulfillment];
            for (var a = 0; a < analysisArray.length; a++) {
                if (analysisArray[a] < 50) {
                    analysisOutcome.push('Average: *Negative*');
                } else {
                    analysisOutcome.push('Average: *Positive*');
                }
            }

            if (overall < 50) {
                var overallAnalysis = 'Hmm.. It seems as though this week was not the best for you. I\'m sorry about that. There\'s always next week - Improve them scores!'
            } else {
                var overallAnalysis = 'Way to have a positive week! Shoot to keep it up :)'
            }

            var sleepMessage = 'Score: *' + sleep + '%*\n' + analysisOutcome[0];
            var energyMessage = 'Score: *' + energy + '%*\n' + analysisOutcome[1];
            var moodMessage = 'Score: *' + mood + '%*\n' + analysisOutcome[2];
            var confidenceMessage = 'Score: *' + confidence + '%*\n' + analysisOutcome[3];
            var efficiencyMessage = 'Score: *' + efficiency + '%*\n' + analysisOutcome[4];
            var fulfillmentMessage = 'Score: *' + fulfillment + '%*\n' + analysisOutcome[5];
            var overallMessage = 'Score: *' + overall + '%*\n' + overallAnalysis;

            var returnArray = [sleepMessage, sleep, energyMessage, moodMessage, confidenceMessage, efficiencyMessage, fulfillmentMessage, overallMessage];
            return returnArray;
        }
    }
}