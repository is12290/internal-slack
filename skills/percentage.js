function getPercentage(user) {
    controller.storage.results.find({team: user.team}, function(error, results) {
        var arrayLength = results.length;
        for (var i; i < arrayLength; i++) {
            // Housekeeping variables
            var instance = results[i];
            var checkIn = instance.checkin;
            var checkOut = instance.checkout;

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

            // Check In
            if (checkIn[0] < 2) {
                sleepPositive = sleepPositive + 1;
            } else {
                sleepNegative = sleepNegative + 1;
            }
            if (checkIn[2] < 2) {
                energyPositive = energyPositive + 1;
            } else {
                energyNegative = energyNegative + 1;
            }
            if (checkIn[3] < 2) {
                moodPositive = moodPositive + 1;
            } else {
                moodNegative = moodNegative + 1;
            }
            if (checkIn[4] < 2) {
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
            if (checkOut[2] < 2) {
                energyPositive = energyPositive + 1;
            } else {
                energyNegative = energyNegative + 1;
            }
            if (checkOut[3] < 2) {
                moodPositive = moodPositive + 1;
            } else {
                moodNegative = moodNegative + 1;
            }
            if (checkOut[4] < 2) {
                fulfillmentPositive = fulfillmentPositive + 1;
            } else {
                fulfillmentNegative = fulfillmentNegative + 1;
            }
        }

        var sleepPositiveOutcome = (sleepPositive / arrayLength) * 100;
        var sleepNegativeOutcome = (sleepNegative / arrayLength)* 100;
        var energyPositiveOutcome = (energyPositive / (arrayLength * 2)) * 100;
        var energyNegativeOutcome = (energyNegative / (arrayLength * 2)) * 100;
        var moodPositiveOutcome = (moodPositive / (arrayLength * 2)) * 100;
        var moodNegativeOutcome = (moodNegative / (arrayLength * 2)) * 100;
        var motivationPositiveOutcome = (motivationPositive / arrayLength) * 100;
        var motivationNegativeOutcome = (motivationNegative / arrayLength) * 100;
        var efficiencyPositiveOutcome = (efficiencyPositive / arrayLength) * 100;
        var efficiencyNegativeOutcome = (efficiencyNegative / arrayLength) * 100;
        var fulfillmentPositiveOutcome = (fulfillmentPositive / arrayLength) * 100;
        var fulfillmentNegativeOutcome = (fulfillmentNegative / arrayLength) * 100;

        return sleepPositiveOutcome, sleepNegativeOutcome, energyPositiveOutcome, energyNegativeOutcome, moodPositiveOutcome, moodNegativeOutcome, motivationPositiveOutcome, motivationNegativeOutcome, efficiencyPositiveOutcome, efficiencyNegativeOutcome, fulfillmentPositiveOutcome, fulfillmentNegativeOutcome;
    });
}