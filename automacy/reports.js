var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
const endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
const today = moment().format('DD/MM/YYY');
if (2+2==5) { //  (today != endOfMonth && n === 6 || n === 0) {
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

    var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true});
    bot_options.storage = mongoStorage;

    var controller = Botkit.slackbot(bot_options);
    controller.startTicking()

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }

        for (var i = 0; i < all_teams.length; i++) {
            var team = all_teams[i];
            if (!team.customization.reporting.time) {
                // Pass
            } else {
                if (team.customization.reporting.time == moment.tz(now, team.customization.reporting.timezone).format('HH:mm')) {
                    controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
                        controller.storage.users.find({ team: all_teams[i].id }, function (err, info) {
                            if (today == endOfMonth) {
                                // Monthly Report
                                var results = getMonthlyOutput(output);
                                if (results == 404) {
                                    bot.say({
                                        text: 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                        channel: team.channel
                                    });
                                } else {
                                    if (results.length == 9) {
                                        controller.storage.teams.get(message.team, function (err, info) {
                                            var topic = info.customization.question.topic;
                                            bot.say({
                                                text: 'Hey there! Here is your organization\'s monthly report...\n',
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
                                                        title: topic,
                                                        color: '#02FF92',
                                                        attachment_type: 'default',
                                                        text: results[7] + '\n'
                                                    },
                                                    {
                                                        title: 'Overall',
                                                        color: '#02FF57',
                                                        attachment_type: 'default',
                                                        text: results[8]
                                                    }
                                                ],
                                                channel: team.channel
                                            });
                                        });
                                    } else {
                                        bot.say({
                                            text: 'Hey there! Here is your organization\'s monthly report...\n',
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
                                            channel: team.channel
                                        });
                                    }
                                }
                            } else if (d == '5') {
                                // Weekly report
                                if (!info) {
                                    bot.say({
                                        'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                        'channel': team.channel
                                    });
                                } else {
                                    var results = getWeeklyOutput(info);
                                    if (results == 404) {
                                        bot.say({
                                            'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                            'channel': team.channel
                                        });
                                    } else {
                                        if (results.length == 9) {
                                            controller.storage.teams.get(message.team, function (err, info) {
                                                var topic = info.customization.question.topic;
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
                                                            title: topic,
                                                            color: '#02FF92',
                                                            attachment_type: 'default',
                                                            text: results[7] + '\n'
                                                        },
                                                        {
                                                            title: 'Overall',
                                                            color: '#02FF57',
                                                            attachment_type: 'default',
                                                            text: results[8]
                                                        }
                                                    ],
                                                    channel: team.channel
                                                });
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
                                                channel: team.channel
                                            });
                                        }
                                    }
                                }
                            } else if (d > 0 && d < 5) {
                                // Daily report
                                if (!info) {
                                    bot.say({
                                        'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                        'channel': team.channel
                                    });
                                } else {
                                    var percent = getDailyPercentages(info);
                                    if (percent == 404) {
                                        bot.say({
                                            'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                            'channel': team.channel
                                        });
                                    } else {
                                        var resultMessage = getDailyMessages(percent);
    
                                        if (resultMessage.length == 9) {
                                            controller.storage.teams.get(message.team, function (err, info) {
                                                var topic = info.customization.question.topic;
                    
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
                                                            title: topic,
                                                            color: '#02FF92',
                                                            attachment_type: 'default',
                                                            text: resultMessage[6] + '\n',
                                                        },
                                                        {
                                                            title: 'Overall',
                                                            color: '#02FF57',
                                                            attachment_type: 'default',
                                                            text: resultMessage[7]
                                                        }
                                                    ],
                                                    channel: team.channel
                                                });
                                            });
                                        } else {
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
                                                channel: team.channel
                                            });
                                        }
                                    }
                                }
                            }
                        })
                    })
                } else {
                    // Pass
                }
            }
        }
    });
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

    var sleepCount = 0;
    var energyCount = 0;
    var moodCount = 0;
    var confidenceCount = 0;
    var efficiencyCount = 0;
    var fulfillmentCount = 0;
    var customCount = 0;
    var overallCount = 0;
    var tally = 0;
    var customTally = 0;

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];


        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[days[j]].check_in;
                    var checkOut = instance.logs[days[j]].check_out;

                    sleepCount = sleepCount + checkIn[0];
                    energyCount = energyCount + checkIn[1];
                    moodCount = moodCount + checkIn[2];
                    confidenceCount = confidenceCount + checkIn[3];
                    if (checkIn.length == 6) {
                        customCount = customCount + checkIn[4]
                        overallCount = overallCount + (checkIn[5] / 5);
                        tally = tally + 1;
                        customTally = customTally + 1;
                    } else {
                        overallCount = overallCount + (checkIn[4] / 4);
                        tally = tally + 1;
                    }


                    efficiencyCount = efficiencyCount + checkOut[0];
                    confidenceCount = confidenceCount + checkOut[1];
                    moodCount = moodCount + checkOut[2];
                    fulfillmentCount = fulfillmentCount + checkOut[3];
                    if (checkOut.length == 6) {
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
                var custom = ((customCount / (customTally * 2)) * 25).toFixed(2);
                var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
            } else {
                var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];
            }



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

        } else {
            return 404;
        }
    }
}

