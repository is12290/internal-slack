module.exports  = function(controller) {
    controller.hears(['Week results', 'week results', 'Weekly results', 'weekly results'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.week.find({team: message.team}, function(error, output) {
            if (!output) {
                bot.reply(message, 'Sorry, for some reason I don\'t have the inputs to report this right now :thinking_face:');
            } else {
                var results = getOutput(output);

                bot.reply(message, {
                    text: 'Hey there! Here are your weekly organization averages...\n',
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
                            text: results[1] + '\n'
                        },
                        {
                            title: 'Mood',
                            color: '#8A02FF',
                            attachment_type: 'default',
                            text: results[2] + '\n'
                        },
                        {
                            title: 'Motivation',
                            color: '#CF02FF',
                            attachment_type: 'default',
                            text: results[3] + '\n'
                        },
                        {
                            title: 'Efficiency',
                            color: '#FF029D',
                            attachment_type: 'default',
                            text: results[4] + '\n'
                        },
                        {
                            title: 'Fulfillment',
                            color: '#FF8402',
                            attachment_type: 'default',
                            text: results[5] + '\n'
                        },
                        {
                            title: 'Overall',
                            color: '#02FF57',
                            attachment_type: 'default',
                            text: results[6]
                        }
                    ]
                });
            }
        });
    })

    function getOutput(results) {
        var mainArray = [];
        for (var key in results) {
            if (isNaN(parseInt(key))) {
                //pass
            } else {
                mainArray.push(results[key]);
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

        var sleep = sleepCount / mainArrayLength;
        var energy = energyCount / mainArrayLength;
        var mood = moodCount / mainArrayLength;
        var motivation = motivationCount / mainArrayLength;
        var efficiency = efficiencyCount / mainArrayLength;
        var fulfillment = fulfillmentCount / mainArrayLength;
        var overall = overallCount / mainArrayLength;

        if (sleep < 2) {
            var sleepWeek = 'Average: *Positive*';
        } else {
            var sleepWeek = 'Average: *Negative*';
        }
  
        if (energy < 2) {
            var energyWeek = 'Average: *Positive*';
        } else {
            var energyWeek = 'Average: *Negative*';
        }
  
        if (mood < 2) {
            var moodWeek = 'Average: *Positive*';
        } else {
            var moodWeek = 'Average: *Negative*';
        }
  
        if (motivation < 2) {
            var motivationWeek = 'Average: *Positive*';
        } else {
            var motivationWeek = 'Average: *Negative*';
        }
  
        if (efficiency < 2) {
            var efficiencyWeek = 'Average: *Positive*';
        } else {
            var efficiencyWeek = 'Average: *Negative*';
        }
  
        if (fulfillment < 2) {
            var fulfillmentWeek = 'Average: *Positive*';
        } else {
            var fulfillmentWeek = 'Average: *Negative*';
        }
  
        if (overall < 2) {
            var overallWeek = 'The overall emotional fitness this week was *positive*!';
        }
        else {
            var overallWeek = 'The overall emotional fitness this week was *negative*';
        }
  
        var weeklyReport = [sleepWeek, energyWeek, moodWeek, motivationWeek, efficiencyWeek, fulfillmentWeek, overallWeek];
        return weeklyReport;

    }
}