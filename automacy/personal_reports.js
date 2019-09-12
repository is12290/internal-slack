var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
var rounded = round(now, moment.duration(15, "minutes"), "floor");
const endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
const today = moment().format('DD/MM/YYY');
if (today == endOfMonth || n == 5) {
    const dotenv = require('dotenv');
    dotenv.config();
    const Botkit = require('botkit');

    var bot_options = {
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        clientSigningSecret: process.env.clientSigningSecret,
        // debug: true,
        scopes: ['bot'],
        studio_token: process.env.studio_token,
        studio_command_uri: process.env.studio_command_uri
    };

    var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true });
    bot_options.storage = mongoStorage;

    var controller = Botkit.slackbot(bot_options);

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }
        controller.storage.users.all(function (err, all_users) {
            if (err) {
                console.log("error: ", err);
            }
            for (var i = 0; i < all_teams.length; i++) {
                var bot = controller.spawn({ token: all_teams[i].bot.token });
                for (var i = 0; i < all_users.length; i++) {
                    var user = all_users[i];
                    if (!user.customization || typeof user.customization.reporting == 'undefined' || typeof user.customization.reporting.time == 'undefined') {
                        // Pass
                    } else if (user.customization.reporting.time == moment.tz(rounded, user.customization.reporting.timezone).format('HH:mm')) {
                        if (today == endOfMonth) {
                            // Monthly Report
                            var results = getMonthlyOutput(user);
                            if (results == 404) {
                                bot.say({
                                    text: 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\n\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                    channel: user.channel
                                });
                            } else {
                                bot.say({
                                    text: 'Hey there! Here is your personal monthly report. Scores are out of 100%...\n',
                                    channel: user.channel,
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
                                            title: 'Overall',
                                            color: '#02FF57',
                                            attachment_type: 'default',
                                            text: results[0][6]
                                        }
                                    ]
                                });
                            }
                        } else if (n == '5') {
                            // Weekly report
                            if (!all_users) {
                                bot.say({
                                    'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\n\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                    'channel': user.channel[0]
                                });
                            } else {
                                var results = getWeeklyOutput(user);
                                if (results == 404) {
                                    bot.say({
                                        'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\n\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                        'channel': user.channel
                                    });
                                } else {
                                    bot.say({
                                        text: 'Hey there! Here are is you personal report for the week. Scores are out of 100%...\n',
                                        channel: user.channel,
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
                                                title: 'Overall',
                                                color: '#02FF57',
                                                attachment_type: 'default',
                                                text: results[0][6]
                                            }
                                        ]
                                    });
                                }
                            }
                        }
                    }
                    sleep(400);
                }
                console.log("Made it to bot destroy");
                setTimeout(bot.destroy.bind(bot), 100);
            }
            console.log("Made it to process.exit()");
            process.exit();
        });
    });
} else {
    // Pass
}

