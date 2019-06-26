var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
if (n === 6 || n === 0) {
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

    var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true, tables: ['results', 'week', 'personal', 'full'] });
    bot_options.storage = mongoStorage;

    var controller = Botkit.slackbot(bot_options);

    controller.storage.teams.all(function (err, all_teams) {

        // Usable data
        var data = [];

        for (var i = 0; i < all_teams.length; i++) {
            var team = all_teams[i];
            if (!team.customization.reporting.time) {
                // Pass
            } else {
                if (team.customization.reporting.time == now.tz(team.customization.reporting.timezone).format('HH:mm')) {
                    data.push([team.bot.token, team.id, team.channel]);
                } else {
                    // Pass
                }
            }
        }

        data.forEach(
            (instance) => {
                controller.spawn({ token: instance[0] }, function (bot) {
                    controller.storage.users.find({ team: instance[1] }, function (err, info) {
                        if (monthEnd) {
                            // xyz
                        } else if (d == '5') {
                            // Weekly report
                            if (!info) {
                                bot.say({
                                    'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                    'channel': instance[2]
                                });
                            } else {
                                var results = getWeeklyOutput(info);
                                if (isNaN(results[0])) {
                                    bot.say({
                                        'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                        'channel': instance[2]
                                    });
                                } else {
                                    bot.say({
                                        text: 'Hey there! Here are your weekly organization averages...\n',
                                        attachments: [
                                            {
                                                title: 'Sleep',
                                                color: '#02D2FF',
                                                attachment_type: 'default',
                                                text: results[1] + '\n'
                                            },
                                            {
                                                title: 'Energy',
                                                color: '#2A02FF',
                                                attachment_type: 'default',
                                                text: results[2] + '\n'
                                            },
                                            {
                                                title: 'Mood',
                                                color: '#8A02FF',
                                                attachment_type: 'default',
                                                text: results[3] + '\n'
                                            },
                                            {
                                                title: 'Confidence',
                                                color: '#CF02FF',
                                                attachment_type: 'default',
                                                text: results[4] + '\n'
                                            },
                                            {
                                                title: 'Efficiency',
                                                color: '#FF029D',
                                                attachment_type: 'default',
                                                text: results[5] + '\n'
                                            },
                                            {
                                                title: 'Fulfillment',
                                                color: '#FF8402',
                                                attachment_type: 'default',
                                                text: results[6] + '\n'
                                            },
                                            {
                                                title: 'Overall',
                                                color: '#02FF57',
                                                attachment_type: 'default',
                                                text: results[7]
                                            }
                                        ],
                                        channel: instance[2]
                                    });

                                }
                            }
                        } else if (d > 0 && d < 5) {
                            // Daily report
                            if (!info) {
                                bot.say({
                                    'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                    'channel': instance[2]
                                });
                            } else {
                                var percent = getDailyPercentage(info);
                                if (percent[0] === 404) {
                                    bot.say({
                                        'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                        'channel': instance[2]
                                    });
                                } else {
                                    var resultMessage = getDailyMessages(percent);

                                    bot.say({
                                        text: 'Hey there! Here are your results for the day...\n',
                                        attachments: [
                                            {
                                                title: 'Sleep',
                                                color: '#02D2FF',
                                                attachment_type: 'default',
                                                text: resultMessage[0] + '\n'
                                            },
                                            {
                                                title: 'Energy',
                                                color: '#2A02FF',
                                                attachment_type: 'default',
                                                text: resultMessage[1] + '\n'
                                            },
                                            {
                                                title: 'Mood',
                                                color: '#8A02FF',
                                                attachment_type: 'default',
                                                text: resultMessage[2] + '\n'
                                            },
                                            {
                                                title: 'Confidence',
                                                color: '#CF02FF',
                                                attachment_type: 'default',
                                                text: resultMessage[3] + '\n'
                                            },
                                            {
                                                title: 'Efficiency',
                                                color: '#FF029D',
                                                attachment_type: 'default',
                                                text: resultMessage[4] + '\n'
                                            },
                                            {
                                                title: 'Fulfillment',
                                                color: '#FF8402',
                                                attachment_type: 'default',
                                                text: resultMessage[5] + '\n'
                                            },
                                            {
                                                title: 'Overall',
                                                color: '#02FF57',
                                                attachment_type: 'default',
                                                text: resultMessage[6]
                                            }
                                        ],
                                        channel: instance[2]
                                    });
                                }

                            }
                        }

                    })
                })
            }
        )
    });

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

        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var confidenceCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;
        var overallCount = 0;
        var logTally = 0;

        for (var i = 0; i < results.length; i++) {
            var instance = results[i];
            var checkin = [];
            var checkout = [];

            for (var j = 0; j < days.length; j++) {
                if (days[j] in instance.logs) {
                    if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                        // Pass
                    } else {
                        checkin.push(instance.logs[days[j]].check_in);
                        checkout.push(instance.logs[days[j]].check_out);
                    }
                }
            }

            for (var k = 0; k < checkin.length; k++) {
                var specific = checkin[k];
                sleepCount = sleepCount + specific[0];
                energyCount = energyCount + specific[1];
                moodCount = moodCount + specific[2];
                confidenceCount = confidenceCount + specific[3];
                overallCount = overallCount + (specific[4] / 4);
            }

            for (var l = 0; l < checkout.length; l++) {
                var specific = checkout[l];
                efficiencyCount = efficiencyCount + specific[0];
                confidenceCount = confidenceCount + specific[1];
                moodCount = moodCount + specific[2];
                fulfillmentCount = fulfillmentCount + specific[3];
                overallCount = overallCount + (specific[4] / 4);
            }

            logTally = logTally + 1;
        }

        var sleep = ((sleepCount / logTally) * 25).toFixed(2);
        var energy = ((energyCount / logTally) * 25).toFixed(2);
        var mood = ((moodCount / (logTally * 2)) * 25).toFixed(2);
        var confidence = ((confidenceCount / (logTally * 2)) * 25).toFixed(2);
        var efficiency = ((efficiencyCount / logTally) * 25).toFixed(2);
        var fulfillment = ((fulfillmentCount / logTally) * 25).toFixed(2);
        var overall = ((overallCount / (logTally * 2)) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

        var weeklyReport = [];
        weeklyReport.push(sleep);
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            weeklyReport.push(overallWeek);
        }

        return weeklyReport;

    }

    function getDailyPercentages(input) {
        // Necessary variables
        var sleepCount = 0;
        var energyCount = 0;
        var moodCount = 0;
        var confidenceCount = 0;
        var efficiencyCount = 0;
        var fulfillmentCount = 0;
        var overallCount = 0;

        for (var i = 0; i < input.length; i++) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;

            var instance = input[i];
            if (typeof instance.logs[today] == 'undefined') {
                var errorArray = [404]
            } else {
                var checkIn = instance.logs[today].check_in;
                var checkOut = instance.logs[today].check_out;

                if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                    var errorArray = [404];
                } else {
                    sleepCount = sleepCount + checkIn[0];
                    energyCount = energyCount + checkIn[1];
                    moodCount = moodCount + checkIn[2];
                    confidenceCount = confidenceCount + checkIn[3];
                    overallCount = overallCount + (checkIn[4] / 4);

                    efficiencyCount = efficiencyCount + checkOut[0];
                    confidenceCount = confidenceCount + checkOut[1];
                    moodCount = moodCount + checkOut[2];
                    fulfillmentCount = fulfillmentCount + checkOut[3];
                    overallCount = overallCount + (checkOut[4] / 4);
                }
            }

        }

        if (sleepCount > 0) {
            var sleep = ((sleepCount / input.length) * 25).toFixed(2);
            var energy = ((energyCount / input.length) * 25).toFixed(2);
            var mood = ((moodCount / (input.length * 2)) * 25).toFixed(2);
            var confidence = ((confidenceCount / (input.length * 2)) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / input.length) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / input.length) * 25).toFixed(2);
            var overall = ((overallCount / (input.length * 2)) * 25).toFixed(2);

            var percentArray = [sleep, energy, mood, confidence, efficiency, fulfillment, overall];

            return percentArray;
        } else {
            return errorArray;
        }

    }

    function getDailyMessages(input) {
        var messageArray = [];

        for (var i = 0; i < input.length; i++) {
            if (input[i] > 50) {
                var message = 'Score: *' + input[i] + '%*\nAverage: *Positive*';
                messageArray.push(message);
            } else {
                var message = 'Score: *' + input[i] + '%*\nAverage: *Negative*';
                messageArray.push(message);
            }
        }

        var lastVal = input.length - 1;

        if (input[lastVal] > 50) {
            var overallMessage = 'Score: *' + input[lastVal] + '%*\nThe overall emotional fitness was *positive* today';
            messageArray.push(overallMessage);
        } else {
            var overallMessage = 'Score: *' + input[lastVal] + '%*\nThe overall emotional fitness was *_negative_* today';
            messageArray.push(overallMessage);
        }

        return messageArray;
    }

}
