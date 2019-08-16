var schedule = require('node-schedule');

var j = schedule.scheduleJob('*/30 * * * *', () => {
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
                controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
                    controller.storage.users.all(function (err, all_users) {
                        if (err) {
                            console.log("error: ", err);
                        }
                        for (var i = 0; i < all_users.length; i++) {
                            var user = all_users[i];
                            if (!user.customization || typeof user.customization.reporting == 'undefined' || typeof user.customization.reporting.time == 'undefined') {
                                // Pass
                            } else if (user.customization.reporting.time == moment.tz(now, user.customization.reporting.timezone).format('HH:mm')) {
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
                                                    text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                },
                                                {
                                                    title: 'Energy',
                                                    color: '#2A02FF',
                                                    attachment_type: 'default',
                                                    text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                },
                                                {
                                                    title: 'Mood',
                                                    color: '#8A02FF',
                                                    attachment_type: 'default',
                                                    text: results[0][2] + '\n*Happy:* ' + results[1][2][0] + ' | *Calm:* ' + results[1][2][1] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][3] + '\n'
                                                },
                                                {
                                                    title: 'Confidence',
                                                    color: '#CF02FF',
                                                    attachment_type: 'default',
                                                    text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                },
                                                {
                                                    title: 'Presence',
                                                    color: '#FF029D',
                                                    attachment_type: 'default',
                                                    text: results[0][4] + '\n*Grounded:* ' + results[1][4][0] + ' | *Aware:* ' + results[1][4][1] + ' | *Out of It:* ' + results[1][4][2] + ' | *Disconnected:* ' + results[1][4][3] + '\n'
                                                },
                                                {
                                                    title: 'Fulfillment',
                                                    color: '#FF8402',
                                                    attachment_type: 'default',
                                                    text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                },
                                                {
                                                    title: 'Overall',
                                                    color: '#02FF57',
                                                    attachment_type: 'default',
                                                    text: 'Logs Completed: ' + results[2] + '\n' + results[0][6]
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
                                                        text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                    },
                                                    {
                                                        title: 'Energy',
                                                        color: '#2A02FF',
                                                        attachment_type: 'default',
                                                        text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                    },
                                                    {
                                                        title: 'Mood',
                                                        color: '#8A02FF',
                                                        attachment_type: 'default',
                                                        text: results[0][2] + '\n*Happy:* ' + results[1][2][0] + ' | *Calm:* ' + results[1][2][1] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][3] + '\n'
                                                    },
                                                    {
                                                        title: 'Confidence',
                                                        color: '#CF02FF',
                                                        attachment_type: 'default',
                                                        text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                    },
                                                    {
                                                        title: 'Presence',
                                                        color: '#FF029D',
                                                        attachment_type: 'default',
                                                        text: results[0][4] + '\n*Grounded:* ' + results[1][4][0] + ' | *Aware:* ' + results[1][4][1] + ' | *Out of It:* ' + results[1][4][2] + ' | *Disconnected:* ' + results[1][4][3] + '\n'
                                                    },
                                                    {
                                                        title: 'Fulfillment',
                                                        color: '#FF8402',
                                                        attachment_type: 'default',
                                                        text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                    },
                                                    {
                                                        title: 'Overall',
                                                        color: '#02FF57',
                                                        attachment_type: 'default',
                                                        text: 'Logs Completed: ' + results[2] + '\n' + results[0][6]
                                                    }
                                                ]
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
            }
        });
    }

    function getMonthlyOutput(results) {
        var moment = require('moment');
        var startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
        var endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

        var day = startOfMonth;

        var days = [];
        while (day <= endOfMonth) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }

        var startOfLastMonth = startOfMonth.subtract(7, 'd');
        var endOfLastMonth = endOfMonth.subtract(7, 'd');

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
            if (results.logs && days[a] in results.logs) {
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

        for (var k = 0; k < lastMonthDays.length; k++) {
            if (results.logs && lastMonthDays[k] in results.logs) {
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
            var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var presence = (presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

            var countArray = [sleepCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];
            var inDepthArray = [];
            for (val in countArray) {
                inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
            }

            var analysisOutcome = [];
            var analysisArray = [sleep, energy, mood, confidence, presence, fulfillment];
            for (var a = 0; a < analysisArray.length; a++) {
                if (analysisArray[a] < 50) {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                    analysisOutcome.push(message);
                } else {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                    analysisOutcome.push(message);
                }
            }

            if (lastMonthCount.length > 0) {
                var lastMonth = (lastMonthCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            }

            if (overall < 50) {
                var overallAnalysis = 'Hmm.. It seems as though this month was not the best for you. I\'m sorry about that. Shoot to turn it around next month!';
                if (overall > lastMonth) {
                    var difference = overall - lastMonth;
                    overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
                } else if (overall < lastMonth) {
                    var difference = overall - lastMonth;
                    overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
                }
                analysisOutcome.push(overallAnalysis);
            } else {
                var overallAnalysis = 'Way to have a positive month! Keep it up and remember to try to lift up those around you :heart:';
                if (overall > lastMonth) {
                    var difference = overall - lastMonth;
                    overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
                } else if (overall < lastMonth) {
                    var difference = overall - lastMonth;
                    overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
                }
                analysisOutcome.push(overallAnalysis);
            }

            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];

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
            if (results.logs && days[a] in results.logs) {
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
            if (results.logs && lastWeekDays[k] in results.logs) {
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
            var countArray = [sleepCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];

            var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var presence = (presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var inDepthArray = [];
            for (val in countArray) {
                inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
            }

            var analysisOutcome = [];
            var analysisArray = [sleep, energy, mood, confidence, presence, fulfillment];
            for (var a = 0; a < analysisArray.length; a++) {
                if (analysisArray[a] < 50) {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                    analysisOutcome.push(message);
                } else {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                    analysisOutcome.push(message);
                }
            }

            if (lastWeekCount.length > 0) {
                var lastWeek = (lastWeekCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            }

            if (overall < 50) {
                var overallAnalysis = 'Hmm.. It seems as though this week was not the best for you. I\'m sorry about that. There\'s always next week - Improve them scores!'
                if (overall > lastWeek) {
                    var difference = overall - lastWeek;
                    overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
                } else if (overall < lastWeek) {
                    var difference = overall - lastWeek;
                    overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
                }
                analysisOutcome.push(overallAnalysis)
            } else {
                var overallAnalysis = 'Way to have a positive week! Shoot to keep it up :)'
                if (overall > lastWeek) {
                    var difference = overall - lastWeek;
                    overallAnalysis = overallAnalysis + '\This week is up ' + difference + '% compared to last week';
                } else if (overall < lastWeek) {
                    var difference = overall - lastWeek;
                    overallAnalysis = overallAnalysis + '\This week is down ' + difference + '% compared to last week';
                }
                analysisOutcome.push(overallAnalysis)
            }

            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];

            return returnArray;
        } else {
            return 404;
        }
    }
})