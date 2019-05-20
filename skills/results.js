module.exports = function(controller) {

    controller.hears(['result', 'Result', 'results', 'Results'], 'direct_message,direct_mention', function(bot, message) {
        
        var average = getAverage(message);
        console.log(average);
        var percent = getPercentage(message);
        console.log(percent);


        
        // Replying
        bot.reply(message, "*Sleep*\nPositive: " + percent[0] + "%\nNegative: " + percent[1] + "%\n" + average[0] + "\n" + average[6]);
    });

    function getPercentage(user) {
        controller.storage.results.find({team: user.team}, function(error, output) {
            // Necessary variables
            var sleepPositive = 0;
            var sleepNegative = 0;
            var energyPositive = 0;
            var energyNegative = 0;
            var moodPositive = 0;
            var moodNegative = 0;
            var motivationPositive = 0;
            var motivationNegative = 0;
            var efficiencyPositive = 0;
            var efficiencyNegative = 0;
            var fulfillmentPositive = 0;
            var fulfillmentNegative = 0;
            
            var arrayLength = output.length;
            for (var i; i < arrayLength; i++) {
                // Housekeeping variables
                var instance = output[i];
                var checkIn = instance.checkin;
                var checkOut = instance.checkout;
    
                // Check In
                if (checkIn[0] < 2) {
                    sleepPositive++;
                } else {
                    sleepNegative++;
                }
                if (checkIn[1] < 2) {
                    energyPositive++;
                } else {
                    energyNegative++;
                }
                if (checkIn[2] < 2) {
                    moodPositive++;
                } else {
                    moodNegative++;
                }
                if (checkIn[3] < 2) {
                    motivationPositive++;
                } else {
                    motivationNegative++;
                }
    
                // Check Out
                if (checkOut[0] < 2) {
                    efficiencyPositive++;
                } else {
                    efficiencyNegative++;
                }
                if (checkOut[1] < 2) {
                    energyPositive++;
                } else {
                    energyNegative++;
                }
                if (checkOut[2] < 2) {
                    moodPositive++;
                } else {
                    moodNegative++;
                }
                if (checkOut[3] < 2) {
                    fulfillmentPositive++;
                } else {
                    fulfillmentNegative++;
                }
            }

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
        })
        
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

        controller.storage.results.find({ team: user.team }, function(error, output) {
            var arrayLength = output.length;
            for (var i; i < arrayLength; i++) {
                // Results variables
                var instance = output[i];
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
            var sleepMessage = 'Average: Negative';
        } else {
            var sleepMessage = 'Average: Positive';
        }
    
        if (energyOutcome > 2) {
            var energyMessage = 'Average: Negative';
        } else {
            var energyMessage = 'Average: Positive';
        }
    
        if (moodOutcome > 2) {
            var moodMessage = 'Average: Negative';
        } else {
            var moodMessage = 'Average: Positive';
        }
    
        if (motivationOutcome > 2) {
            var motivationMessage = 'Average: Negative';
        } else {
            var motivationMessage = 'Average: Positive';
        }
    
        if (efficiencyOutcome > 2) {
            var efficiencyMessage = 'Average: Negative';
        } else {
            var efficiencyMessage = 'Average: Positive';
        }
    
        if (fulfillmentOutcome > 2) {
            var fulfillmentMessage = 'Average: Negative';
        } else {
            var fulfillmentMessage = 'Average: Positive';
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