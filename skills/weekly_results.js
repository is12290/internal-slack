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
            energyCount = energyCount + instance [2];
            moodCount = moodCount + instance[4];
            motivationCount = motivationCount + instance[6];
            efficiencyCount = efficiencyCount + instance[8];
            fulfillmentCount = fulfillmentCount + instance[10];
            overallCount = overallCount + instance[12];
        }

        var sleep = (sleepCount / mainArrayLength).toFixed(2);
        var energy = (energyCount / mainArrayLength).toFixed(2);
        var mood = (moodCount / mainArrayLength).toFixed(2);
        var motivation = (motivationCount / mainArrayLength).toFixed(2);
        var efficiency = (efficiencyCount / mainArrayLength).toFixed(2);
        var fulfillment = (fulfillmentCount / mainArrayLength).toFixed(2);
        var overall = (overallCount / mainArrayLength).toFixed(2);

        if (sleep > 50) {
            var sleepWeek = 'Score: *' + sleep + '%*\nAverage: *Positive*';
        } else {
            var sleepWeek = 'Score: *' + sleep + '%*\nAverage: *Negative*';
        }
  
        if (energy > 50) {
            var energyWeek = 'Score: *' + energy + '%*\nAverage: *Positive*';
        } else {
            var energyWeek = 'Score: *' + energy + '%*\nAverage: *Negative*';
        }
  
        if (mood > 50) {
            var moodWeek = 'Score: *' + mood + '%*\nAverage: *Positive*';
        } else {
            var moodWeek = 'Score: *' + mood + '%*\nAverage: *Negative*';
        }
  
        if (motivation > 50) {
            var motivationWeek = 'Score: *' + motivation + '%*\nAverage: *Positive*';
        } else {
            var motivationWeek = 'Score: *' + motivation + '%*\nAverage: *Negative*';
        }
  
        if (efficiency > 50) {
            var efficiencyWeek = 'Score: *' + efficiency + '%*\nAverage: *Positive*';
        } else {
            var efficiencyWeek = 'Score: *' + efficiency + '%*\nAverage: *Negative*';
        }
  
        if (fulfillment > 50) {
            var fulfillmentWeek = 'Score: *' + fulfillment + '%*\nAverage: *Positive*';
        } else {
            var fulfillmentWeek = 'Score: *' + fulfillment + '%*\nAverage: *Negative*';
        }
  
        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
        }
  
        var weeklyReport = [sleepWeek, energyWeek, moodWeek, motivationWeek, efficiencyWeek, fulfillmentWeek, overallWeek];
        return weeklyReport;

    }
}