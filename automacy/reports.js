var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
var rounded = round(now, moment.duration(30, "minutes"), "floor");
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');
const today = moment().format('MM/DD/YYYY');
if (n == 5 || today == endOfMonth) {
    const dotenv = require('dotenv');
    dotenv.config();
    const Botkit = require('botkit');

    var bot_options = {
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        clientSigningSecret: process.env.clientSigningSecret,
        // debug: true,
        scopes: ['bot']
    };

    var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true });
    bot_options.storage = mongoStorage;

    var controller = Botkit.slackbot(bot_options);
    controller.startTicking();

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }
        for (var l = 0; l < all_teams.length; l++) {
            var instance_team = all_teams[l];
            if (!instance_team.timezone) {
                var team_timezone = "America/New_York";
            } else {
                var team_timezone = instance_team.timezone;
            }
            if (moment.tz(rounded, team_timezone).format('HH:mm') == '18:30') {
                var bot = controller.spawn({token: team_instance.bot.token});
                controller.storage.users.find({team: instance_team.id}, function (err, all_users) {
                    if (err) {
                        console.log("error: ", err);
                    }
                    if (today == endOfMonth) {
                        var results = GetReport(all_users, 'monthly');
                        var message = 'Here is your monthly report...';
                    } else {
                        var results = GetReport(all_users, 'weekly');
                        var message = 'Here is your weekly report...';
                    }
                    if (typeof results == 'undefined') {
                        // Pass
                    } else {
                        bot.say({
                            text: message,
                            channel: team_instance.channel,
                            attachments: results
                        });
                    }
                })
            }
        }
    })
} else {
    // Pass
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
                                scores.push((checkOut[q] * 25) * 1.3);
                            } else if (q == 1) {
                                // Energy
                                scores.push((checkOut[q] * 25) * 0.8);
                            } else if (q == 2) {
                                // Mood
                                scores.push((checkOut[q] * 25) * 0.9);
                            } else if (q == 2) {
                                // Presence
                                scores.push((checkOut[q] * 25) * 1);
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

function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration));
}