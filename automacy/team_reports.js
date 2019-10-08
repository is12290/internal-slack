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
        for (var i = 0; i < all_teams.length; i++) {
            var instance = all_teams[i];
            var bot = controller.spawn({token: instance.bot.token});
            if (!instance.timezone) {
                var timezone = "America/New_York";
            } else {
                var timezone = instance.timezone;
            }
            if (moment.tz(rounded, timezone).format('HH:mm') == '18:30') {
                controller.storage.users.find({team: instance.id}, function (err, all_users) {
                    if (err) {
                        console.log('error: ', err);
                    }
                    if (today == endOfMonth) {
                        var results = getReport(all_users, 'monthly');
                        var message = 'Here is your team\'s monthly report...';
                    } else {
                        var results = getReport(all_users, 'weekly');
                        var message = 'Here is your team\'s weekly report...';
                    }
                    if (results == 404) {
                        // Pass
                    } else {
                        bot.say({
                            text: message,
                            channel: team.bot.channel,
                            attachments: [
                                {
                                    title: 'Sleep',
                                    color: '#02D2FF',
                                    attachment_type: 'default',
                                    text: results[0][0] + '\n*Perfect:* ' + results[1][0][4] + ' | *Sufficient:* ' + results[1][0][3] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][1] + '\n'
                                },
                                {
                                    title: 'Energy',
                                    color: '#2A02FF',
                                    attachment_type: 'default',
                                    text: results[0][1] + '\n*Full:* ' + results[1][1][4] + ' | *Alright:* ' + results[1][1][3] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][1] + '\n'
                                },
                                {
                                    title: 'Mood',
                                    color: '#8A02FF',
                                    attachment_type: 'default',
                                    text: results[0][2] + '\n*Happy:* ' + results[1][2][4] + ' | *Calm:* ' + results[1][2][3] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][1] + '\n'
                                },
                                {
                                    title: 'Confidence',
                                    color: '#CF02FF',
                                    attachment_type: 'default',
                                    text: results[0][3] + '\n*Crushing It:* ' + results[1][3][4] + ' | *Okay:* ' + results[1][3][3] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][1] + '\n'
                                },
                                {
                                    title: 'Presence',
                                    color: '#FF029D',
                                    attachment_type: 'default',
                                    text: results[0][4] + '\n*Grounded:* ' + results[1][4][4] + ' | *Aware:* ' + results[1][4][3] + ' | *Out of It:* ' + results[1][4][2] + ' | *Disconnected:* ' + results[1][4][1] + '\n'
                                },
                                {
                                    title: 'Fulfillment',
                                    color: '#FF8402',
                                    attachment_type: 'default',
                                    text: results[0][5] + '\n*Complete:* ' + results[1][5][4] + ' | *Present:* ' + results[1][5][3] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][1] + '\n'
                                },
                                {
                                    title: 'Relationships',
                                    color: '#FFE602',
                                    attachment_type: 'default',
                                    text: results[0][6] + '\n*Fulfilled:* ' + results[1][6][4] + ' | *Connected:* ' + results[1][6][3] + ' | *Unsatisfied:* ' + results[1][6][2] + ' | *Lonely:* ' + results[1][6][1] + '\n'
                                },
                                {
                                    title: 'Overall',
                                    color: '#02FF57',
                                    attachment_type: 'default',
                                    text: results[0][7]
                                }
                            ]
                        });
                    }
                })
            }
        }
    })
} else {
    // Pass
}

