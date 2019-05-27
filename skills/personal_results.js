module.exports = function(controller) {
    controller.hears(['Personal Results', 'Personal Result', 'Personal results', 'Personal result', 'personal results', 'personal result'], 'direct_message', function(bot, message) {
        controller.storage.week.find({id: message.id}, function(error, output) {
            if (!output['1'] || !output['2'] || !output['3'] || !output['4'] || !output['5']) {
                bot.reply(message, 'Sorry, for some reason I don\'t have the inputs to report this right now :thinking_face:');
            } else {
                results = getOutput(output);

                bot.reply(message, {
                    text: 'Hey there! Here are yours personal weekly report. Scores are out of 100%...\n',
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
    });

    function getOutput(results) {
        var sleep = ((results['1'][0][0] + results['2'][0][0] + results['3'][0][0] + results['4'][0][0] + results['5'][0][0]) / 5) * 25;
        var energy = ((results['1'][1][1] + results['2'][1][1] + results['3'][1][1] + results['4'][1][1] + results['5'][1][1]) / 5) * 25;
        var mood = ((results['1'][2][2] + results['2'][2][2] + results['3'][2][2] + results['4'][2][2] + results['5'][2][2]) / 5) * 25;
        var motivation = ((results['1'][3][3] + results['2'][3][3] + results['3'][3][3] + results['4'][3][3] + results['5'][3][3]) / 5) * 25;
        var efficiency = ((results['1'][4][4] + results['2'][4][4] + results['3'][4][4] + results['4'][4][4] + results['5'][4][4]) / 5) * 25;
        var fulfillment = ((results['1'][5][5] + results['2'][5][5] + results['3'][5][5] + results['4'][5][5] + results['5'][5][5]) / 5) * 25;
        var overall = ((results['1'][6][6] + results['2'][6][6] + results['3'][6][6] + results['4'][6][6] + results['5'][6][6]) / 5) * 25;

        if (overall < 50) {
            var overallAnalysis = 'Hmm.. It seems as though this week was not the best for you. I\'m sorry about that. There\'s always next week - Improve them scores!' 
        } else {
            var overallAnalysis = 'Way to have a positive week! Shoot to keep it up :)'
        }

        var sleepMessage = 'Score: ' + sleep + '%';
        var energyMessage = 'Score: ' + energy + '%';
        var moodMessage = 'Score: ' + mood + '%';
        var motivationMessage = 'Score: ' + motivation + '%';
        var efficiencyMessage = 'Score: ' + efficiency + '%';
        var fulfillmentMessage = 'Score: ' + fulfillment + '%';
        var overallMessage = 'Score: ' + overall + '%' + '\n' + overallAnalysis;

        var returnArray = [sleepMessage, energyMessage, moodMessage, motivationMessage, efficiencyMessage, fulfillmentMessage, overallMessage];
        return returnArray;
    }
}