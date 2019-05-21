module.exports = function(controller) { 
    controller.hears(['test'], 'direct_message', function(bot, message){
        controller.storage.results.find({team: message.team}, function(error, output){
            var percent = getPercentage(output);
            var average = getAverage(percent);

            bot.reply(message, {
                text: 'Hey there! Here are your results for the day...\n',
                attachments: [
                    {
                        title: 'Sleep',
                        color: '#02D2FF',
                        attachment_type: 'default',
                        text: 'Positive: *' + percent[0] + '%*\nNegative: *' + percent[1] + '%*\n' + average[0] + '\n'
                    },
                    {
                        title: 'Energy',
                        color: '#2A02FF',
                        attachment_type: 'default',
                        text: 'Positive: *' + percent[2] + '%*\nNegative: *' + percent[3] + '%*\n' + average[1] + '\n'
                    },
                    {
                        title: 'Mood',
                        color: '#8A02FF',
                        attachment_type: 'default',
                        text: 'Positive: *' + percent[4] + '%*\nNegative: *' + percent[5] + '%*\n' + average[2] + '\n'
                    },
                    {
                        title: 'Motivation',
                        color: '#CF02FF',
                        attachment_type: 'default',
                        text: 'Positive: *' + percent[6] + '%*\nNegative: *' + percent[7] + '%*\n' + average[3] + '\n'
                    },
                    {
                        title: 'Efficiency',
                        color: '#FF029D',
                        attachment_type: 'default',
                        text: 'Positive: *' + percent[8] + '%*\nNegative: *' + percent[9] + '%*\n' + average[4] + '\n'
                    },
                    {
                        title: 'Fulfillment',
                        color: '#FF8402',
                        attachment_type: 'default',
                        text: 'Positive: *' + percent[10] + '%*\nNegative: *' + percent[11] + '%*\n' + average[5] + '\n'
                    },
                    {
                        title: 'Overall',
                        color: '#02FF57',
                        attachment_type: 'default',
                        text: average[6]
                    }
                ]
            });

        });
    });

    function getPercentage(input) {
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

        var arrayLength = input.length;
        var i;
        for (i = 0; i < arrayLength; i++) {
            // Housekeeping variables
            var instance = input[i];
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

        var positiveOutcome = sleepPositive + energyPositive + moodPositive + motivationPositive + efficiencyPositive + fulfillmentPositive;
        var negativeOutcome = totalLength - positiveOutcome;

        var percentArray = [sleepPositiveOutcome, sleepNegativeOutcome, energyPositiveOutcome, energyNegativeOutcome, moodPositiveOutcome, moodNegativeOutcome, motivationPositiveOutcome, motivationNegativeOutcome, efficiencyPositiveOutcome, efficiencyNegativeOutcome, fulfillmentPositiveOutcome, fulfillmentNegativeOutcome, positiveOutcome, negativeOutcome];
    
        return percentArray;  
    }

    function getAverage(input) {
        if (input[0] > input[1]) {
            var sleepAverage = 'Average: *Negative*';
        } else {
            var sleepAverage = 'Average: *Positive';
        }
    
        if (input[2] > input[3]) {
            var energyAverage = 'Average: *Negative';
        } else {
            var energyAverage = 'Average: *Positive';
        }
    
        if (input[4] > input[5]) {
            var moodAverage = 'Average: *Negative';
        } else {
            var moodAverage = 'Average: *Positive';
        }
    
        if (input[6] > input[7]) {
            var motivationAverage = 'Average: *Negative';
        } else {
            var motivationAverage = 'Average: *Positive';
        }
    
        if (input[8] > input[9]) {
            var efficiencyAverage = 'Average: *Negative';
        } else {
            var efficiencyAverage = 'Average: *Positive';
        }
    
        if (input[10] > input[11]) {
            var fulfillmentAverage = 'Average: *Negative';
        } else {
            var fulfillmentAverage = 'Average: *Positive';
        }
    
        if (input[12] > input[13]) {
            var dayAverage = 'The overall emotional fitness was *_negative_* today';
        } else {
            var dayAverage = 'The overall emotional fitness was *_positive_* today';
        }
    
        var averageArray = [sleepAverage, energyAverage, moodAverage, motivationAverage, efficiencyAverage, fulfillmentAverage, dayAverage];
        return averageArray;
    }
}