function getReport(results, timeframe) {
    var moment = require('moment');
    var message1 = '';
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
    } else if (timeframe == 'daily') {
        days.push(moment().format('DD/MM/YYYY'));
        message1 = message1 + 'Today';
    }

    var pastDays = [];
    var message2 = '';
    if (timeframe == 'daily') {
        pastDays.push(moment().subtract(1, 'd').format('MM/DD/YYYY'));
        message2 = message2 + 'yesterday';
    } else if (timeframe == 'weekly') {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');
        message2 = message2 + 'Last Week';
        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
    } else if (timeframe == 'monthly') {
        var startOfMonth = moment().startOf('month').subtract(1, 'months');
        var endOfMonth = moment().endOf('month').subtract(1, 'months');
        message2 = message2 + 'Last Month';
        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var relationshipCount = [];
    var overallCount = [];

    var pastCount = [];


    for (var i = 0; i < results.length; i++) {
        var instance = results[i];
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' && typeof instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    if (typeof results.logs[days[j]].check_in == 'undefined') {
                        // Pass
                    } else {
                        var checkIn = results.logs[days[j]].check_in;

                        sleepCount.push(checkIn[0]);
                        energyCount.push(checkIn[1]);
                        moodCount.push(checkIn[2]);
                        confidenceCount.push(checkIn[3]);
                        overallCount.push(checkIn[4] / 4);
                    }
                    if (typeof results.logs[days[j]].check_out == 'undefined') {
                        // Pass
                    } else {
                        var checkOut = results.logs[days[j]].check_out;

                        if (checkOut.length == 5) {
                            presenceCount.push(checkOut[0]);
                            energyCount.push(checkOut[1]);
                            moodCount.push(checkOut[2]);
                            fulfillmentCount.push(checkOut[3]);
                            overallCount.push(checkOut[4] / 4);
                        } else {
                            presenceCount.push(checkOut[0]);
                            energyCount.push(checkOut[1]);
                            moodCount.push(checkOut[2]);
                            fulfillmentCount.push(checkOut[3]);
                            relationshipCount.push(checkOut[4])
                            overallCount.push(checkOut[5] / 5);
                        }
                    }

                }
            }
        }

        for (var k = 0; k < pastDays.length; k++) {
            if (pastDays[k] in instance.logs) {
                if (typeof instance.logs[pastDays[k]].check_in == 'undefined' || typeof instance.logs[pastDays[k]].check_out == 'undefined') {
                    // Pass
                } else {
                    if (checkIn == 'undefined' || checkOut == 'undefined') {
                        // Pass
                    } else {
                        pastCount.push(checkIn[4] / 4);
                        
                        if (checkOut.length == 5) {
                            pastCount.push(checkOut[4] / 4);
                        } else {
                            pastCount.push(checkOut[5] / 5);
                        }
                    }

                }
            }
        }
    }


    if (overallCount.length > 0) {
        var countArray = [sleepCount, energyCount, moodCount, confidenceCount, presenceCount, fulfillmentCount, relationshipCount];

        var sleep = ((sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25) / sleepCount.length).toFixed(2);
        var energy = ((energyCount.reduce(function (a, b) { return a + b; }, 0) * 25) / energyCount.length).toFixed(2);
        var mood = ((moodCount.reduce(function (a, b) { return a + b; }, 0) * 25) / moodCount.length).toFixed(2);
        var confidence = ((confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / confidenceCount.length).toFixed(2);
        var presence = ((presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / presenceCount.length).toFixed(2);
        var fulfillment = ((fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / fulfillmentCount.length).toFixed(2);
        var relationship = ((relationshipCount.reduce(function (a, b) { return a + b; }, 0) * 25) / relationshipCount.length).toFixed(2);

        var overall = ((overallCount.reduce(function (a, b) { return a + b; }, 0) * 25) / overallCount.length).toFixed(2);
        overall = Math.round(overall);

        var inDepthArray = [];
        for (var i = 0; i < countArray.length; i++) {
            var insight = countArray[i];
            var map = { '1': 0, '2': 0, '3': 0, '4': 0 }
            for (var x = 0; x < insight.length; x++) {
                map[insight[x]] = map[insight[x]] + 1
            }
            inDepthArray.push(map);
        }

        var analysisOutcome = [];
        var analysisArray = [sleep, energy, mood, confidence, presence, fulfillment, relationship];
        for (var a = 0; a < analysisArray.length; a++) {
            var analysisInstance = Math.round(analysisArray[a]);
            if (analysisArray[a] < 50) {
                var message = 'Score: *' + analysisInstance + '%*\nAverage: *Positive*';
                analysisOutcome.push(message);
            } else {
                var message = 'Score: *' + analysisInstance + '%*\nAverage: *Negative*';
                analysisOutcome.push(message);
            }
        }

        if (pastCount.length > 0) {
            var past = ((pastCount.reduce(function (a, b) { return a + b; }, 0) * 25) / pastCount.length).toFixed(2);
        }

        if (overall < 50) {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *negative*';
            if (!past || typeof past == 'undefined' || past == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs to compare against :rowboat:';
                analysisOutcome.push(overallAnalysis);
            } else if (overall > past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message1 + ' is up ' + difference + '% compared to ' + message2;
                analysisOutcome.push(overallAnalysis);
            } else if (overall < past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message1 + ' is down ' + difference + '% compared to ' + message2;
                analysisOutcome.push(overallAnalysis);
            }
            analysisOutcome.push(overallAnalysis);
        } else {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *positive*!';
            if (!past || typeof past == 'undefined' || past == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs to compare against :rowboat:';
                analysisOutcome.push(overallAnalysis);
            } else if (overall > past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message1 + ' is up ' + difference + '% compared to ' + message2;
                analysisOutcome.push(overallAnalysis);
            } else if (overall < past) {
                var difference = overall - past;
                overallAnalysis = overallAnalysis + '\n ' + message1 + ' is down ' + difference + '% compared to ' + message2;
                analysisOutcome.push(overallAnalysis);
            }
        }

        var returnArray = [analysisOutcome, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
}

function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration));
}