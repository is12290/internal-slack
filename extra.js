fuction getPercentage(input) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

     // Necessary variables
     var sleepCount = 0;
     var energyCount = 0;
     var moodCount = 0;
     var confidenceCount = 0;
     var efficiencyCount = 0;
     var fulfillmentCount = 0;
     var customCount = 0;
     var overallCount = 0;
     var tally = 0
     var customTally = 0

    for (var i = 0; i < input.length; i++) {
        var instance = input[i];
        if (today in instance.logs) {
            var checkIn = instance.logs[today].check_in;
            var checkOut = instance.logs[today].check_out;

            if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                // Pass
            } else {
                sleepCount = sleepCount + checkIn[0];
                energyCount = energyCount + checkIn[1];
                moodCount = moodCount + checkIn[2];
                confidenceCount = confidenceCount + checkIn[3];
                if (checkIn.length == 5) {
                    customCount = customCount + checkIn[4]
                    overallCount = overallCount + (checkIn[5] / 5);
                    tally = tally + 1
                    customTally = customTally + 1
                } else {
                    overallCount = overallCount + (checkIn[4] / 4);
                    tally = tally + 1
                }
    

                efficiencyCount = efficiencyCount + checkOut[0];
                confidenceCount = confidenceCount + checkOut[1];
                moodCount = moodCount + checkOut[2];
                fulfillmentCount = fulfillmentCount + checkOut[3];
                if (checkOut.length == 5) {
                    customCount = customCount + checkOut[4];
                    overallCount = overallCount + (checkOut[5] / 5);
                } else {
                    overallCount = overallCount + (checkOut[4] / 4);
                }
            }
        }
    }

    if (tally > 0) {
        var sleep = ((sleepCount / tally) * 25).toFixed(2);
        var energy = ((energyCount / tally) * 25).toFixed(2);
        var mood = ((moodCount / (tally * 2)) * 25).toFixed(2);
        var confidence = ((confidenceCount / (tally * 2)) * 25).toFixed(2);
        var efficiency = ((efficiencyCount / tally) * 25).toFixed(2);
        var fulfillment = ((fulfillmentCount / tally) * 25).toFixed(2);
        var overall = ((overallCount / (tally * 2)) * 25).toFixed(2);

        if (customTally > 0) {
            var custom = ((customCount / (tally * 2)) * 25).toFixed(2);
            var percentArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom, overall];
            return percentArray;
        } else {
            var percentArray = [sleep, energy, mood, confidence, efficiency, fulfillment, overall];
            return percentArray;
        }
    } else {
        return 404
    }
}