function getDailyPercentages(input) {
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
                if (checkIn.length == 6) {
                    customCount = customCount + checkIn[4]
                    overallCount = overallCount + (checkIn[5] / 5);
                    tally = tally + 1;
                    customTally = customTally + 1;
                } else {
                    overallCount = overallCount + (checkIn[4] / 4);
                    tally = tally + 1;
                }


                efficiencyCount = efficiencyCount + checkOut[0];
                confidenceCount = confidenceCount + checkOut[1];
                moodCount = moodCount + checkOut[2];
                fulfillmentCount = fulfillmentCount + checkOut[3];
                if (checkOut.length == 6) {
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
            var custom = ((customCount / (customTally * 2)) * 25).toFixed(2);
            var percentArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom, overall];
            return percentArray;
        } else {
            var percentArray = [sleep, energy, mood, confidence, efficiency, fulfillment, overall];
            return percentArray;
        }
    } else {
        return 404;
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

    var sleepCount = 0;
    var energyCount = 0;
    var moodCount = 0;
    var confidenceCount = 0;
    var efficiencyCount = 0;
    var fulfillmentCount = 0;
    var customCount = 0;
    var overallCount = 0;
    var tally = 0;
    var customTally = 0;

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];


        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[days[j]].check_in;
                    var checkOut = instance.logs[days[j]].check_out;

                    sleepCount = sleepCount + checkIn[0];
                    energyCount = energyCount + checkIn[1];
                    moodCount = moodCount + checkIn[2];
                    confidenceCount = confidenceCount + checkIn[3];
                    if (checkIn.length == 6) {
                        customCount = customCount + checkIn[4]
                        overallCount = overallCount + (checkIn[5] / 5);
                        tally = tally + 1;
                        customTally = customTally + 1;
                    } else {
                        overallCount = overallCount + (checkIn[4] / 4);
                        tally = tally + 1;
                    }


                    efficiencyCount = efficiencyCount + checkOut[0];
                    confidenceCount = confidenceCount + checkOut[1];
                    moodCount = moodCount + checkOut[2];
                    fulfillmentCount = fulfillmentCount + checkOut[3];
                    if (checkOut.length == 6) {
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
                var custom = ((customCount / (customTally * 2)) * 25).toFixed(2);
                var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
            } else {
                var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];
            }

            

            var monthlyReport = [];
            monthlyReport.push(sleep);
            for (var z = 0; z < loopArray.length; z++) {
                if (loopArray[z] > 50) {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                    monthlyReport.push(message);
                } else {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                    monthlyReport.push(message);
                }
            }

            if (overall > 50) {
                var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *positive*!';
                monthlyReport.push(overallMonth);
            }
            else {
                var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *negative*';
                monthlyReport.push(overallMonth);
            }

            return monthlyReport;

        } else {
            return 404;
        }
    }
}
