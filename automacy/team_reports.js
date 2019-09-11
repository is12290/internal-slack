var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
const endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
const today = moment().format('DD/MM/YYY');
if (today == endOfMonth) {
    //Pass
} else {
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
    controller.startTicking();

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }
        for (var i = 0; i < all_teams.length; i++) {
            controller.storage.users.find({ team: all_teams[i].id }, function (err, info) {
                if (err) {
                    console.log("error: ", err);
                }

                var bot = controller.spawn({ token: all_teams[i].bot.token });
                for (var i = 0; i < info.length; i++) {
                    var user = info[i];
                    if (typeof user.status == 'undefined' || user.status != 'manager' || !user.customization || !user.customization.team_reporting || !user.customization.team_reporting.time) {
                        // Pass
                    } else if (user.customization.team_reporting.time == moment.tz(now, user.customization.team_reporting.timezone).format('HH:mm')) {
                        if (today == endOfMonth) {
                            // Monthly Report
                            var results = getMonthlyOutput(info);
                            if (results == 404) {
                                bot.say({
                                    text: 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                    channel: info[i].channel
                                });
                            } else {
                                bot.say({
                                    text: 'Hey there! Here is your team\'s monthly report...\n',
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
                                    ],
                                    channel: info[i].channel
                                });
                            }
                        } else if (n == '5') {
                            // Weekly report
                            if (!info) {
                                bot.say({
                                    'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                    'channel': info[i].channel
                                });
                            } else {
                                var results = getWeeklyOutput(info);
                                if (results == 404) {
                                    bot.say({
                                        'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                        'channel': info[i].channel
                                    });
                                } else {
                                    bot.say({
                                        text: 'Hey there! Here are your weekly team averages...\n',
                                        channel: info[i].channel,
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
                        } else if (n > 0 && n < 5) {
                            // Daily report
                            if (!info) {
                                bot.say({
                                    'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                    'channel': info[i].channel
                                });
                            } else {
                                var results = getDailyOutput(info);
                                if (percent == 404) {
                                    bot.say({
                                        'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                        'channel': info[i].channel
                                    });
                                } else {
                                    bot.say({
                                        text: 'Hey there! Here are your team results for the day...\n',
                                        channel: info[i].channel,
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
            });
            setTimeout(bot.destroy.bind(bot), 100);
        }
        proces.exit();
    });
}


function getDailyOutput(input) {
    const moment = require('moment');
    var today = moment();
    today = today.format("MM/DD/YYYY");
    var yesterday = moment();
    yesterday = yesterday.subtract(1, 'd');
    yesterday = yesterday.format("MM/DD/YYYY");

    // Necessary variables
    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var yesterday = 0;

    for (var i = 0; i < input.length; i++) {
        var instance = input[i];
        if (typeof instance.logs[today] == 'undefined') {
            // Pass
        } else if (typeof instance.logs[today] != 'undefined') {
            var checkIn = instance.logs[today].check_in;
            var checkOut = instance.logs[today].check_out;

            if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                // Pass
            } else {
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

        if (typeof instance.logs[yesterday] == 'undefined') {
            // Pass
        } else if (typeof instance.logs[yesterday] != 'undefined') {
            var checkIn = instance.logs[yesterday].check_in;
            var checkOut = instance.logs[yesterday].check_out;

            if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                // Pass
            } else {
                yesterdayCount = [];

                yesterdayCount.push(checkIn[4] / 4);
                yesterdayCount.push(checkOut[4] / 4);

                yesterday = yesterday + ((yesterdayCount.reduce(function (a, b) { return a + b; }, 0) * 25) / yesterdayCount.length).toFixed(2);

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

        var loopArray = [sleep, energy, mood, confidence, presence, fulfillment];

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

        var dailyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            var loopInstance = Math.round(loopArray[z]);
            if (loopInstance > 50) {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                dailyReport.push(message);
            } else {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                dailyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness today was *positive*!';
            if (!yesterday || typeof yesterday == 'undefined' || yesterday == 0) {
                overallWeek = overallWeek + '\nNo logs yesterday to compare against :rowboat:';
            } else if (overall > yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is up ' + difference + '% compared to yesterday';
            } else if (overall < yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is down ' + difference + '% compared to yesterday';
            }
            dailyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness today was *negative*';
            if (!yesterday || typeof yesterday == 'undefined' || yesterday == 0) {
                overallWeek = overallWeek + '\nNo logs yesterday to compare against :rowboat:';
            } else if (overall > yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is up ' + difference + '% compared to yesterday';
            } else if (overall < yesterday) {
                var difference = overall - yesterday;
                overallWeek = overallWeek + '\nToday is down ' + difference + '% compared to yesterday';
            }
            dailyReport.push(overallWeek);
        }

        var returnArray = [dailyReport, inDepthArray];
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

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[days[j]].check_in;
                    var checkOut = instance.logs[days[j]].check_out;

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
            if (lastWeekDays[k] in instance.logs) {
                if (typeof instance.logs[lastWeekDays[k]].check_in == 'undefined' || instance.logs[lastWeekDays[k]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[lastWeekDays[k]].check_in;
                    var checkOut = instance.logs[lastWeekDays[k]].check_out;

                    lastWeekCount.push(checkIn[4] / 4);

                    lastWeekCount.push(checkOut[4] / 4);

                }
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

        var loopArray = [sleep, energy, mood, confidence, presence, fulfillment];

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

        var weeklyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            var loopInstance = Math.round(loopArray[z]);
            if (loopInstance > 50) {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }

        if (lastWeekCount.length > 0) {
            var lastWeek = ((lastWeekCount.reduce(function (a, b) { return a + b; }, 0) * 25) / lastWeekCount.length).toFixed(2);
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallWeek = overallWeek + '\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is down ' + difference + '% compared to last week';
            }
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            if (!lastWeek || typeof lastWeek == 'undefined' || lastWeek == 0) {
                overallWeek = overallWeek + '\nNo logs last week to compare against :rowboat:';
            } else if (overall > lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is up ' + difference + '% compared to last week';
            } else if (overall < lastWeek) {
                var difference = overall - lastWeek;
                overallWeek = overallWeek + '\This week is down ' + difference + '% compared to last week';
            }
            weeklyReport.push(overallWeek);
        }

        var returnArray = [weeklyReport, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
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

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[days[j]].check_in;
                    var checkOut = instance.logs[days[j]].check_out;

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

        for (var k = 0; k < lastMonthDays.length; k++) {
            if (lastMonthDays[k] in instance.logs) {
                if (typeof instance.logs[lastMonthDays[k]].check_in == 'undefined' || instance.logs[lastMonthDays[k]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[lastMonthDays[k]].check_in;
                    var checkOut = instance.logs[lastMonthDays[k]].check_out;

                    lastMonthCount.push(checkIn[4] / 4);

                    lastMonthCount.push(checkOut[4] / 4);

                }
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

        var loopArray = [sleep, energy, mood, confidence, presence, fulfillment];

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

        var monthlyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            var loopInstance = Math.round(loopArray[z]);
            if (loopInstance > 50) {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                monthlyReport.push(message);
            } else {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                monthlyReport.push(message);
            }
        }

        if (lastMonthCount.length > 0) {
            var lastMonth = ((lastMonthCount.reduce(function (a, b) { return a + b; }, 0) * 25) / lastMonthCount.length).toFixed(2);
        }

        if (overall > 50) {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *positive*!';
            if (!lastMonth || typeof lastMonth == 'undefined' || lastMonth == 0) {
                overallMonth = overallMonth + '\nNo logs last month to compare against :rowboat:';
            } else if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth + '\nThis month is up ' + difference + '% compared to last month';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth + '\nThis month is down ' + difference + '% compared to last month';
            }
            monthlyReport.push(overallMonth);
        }
        else {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *negative*';
            if (!lastMonth || typeof lastMonth == 'undefined' || lastMonth == 0) {
                overallMonth = overallMonth + '\nNo logs last month to compare against :rowboat:';
            } else if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth + '\nThis month is up ' + difference + '% compared to last month';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallMonth = overallMonth + '\nThis month is down ' + difference + '% compared to lsat month';
            }
            monthlyReport.push(overallMonth);
        }

        var returnArray = [monthlyReport, inDepthArray];

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