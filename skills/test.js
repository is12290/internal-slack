module.exports = function(controller) {
    controller.hears(['result', 'Result', 'results', 'Results'], 'direct_message', function(bot, message) {
        // Percent Variables
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

        controller.storage.results.find({team: message.team}, function(error, results) {
            console.log("RESULTS: " + results);
            var arrayLength = results.length;
            console.log("LENGTH: " + arrayLength);
            for (var i; i < arrayLength; i++) {
                // Results variables
                var instance = results[i];
                console.log(instance);
                var checkIn = instance.checkin;
                console.log("CHECK IN: " + checkIn);
                var checkOut = instance.checkout;
                console.log("CHECK OUT: " + checkOut);

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

            var tally = sleepNegative + sleepPositive;
            var sleepPositiveOutcome = (sleepPositive / tally) * 100;
            var sleepNegativeOutcome = (sleepNegative / tally)* 100;
            var energyPositiveOutcome = (energyPositive / (tally * 2)) * 100;
            var energyNegativeOutcome = (energyNegative / (tally * 2)) * 100;
            var moodPositiveOutcome = (moodPositive / (tally * 2)) * 100;
            var moodNegativeOutcome = (moodNegative / (tally * 2)) * 100;
            var motivationPositiveOutcome = (motivationPositive / tally) * 100;
            var motivationNegativeOutcome = (motivationNegative / tally) * 100;
            var efficiencyPositiveOutcome = (efficiencyPositive / tally) * 100;
            var efficiencyNegativeOutcome = (efficiencyNegative / tally) * 100;
            var fulfillmentPositiveOutcome = (fulfillmentPositive / tally) * 100;
            var fulfillmentNegativeOutcome = (fulfillmentNegative / tally) * 100;

            var percent = [sleepPositiveOutcome, sleepNegativeOutcome, energyPositiveOutcome, energyNegativeOutcome, moodPositiveOutcome, moodNegativeOutcome, motivationPositiveOutcome, motivationNegativeOutcome, efficiencyPositiveOutcome, efficiencyNegativeOutcome, fulfillmentPositiveOutcome, fulfillmentNegativeOutcome];
            bot.reply(message, "*Sleep*\nPositive: " + percent[0] + "%\nNegative: " + percent[1] + "%");
        })

        

    })
}