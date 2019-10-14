var test = GetSnapshot([1, 2, 3, 4], 'Ian');
console.log(test);

function GetSnapshot(input, user) {
    // Get qualitative snapshot
    var overview = {
        0: {
            4: 'Perfect',
            3: 'Sufficient',
            2: 'Restless',
            1: 'Terrible',
            0: 'Sleep'
        },
        1: {
            4: 'Full',
            3: 'Alright',
            2: 'Hanging On',
            1: 'Dead',
            0: 'Energy'
        },
        2: {
            4: 'Happy',
            3: 'Calm',
            2: 'Tense',
            1: 'Upset',
            0: 'Mood'
        },
        3: {
            4: 'Grounded',
            3: 'Aware',
            2: 'Out of It',
            1: 'Disconnected',
            0: 'Presence'
        }
    };

    var qualitative = [];
    for (var l = 0; l < input.length; l++) {
        qualitative.push(overview[l][input[l]]);
    }

    // Get quantitative overall score
    var scores = [];
    for (var j = 0; j < input.length; j++) {
        if (j == 0) {
            // Sleep
            scores.push((input[j] * 25) * 1.3);
        } else if (j == 1) {
            // Energy
            scores.push((input[j] * 25) * 0.8);
        } else if (j == 2) {
            // Mood
            scores.push((input[j] * 25) * 0.9);
        } else if (j == 2) {
            // Presence
            scores.push((input[j] * 25) * 1);
        }
        
    }
    var sum = scores.reduce(function (a, b) { return a + b; }, 0);
    var overall = sum / scores.length;
    overall = Math.round(overall);

    var attachments = {
        title: '<@' + user + '>\'s End of Day Snapshot',
        color: '#CF02FF',
        attachment_type: 'default',
        text: '*Sleep:* ' + qualitative[0] + '\n*Energy:* ' + qualitative[1] + '\n*Mood:* ' + qualitative[2] + '\n*Presence:* ' + qualitative[3] + '\n*Score:* ' + overall + '%'
    };

    return attachments;
}