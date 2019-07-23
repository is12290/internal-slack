var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
if (2 + 2 == 5) {  //(n === 6 || n === 0) {
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
                if (all_teams[i].customization && all_teams[i].customization.question) {
                    var custom = info.customization.question;
                }
                controller.storage.users.all(function (err, all_users) {
                    if (err) {
                        console.log("error: ", err);
                    }

                    for (var j = 0; j < all_users.length; j++) {
                        var user = all_users[j];
                        if (2 + 2 == 5) {//  (typeof user.customization.logging.check_in_time == 'undefined') {
                            // Pass
                        } else if (2 + 2 == 4) {//(user.customization.logging.check_in_time == moment.tz(now, user.customization.logging.timezone).format('HH:mm')) {
                            bot.startPrivateConversation({ user: user.id }, function (err, convo) {
                                if (err) {
                                    console.log("error", err);
                                }
                                // Keep Score
                                const score = [];

                                convo.addMessage({
                                    text: "Hey, here's your check in questionnaire! Just choose which option vibes best for each of the 4 topics..."
                                });

                                // Sleep
                                convo.addQuestion({
                                    attachments: [
                                        {
                                            title: "Sleep",
                                            callback_id: 'checkin-sleep',
                                            attachment_type: 'default',
                                            color: '#02D2FF',
                                            actions: [
                                                {
                                                    'name': 'perfect-button',
                                                    'value': 'Perfect',
                                                    'text': 'Perfect',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'sufficient-button',
                                                    'value': 'Sufficient',
                                                    'text': 'Sufficient',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'restless-button',
                                                    'value': 'Restless',
                                                    'text': 'Restless',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'terrible-button',
                                                    'value': 'Terrible',
                                                    'text': 'Terrible',
                                                    'type': 'button'
                                                },
                                            ]
                                        }
                                    ]
                                }, [
                                        {
                                            pattern: 'Perfect',
                                            callback: function (reply, convo) {
                                                score.push(4);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Sleep",
                                                                callback_id: 'checkin-sleep',
                                                                attachment_type: 'default',
                                                                color: '#02D2FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'perfect-button',
                                                                        'value': 'Perfect',
                                                                        'style': 'primary',
                                                                        'text': 'Perfect',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'sufficient-button',
                                                                        'value': 'Sufficient',
                                                                        'text': 'Sufficient',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'restless-button',
                                                                        'value': 'Restless',
                                                                        'text': 'Restless',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'terrible-button',
                                                                        'value': 'Terrible',
                                                                        'text': 'Terrible',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Sufficient',
                                            callback: function (reply, convo) {
                                                score.push(3);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Sleep",
                                                                callback_id: 'checkin-sleep',
                                                                attachment_type: 'default',
                                                                color: '#02D2FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'perfect-button',
                                                                        'value': 'Perfect',
                                                                        'text': 'Perfect',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'sufficient-button',
                                                                        'value': 'Sufficient',
                                                                        'style': 'primary',
                                                                        'text': 'Sufficient',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'restless-button',
                                                                        'value': 'Restless',
                                                                        'text': 'Restless',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'terrible-button',
                                                                        'value': 'Terrible',
                                                                        'text': 'Terrible',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Restless',
                                            callback: function (reply, convo) {
                                                score.push(2);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Sleep",
                                                                callback_id: 'checkin-sleep',
                                                                attachment_type: 'default',
                                                                color: '#02D2FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'perfect-button',
                                                                        'value': 'Perfect',
                                                                        'text': 'Perfect',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'sufficient-button',
                                                                        'value': 'Sufficient',
                                                                        'text': 'Sufficient',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'restless-button',
                                                                        'value': 'Restless',
                                                                        'style': 'primary',
                                                                        'text': 'Restless',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'terrible-button',
                                                                        'value': 'Terrible',
                                                                        'text': 'Terrible',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Terrible',
                                            callback: function (reply, convo) {
                                                score.push(1);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Sleep",
                                                                callback_id: 'checkin-sleep',
                                                                attachment_type: 'default',
                                                                color: '#02D2FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'perfect-button',
                                                                        'value': 'Perfect',
                                                                        'text': 'Perfect',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'sufficient-button',
                                                                        'value': 'Sufficient',
                                                                        'text': 'Sufficient',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'restless-button',
                                                                        'value': 'Restless',
                                                                        'text': 'Restless',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'terrible-button',
                                                                        'value': 'Terrible',
                                                                        'style': 'primary',
                                                                        'text': 'Terrible',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        }
                                    ]);

                                // Energy
                                convo.addQuestion({
                                    attachments: [
                                        {
                                            title: "Energy",
                                            callback_id: 'checkin-energy',
                                            attachment_type: 'default',
                                            color: '#2A02FF',
                                            actions: [
                                                {
                                                    'name': 'full-button',
                                                    'value': 'Full',
                                                    'text': 'Full',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'alright-button',
                                                    'value': 'Alright',
                                                    'text': 'Alright',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'hangingOn-button',
                                                    'value': 'Hanging-On',
                                                    'text': 'Hanging On',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'dead-button',
                                                    'value': 'Dead',
                                                    'text': 'Dead',
                                                    'type': 'button'
                                                },
                                            ]
                                        }
                                    ]
                                }, [
                                        {
                                            pattern: 'Full',
                                            callback: function (reply, convo) {
                                                score.push(4);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Energy",
                                                                callback_id: 'checkin-energy',
                                                                attachment_type: 'default',
                                                                color: '#2A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'full-button',
                                                                        'value': 'Full',
                                                                        'style': 'primary',
                                                                        'text': 'Full',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'alright-button',
                                                                        'value': 'Alright',
                                                                        'text': 'Alright',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'hangingOn-button',
                                                                        'value': 'Hanging-On',
                                                                        'text': 'Hanging On',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'dead-button',
                                                                        'value': 'Dead',
                                                                        'text': 'Dead',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Alright',
                                            callback: function (reply, convo) {
                                                score.push(3);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Energy",
                                                                callback_id: 'checkin-energy',
                                                                attachment_type: 'default',
                                                                color: '#2A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'full-button',
                                                                        'value': 'Full',
                                                                        'text': 'Full',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'alright-button',
                                                                        'value': 'Alright',
                                                                        'style': 'primary',
                                                                        'text': 'Alright',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'hangingOn-button',
                                                                        'value': 'Hanging-On',
                                                                        'text': 'Hanging On',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'dead-button',
                                                                        'value': 'Dead',
                                                                        'text': 'Dead',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Hanging-On',
                                            callback: function (reply, convo) {
                                                score.push(2);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Energy",
                                                                callback_id: 'checkin-energy',
                                                                attachment_type: 'default',
                                                                color: '#2A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'full-button',
                                                                        'value': 'Full',
                                                                        'text': 'Full',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'alright-button',
                                                                        'value': 'Alright',
                                                                        'text': 'Alright',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'hangingOn-button',
                                                                        'value': 'Hanging-On',
                                                                        'style': 'primary',
                                                                        'text': 'Hanging On',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'dead-button',
                                                                        'value': 'Dead',
                                                                        'text': 'Dead',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Dead',
                                            callback: function (reply, convo) {
                                                score.push(1);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Energy",
                                                                callback_id: 'checkin-energy',
                                                                attachment_type: 'default',
                                                                color: '#2A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'full-button',
                                                                        'value': 'Full',
                                                                        'text': 'Full',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'alright-button',
                                                                        'value': 'Alright',
                                                                        'text': 'Alright',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'hangingOn-button',
                                                                        'value': 'Hanging-On',
                                                                        'text': 'Hanging On',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'dead-button',
                                                                        'value': 'Dead',
                                                                        'style': 'primary',
                                                                        'text': 'Dead',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        }
                                    ]);

                                // Mood
                                convo.addQuestion({
                                    attachments: [
                                        {
                                            title: "Mood",
                                            callback_id: 'checkin-mood',
                                            attachment_type: 'default',
                                            color: '#8A02FF',
                                            actions: [
                                                {
                                                    'name': 'ecstatic-button',
                                                    'value': 'Ecstatic',
                                                    'text': 'Ecstatic',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'positive-button',
                                                    'value': 'Positive',
                                                    'text': 'Positive',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'indifferent-button',
                                                    'value': 'Indifferent',
                                                    'text': 'Indifferent',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'miserable-button',
                                                    'value': 'Miserable',
                                                    'text': 'Miserable',
                                                    'type': 'button'
                                                },
                                            ]
                                        }
                                    ]
                                }, [
                                        {
                                            pattern: 'Ecstatic',
                                            callback: function (reply, convo) {
                                                score.push(4);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Mood",
                                                                callback_id: 'checkin-mood',
                                                                attachment_type: 'default',
                                                                color: '#8A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'ecstatic-button',
                                                                        'value': 'Ecstatic',
                                                                        'style': 'primary',
                                                                        'text': 'Ecstatic',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'positive-button',
                                                                        'value': 'Positive',
                                                                        'text': 'Positive',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'indifferent-button',
                                                                        'value': 'Indifferent',
                                                                        'text': 'Indifferent',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'miserable-button',
                                                                        'value': 'Miserable',
                                                                        'text': 'Miserable',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Positive',
                                            callback: function (reply, convo) {
                                                score.push(3);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Mood",
                                                                callback_id: 'checkin-mood',
                                                                attachment_type: 'default',
                                                                color: '#8A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'ecstatic-button',
                                                                        'value': 'Ecstatic',
                                                                        'text': 'Ecstatic',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'positive-button',
                                                                        'value': 'Positive',
                                                                        'style': 'primary',
                                                                        'text': 'Positive',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'indifferent-button',
                                                                        'value': 'Indifferent',
                                                                        'text': 'Indifferent',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'miserable-button',
                                                                        'value': 'Miserable',
                                                                        'text': 'Miserable',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Indifferent',
                                            callback: function (reply, convo) {
                                                score.push(2);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Mood",
                                                                callback_id: 'checkin-mood',
                                                                attachment_type: 'default',
                                                                color: '#8A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'ecstatic-button',
                                                                        'value': 'Ecstatic',
                                                                        'text': 'Ecstatic',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'positive-button',
                                                                        'value': 'Positive',
                                                                        'text': 'Positive',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'indifferent-button',
                                                                        'value': 'Indifferent',
                                                                        'style': 'primary',
                                                                        'text': 'Indifferent',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'miserable-button',
                                                                        'value': 'Miserable',
                                                                        'text': 'Miserable',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Miserable',
                                            callback: function (reply, convo) {
                                                score.push(1);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Mood",
                                                                callback_id: 'checkin-mood',
                                                                attachment_type: 'default',
                                                                color: '#8A02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'ecstatic-button',
                                                                        'value': 'Ecstatic',
                                                                        'text': 'Ecstatic',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'positive-button',
                                                                        'value': 'Positive',
                                                                        'text': 'Positive',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'indifferent-button',
                                                                        'value': 'Indifferent',
                                                                        'text': 'Indifferent',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'miserable-button',
                                                                        'value': 'Miserable',
                                                                        'style': 'primary',
                                                                        'text': 'Miserable',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        }
                                    ]);

                                // Confidence
                                convo.addQuestion({
                                    attachments: [
                                        {
                                            title: "Confidence",
                                            callback_id: 'checkin-confidence',
                                            attachment_type: 'default',
                                            color: '#CF02FF',
                                            actions: [
                                                {
                                                    'name': 'crushing-button',
                                                    'value': 'Crushing-It',
                                                    'text': 'Crushing It',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'okay-button',
                                                    'value': 'Okay',
                                                    'text': 'Okay',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'managing-button',
                                                    'value': 'Managing',
                                                    'text': 'Managing',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'overwhelmed-button',
                                                    'value': 'Overwhelmed',
                                                    'text': 'Overwhelmed',
                                                    'type': 'button'
                                                },
                                            ]
                                        }
                                    ]
                                }, [
                                        {
                                            pattern: 'Crushing-It',
                                            callback: function (reply, convo) {
                                                score.push(4);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Confidence",
                                                                callback_id: 'checkin-confidence',
                                                                attachment_type: 'default',
                                                                color: '#CF02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'crushing-button',
                                                                        'value': 'Crushing-It',
                                                                        'style': 'primary',
                                                                        'text': 'Crushing It',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'okay-button',
                                                                        'value': 'Okay',
                                                                        'text': 'Okay',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'managing-button',
                                                                        'value': 'Managing',
                                                                        'text': 'Managing',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'overwhelmed-button',
                                                                        'value': 'Overwhelmed',
                                                                        'text': 'Overwhelmed',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Okay',
                                            callback: function (reply, convo) {
                                                score.push(3);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Confidence",
                                                                callback_id: 'checkin-confidence',
                                                                attachment_type: 'default',
                                                                color: '#CF02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'crushing-button',
                                                                        'value': 'Crushing-It',
                                                                        'text': 'Crushing It',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'okay-button',
                                                                        'value': 'Okay',
                                                                        'style': 'primary',
                                                                        'text': 'Okay',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'managing-button',
                                                                        'value': 'Managing',
                                                                        'text': 'Managing',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'overwhelmed-button',
                                                                        'value': 'Overwhelmed',
                                                                        'text': 'Overwhelmed',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Managing',
                                            callback: function (reply, convo) {
                                                score.push(2);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Confidence",
                                                                callback_id: 'checkin-confidence',
                                                                attachment_type: 'default',
                                                                color: '#CF02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'crushing-button',
                                                                        'value': 'Crushing-It',
                                                                        'text': 'Crushing It',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'okay-button',
                                                                        'value': 'Okay',
                                                                        'text': 'Okay',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'managing-button',
                                                                        'value': 'Managing',
                                                                        'style': 'primary',
                                                                        'text': 'Managing',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'overwhelmed-button',
                                                                        'value': 'Overwhelmed',
                                                                        'text': 'Overwhelmed',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        },
                                        {
                                            pattern: 'Overwhelmed',
                                            callback: function (reply, convo) {
                                                score.push(1);
                                                bot.replyInteractive(reply,
                                                    {
                                                        attachments: [
                                                            {
                                                                title: "Confidence",
                                                                callback_id: 'checkin-confidence',
                                                                attachment_type: 'default',
                                                                color: '#CF02FF',
                                                                actions: [
                                                                    {
                                                                        'name': 'crushing-button',
                                                                        'value': 'Crushing-It',
                                                                        'text': 'Crushing It',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'okay-button',
                                                                        'value': 'Okay',
                                                                        'text': 'Okay',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'managing-button',
                                                                        'value': 'Managing',
                                                                        'text': 'Managing',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'overwhelmed-button',
                                                                        'value': 'Overwhelmed',
                                                                        'style': 'primary',
                                                                        'text': 'Overwhelmed',
                                                                        'type': 'button'
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                );
                                                convo.next();
                                            }
                                        }
                                    ]);

                                    if (typeof custom != 'undefined') {
                                        // Confidence
                                        convo.addQuestion({
                                            attachments: [
                                                {
                                                    title: custom.topic,
                                                    callback_id: 'checkin-' + custom.topic,
                                                    attachment_type: 'default',
                                                    color: '#FDFF02',
                                                    actions: [
                                                        {
                                                            'name': custom.choices[0] + '-button',
                                                            'value': custom.choices[0],
                                                            'text': custom.choices[0],
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': custom.choices[1] + '-button',
                                                            'value': custom.choices[1],
                                                            'text': custom.choices[1],
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': custom.choices[2] + '-button',
                                                            'value': custom.choices[2],
                                                            'text': custom.choices[2],
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': custom.choices[3] + '-button',
                                                            'value': custom.choices[3],
                                                            'text': custom.choices[3],
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }, [
                                                {
                                                    pattern: custom.choices[0],
                                                    callback: function (reply, convo) {
                                                        score.push(4);
                                                        bot.replyInteractive(reply,
                                                            {
                                                                attachments: [
                                                                    {
                                                                        title: custom.topic,
                                                                        callback_id: 'checkin-' + custom.topic,
                                                                        attachment_type: 'default',
                                                                        color: '#FDFF02',
                                                                        actions: [
                                                                            {
                                                                                'name': custom.choices[0] + '-button',
                                                                                'value': custom.choices[0],
                                                                                'style': 'primary',
                                                                                'text': custom.choices[0],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[1] + '-button',
                                                                                'value': custom.choices[1],
                                                                                'text': custom.choices[1],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[2] + '-button',
                                                                                'value': custom.choices[2],
                                                                                'text': custom.choices[2],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[3] + '-button',
                                                                                'value': custom.choices[3],
                                                                                'text': custom.choices[3],
                                                                                'type': 'button'
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        );
                                                        convo.next();
                                                    }
                                                },
                                                {
                                                    pattern: custom.choices[1],
                                                    callback: function (reply, convo) {
                                                        score.push(3);
                                                        bot.replyInteractive(reply,
                                                            {
                                                                attachments: [
                                                                    {
                                                                        title: custom.topic,
                                                                        callback_id: 'checkin-' + custom.topic,
                                                                        attachment_type: 'default',
                                                                        color: '#FDFF02',
                                                                        actions: [
                                                                            {
                                                                                'name': custom.choices[0] + '-button',
                                                                                'value': custom.choices[0],
                                                                                'text': custom.choices[0],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[1] + '-button',
                                                                                'value': custom.choices[1],
                                                                                'style': 'primary',
                                                                                'text': custom.choices[1],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[2] + '-button',
                                                                                'value': custom.choices[2],
                                                                                'text': custom.choices[2],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[3] + '-button',
                                                                                'value': custom.choices[3],
                                                                                'text': custom.choices[3],
                                                                                'type': 'button'
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        );
                                                        convo.next();
                                                    }
                                                },
                                                {
                                                    pattern: custom.choices[2],
                                                    callback: function (reply, convo) {
                                                        score.push(2);
                                                        bot.replyInteractive(reply,
                                                            {
                                                                attachments: [
                                                                    {
                                                                        title: custom.topic,
                                                                        callback_id: 'checkin-' + custom.topic,
                                                                        attachment_type: 'default',
                                                                        color: '#FDFF02',
                                                                        actions: [
                                                                            {
                                                                                'name': custom.choices[0] + '-button',
                                                                                'value': custom.choices[0],
                                                                                'text': custom.choices[0],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[1] + '-button',
                                                                                'value': custom.choices[1],
                                                                                'text': custom.choices[1],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[2] + '-button',
                                                                                'value': custom.choices[2],
                                                                                'style': 'primary',
                                                                                'text': custom.choices[2],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[3] + '-button',
                                                                                'value': custom.choices[3],
                                                                                'text': custom.choices[3],
                                                                                'type': 'button'
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        );
                                                        convo.next();
                                                    }
                                                },
                                                {
                                                    pattern: custom.choices[3],
                                                    callback: function (reply, convo) {
                                                        score.push(1);
                                                        bot.replyInteractive(reply,
                                                            {
                                                                attachments: [
                                                                    {
                                                                        title: custom.topic,
                                                                        callback_id: 'checkin-' + custom.topic,
                                                                        attachment_type: 'default',
                                                                        color: '#FDFF02',
                                                                        actions: [
                                                                            {
                                                                                'name': custom.choices[0] + '-button',
                                                                                'value': custom.choices[0],
                                                                                'text': custom.choices[0],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[1] + '-button',
                                                                                'value': custom.choices[1],
                                                                                'text': custom.choices[1],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[2] + '-button',
                                                                                'value': custom.choices[2],
                                                                                'text': custom.choices[2],
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': custom.choices[3] + '-button',
                                                                                'value': custom.choices[3],
                                                                                'style': 'primary',
                                                                                'text': custom.choices[3],
                                                                                'type': 'button'
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        );
                                                        convo.next();
                                                    }
                                                }
                                            ]);
                                    } else {
                                        // Pass
                                    }




                                convo.activate();


                                // capture the results of the conversation and see what happened...
                                convo.on('end', function (convo) {

                                    if (convo.successful()) {
                                        // Compute score
                                        var sum = score.reduce(function (a, b) { return a + b; }, 0);
                                        score.push(sum);

                                        controller.storage.users.get(instance[0], function (err, user) {
                                            var today = new Date();
                                            var dd = String(today.getDate()).padStart(2, '0');
                                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                            var yyyy = today.getFullYear();

                                            today = mm + '/' + dd + '/' + yyyy;

                                            if (!user) {
                                                user = {};
                                                user.id = instance[0],
                                                    user.team = message.team, // ??
                                                    user.channels = [instance[1]]
                                                user.logs = {
                                                    [today]: {
                                                        check_in: score,
                                                    }
                                                };
                                                controller.storage.users.save(user);
                                            } else if (!user.logs[today]) {
                                                user.logs[today] = {
                                                    check_in: score,
                                                };
                                                controller.storage.users.save(user);
                                            } else {
                                                user.logs[today].check_in = score;
                                                controller.storage.users.save(user);
                                            }
                                        });

                                        bot.say({
                                            text: 'Thanks for checking in!',
                                            channel: instance[1]
                                        });
                                    }
                                    else {
                                        bot.say({
                                            text: 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?',
                                            channel: instance[1]
                                        });
                                    }
                                });
                            })
                        } else {
                            // Pass
                        }
                    }
                })
            })
        }
    })
}
