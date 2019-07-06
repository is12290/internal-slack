module.exports = function (controller) {
    controller.hears(['^daily result', '^daily results', '^daily Results', '^daily Result'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.users.find({ team: message.team }, function (error, output) {
            if (!output) {
                bot.reply(message, 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!')
            } else {
                var percent = getPercentage(output);
                if (percent == 404) {
                    bot.reply(message, 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!')
                } else {
                    var resultMessage = getMessages(percent);

                    if (resultMessage.length == 9) {
                        controller.storage.teams.get(message.team, function (err, info) {
                            if (typeof info.customization.question == 'undefined') {
                                var topic = "Deleted Custom Topic"
                            } else {
                                var topic = info.customization.question.topic;
                            }
                            bot.reply(message, {
                                text: 'Hey there! Here are your results for the day...\n',
                                attachments: [
                                    {
                                        title: 'Sleep',
                                        color: '#02D2FF',
                                        attachment_type: 'default',
                                        text: resultMessage[0] + '\n'
                                    },
                                    {
                                        title: 'Energy',
                                        color: '#2A02FF',
                                        attachment_type: 'default',
                                        text: resultMessage[1] + '\n'
                                    },
                                    {
                                        title: 'Mood',
                                        color: '#8A02FF',
                                        attachment_type: 'default',
                                        text: resultMessage[2] + '\n'
                                    },
                                    {
                                        title: 'Confidence',
                                        color: '#CF02FF',
                                        attachment_type: 'default',
                                        text: resultMessage[3] + '\n'
                                    },
                                    {
                                        title: 'Efficiency',
                                        color: '#FF029D',
                                        attachment_type: 'default',
                                        text: resultMessage[4] + '\n'
                                    },
                                    {
                                        title: 'Fulfillment',
                                        color: '#FF8402',
                                        attachment_type: 'default',
                                        text: resultMessage[5] + '\n'
                                    },
                                    {
                                        title: topic,
                                        color: '#02FF92',
                                        attachment_type: 'default',
                                        text: resultMessage[6] + '\n',
                                    },
                                    {
                                        title: 'Overall',
                                        color: '#02FF57',
                                        attachment_type: 'default',
                                        text: resultMessage[7]
                                    }
                                ]
                            });
                        });
                    } else {
                        bot.reply(message, {
                            text: 'Hey there! Here are your results for the day...\n',
                            attachments: [
                                {
                                    title: 'Sleep',
                                    color: '#02D2FF',
                                    attachment_type: 'default',
                                    text: resultMessage[0] + '\n'
                                },
                                {
                                    title: 'Energy',
                                    color: '#2A02FF',
                                    attachment_type: 'default',
                                    text: resultMessage[1] + '\n'
                                },
                                {
                                    title: 'Mood',
                                    color: '#8A02FF',
                                    attachment_type: 'default',
                                    text: resultMessage[2] + '\n'
                                },
                                {
                                    title: 'Confidence',
                                    color: '#CF02FF',
                                    attachment_type: 'default',
                                    text: resultMessage[3] + '\n'
                                },
                                {
                                    title: 'Efficiency',
                                    color: '#FF029D',
                                    attachment_type: 'default',
                                    text: resultMessage[4] + '\n'
                                },
                                {
                                    title: 'Fulfillment',
                                    color: '#FF8402',
                                    attachment_type: 'default',
                                    text: resultMessage[5] + '\n'
                                },
                                {
                                    title: 'Overall',
                                    color: '#02FF57',
                                    attachment_type: 'default',
                                    text: resultMessage[6]
                                }
                            ]
                        });
                    }
                }
            }
        });
    });

    function getPercentage(input) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        // Necessary variables
        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var confidenceCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;
        var customCount = 0;
        var overallCount = 0;
        var tally = 0
        var customTally = 0

        for (var i = 0; i < input.length; i++) {
            var instance = input[i];
            if (today in instance.logs) {
                var checkIn = instance.logs[today].check_in;
                var checkOut = instance.logs[today].check_out;

                if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                    // Pass
                } else {
                    sleepCount = sleepCount + checkIn[0];
                    energyCount = energyCount + checkIn[1];
                    moodCount = moodCount + checkIn[2];
                    confidenceCount = confidenceCount + checkIn[3];
                    if (checkIn.length == 5) {
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
                    if (checkOut.length == 5) {
                        customCount = customCount + checkOut[4];
                        overallCount = overallCount + (checkOut[5] / 5);
                    } else {
                        overallCount = overallCount + (checkOut[4] / 4);
                    }
                }
            }
        }

        console.log(tally);
        console.log(sleepCount);
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
                var percentArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom, overall];
                return percentArray;
            } else {
                var percentArray = [sleep, energy, mood, confidence, efficiency, fulfillment, overall];
                return percentArray;
            }
        } else {
            return 404;
        }
    }
        

    function getMessages(input) {
        var messageArray = [];

        for (var i = 0; i < input.length; i++) {
            if (input[i] > 50) {
                var message = 'Score: *' + input[i] + '%*\nAverage: *Positive*';
                messageArray.push(message);
            } else {
                var message = 'Score: *' + input[i] + '%*\nAverage: *Negative*';
                messageArray.push(message);
            }
        }

        var lastVal = input.length - 1;

        if (input[lastVal] > 50) {
            var overallMessage = 'Score: *' + input[lastVal] + '%*\nThe overall emotional fitness was *positive* today';
            messageArray.push(overallMessage);
        } else {
            var overallMessage = 'Score: *' + input[lastVal] + '%*\nThe overall emotional fitness was *_negative_* today';
            messageArray.push(overallMessage);
        }

        return messageArray;
    }
}