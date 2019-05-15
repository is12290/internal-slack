module.exports = function(controller) {

    controller.hears(['result', 'Result', 'results', 'Results'], 'direct_message,direct_mention', function(bot, message) {
        
        controller.storage.results.find({ team: message.team }, function(error, results) {
            var arrayLength = results.length;
            for (var i; i < arrayLength; i++) {
                // Results variables
                var instance = results[i];
                var checkIn = instance.checkin;
                var checkOut = instance.checkout;
                var checkInScore = checkIn[4];
                var checkOutScore = checkOut[4];
                var scoreDifference = checkInScore - checkOutScore;

                // Necessary constants
                var positiveDay;
                var negativeDay;
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
                } else {
                    negativeDay = negativeDay + 1;
                }

            }

            var sleepOutcome = checkInSleep / arrayLength;
            var energyOutcome = (checkInEnergy + checkOutEnergy) / (arrayLength * 2);
            var moodOutcome = (checkInMood + checkOutMood) / (arrayLength * 2);
            var motivationOutcome = checkInMotivation / arrayLength;
            var efficiencyOutcome = checkOutEfficiency / arrayLength;
            var fulfillmentOutcome = checkOutFulfillment / arrayLength;

            if (sleepOutcome > 2) {
                var sleepMessage = '*Sleep*\nThe average sleep last night was *_poor_*';
            } else {
                var sleepMessage = '*Sleep*\nThe average sleep last night was *_good_*';
            }

            if (energyOutcome > 2) {
                var energyMessage = '*Energy*\nThe average energy level is *_low_*';
            } else {
                var energyMessage = '*Energy*\nThe average energy level is *_sufficient_*';
            }

            if (moodOutcome > 2) {
                var moodMessage = '*Mood*\nThe average mood is, sadly, *_negative_*';
            } else {
                var moodMessage = '*Mood*\nThe average mood is, happily, *_positive_*';
            }

            if (motivationOutcome > 2) {
                var motivationMessage = '*Motivation*\nThe average motivation level is *_lacking_*';
            } else {
                var motivationMessage = '*Motivation*\nThe average motivation level is *_high_*';
            }

            if (efficiencyOutcome > 2) {
                var efficiencyMessage = '*Efficiency*\nThe average employee *_does not_* believe they were too efficient today';
            } else {
                var efficiencyMessage = '*Efficiency*\nThe average employee *_does_*, indeed, believe they were efficient today';
            }

            if (fulfillmentOutcome > 2) {
                var fulfillmentMessage = '*Fulfillment*\nThe average employee is *_not_* feeling fulfilled';
            } else {
                var fulfillmentMessage = '*Fulfillment*\nThe average employee *_is_* feeling fulfilled';
            }

            if (positiveDay > negativeDay) {
                var dayMessage = '*Daily Outcome*\nThe average employee\'s day got *_better_* following their shift';
            } else {
                var dayMessage = '*Daily Outcome*\nThe average employee\'s day got *_worse_* following their shift';
            }

            bot.reply(message, 'Here are your results:\n' + sleepMessage + '\n\n' + energyMessage + '\n\n' + moodMessage + '\n\n' + motivationMessage + '\n\n' + efficiencyMessage + '\n\n' + fulfillmentMessage + '\n\n' + dayMessage);

        });
    });
};