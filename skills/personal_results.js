module.exports = function(controller) {
    controller.hears(['Personal Results', 'Personal Result', 'Personal results', 'Personal result', 'personal results', 'personal result'], 'direct_message', function(bot, message) {
        controller.storage.personal.find({id: message.user}, function(error, output) {
            if (!output) {
                bot.reply(message, 'Sorry, for some reason I don\'t have the inputs to report this right :thinking_face:');
            } else {
                results = getOutput(output);

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
        console.log("RESULTS: ", results);

        var mainArray = [];
        for (var key in results) {
            if (isNaN(parseInt(key))) {
                // Pass
            } else {
                mainArray.push(results[key]);
            }
        }

        var checkin = [];
        var checkout = [];
        var mainArrayLength = mainArray.length;
        for (var i = 0; i < mainArrayLength; i ++) {
            var iteration = mainArray[i];
            checkin.push(iteration[0]);
            checkout.push(iteration[1]);
        }
        console.log(checkin)
        console.log(checkout)

        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var motivationCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;

        for (var j = 0; j < checkin.length; j++) {
            var checkinInstance = checkin[j];
            sleepCount = sleepCount + checkinInstance[0];
            energyCount = energyCount + checkinInstance[1];
            moodCount = moodCount + checkinInstance[2];
            motivationCount = motivationCount + checkinInstance[3];
        }

        for (var m = 0; m < checkout.length; m++) {
            var checkoutInstance = checkout[m];
            efficiencyCount = efficiencyCount + checkoutInstance[0];
            energyCount = energyCount + checkoutInstance[1];
            moodCount = moodCount + checkoutInstance[2];
            fulfillmentCount = fulfillmentCount + checkoutInstance[3];
        }

        var sleep = (sleepCount / checkin.length) * 25;
        var energy = (energyCount / (checkin.length + checkout.length)) * 25;
        var mood = (moodCount / (checkin.length + checkout.length)) * 25;
        var motivation = (motivationCount / checkin.length) * 25;
        var efficiency = (efficiencyCount / checkout.length) * 25;
        var fulfillment = (fulfillmentCount / checkout.length) * 25;
        var overall = (sleep + energy + mood + motivation + efficiency + fulfillment) / 6;

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