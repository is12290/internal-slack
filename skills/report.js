module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Generate-Report") {
            controller.storage.teams.get(message.team.id, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                if (team.subscription.status == 'inactive') {
                    
                    var text = "It looks like your subscription is up! Would you like to renew?"
                    
                    bot.reply(message, {
                        attachments: [{
                            title: "Subscribe",
                            text: text,
                            callback_id: 'subscribe',
                            color: "#0294ff",
                            attachment_type: 'default',
                            actions: [
                                {
                                    'text': 'Yes',
                                    'type': 'button',
                                    'url': 'https://getinternal.co/subscribe'
                                },
                                {
                                    'name': 'no-button',
                                    'value': 'No-Subscribe',
                                    'text': 'No',
                                    'type': 'button'
                                }
                            ]
                        }]
                    }, function (err, response) {
                        if (response.text == 'No-Subscribe') {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    title: "Subscribe",
                                    text: text,
                                    callback_id: 'subscribe',
                                    color: "#0294ff",
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes-Subscribe',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'value': 'No-Subscribe',
                                            'style': 'danger',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            })
                        }
                    })
                } else {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log(err);
                        }

                        var timeframe = '';
                        convo.addQuestion({
                            text: "Okay! Let's generate a report",
                            attachments: [{
                                title: "Timeframe",
                                text: "What is the timeframe for the report?",
                                callback_id: 'report-style',
                                color: "#0294ff",
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'weekly-button',
                                        'value': 'Weekly',
                                        'text': 'Weekly',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'monthly-button',
                                        'value': 'Monthly',
                                        'text': 'Monthly',
                                        'type': 'button'
                                    }
                                ]
                            }]
                        }, [
                                {
                                    pattern: "Weekly",
                                    callback: function (response, convo) {
                                        bot.replyInteractive(response, {
                                            text: "Okay! Let's generate a report",
                                            attachments: [{
                                                title: "Timeframe",
                                                text: "What is the timeframe for the report?",
                                                callback_id: 'report-style',
                                                color: "#0294ff",
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'weekly-button',
                                                        'value': 'Weekly',
                                                        'style': 'primary',
                                                        'text': 'Weekly',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'monthly-button',
                                                        'value': 'Monthly',
                                                        'text': 'Monthly',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }]
                                        })
                                        timeframe = timeframe + 'weekly';
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: "Monthly",
                                    callback: function (response, convo) {
                                        bot.replyInteractive(response, {
                                            text: "Okay! Let's generate a report",
                                            attachments: [{
                                                title: "Timeframe",
                                                text: "What is the timeframe for the report?",
                                                callback_id: 'report-style',
                                                color: "#0294ff",
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'weekly-button',
                                                        'value': 'Weekly',
                                                        'text': 'Weekly',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'monthly-button',
                                                        'value': 'Monthly',
                                                        'style': 'primary',
                                                        'text': 'Monthly',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }]
                                        })
                                        timeframe = timeframe + 'monthly';
                                        convo.next();
                                    }
                                }
                            ]);

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                controller.storage.users.find({ team: message.team.id }, function (err, all_users) {
                                    if (err) {
                                        console.log("error: ", err);
                                    }

                                    var results = GetReport(all_users, timeframe);
                                    if (typeof results == 'undefined') {
                                        bot.reply(message, "Something has gone awry :thinking_face:");
                                    } else {
                                        bot.reply(message, {
                                            text: 'Here is your ' + timeframe + 'report...',
                                            attachments: results
                                        });
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
    })
}

