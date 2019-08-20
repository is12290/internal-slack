module.exports = function (controller) {
    controller.hears(['^set up logs', '^set Up Logs', '^custom logs', '^customize logs', '^set up log', '^custom log', '^customize log', '^set up check up', '^set Up Check Up', '^custom check up', '^customize Check Up', '^customize Check Ups', '^customize check ups', '^set up check up', '^custom Check Up', '^customize check up'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                console.log("error: ", err);
            }
            if (!user || typeof user == 'undefined') {
                bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                        bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                    }
                    const newUser = {};

                    bot.reply(message, "Hey! I am Internal, a bot used to monitor emotional fitness! Here's absolutely everything you need to know about me:\n\n\n*General Functionality: *\n_Check Ups:_\nCheck In – Send me a message saying `Check In` to initiate the check in log\nReflections – End of day reflections can be initiated by sending me a message saying `Reflect`\nAutomatic Check Ups – Look at the ‘_Customizations_’ section to learn how to set up your check ups to be automatically initiated so you don’t have to remember to message me everyday :grinning:\n\n_Results Reporting:_\n_A Quick Note – Only you have the capability of accessing your exact scores, managers (if plugged in) view aggregate scores so as to ensure nothing is personally identifiable_\nMonthly Reports – Send me a message saying `Monthly Report` to view your personal scores over the past month, as well as the amount of times you chose each topic response\nWeekly Reports - Send me a message saying `Weekly Report` to view your personal scores over the past week, as well as the amount of times you chose each topic response\nAutomatic Reports - Look at the ‘_Customizations_’ section to learn how to set up your reports to be automatically sent at the end of each week and month :+1:\n\n_Special Commands:_\nComparisons – Begin a score comparison by typing `Compare` which will initiate a conversation where I’ll ask you what two time frames you want to compare, then report the outcome\nHistorical Searching - Begin a historical search by typing `Search`, which will initiate a conversation where you will be asked to input the desired search time frame and I’ll report the outcome\n\n_Customizations:_\nCustom Check Ups – Send me a message saying `Customize Check Ups` where I will ask a few questions about your timezone and your desired times to be automatically sent Check In logs and the End of Day Question\nCustom Reporting – Send me a message saying `Customize Reports` where I will ask a few question about your timezone and your desired times to be automatically sent your reports\n\n*Manager-Specific Functionality: *\n_Verification:_\nManagers first need to be verified so I can add them to my memory for proper functionality. To verify yourself as a new manager, send me a message saying `New Manager`, where I’ll ask you to verify the email you used to purchase a subscription_Team Results Reporting:_\n_A Quick Note – I need to be added to private channels in order to see what employees are within the channel_\nDaily – Send me a message saying `Daily Team Report` to where you’ll be asked whether you want to see your entire Slack team’s aggregate daily scores or a specific Channel’s aggregate daily scores\nWeekly - Send me a message saying `Weekly Team Report` to where you’ll be asked whether you want to see your entire Slack team’s aggregate weekly scores or a specific Channel’s aggregate weekly scores\nMonthly - Send me a message saying `Monthly Team Report` to where you’ll be asked whether you want to see your entire Slack team’s aggregate monthly scores or a specific Channel’s aggregate monthly scores\n\n_Customizations:_\nCustom Team Reports – Send me a message saying `Customize Team Reports` where I will ask a few question about your timezone, desired times, and channel info in order to automatically send you your desired team reports\n\n_Special Commands:_\nChannel Specific Reporting – For a faster experience viewing a specific channel’s scores, send me a message saying `Specific Report` to initiate a conversation where I’ll ask for a few more details \nComparisons - Begin a score comparison by typing `Team Compare` which will initiate a conversation where I’ll ask you what two time frames you want to compare, as well as whether or not you desire the entire Slack team scores or a specific Channel, then report the outcome\nHistorical Searching - Begin a historical search by typing `Team Search`, which will initiate a conversation where you will be asked to input the desired search time frame, as well as whether or not you desire the entire Slack team scores or a specific Channel, and I’ll report the outcome\n\nIf you have any other questions or comments, feel free to reach out to my superiors at support@getinternal.co");

                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'new-user',
                                color: "#0294ff",
                                text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'yes-button',
                                        'value': 'Yes',
                                        'text': 'Yes',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'no-button',
                                        'value': 'No',
                                        'text': 'No',
                                        'type': 'button'
                                    }
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Yes',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'new-user',
                                                    color: "#0294ff",
                                                    text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
                                                    attachment_type: 'default',
                                                    actions: [
                                                        {
                                                            'name': 'yes-button',
                                                            'value': 'Yes',
                                                            'style': 'primary',
                                                            'text': 'Yes',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'no-button',
                                                            'value': 'No',
                                                            'text': 'No',
                                                            'type': 'button'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    )
                                    convo.next()
                                }
                            },
                            {
                                pattern: 'No',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'new-user',
                                                    color: "#0294ff",
                                                    text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
                                                    attachment_type: 'default',
                                                    actions: [
                                                        {
                                                            'name': 'yes-button',
                                                            'value': 'Yes',
                                                            'text': 'Yes',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'no-button',
                                                            'value': 'No',
                                                            'style': 'danger',
                                                            'text': 'No',
                                                            'type': 'button'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    bot.reply(message, "Better luck next time, I suppose! Sadly, you won't really be able to use my features until you're in my memory :zipper_mouth_face:");
                                    convo.stop();
                                }
                            }
                        ]
                    );


                    convo.addQuestion("What's your favorite book?", function (response, convo) {
                        bot.api.users.info({ user: response.user }, (error, response) => {
                            if (error) {
                                console.log("error: ", error);
                            }
                            let { name, real_name } = response.user;
                            newUser.name = real_name;
                        })
                        newUser.channel = message.channel;
                        newUser.team = message.team;
                        newUser.status = 'employee';
                        newUser.id = message.user;
                        convo.next();
                    }, 'default');

                    convo.addQuestion("What's your role here?", function (response, convo) {
                        newUser.role = response.text;
                        convo.next();
                    }, 'default');

                    convo.say("Thanks for that!\n\nNow, what was it you were looking to do?");

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            if (typeof newUser.name != 'undefined') {
                                controller.storage.users.save(newUser);
                            }
                        }

                    })
                })

            }

            else {
                if (!user || typeof user.customization == 'undefined' || typeof user.customization.logging == 'undefined') {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        var data = {};

                        convo.say("Hey! Let's get your automatic reporting all set up...");

                        convo.addQuestion({
                            attachments: [
                                    {
                                        title: 'Timezone',
                                        text: 'What timezone are you in?',
                                        callback_id: 'timezone',
                                        attachment_type: 'default',
                                        color: "#0294ff",
                                        actions: [
                                            {
                                                "name": "timezone",
                                                "text": "Timezone",
                                                "type": "select",
                                                "options": [
                                                    {
                                                        "text": "America/New York",
                                                        "value": "America/New_York"
                                                    },
                                                    {
                                                        "text": "America/Los Angeles",
                                                        "value": "America/Los_Angeles",
                                                    },
                                                    {
                                                        "text": "America/Denver",
                                                        "value": "America/Denver",
                                                    },
                                                    {
                                                        "text": "Australia/Sydney",
                                                        "value": "Australia/Sydney",
                                                    },
                                                    {
                                                        "text": "Australia/Perth",
                                                        "value": "Australia/Perth",
                                                    },
                                                    {
                                                        "text": "Asia/Hong Kong",
                                                        "value": "Asia/Hong_Kong",
                                                    },
                                                    {
                                                        "text": "Asia/Seoul",
                                                        "value": "Asia/Seoul",
                                                    },
                                                    {
                                                        "text": "Europe/London",
                                                        "value": "Europe/London",
                                                    },
                                                    {
                                                        "text": "Europe/Madrid",
                                                        "value": "Europe/Madrid",
                                                    },
                                                    {
                                                        "text": "Europe/Kiev",
                                                        "value": "Europe/Kiev",
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, function (reply, convo) {
                                data.timezone = reply.text;
                                convo.next();
                            });

                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'Check In Time',
                                        text: 'What time would be best for check ins?',
                                        callback_id: 'time',
                                        attachment_type: 'default',
                                        color: "#0294ff",
                                        actions: [
                                            {
                                                "name": "time",
                                                "text": "Time",
                                                "type": "select",
                                                "options": [
                                                    {
                                                        "text": "00:00",
                                                        "value": "00:00"
                                                    },
                                                    {
                                                        "text": "00:30",
                                                        "value": "00:30"
                                                    },
                                                    {
                                                        "text": "01:00",
                                                        "value": "01:00"
                                                    },
                                                    {
                                                        "text": "01:30",
                                                        "value": "01:30"
                                                    },
                                                    {
                                                        "text": "02:00",
                                                        "value": "02:00"
                                                    },
                                                    {
                                                        "text": "02:30",
                                                        "value": "02:30"
                                                    },
                                                    {
                                                        "text": "03:00",
                                                        "value": "03:00"
                                                    },
                                                    {
                                                        "text": "03:30",
                                                        "value": "03:30"
                                                    },
                                                    {
                                                        "text": "04:00",
                                                        "value": "04:00"
                                                    },
                                                    {
                                                        "text": "04:30",
                                                        "value": "04:30"
                                                    },
                                                    {
                                                        "text": "05:00",
                                                        "value": "05:00"
                                                    },
                                                    {
                                                        "text": "05:30",
                                                        "value": "05:30"
                                                    },
                                                    {
                                                        "text": "06:00",
                                                        "value": "06:00"
                                                    },
                                                    {
                                                        "text": "06:30",
                                                        "value": "06:30"
                                                    },
                                                    {
                                                        "text": "07:00",
                                                        "value": "07:00"
                                                    },
                                                    {
                                                        "text": "07:30",
                                                        "value": "07:30"
                                                    },
                                                    {
                                                        "text": "08:00",
                                                        "value": "08:00"
                                                    },
                                                    {
                                                        "text": "08:30",
                                                        "value": "08:30"
                                                    },
                                                    {
                                                        "text": "09:00",
                                                        "value": "09:00"
                                                    },
                                                    {
                                                        "text": "09:30",
                                                        "value": "09:30"
                                                    },
                                                    {
                                                        "text": "10:00",
                                                        "value": "10:00"
                                                    },
                                                    {
                                                        "text": "10:30",
                                                        "value": "10:30"
                                                    },
                                                    {
                                                        "text": "11:00",
                                                        "value": "11:00"
                                                    },
                                                    {
                                                        "text": "11:30",
                                                        "value": "11:30"
                                                    },
                                                    {
                                                        "text": "12:00",
                                                        "value": "12:00"
                                                    },
                                                    {
                                                        "text": "12:30",
                                                        "value": "12:30"
                                                    },
                                                    {
                                                        "text": "13:00",
                                                        "value": "13:00"
                                                    },
                                                    {
                                                        "text": "13:30",
                                                        "value": "13:30"
                                                    },
                                                    {
                                                        "text": "14:00",
                                                        "value": "14:00"
                                                    },
                                                    {
                                                        "text": "14:30",
                                                        "value": "14:30"
                                                    },
                                                    {
                                                        "text": "15:00",
                                                        "value": "15:00"
                                                    },
                                                    {
                                                        "text": "15:30",
                                                        "value": "15:30"
                                                    },
                                                    {
                                                        "text": "16:00",
                                                        "value": "16:00"
                                                    },
                                                    {
                                                        "text": "16:30",
                                                        "value": "16:30"
                                                    },
                                                    {
                                                        "text": "17:00",
                                                        "value": "17:00"
                                                    },
                                                    {
                                                        "text": "17:30",
                                                        "value": "17:30"
                                                    },
                                                    {
                                                        "text": "18:00",
                                                        "value": "18:00"
                                                    },
                                                    {
                                                        "text": "18:30",
                                                        "value": "18:30"
                                                    },
                                                    {
                                                        "text": "19:00",
                                                        "value": "19:00"
                                                    },
                                                    {
                                                        "text": "19:30",
                                                        "value": "19:30"
                                                    },
                                                    {
                                                        "text": "20:00",
                                                        "value": "20:00"
                                                    },
                                                    {
                                                        "text": "20:30",
                                                        "value": "20:30"
                                                    },
                                                    {
                                                        "text": "21:00",
                                                        "value": "21:00"
                                                    },
                                                    {
                                                        "text": "21:30",
                                                        "value": "21:30"
                                                    },
                                                    {
                                                        "text": "22:00",
                                                        "value": "22:00"
                                                    },
                                                    {
                                                        "text": "22:30",
                                                        "value": "22:30"
                                                    },
                                                    {
                                                        "text": "23:00",
                                                        "value": "23:00"
                                                    },
                                                    {
                                                        "text": "23:30",
                                                        "value": "23:30"
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, function (reply, convo) { 
                                var check_in_time = reply.text;
                                data.check_in_time = check_in_time;
                                convo.next();
                            });

                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'Reflection Time',
                                        text: "What time would be best for reflections?",
                                        callback_id: 'time',
                                        attachment_type: 'default',
                                        color: "#0294ff",
                                        actions: [
                                            {
                                                "name": "time",
                                                "text": 'Time',
                                                "type": "select",
                                                "options": [
                                                    {
                                                        "text": "00:00",
                                                        "value": "00:00"
                                                    },
                                                    {
                                                        "text": "00:30",
                                                        "value": "00:30"
                                                    },
                                                    {
                                                        "text": "01:00",
                                                        "value": "01:00"
                                                    },
                                                    {
                                                        "text": "01:30",
                                                        "value": "01:30"
                                                    },
                                                    {
                                                        "text": "02:00",
                                                        "value": "02:00"
                                                    },
                                                    {
                                                        "text": "02:30",
                                                        "value": "02:30"
                                                    },
                                                    {
                                                        "text": "03:00",
                                                        "value": "03:00"
                                                    },
                                                    {
                                                        "text": "03:30",
                                                        "value": "03:30"
                                                    },
                                                    {
                                                        "text": "04:00",
                                                        "value": "04:00"
                                                    },
                                                    {
                                                        "text": "04:30",
                                                        "value": "04:30"
                                                    },
                                                    {
                                                        "text": "05:00",
                                                        "value": "05:00"
                                                    },
                                                    {
                                                        "text": "05:30",
                                                        "value": "05:30"
                                                    },
                                                    {
                                                        "text": "06:00",
                                                        "value": "06:00"
                                                    },
                                                    {
                                                        "text": "06:30",
                                                        "value": "06:30"
                                                    },
                                                    {
                                                        "text": "07:00",
                                                        "value": "07:00"
                                                    },
                                                    {
                                                        "text": "07:30",
                                                        "value": "07:30"
                                                    },
                                                    {
                                                        "text": "08:00",
                                                        "value": "08:00"
                                                    },
                                                    {
                                                        "text": "08:30",
                                                        "value": "08:30"
                                                    },
                                                    {
                                                        "text": "09:00",
                                                        "value": "09:00"
                                                    },
                                                    {
                                                        "text": "09:30",
                                                        "value": "09:30"
                                                    },
                                                    {
                                                        "text": "10:00",
                                                        "value": "10:00"
                                                    },
                                                    {
                                                        "text": "10:30",
                                                        "value": "10:30"
                                                    },
                                                    {
                                                        "text": "11:00",
                                                        "value": "11:00"
                                                    },
                                                    {
                                                        "text": "11:30",
                                                        "value": "11:30"
                                                    },
                                                    {
                                                        "text": "12:00",
                                                        "value": "12:00"
                                                    },
                                                    {
                                                        "text": "12:30",
                                                        "value": "12:30"
                                                    },
                                                    {
                                                        "text": "13:00",
                                                        "value": "13:00"
                                                    },
                                                    {
                                                        "text": "13:30",
                                                        "value": "13:30"
                                                    },
                                                    {
                                                        "text": "14:00",
                                                        "value": "14:00"
                                                    },
                                                    {
                                                        "text": "14:30",
                                                        "value": "14:30"
                                                    },
                                                    {
                                                        "text": "15:00",
                                                        "value": "15:00"
                                                    },
                                                    {
                                                        "text": "15:30",
                                                        "value": "15:30"
                                                    },
                                                    {
                                                        "text": "16:00",
                                                        "value": "16:00"
                                                    },
                                                    {
                                                        "text": "16:30",
                                                        "value": "16:30"
                                                    },
                                                    {
                                                        "text": "17:00",
                                                        "value": "17:00"
                                                    },
                                                    {
                                                        "text": "17:30",
                                                        "value": "17:30"
                                                    },
                                                    {
                                                        "text": "18:00",
                                                        "value": "18:00"
                                                    },
                                                    {
                                                        "text": "18:30",
                                                        "value": "18:30"
                                                    },
                                                    {
                                                        "text": "19:00",
                                                        "value": "19:00"
                                                    },
                                                    {
                                                        "text": "19:30",
                                                        "value": "19:30"
                                                    },
                                                    {
                                                        "text": "20:00",
                                                        "value": "20:00"
                                                    },
                                                    {
                                                        "text": "20:30",
                                                        "value": "20:30"
                                                    },
                                                    {
                                                        "text": "21:00",
                                                        "value": "21:00"
                                                    },
                                                    {
                                                        "text": "21:30",
                                                        "value": "21:30"
                                                    },
                                                    {
                                                        "text": "22:00",
                                                        "value": "22:00"
                                                    },
                                                    {
                                                        "text": "22:30",
                                                        "value": "22:30"
                                                    },
                                                    {
                                                        "text": "23:00",
                                                        "value": "23:00"
                                                    },
                                                    {
                                                        "text": "23:30",
                                                        "value": "23:30"
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, function (reply, convo) { 
                                var reflection_time = reply.text;
                                data.reflection_time = reflection_time;
                                convo.next();
                            });

                            convo.activate();

                            convo.on('end', function (convo) {
                                if (convo.successful()) {

                                    bot.reply(message, "Roger that! I will send check in logs on weekdays at " + data.check_in_time + " and reflections on weekdays at " + data.reflection_time);

                                    if (!user.customization) {
                                        user.customization = {
                                            logging: {
                                                timezone: data.timezone,
                                                check_in_time: data.check_in_time,
                                                reflection_time: data.reflection_time,
                                                channel: message.channel
                                            }
                                        }
                                        controller.storage.users.save(user);
                                    } else {
                                        user.customization.logging = {
                                            timezone: data.timezone,
                                            check_in_time: data.check_in_time,
                                            reflection_time: data.reflection_time,
                                            channel: message.channel
                                        };
                                        controller.storage.users.save(user);
                                    }
                                } else {
                                    bot.reply(message, "Whoops! I wasn't able to save this. Would you mind trying again?");
                                }
                            });
                        });
                    }
                    else if (typeof user.customization != 'undefined' && typeof user.customization.logging != 'undefined') {
                        bot.startConversation(message, function (err, convo) {
                            if (err) {
                                console.log("error: ", err);
                                bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                            }
                            convo.addQuestion({
                                attachments: [{
                                    text: "Your logs are already set to be automatically sent at " + user.customization.logging.check_in_time + " and " + user.customization.logging.reflection_time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                    callback_id: 'automatic-logs-check',
                                    color: "#0294ff",
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'value': 'No',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            },
                                [
                                    {
                                        pattern: 'Yes',
                                        callback: function (reply, convo) {
                                            bot.replyInteractive(reply,
                                                {
                                                    attachments: [{
                                                        text: "Your logs are already set to be automatically sent at " + user.customization.logging.check_in_time + " and " + user.customization.logging.reflection_time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                                        callback_id: 'automatic-logs-check',
                                                        color: "#0294ff",
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'yes-button',
                                                                'value': 'Yes',
                                                                'style': 'primary',
                                                                'text': 'Yes',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'no-button',
                                                                'value': 'No',
                                                                'text': 'No',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }]
                                                }
                                            );
                                            convo.next();
                                        }
                                    },
                                    {
                                        pattern: 'No',
                                        callback: function (reply, convo) {
                                            bot.replyInteractive(reply,
                                                {
                                                    attachments: [{
                                                        text: "Your logs are already set to be automatically sent at " + user.customization.logging.check_in_time + " and " + user.customization.logging.reflection_time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                                        callback_id: 'automatic-logs-check',
                                                        color: "#0294ff",
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'yes-button',
                                                                'value': 'Yes',
                                                                'text': 'Yes',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'no-button',
                                                                'value': 'No',
                                                                'style': 'danger',
                                                                'text': 'No',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }]
                                                }
                                            );
                                            bot.reply(message, "Well, okay then... Enjoy the rest of your day! :sunglasses:");
                                            convo.stop();
                                        }
                                    }
                                ]);

                            var data = {};

                            convo.say("Okay, let's reset your preferences...");

                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'Timezone',
                                        text: 'What timezone are you in?',
                                        callback_id: 'timezone',
                                        attachment_type: 'default',
                                        color: "#0294ff",
                                        actions: [
                                            {
                                                "name": "timezone",
                                                "text": "Timezone",
                                                "type": "select",
                                                "options": [
                                                    {
                                                        "text": "America/New York",
                                                        "value": "America/New_York"
                                                    },
                                                    {
                                                        "text": "America/Los Angeles",
                                                        "value": "America/Los_Angeles",
                                                    },
                                                    {
                                                        "text": "America/Denver",
                                                        "value": "America/Denver",
                                                    },
                                                    {
                                                        "text": "Australia/Sydney",
                                                        "value": "Australia/Sydney",
                                                    },
                                                    {
                                                        "text": "Australia/Perth",
                                                        "value": "Australia/Perth",
                                                    },
                                                    {
                                                        "text": "Asia/Hong Kong",
                                                        "value": "Asia/Hong_Kong",
                                                    },
                                                    {
                                                        "text": "Asia/Seoul",
                                                        "value": "Asia/Seoul",
                                                    },
                                                    {
                                                        "text": "Europe/London",
                                                        "value": "Europe/London",
                                                    },
                                                    {
                                                        "text": "Europe/Madrid",
                                                        "value": "Europe/Madrid",
                                                    },
                                                    {
                                                        "text": "Europe/Kiev",
                                                        "value": "Europe/Kiev",
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, function (reply, convo) {
                                var timezone = reply.text
                                data.timezone = timezone;
                                convo.next();
                            });

                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'Check In Time',
                                        text: 'What time would be best for check ins?',
                                        callback_id: 'time',
                                        attachment_type: 'default',
                                        color: "#0294ff",
                                        actions: [
                                            {
                                                "name": "time",
                                                "text": "Time",
                                                "type": "select",
                                                "options": [
                                                    {
                                                        "text": "00:00",
                                                        "value": "00:00"
                                                    },
                                                    {
                                                        "text": "00:30",
                                                        "value": "00:30"
                                                    },
                                                    {
                                                        "text": "01:00",
                                                        "value": "01:00"
                                                    },
                                                    {
                                                        "text": "01:30",
                                                        "value": "01:30"
                                                    },
                                                    {
                                                        "text": "02:00",
                                                        "value": "02:00"
                                                    },
                                                    {
                                                        "text": "02:30",
                                                        "value": "02:30"
                                                    },
                                                    {
                                                        "text": "03:00",
                                                        "value": "03:00"
                                                    },
                                                    {
                                                        "text": "03:30",
                                                        "value": "03:30"
                                                    },
                                                    {
                                                        "text": "04:00",
                                                        "value": "04:00"
                                                    },
                                                    {
                                                        "text": "04:30",
                                                        "value": "04:30"
                                                    },
                                                    {
                                                        "text": "05:00",
                                                        "value": "05:00"
                                                    },
                                                    {
                                                        "text": "05:30",
                                                        "value": "05:30"
                                                    },
                                                    {
                                                        "text": "06:00",
                                                        "value": "06:00"
                                                    },
                                                    {
                                                        "text": "06:30",
                                                        "value": "06:30"
                                                    },
                                                    {
                                                        "text": "07:00",
                                                        "value": "07:00"
                                                    },
                                                    {
                                                        "text": "07:30",
                                                        "value": "07:30"
                                                    },
                                                    {
                                                        "text": "08:00",
                                                        "value": "08:00"
                                                    },
                                                    {
                                                        "text": "08:30",
                                                        "value": "08:30"
                                                    },
                                                    {
                                                        "text": "09:00",
                                                        "value": "09:00"
                                                    },
                                                    {
                                                        "text": "09:30",
                                                        "value": "09:30"
                                                    },
                                                    {
                                                        "text": "10:00",
                                                        "value": "10:00"
                                                    },
                                                    {
                                                        "text": "10:30",
                                                        "value": "10:30"
                                                    },
                                                    {
                                                        "text": "11:00",
                                                        "value": "11:00"
                                                    },
                                                    {
                                                        "text": "11:30",
                                                        "value": "11:30"
                                                    },
                                                    {
                                                        "text": "12:00",
                                                        "value": "12:00"
                                                    },
                                                    {
                                                        "text": "12:30",
                                                        "value": "12:30"
                                                    },
                                                    {
                                                        "text": "13:00",
                                                        "value": "13:00"
                                                    },
                                                    {
                                                        "text": "13:30",
                                                        "value": "13:30"
                                                    },
                                                    {
                                                        "text": "14:00",
                                                        "value": "14:00"
                                                    },
                                                    {
                                                        "text": "14:30",
                                                        "value": "14:30"
                                                    },
                                                    {
                                                        "text": "15:00",
                                                        "value": "15:00"
                                                    },
                                                    {
                                                        "text": "15:30",
                                                        "value": "15:30"
                                                    },
                                                    {
                                                        "text": "16:00",
                                                        "value": "16:00"
                                                    },
                                                    {
                                                        "text": "16:30",
                                                        "value": "16:30"
                                                    },
                                                    {
                                                        "text": "17:00",
                                                        "value": "17:00"
                                                    },
                                                    {
                                                        "text": "17:30",
                                                        "value": "17:30"
                                                    },
                                                    {
                                                        "text": "18:00",
                                                        "value": "18:00"
                                                    },
                                                    {
                                                        "text": "18:30",
                                                        "value": "18:30"
                                                    },
                                                    {
                                                        "text": "19:00",
                                                        "value": "19:00"
                                                    },
                                                    {
                                                        "text": "19:30",
                                                        "value": "19:30"
                                                    },
                                                    {
                                                        "text": "20:00",
                                                        "value": "20:00"
                                                    },
                                                    {
                                                        "text": "20:30",
                                                        "value": "20:30"
                                                    },
                                                    {
                                                        "text": "21:00",
                                                        "value": "21:00"
                                                    },
                                                    {
                                                        "text": "21:30",
                                                        "value": "21:30"
                                                    },
                                                    {
                                                        "text": "22:00",
                                                        "value": "22:00"
                                                    },
                                                    {
                                                        "text": "22:30",
                                                        "value": "22:30"
                                                    },
                                                    {
                                                        "text": "23:00",
                                                        "value": "23:00"
                                                    },
                                                    {
                                                        "text": "23:30",
                                                        "value": "23:30"
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, function (reply, convo) { 
                                var check_in_time = reply.text;
                                data.check_in_time = check_in_time;
                                convo.next();
                            });

                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'Reflection Time',
                                        text: 'What time would be best for reflections?',
                                        callback_id: 'time',
                                        attachment_type: 'default',
                                        color: "#0294ff",
                                        actions: [
                                            {
                                                "name": "time",
                                                "text": "Time",
                                                "type": "select",
                                                "options": [
                                                    {
                                                        "text": "00:00",
                                                        "value": "00:00"
                                                    },
                                                    {
                                                        "text": "00:30",
                                                        "value": "00:30"
                                                    },
                                                    {
                                                        "text": "01:00",
                                                        "value": "01:00"
                                                    },
                                                    {
                                                        "text": "01:30",
                                                        "value": "01:30"
                                                    },
                                                    {
                                                        "text": "02:00",
                                                        "value": "02:00"
                                                    },
                                                    {
                                                        "text": "02:30",
                                                        "value": "02:30"
                                                    },
                                                    {
                                                        "text": "03:00",
                                                        "value": "03:00"
                                                    },
                                                    {
                                                        "text": "03:30",
                                                        "value": "03:30"
                                                    },
                                                    {
                                                        "text": "04:00",
                                                        "value": "04:00"
                                                    },
                                                    {
                                                        "text": "04:30",
                                                        "value": "04:30"
                                                    },
                                                    {
                                                        "text": "05:00",
                                                        "value": "05:00"
                                                    },
                                                    {
                                                        "text": "05:30",
                                                        "value": "05:30"
                                                    },
                                                    {
                                                        "text": "06:00",
                                                        "value": "06:00"
                                                    },
                                                    {
                                                        "text": "06:30",
                                                        "value": "06:30"
                                                    },
                                                    {
                                                        "text": "07:00",
                                                        "value": "07:00"
                                                    },
                                                    {
                                                        "text": "07:30",
                                                        "value": "07:30"
                                                    },
                                                    {
                                                        "text": "08:00",
                                                        "value": "08:00"
                                                    },
                                                    {
                                                        "text": "08:30",
                                                        "value": "08:30"
                                                    },
                                                    {
                                                        "text": "09:00",
                                                        "value": "09:00"
                                                    },
                                                    {
                                                        "text": "09:30",
                                                        "value": "09:30"
                                                    },
                                                    {
                                                        "text": "10:00",
                                                        "value": "10:00"
                                                    },
                                                    {
                                                        "text": "10:30",
                                                        "value": "10:30"
                                                    },
                                                    {
                                                        "text": "11:00",
                                                        "value": "11:00"
                                                    },
                                                    {
                                                        "text": "11:30",
                                                        "value": "11:30"
                                                    },
                                                    {
                                                        "text": "12:00",
                                                        "value": "12:00"
                                                    },
                                                    {
                                                        "text": "12:30",
                                                        "value": "12:30"
                                                    },
                                                    {
                                                        "text": "13:00",
                                                        "value": "13:00"
                                                    },
                                                    {
                                                        "text": "13:30",
                                                        "value": "13:30"
                                                    },
                                                    {
                                                        "text": "14:00",
                                                        "value": "14:00"
                                                    },
                                                    {
                                                        "text": "14:30",
                                                        "value": "14:30"
                                                    },
                                                    {
                                                        "text": "15:00",
                                                        "value": "15:00"
                                                    },
                                                    {
                                                        "text": "15:30",
                                                        "value": "15:30"
                                                    },
                                                    {
                                                        "text": "16:00",
                                                        "value": "16:00"
                                                    },
                                                    {
                                                        "text": "16:30",
                                                        "value": "16:30"
                                                    },
                                                    {
                                                        "text": "17:00",
                                                        "value": "17:00"
                                                    },
                                                    {
                                                        "text": "17:30",
                                                        "value": "17:30"
                                                    },
                                                    {
                                                        "text": "18:00",
                                                        "value": "18:00"
                                                    },
                                                    {
                                                        "text": "18:30",
                                                        "value": "18:30"
                                                    },
                                                    {
                                                        "text": "19:00",
                                                        "value": "19:00"
                                                    },
                                                    {
                                                        "text": "19:30",
                                                        "value": "19:30"
                                                    },
                                                    {
                                                        "text": "20:00",
                                                        "value": "20:00"
                                                    },
                                                    {
                                                        "text": "20:30",
                                                        "value": "20:30"
                                                    },
                                                    {
                                                        "text": "21:00",
                                                        "value": "21:00"
                                                    },
                                                    {
                                                        "text": "21:30",
                                                        "value": "21:30"
                                                    },
                                                    {
                                                        "text": "22:00",
                                                        "value": "22:00"
                                                    },
                                                    {
                                                        "text": "22:30",
                                                        "value": "22:30"
                                                    },
                                                    {
                                                        "text": "23:00",
                                                        "value": "23:00"
                                                    },
                                                    {
                                                        "text": "23:30",
                                                        "value": "23:30"
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, function (reply, convo) { 
                                var reflection_time = reply.text;
                                data.reflection_time = reflection_time;
                                convo.next();
                            });

                            convo.activate();

                            convo.on('end', function (convo) {
                                if (convo.successful()) {

                                    bot.reply(message, "Roger that! I will send check in logs on weekdays at " + data.check_in_time + " and reflections on weekdays at " + data.reflection_time);

                                    user.customization.logging = {
                                        timezone: data.timezone,
                                        check_in_time: data.check_in_time,
                                        reflection_time: data.reflection_time
                                    };
                                    controller.storage.users.save(user);

                                } else {
                                    // Pass
                                }
                            });

                        });
                    } else {
                        bot.reply(message, "Let's give that another shot");
                    }
            }
        })
    })
}