function getMonthlyOutput(results) {
    var moment = require('moment');
    var startOfMonth = moment().startOf('month');
    var endOfMonth = moment().endOf('month');

    var day = startOfMonth;

    var days = [];
    while (day <= endOfMonth) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var startOfLastMonth = startOfMonth.subtract(1, 'months');
    var endOfLastMonth = endOfMonth.subtract(1, 'months');

    var lastMonthDay = startOfLastMonth;

    var lastMonthDays = [];
    while (lastMonthDay <= endOfLastMonth) {
        lastMonthDays.push(lastMonthDay.format('L'));
        lastMonthDay = lastMonthDay.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var lastMonthCount = [];

    for (var a = 0; a < days.length; a++) {
        if (days[a] in results.logs) {
            if (typeof results.logs[days[a]].check_in == 'undefined' || typeof results.logs[days[a]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[days[a]].check_in;
                var checkOut = results.logs[days[a]].check_out;

                sleepCount.push(checkIn[0]);
                energyCount.push(checkIn[1]);
                moodCount.push(checkIn[2]);
                confidenceCount.push(checkIn[3]);
                overallCount.push(checkIn[4] / 4);

                presenceCount.push(checkOut[0]);
                energyCount.push(checkOut[1]);
                moodCount.push(checkOut[2]);
                fulfillmentCount.push(checkOut[3]);
                overallCount.push(checkOut[4] / 4);

            }
        }
    }

    for (var k = 0; k < lastMonthDays.length; k++) {
        if (lastMonthDays[k] in results.logs) {
            if (typeof results.logs[lastMonthDays[k]].check_in == 'undefined' || results.logs[lastMonthDays[k]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[lastMonthDays[k]].check_in;
                var checkOut = results.logs[lastMonthDays[k]].check_out;

                lastMonthCount.push(checkIn[4] / 4);

                lastMonthCount.push(checkOut[4] / 4);

            }
        }
    }

    if (overallCount.length > 0) {
        var sleep = ((sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25) / sleepCount.length).toFixed(2);
        var energy = ((energyCount.reduce(function (a, b) { return a + b; }, 0) * 25) / energyCount.length).toFixed(2);
        var mood = ((moodCount.reduce(function (a, b) { return a + b; }, 0) * 25) / moodCount.length).toFixed(2);
        var confidence = ((confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / confidenceCount.length).toFixed(2);
        var presence = ((presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / presenceCount.length).toFixed(2);
        var fulfillment = ((fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / fulfillmentCount.length).toFixed(2);
        var overall = ((overallCount.reduce(function (a, b) { return a + b; }, 0) * 25) / overallCount.length).toFixed(2);
        overall = Math.round(overall);

        var countArray = [sleepCount, energyCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];
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
        var analysisArray = [sleep, energy, mood, confidence, presence, fulfillment];
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

        if (lastMonthCount.length > 0) {
            var lastMonth = ((lastMonthCount.reduce(function (a, b) { return a + b; }, 0) * 25) / lastMonthCount.length).toFixed(2);
        }

        if (overall < 50) {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this month was *negative*';
            if (!lastMonth || typeof lastMonth == 'undefined' || lastMonth == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs last month to compare against :rowboat:';
            } else if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is up ' + difference + '% compared to last week';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        } else {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this month was *positive*!';
            if (!lastMonth || typeof lastMonth == 'undefined' || lastMonth == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs last month to compare against :rowboat:';
            } else if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is up ' + difference + '% compared to last week';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        }

        var returnArray = [analysisOutcome, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
}

function getWeeklyOutput(results) {
    const moment = require('moment');
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');

    var day = startOfWeek;
    var days = [];
    while (day <= endOfWeek) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var startOfLastWeek = startOfWeek.subtract(7, 'd');
    var endOfLastWeek = endOfWeek.subtract(7, 'd');

    var lastWeekDay = startOfLastWeek;

    var lastWeekDays = [];
    while (lastWeekDay <= endOfLastWeek) {
        lastWeekDays.push(lastWeekDay.format('L'));
        lastWeekDay = lastWeekDay.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var lastWeekCount = [];

    for (var a = 0; a < days.length; a++) {
        if (days[a] in results.logs) {
            if (typeof results.logs[days[a]].check_in == 'undefined' || typeof results.logs[days[a]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[days[a]].check_in;
                var checkOut = results.logs[days[a]].check_out;

                sleepCount.push(checkIn[0]);
                energyCount.push(checkIn[1]);
                moodCount.push(checkIn[2]);
                confidenceCount.push(checkIn[3]);
                overallCount.push(checkIn[4] / 4);

                presenceCount.push(checkOut[0]);
                confidenceCount.push(checkOut[1]);
                moodCount.push(checkOut[2]);
                fulfillmentCount.push(checkOut[3]);
                overallCount.push(checkOut[4] / 4);
            }
        }
    }

    for (var k = 0; k < lastWeekDays.length; k++) {
        if (lastWeekDays[k] in results.logs) {
            if (typeof results.logs[lastWeekDays[k]].check_in == 'undefined' || results.logs[lastWeekDays[k]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[lastWeekDays[k]].check_in;
                var checkOut = results.logs[lastWeekDays[k]].check_out;

                lastWeekCount.push(checkIn[4] / 4);

                lastWeekCount.push(checkOut[4] / 4);

            }
        }
    }

    if (overallCount.length > 0) {
        var countArray = [sleepCount, energyCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];

        var sleep = ((sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25) / sleepCount.length).toFixed(2);
        var energy = ((energyCount.reduce(function (a, b) { return a + b; }, 0) * 25) / energyCount.length).toFixed(2);
        var mood = ((moodCount.reduce(function (a, b) { return a + b; }, 0) * 25) / moodCount.length).toFixed(2);
        var confidence = ((confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / confidenceCount.length).toFixed(2);
        var presence = ((presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / presenceCount.length).toFixed(2);
        var fulfillment = ((fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / fulfillmentCount.length).toFixed(2);
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
        var analysisArray = [sleep, energy, mood, confidence, presence, fulfillment];
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

        if (lastWeekCount.length > 0) {
            var lastWeek = ((lastWeekCount.reduce(function (a, b) { return a + b; }, 0) * 25) / lastWeekCount.length).toFixed(2);
        }

        if (overall < 50) {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *negative*';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        } else {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this week was *positive*!';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallAnalysis = overallAnalysis + '\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        }

        var returnArray = [analysisOutcome, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration)); 
}