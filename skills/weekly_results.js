module.exports  = function(controller) {
    controller.hears(['Week results', 'week results', 'Weekly results', 'weekly results'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.users.find({team: message.team}, function(error, output) {
            if (!output) {
                bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
            } else {
                var results = getOutput(output);
                if (isNaN(results[0])) {
                    bot.reply(message, 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!');
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
        const moment = require('moment');
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');

        var days = [];
        while (startOfWeek <= endOfWeek) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }

        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var motivationCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;
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

            for (var k = 0; k < checkin.length; k++) {
                var specific = checkin[k];
                sleepCount = sleepCount + specific[0];
                energyCount = energyCount + specific[1];
                moodCount = moodCount + specific[2];
                motivationCount = motivationCount + specific[3];
                overallCount = overallCount + (specific[4] / 4);
            }

            for (var l = 0; l < checkout.length; l++) {
                var specific = checkout[l];
                efficiencyCount = efficiencyCount + specific[0];
                energyCount = energyCount + specific[1];
                moodCount = moodCount + specific[2];
                fulfillmentCount = fulfillmentCount + specific[3];
                overallCount = overallCount + (specific[4] / 4);
            }

            logTally = logTally + 1;
        }

        var sleep = (sleepCount / logTally).toFixed(2);
        var energy = (energyCount / (logTally * 2)).toFixed(2);
        var mood = (moodCount / (logTally * 2)).toFixed(2);
        var motivation = (motivationCount / logTally).toFixed(2);
        var efficiency = (efficiencyCount / logTally).toFixed(2);
        var fulfillment = (fulfillmentCount / logTally).toFixed(2);
        var overall = (overallCount / (logTally * 2)).toFixed(2);

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