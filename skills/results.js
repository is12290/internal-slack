module.exports = function(controller) {

    controller.hears(['result', 'Result', 'results', 'Results'], 'direct_message,direct_mention', function(bot, message) {
        
        var average = getAverage(message);
        var percent = getPercentage(message);


        // Block Content
        // const content = {
        //     blocks: [
        //         {
        //             "type": "section",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": "Hey! Here are your results...\n\n*Sleep*"
        //             }
        //         },
        //         {
        //             "type": "divider"
        //         },
        //         {
        //             "type": "section",
        //             "color": "#02D2FF",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": "*Positive:* " + percent[0] + "%\n*Negative:* " + percent[1] + "%\n" + average[0] + "\n\n*Energy*"
        //             }
        //         },
        //         {
        //             "type": "divider"
        //         },
        //         {
        //             "type": "section",
        //             "color": "#2A02FF",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": "*Positive:* " + percent[2] + "%\n*Negative:* " + percent[3] + "%\n" + average[1] + "\n\n*Mood*"
        //             }
        //         },
        //         {
        //             "type": "divider"
        //         },
        //         {
        //             "type": "section",
        //             "color": "#8A02FF",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": "*Positive:* " + percent[4] + "%\n*Negative:* " + percent[5] + "%\n" + average[2] + "\n\n*Motivation*"
        //             }
        //         },
        //         {
        //             "type": "divider"
        //         },
        //         {
        //             "type": "section",
        //             "color": "#CF02FF",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": "*Positive:* " + percent[6] + "%\n*Negative:* " + percent[7] + "%\n" + average[3] + "\n\n*Efficiency*"
        //             }
        //         },
        //         {
        //             "type": "divider"
        //         },
        //         {
        //             "type": "section",
        //             "color": "#FF029D",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": "*Positive:* " + percent[8] + "%\n*Negative:* " + percent[9] + "%\n" + average[4] + "\n\n*Fulfillment*"
        //             }
        //         },
        //         {
        //             "type": "divider"
        //         },
        //         {
        //             "type": "section",
        //             "color": "#FF8402",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": "*Positive:* " + percent[10] + "%\n*Negative:* " + percent[11] + "%\n" + average[5] + "\n\n*Overall*"
        //             }
        //         },
        //         {
        //             "type": "divider"
        //         },
        //         {
        //             "type": "section",
        //             "color": "#02FF57",
        //             "text": {
        //                 "type": "mrkdwn",
        //                 "text": average[6]
        //             }
        //         }
        //     ]
        // };

        // Replying
        bot.reply(message, "*Sleep*\nPositive: " + percent[0] + "%\nNegative: " + percent[1] + average[0]);
    });

    function getPercentage(user) {

        // Necessary variables
        var sleepPositive;
        var sleepNegative;
        var energyPositive;
        var energyNegative;
        var moodPositive;
        var moodNegative;
        var motivationPositive;
        var motivationNegative;
        var efficiencyPositive;
        var efficiencyNegative;
        var fulfillmentPositive;
        var fulfillmentNegative;

        controller.storage.results.find({team: user.team}, function(error, results) {
            var arrayLength = results.length;
            for (var i; i < arrayLength; i++) {
                // Housekeeping variables
                var instance = results[i];
                var checkIn = instance.checkin;
                var checkOut = instance.checkout;
    
    
                // Check In
                if (checkIn[0] < 2) {
                    sleepPositive = sleepPositive + 1;
                } else {
                    sleepNegative = sleepNegative + 1;
                }
                if (checkIn[1] < 2) {
                    energyPositive = energyPositive + 1;
                } else {
                    energyNegative = energyNegative + 1;
                }
                if (checkIn[2] < 2) {
                    moodPositive = moodPositive + 1;
                } else {
                    moodNegative = moodNegative + 1;
                }
                if (checkIn[3] < 2) {
                    motivationPositive = motivationPositive + 1;
                } else {
                    motivationNegative = motivationNegative + 1;
                }
    
                // Check Out
                if (checkOut[0] < 2) {
                    efficiencyPositive = efficiencyPositive + 1;
                } else {
                    efficiencyNegative = efficiencyNegative + 1;
                }
                if (checkOut[1] < 2) {
                    energyPositive = energyPositive + 1;
                } else {
                    energyNegative = energyNegative + 1;
                }
                if (checkOut[2] < 2) {
                    moodPositive = moodPositive + 1;
                } else {
                    moodNegative = moodNegative + 1;
                }
                if (checkOut[3] < 2) {
                    fulfillmentPositive = fulfillmentPositive + 1;
                } else {
                    fulfillmentNegative = fulfillmentNegative + 1;
                }
            }
        })
    
        var totalLength = sleepPositive + sleepNegative;
        var sleepPositiveOutcome = (sleepPositive / totalLength) * 100;
        var sleepNegativeOutcome = (sleepNegative / totalLength)* 100;
        var energyPositiveOutcome = (energyPositive / (totalLength * 2)) * 100;
        var energyNegativeOutcome = (energyNegative / (totalLength * 2)) * 100;
        var moodPositiveOutcome = (moodPositive / (totalLength * 2)) * 100;
        var moodNegativeOutcome = (moodNegative / (totalLength * 2)) * 100;
        var motivationPositiveOutcome = (motivationPositive / totalLength) * 100;
        var motivationNegativeOutcome = (motivationNegative / totalLength) * 100;
        var efficiencyPositiveOutcome = (efficiencyPositive / totalLength) * 100;
        var efficiencyNegativeOutcome = (efficiencyNegative / totalLength) * 100;
        var fulfillmentPositiveOutcome = (fulfillmentPositive / totalLength) * 100;
        var fulfillmentNegativeOutcome = (fulfillmentNegative / totalLength) * 100;

        var percentArray = [sleepPositiveOutcome, sleepNegativeOutcome, energyPositiveOutcome, energyNegativeOutcome, moodPositiveOutcome, moodNegativeOutcome, motivationPositiveOutcome, motivationNegativeOutcome, efficiencyPositiveOutcome, efficiencyNegativeOutcome, fulfillmentPositiveOutcome, fulfillmentNegativeOutcome];
    
        return percentArray;
        
    }

    function getAverage(user) {

        // Necessary constants
        var positiveDay;
        var negativeDay;
        var tally;
        // Checkin Constants
        var checkInSleep;
        var checkInEnergy;
        var checkInMood;
        var checkInMotivation;
        // Checkout Constants
        var checkOutEfficiency;
        var checkOutEnergy;
        var checkOutMood;
        var checkOutFulfillment;

        controller.storage.results.find({ team: user.team }, function(error, results) {
            var arrayLength = results.length;
            for (var i; i < arrayLength; i++) {
                // Results variables
                var instance = results[i];
                var checkIn = instance.checkin;
                var checkOut = instance.checkout;
                var checkInScore = checkIn[4];
                var checkOutScore = checkOut[4];
                var scoreDifference = checkInScore - checkOutScore;
    
                // Check In
                checkInSleep = checkInSleep + checkIn[0];
                checkInEnergy = checkInEnergy + checkIn[1];
                checkInMood = checkInMood + checkIn[2];
                checkInMotivation = checkInMotivation + checkIn[3];
    
                // Check Out
                checkOutEfficiency = checkOutEfficiency + checkOut[0];
                checkOutEnergy = checkOutEnergy + checkOut[1];
                checkOutMood = checkOutMood + checkOut[2];
                checkOutFulfillment = checkOutFulfillment + checkOut[3];
    
                // Determine Day Outcome
                if (scoreDifference >= 0) {
                    positiveDay = positiveDay + 1;
                    tally = tally + 1;
                } else {
                    negativeDay = negativeDay + 1;
                    tally = tally + 1;
                }
    
            }
        })
    
        var sleepOutcome = checkInSleep / tally;
        var energyOutcome = (checkInEnergy + checkOutEnergy) / (tally * 2);
        var moodOutcome = (checkInMood + checkOutMood) / (tally * 2);
        var motivationOutcome = checkInMotivation / tally;
        var efficiencyOutcome = checkOutEfficiency / tally;
        var fulfillmentOutcome = checkOutFulfillment / tally;
    
        if (sleepOutcome > 2) {
            var sleepMessage = '*Average*: Negative';
        } else {
            var sleepMessage = '*Average*: Positive';
        }
    
        if (energyOutcome > 2) {
            var energyMessage = '*Average*: Negative';
        } else {
            var energyMessage = '*Average*: Positive';
        }
    
        if (moodOutcome > 2) {
            var moodMessage = '*Average*: Negative';
        } else {
            var moodMessage = '*Average*: Positive';
        }
    
        if (motivationOutcome > 2) {
            var motivationMessage = '*Average*: Negative';
        } else {
            var motivationMessage = '*Average*: Positive';
        }
    
        if (efficiencyOutcome > 2) {
            var efficiencyMessage = '*Average*: Negative';
        } else {
            var efficiencyMessage = '*Average*: Positive';
        }
    
        if (fulfillmentOutcome > 2) {
            var fulfillmentMessage = '*Average*: Negative';
        } else {
            var fulfillmentMessage = '*Average*: Positive';
        }
    
        if (positiveDay > negativeDay) {
            var dayMessage = 'The average employee\'s emotional state got *_worse_* following the work day';
        } else {
            var dayMessage = 'The average employee\'s emotional state got *_better_* following the work day';
        }
    
        var averageArray = [sleepMessage, energyMessage, moodMessage, motivationMessage, efficiencyMessage, fulfillmentMessage, dayMessage];
        return averageArray;
    }

}