module.exports = function (controller) {
    controller.hears(['^daily result', '^daily results', '^daily Results', '^daily Result'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.users.find({ team: message.team }, function (error, output) {
            if (!output) {
                bot.reply(message, 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!')
            } else {
                var percent = getPercentage(output);
                if (percent[0] === 404) {
                    bot.reply(message, 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!')
                } else {
                    var resultMessage = getMessages(percent);

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
                                title: 'Motivation',
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

        });
    });

    function getPercentage(input) {
        // Necessary variables
        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var motivationCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;
        var overallCount = 0;

        for (var i = 0; i < input.length; i++) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;

            var instance = input[i];
            if (typeof instance.logs[today] == 'undefined') {
                var errorArray = [404]
            } else {
                var checkIn = instance.logs[today].check_in;
                var checkOut = instance.logs[today].check_out;
                
                if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                    var errorArray = [404];
                } else {
                    sleepCount = sleepCount + checkIn[0];
                    energyCount = energyCount + checkIn[1];
                    moodCount = moodCount + checkIn[2];
                    motivationCount = motivationCount + checkIn[3];
                    overallCount = overallCount + (checkIn[4] / 4);

                    efficiencyCount = efficiencyCount + checkOut[0];
                    energyCount = energyCount + checkOut[1];
                    moodCount = moodCount + checkOut[2];
                    fulfillmentCount = fulfillmentCount + checkOut[3];
                    overallCount = overallCount + (checkOut[4] / 4);
                }
            }

        }

        if (sleepCount > 0) {
            var sleep = ((sleepCount / input.length) * 25).toFixed(2);
            var energy = ((energyCount / (input.length * 2)) * 25).toFixed(2);
            var mood = ((moodCount / (input.length * 2)) * 25).toFixed(2);
            var motivation = ((motivationCount / input.length) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / input.length) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / input.length) * 25).toFixed(2);
            var overall = ((overallCount / (input.length * 2)) * 25).toFixed(2);

            var percentArray = [sleep, energy, mood, motivation, efficiency, fulfillment, overall];

            return percentArray;
        } else {
            return errorArray;
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