function GetReport(input, timeframe) {
    // Define overviews
    var checkin_overview = {
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

    var checkout_overview = {
        0: {
            4: 'Substantial',
            3: 'Acceptable',
            2: 'Minimal',
            1: 'Stagnant',
            0: 'Progress'
        },
        1: {
            4: 'Nonexistent',
            3: 'Present',
            2: 'Considerable',
            1: 'Peak',
            0: 'Frustration'
        },
        2: {
            4: 'Equal',
            3: 'Fair',
            2: 'Mostly Me',
            1: 'Mostly Them',
            0: 'Work Distribution'
        },
        3: {
            4: 'Certain',
            3: 'Hopeful',
            2: 'Dwindling',
            1: 'Lost',
            0: 'Confidence'
        }
    };

    // Get Dates
    var moment = require('moment');
    var days = [];
    if (timeframe == 'monthly') {
        var start = moment().startOf('month');
        var end = moment().endOf('month');
        var day = start;
        message1 = message1 + 'This month';
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'weekly') {
        var start = moment().startOf('isoWeek');
        var end = moment().endOf('isoWeek');
        var day = start;
        message1 = message1 + 'This week';
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    }

    var attachments = [];
    var overall_week = [];
    // Loop Through Users
    for (var i = 0; i < input.length; i++) {
        var instance = input[i];

        var sleepCount = [];
        var energyCount = [];
        var moodCount = [];
        var presenceCount = [];
        var progressCount = [];
        var frustrationCount = [];
        var distributionCount = [];
        var confidenceCount = [];
        var overallCount = [];
        
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' && typeof instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    if (typeof instance.logs[days[j]].check_in == 'undefined') {
                        // Pass
                    } else {
                        var checkIn = instance.logs[days[j]].check_in;

                        sleepCount.push(checkIn[0]);
                        energyCount.push(checkIn[1]);
                        moodCount.push(checkIn[2]);
                        presenceCount.push(checkIn[3]);
                        overallCount.push(checkIn[4] / 4);

                        var scores = [];
                        for (var p = 0; p < checkIn.length; p++) {
                            if (p == 0) {
                                // Sleep
                                scores.push((checkIn[p] * 25) * 1.3);
                            } else if (p == 1) {
                                // Energy
                                scores.push((checkIn[p] * 25) * 0.8);
                            } else if (p == 2) {
                                // Mood
                                scores.push((checkIn[p] * 25) * 0.9);
                            } else if (p == 2) {
                                // Presence
                                scores.push((checkIn[p] * 25) * 1);
                            }

                        }
                        var sum = scores.reduce(function (a, b) { return a + b; }, 0);
                        var overall = sum / scores.length;
                        overall = Math.round(overall);
                        overallCount.push(overall);
                    }
                    if (typeof instance.logs[days[j]].check_out == 'undefined') {
                        // Pass
                    } else {
                        var checkOut = instance.logs[days[j]].check_out;

                        progressCount.push(checkOut[0]);
                        frustrationCount.push(checkOut[1]);
                        distributionCount.push(checkOut[2]);
                        confidenceCount.push(checkOut[3]);

                        var scores = [];
                        for (var q = 0; q < checkOut.length; q++) {
                            if (q == 0) {
                                // Sleep
                                scores.push((checkOut[q] * 25) * 1.2);
                            } else if (q == 1) {
                                // Energy
                                scores.push((checkOut[q] * 25) * 0.8);
                            } else if (q == 2) {
                                // Mood
                                scores.push((checkOut[q] * 25) * 1.1);
                            } else if (q == 2) {
                                // Presence
                                scores.push((checkOut[q] * 25) * 0.9);
                            }

                        }
                        var sum = scores.reduce(function (a, b) { return a + b; }, 0);
                        var overall = sum / scores.length;
                        overall = Math.round(overall);
                        overallCount.push(overall);
                    }
                }
            }
        }

        // Average counts
        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) / sleepCount.length);
        sleep = Math.round(sleep);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0)/ energyCount.length);
        energy = Math.round(energy);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) / moodCount.length);
        mood = Math.round(mood);
        var presence = (presenceCount.reduce(function (a, b) { return a + b; }, 0) / presenceCount.length);
        presence = Math.round(presence);
        var progress = (progressCount.reduce(function (a, b) { return a + b; }, 0) / progressCount.length);
        progress = Math.round(progress);
        var frustration = (frustrationCount.reduce(function (a, b) { return a + b; }, 0) / frustrationCount.length);
        frustration = Math.round(frustration);
        var distribution = (distributionCount.reduce(function (a, b) { return a + b; }, 0) / distributionCount.length);
        distribution = Math.round(distribution);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) / confidenceCount.length);
        confidence = Math.round(confidence);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) / overallCount.length).toFixed(2);

        // Loop through check in array of averages and check out array of averages
        var qualitative = [];

        var checkin_array = [sleep, energy, mood, presence];
        for (var l = 0; l < checkin_array.length; l++) {
            qualitative.push(checkin_overview[l][checkin_array[l]]);
        }

        var checkout_array = [progress, frustration, distribution, confidence];
        for (var r = 0; r < checkout_array.length; r++) {
            qualitative.push(checkout_overview[r][checkout_array[r]]);
        }

        // Create snapshot and push it to attachments
        var colors = ['#02FF57', '#FFE602', '#FF8402', '#FF029D', '#CF02FF', '#2A02FF', '#02D2FF'];
        var user_snapshot = {
            title: '<@' + instance.id + '>\'s Week',
            color: colors[getRandomInt(0, 6)],
            attachment_type: 'default',
            text: '*Progress:* ' + qualitative[0] + '\n*Frustration:* ' + qualitative[1] + '\n*Work Distribution:* ' + qualitative[2] + '\n*Confidence:* ' + qualitative[3] + '\n*Progress:* ' + qualitative[4] + '\n*Frustration:* ' + qualitative[5] + '\n*Work Distribution:* ' + qualitative[6] + '\n*Confidence:* ' + qualitative[7] +'\n*Score:* ' + overall + '%'
        };

        attachments.push(user_snapshot);
        overall_week.push(overall);
    }
    // Calculate overall score
    var overall_score = (overall_week.reduce(function (a, b) { return a + b; }, 0) / overall_week.length);
    overall_score = Math.round(overall_score);

    if (overall_score > 50) {
        var message = '*Standing:* Positive';
    } else if (overall_score <= 50) {
        var message = '*Standing:* Negative';
    }

    var week_snapshot = {
        title: 'Overall Week',
        color: '#8A02FF',
        attachment_type: 'default',
        text: message + '\n*Score:* ' + overall_score
    };
    attachments.push(week_snapshot);
    // return attachments
    return attachments;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}