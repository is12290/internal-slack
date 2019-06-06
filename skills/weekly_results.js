module.exports  = function(controller) {
    controller.hears(['Week results', 'week results', 'Weekly results', 'weekly results'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.week.find({team: message.team}, function(error, output) {
            if (!output) {
                bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
            } else {
                var results = getOutput(output);
                if (isNaN(results[0])) {
                    bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
                } else {
                    bot.reply(message, {
                        text: 'Hey there! Here are your weekly organization averages...\n',
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
        });
    })

    function getOutput(results) {
        var result = results[0];

        var mainArray = [];
        for (var key in result) {
            if (isNaN(parseInt(key))) {
                //pass
            } else {
                mainArray.push(result[key]);
            }
        }

        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var motivationCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;
        var overallCount = 0;

        var mainArrayLength = mainArray.length;
        for (var i = 0; i < mainArrayLength; i++) {
            var instance = mainArray[i];
            sleepCount = sleepCount + instance[0];
            energyCount = energyCount + instance [1];
            moodCount = moodCount + instance[2];
            motivationCount = motivationCount + instance[3];
            efficiencyCount = efficiencyCount + instance[4];
            fulfillmentCount = fulfillmentCount + instance[5];
            overallCount = overallCount + instance[6];
        }

        var sleep = (sleepCount / mainArrayLength).toFixed(2);
        var energy = (energyCount / mainArrayLength).toFixed(2);
        var mood = (moodCount / mainArrayLength).toFixed(2);
        var motivation = (motivationCount / mainArrayLength).toFixed(2);
        var efficiency = (efficiencyCount / mainArrayLength).toFixed(2);
        var fulfillment = (fulfillmentCount / mainArrayLength).toFixed(2);
        var overall = (overallCount / mainArrayLength).toFixed(2);

        var loopArray = [sleep, energy, mood, motivation, efficiency, fulfillment];

        var weeklyReport = [];
        weeklyReport.push(sleep);
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }
  
        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            weeklyReport.push(overallWeek);
        }
  
        return weeklyReport;

    }
}