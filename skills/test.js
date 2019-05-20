module.exports = function(controller) {
    controller.hears(['result', 'Result', 'results', 'Results'], 'direct_message', function(bot, message) {
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
            console.log("LENGTH: " + arrayLength);
            for (var i; i < arrayLength; i++) {
                // Results variables
                var instance = results[i];
                console.log("INSTANCE: ", instance);
                var checkIn = instance.checkin;
                console.log("CHECKIN: ", checkIn);
                var checkOut = instance.checkout;
                console.log("CHECKOUT: ", checkOut);
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
        bot.reply(message, "Average: " + averageArray[4]);  

    })
}