module.exports = function (controller) {
    controller.hears(['^set up logs', '^custom ^logs', '^customize ^logs', '^set ^up ^log', '^custom ^log', '^customize ^log'], 'direct_message,direct_mention', function(bot, message) {
        controller.storage.users.get(message.user, function(err, info) {
            if (info.customization.logging) {
                bot.startConversation(message, function (err, convo) {
                    convo.addQuestion({
                        attachments: [{
                                text: "Your logs are already set to be automatically sent at " + info.customization.logging.check_in_time + " and " + info.customization.logging.check_out_time + ", " + info.customization.logging.timezone +" time!\nWould you like to change this?",
                                callback_id: 'automatic-logs-check',
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
                            callback : function (reply, convo) {
                                bot.replyInteractive(reply,
                                    {
                                        attachments: [{
                                            text: "Your logs are already set to be automatically sent at " + info.customization.logging.check_in_time + " and " + info.customization.logging.check_out_time + ", " + info.customization.logging.timezone +" time!\nWould you like to change this?",
                                            callback_id: 'automatic-logs-check',
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
                            callback : function (reply, convo) {
                                bot.replyInteractive(reply,
                                    {
                                        attachments: [{
                                            text: "Your logs are already set to be automatically sent at " + info.customization.logging.check_in_time + " and " + info.customization.logging.check_out_time + ", " + info.customization.logging.timezone +" time!\nWould you like to change this?",
                                            callback_id: 'automatic-logs-check',
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
                                                    'style': 'primary',
                                                    'text': 'No',
                                                    'type': 'button'
                                                }
                                            ]
                                        }]
                                    }
                                );
                                convo.say("Well, okay then... Enjoy the rest of your day! :sunglasses:");

                                
                            }
                        }
                    ]);

                    var data = {};

                    convo.say("Okay, let's reset your preferences...")

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Timezone',
                                text: 'What timezone are you in?',
                                callback_id: 'timezone',
                                attachment_type: 'default',
                                color: '#FDFF02',
                                actions: [
                                    {
                                        "name": "timezone",
                                        "text": "Timezone",
                                        "type": "select",
                                        "options": [
                                            {
                                                "text": "America/New York",
                                                "value": "America_New_York"
                                            },
                                            {
                                                "text": "America/Los Angeles",
                                                "value": "America_Los_Angeles"
                                            },
                                            {
                                                "text": "America/Denver",
                                                "value": "America_Denver"
                                            },
                                            {
                                                "text": "Australia/Sydney",
                                                "value": "Australia_Sydney"
                                            },
                                            {
                                                "text": "Australia/Perth",
                                                "value": "Australia_Perth"
                                            },
                                            {
                                                "text": "Asia/Hong Kong",
                                                "value": "Asia_Hong_Kong"
                                            },
                                            {
                                                "text": "Asia/Seoul",
                                                "value": "Asia_Seoul"
                                            },
                                            {
                                                "text": "Europe/London",
                                                "value": "Europe_London"
                                            },
                                            {
                                                "text": "Europe/Madrid",
                                                "value": "Europe_Madrid"
                                            },
                                            {
                                                "text": "Europe/Kiev",
                                                "value": "Europe_Kiev"
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },[
                        {
                            pattern: "America_New_York",
                            callback: function(convo) {
                                data.check_in_timezone = "America/New_York",
                                convo.next();
                            }
                        },
                        {
                            pattern: "America_Los_Angeles",
                            callback: function(convo) {
                                data.check_in_timezone = "America/Los_Angeles",
                                convo.next();
                            }
                        },
                        {
                            pattern: "America_Denver",
                            callback: function(convo) {
                                data.check_in_timezone = "America/Denver",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Australia_Sydney",
                            callback: function(convo) {
                                data.check_in_timezone = "Australia/Sydney",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Australia_Perth",
                            callback: function(convo) {
                                data.check_in_timezone = "Australia/Perth",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Asia",
                            callback: function(convo) {
                                data.check_in_timezone = "Asia/Hong_Kong",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Asia_Seoul",
                            callback: function(convo) {
                                data.check_in_timezone = "Asia/Seoul",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Europe_London",
                            callback: function(convo) {
                                data.check_in_timezone = "Europe/London",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Europe_Madrid",
                            callback: function(convo) {
                                data.check_in_timezone = "Europe/Madrid",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Europe_Kiev",
                            callback: function(convo) {
                                data.check_in_timezone = "Europe/Kiev",
                                convo.next();
                            }
                        }
                    ]);

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Check In Time',
                                text: 'What time would be best for check ins?',
                                callback_id: 'time',
                                attachment_type: 'default',
                                color: '#FF02DA',
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
                    },[
                        {
                            pattern: "00:00",
                            callback: function(convo) {
                                data.check_in_time = "00:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "00:30",
                            callback: function(convo) {
                                data.check_in_time = "00:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:00",
                            callback: function(convo) {
                                data.check_in_time = "01:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:30",
                            callback: function(convo) {
                                data.check_in_time = "01:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:00",
                            callback: function(convo) {
                                data.check_in_time = "02:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:30",
                            callback: function(convo) {
                                data.check_in_time = "02:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:00",
                            callback: function(convo) {
                                data.check_in_time = "03:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:30",
                            callback: function(convo) {
                                data.check_in_time = "03:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:00",
                            callback: function(convo) {
                                data.check_in_time = "04:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:30",
                            callback: function(convo) {
                                data.check_in_time = "04:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:00",
                            callback: function(convo) {
                                data.check_in_time = "05:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:30",
                            callback: function(convo) {
                                data.check_in_time = "05:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:00",
                            callback: function(convo) {
                                data.check_in_time = "06:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:30",
                            callback: function(convo) {
                                data.check_in_time = "06:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:00",
                            callback: function(convo) {
                                data.check_in_time = "07:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:30",
                            callback: function(convo) {
                                data.check_in_time = "07:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:00",
                            callback: function(convo) {
                                data.check_in_time = "08:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:30",
                            callback: function(convo) {
                                data.check_in_time = "08:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:00",
                            callback: function(convo) {
                                data.check_in_time = "09:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:30",
                            callback: function(convo) {
                                data.check_in_time = "09:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:00",
                            callback: function(convo) {
                                data.check_in_time = "10:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:30",
                            callback: function(convo) {
                                data.check_in_time = "10:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:00",
                            callback: function(convo) {
                                data.check_in_time = "11:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:30",
                            callback: function(convo) {
                                data.check_in_time = "11:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:00",
                            callback: function(convo) {
                                data.check_in_time = "12:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:30",
                            callback: function(convo) {
                                data.check_in_time = "12:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:00",
                            callback: function(convo) {
                                data.check_in_time = "13:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:30",
                            callback: function(convo) {
                                data.check_in_time = "13:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:00",
                            callback: function(convo) {
                                data.check_in_time = "14:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:30",
                            callback: function(convo) {
                                data.check_in_time = "14:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:00",
                            callback: function(convo) {
                                data.check_in_time = "15:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:30",
                            callback: function(convo) {
                                data.check_in_time = "15:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:00",
                            callback: function(convo) {
                                data.check_in_time = "16:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:30",
                            callback: function(convo) {
                                data.check_in_time = "16:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:00",
                            callback: function(convo) {
                                data.check_in_time = "17:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:30",
                            callback: function(convo) {
                                data.check_in_time = "17:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:00",
                            callback: function(convo) {
                                data.check_in_time = "18:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:30",
                            callback: function(convo) {
                                data.check_in_time = "18:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:00",
                            callback: function(convo) {
                                data.check_in_time = "19:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:30",
                            callback: function(convo) {
                                data.check_in_time = "19:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:00",
                            callback: function(convo) {
                                data.check_in_time = "20:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:30",
                            callback: function(convo) {
                                data.check_in_time = "20:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:00",
                            callback: function(convo) {
                                data.check_in_time = "21:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:30",
                            callback: function(convo) {
                                data.check_in_time = "21:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:00",
                            callback: function(convo) {
                                data.check_in_time = "22:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:30",
                            callback: function(convo) {
                                data.check_in_time = "22:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:00",
                            callback: function(convo) {
                                data.check_in_time = "23:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:30",
                            callback: function(convo) {
                                data.check_in_time = "23:30",
                                convo.next();
                            }
                        }
                    ]);

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Check Out Time',
                                text: 'What time would be best for check outs?',
                                callback_id: 'time',
                                attachment_type: 'default',
                                color: '#FF02DA',
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
                    },[
                        {
                            pattern: "00:00",
                            callback: function(convo) {
                                data.check_out_time = "00:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "00:30",
                            callback: function(convo) {
                                data.check_out_time = "00:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:00",
                            callback: function(convo) {
                                data.check_out_time = "01:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:30",
                            callback: function(convo) {
                                data.check_out_time = "01:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:00",
                            callback: function(convo) {
                                data.check_out_time = "02:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:30",
                            callback: function(convo) {
                                data.check_out_time = "02:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:00",
                            callback: function(convo) {
                                data.check_out_time = "03:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:30",
                            callback: function(convo) {
                                data.check_out_time = "03:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:00",
                            callback: function(convo) {
                                data.check_out_time = "04:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:30",
                            callback: function(convo) {
                                data.check_out_time = "04:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:00",
                            callback: function(convo) {
                                data.check_out_time = "05:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:30",
                            callback: function(convo) {
                                data.check_out_time = "05:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:00",
                            callback: function(convo) {
                                data.check_out_time = "06:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:30",
                            callback: function(convo) {
                                data.check_out_time = "06:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:00",
                            callback: function(convo) {
                                data.check_out_time = "07:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:30",
                            callback: function(convo) {
                                data.check_out_time = "07:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:00",
                            callback: function(convo) {
                                data.check_out_time = "08:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:30",
                            callback: function(convo) {
                                data.check_out_time = "08:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:00",
                            callback: function(convo) {
                                data.check_out_time = "09:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:30",
                            callback: function(convo) {
                                data.check_out_time = "09:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:00",
                            callback: function(convo) {
                                data.check_out_time = "10:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:30",
                            callback: function(convo) {
                                data.check_out_time = "10:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:00",
                            callback: function(convo) {
                                data.check_out_time = "11:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:30",
                            callback: function(convo) {
                                data.check_out_time = "11:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:00",
                            callback: function(convo) {
                                data.check_out_time = "12:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:30",
                            callback: function(convo) {
                                data.check_out_time = "12:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:00",
                            callback: function(convo) {
                                data.check_out_time = "13:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:30",
                            callback: function(convo) {
                                data.check_out_time = "13:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:00",
                            callback: function(convo) {
                                data.check_out_time = "14:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:30",
                            callback: function(convo) {
                                data.check_out_time = "14:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:00",
                            callback: function(convo) {
                                data.check_out_time = "15:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:30",
                            callback: function(convo) {
                                data.check_out_time = "15:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:00",
                            callback: function(convo) {
                                data.check_out_time = "16:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:30",
                            callback: function(convo) {
                                data.check_out_time = "16:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:00",
                            callback: function(convo) {
                                data.check_out_time = "17:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:30",
                            callback: function(convo) {
                                data.check_out_time = "17:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:00",
                            callback: function(convo) {
                                data.check_out_time = "18:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:30",
                            callback: function(convo) {
                                data.check_out_time = "18:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:00",
                            callback: function(convo) {
                                data.check_out_time = "19:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:30",
                            callback: function(convo) {
                                data.check_out_time = "19:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:00",
                            callback: function(convo) {
                                data.check_out_time = "20:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:30",
                            callback: function(convo) {
                                data.check_out_time = "20:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:00",
                            callback: function(convo) {
                                data.check_out_time = "21:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:30",
                            callback: function(convo) {
                                data.check_out_time = "21:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:00",
                            callback: function(convo) {
                                data.check_out_time = "22:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:30",
                            callback: function(convo) {
                                data.check_out_time = "22:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:00",
                            callback: function(convo) {
                                data.check_out_time = "23:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:30",
                            callback: function(convo) {
                                data.check_out_time = "23:30",
                                convo.next();
                            }
                        }
                    ]);

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {

                            convo.say("Roger that! I will send check in logs on weekdays at " + data.check_in_time + " and check out logs on weekdays at " + data.check_out_time + ", " + data.timezone + " time");

                            info.customization.logging = {
                                timezone: data.check_in_timezone,
                                check_in_time: data.check_in_time,
                                check_out_time: data.check_out.time
                            };
                            controller.storage.users.save(info);

                        } else {
                            convo.say("Whoops! I wasn't able to save this. Would you mind trying again?");
                        }
                    });

                });
            } else {
                bot.startConversation(message, function (err, convo) {
                    var data = {};

                    convo.say("Hey! Let's get your automatic reporting all set up...");

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Timezone',
                                text: 'What timezone are you in?',
                                callback_id: 'timezone',
                                attachment_type: 'default',
                                color: '#FDFF02',
                                actions: [
                                    {
                                        "name": "timezone",
                                        "text": "Timezone",
                                        "type": "select",
                                        "options": [
                                            {
                                                "text": "America/New York",
                                                "value": "America_New_York"
                                            },
                                            {
                                                "text": "America/Los Angeles",
                                                "value": "America_Los_Angeles"
                                            },
                                            {
                                                "text": "America/Denver",
                                                "value": "America_Denver"
                                            },
                                            {
                                                "text": "Australia/Sydney",
                                                "value": "Australia_Sydney"
                                            },
                                            {
                                                "text": "Australia/Perth",
                                                "value": "Australia_Perth"
                                            },
                                            {
                                                "text": "Asia/Hong Kong",
                                                "value": "Asia_Hong_Kong"
                                            },
                                            {
                                                "text": "Asia/Seoul",
                                                "value": "Asia_Seoul"
                                            },
                                            {
                                                "text": "Europe/London",
                                                "value": "Europe_London"
                                            },
                                            {
                                                "text": "Europe/Madrid",
                                                "value": "Europe_Madrid"
                                            },
                                            {
                                                "text": "Europe/Kiev",
                                                "value": "Europe_Kiev"
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },[
                        {
                            pattern: "America_New_York",
                            callback: function(convo) {
                                data.check_in_timezone = "America/New_York",
                                convo.next();
                            }
                        },
                        {
                            pattern: "America_Los_Angeles",
                            callback: function(convo) {
                                data.check_in_timezone = "America/Los_Angeles",
                                convo.next();
                            }
                        },
                        {
                            pattern: "America_Denver",
                            callback: function(convo) {
                                data.check_in_timezone = "America/Denver",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Australia_Sydney",
                            callback: function(convo) {
                                data.check_in_timezone = "Australia/Sydney",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Australia_Perth",
                            callback: function(convo) {
                                data.check_in_timezone = "Australia/Perth",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Asia",
                            callback: function(convo) {
                                data.check_in_timezone = "Asia/Hong_Kong",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Asia_Seoul",
                            callback: function(convo) {
                                data.check_in_timezone = "Asia/Seoul",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Europe_London",
                            callback: function(convo) {
                                data.check_in_timezone = "Europe/London",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Europe_Madrid",
                            callback: function(convo) {
                                data.check_in_timezone = "Europe/Madrid",
                                convo.next();
                            }
                        },
                        {
                            pattern: "Europe_Kiev",
                            callback: function(convo) {
                                data.check_in_timezone = "Europe/Kiev",
                                convo.next();
                            }
                        }
                    ]
                    
                    );

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Check In Time',
                                text: 'What time would be best for check ins?',
                                callback_id: 'time',
                                attachment_type: 'default',
                                color: '#FF02DA',
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
                    },[
                        {
                            pattern: "00:00",
                            callback: function(convo) {
                                data.check_in_time = "00:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "00:30",
                            callback: function(convo) {
                                data.check_in_time = "00:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:00",
                            callback: function(convo) {
                                data.check_in_time = "01:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:30",
                            callback: function(convo) {
                                data.check_in_time = "01:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:00",
                            callback: function(convo) {
                                data.check_in_time = "02:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:30",
                            callback: function(convo) {
                                data.check_in_time = "02:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:00",
                            callback: function(convo) {
                                data.check_in_time = "03:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:30",
                            callback: function(convo) {
                                data.check_in_time = "03:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:00",
                            callback: function(convo) {
                                data.check_in_time = "04:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:30",
                            callback: function(convo) {
                                data.check_in_time = "04:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:00",
                            callback: function(convo) {
                                data.check_in_time = "05:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:30",
                            callback: function(convo) {
                                data.check_in_time = "05:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:00",
                            callback: function(convo) {
                                data.check_in_time = "06:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:30",
                            callback: function(convo) {
                                data.check_in_time = "06:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:00",
                            callback: function(convo) {
                                data.check_in_time = "07:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:30",
                            callback: function(convo) {
                                data.check_in_time = "07:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:00",
                            callback: function(convo) {
                                data.check_in_time = "08:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:30",
                            callback: function(convo) {
                                data.check_in_time = "08:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:00",
                            callback: function(convo) {
                                data.check_in_time = "09:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:30",
                            callback: function(convo) {
                                data.check_in_time = "09:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:00",
                            callback: function(convo) {
                                data.check_in_time = "10:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:30",
                            callback: function(convo) {
                                data.check_in_time = "10:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:00",
                            callback: function(convo) {
                                data.check_in_time = "11:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:30",
                            callback: function(convo) {
                                data.check_in_time = "11:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:00",
                            callback: function(convo) {
                                data.check_in_time = "12:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:30",
                            callback: function(convo) {
                                data.check_in_time = "12:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:00",
                            callback: function(convo) {
                                data.check_in_time = "13:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:30",
                            callback: function(convo) {
                                data.check_in_time = "13:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:00",
                            callback: function(convo) {
                                data.check_in_time = "14:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:30",
                            callback: function(convo) {
                                data.check_in_time = "14:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:00",
                            callback: function(convo) {
                                data.check_in_time = "15:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:30",
                            callback: function(convo) {
                                data.check_in_time = "15:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:00",
                            callback: function(convo) {
                                data.check_in_time = "16:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:30",
                            callback: function(convo) {
                                data.check_in_time = "16:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:00",
                            callback: function(convo) {
                                data.check_in_time = "17:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:30",
                            callback: function(convo) {
                                data.check_in_time = "17:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:00",
                            callback: function(convo) {
                                data.check_in_time = "18:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:30",
                            callback: function(convo) {
                                data.check_in_time = "18:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:00",
                            callback: function(convo) {
                                data.check_in_time = "19:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:30",
                            callback: function(convo) {
                                data.check_in_time = "19:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:00",
                            callback: function(convo) {
                                data.check_in_time = "20:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:30",
                            callback: function(convo) {
                                data.check_in_time = "20:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:00",
                            callback: function(convo) {
                                data.check_in_time = "21:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:30",
                            callback: function(convo) {
                                data.check_in_time = "21:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:00",
                            callback: function(convo) {
                                data.check_in_time = "22:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:30",
                            callback: function(convo) {
                                data.check_in_time = "22:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:00",
                            callback: function(convo) {
                                data.check_in_time = "23:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:30",
                            callback: function(convo) {
                                data.check_in_time = "23:30",
                                convo.next();
                            }
                        }
                    ]);

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Check Out Time',
                                text: "What time would be best for check outs?",
                                callback_id: 'time',
                                attachment_type: 'default',
                                color: '#FF02DA',
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
                    },[
                        {
                            pattern: "00:00",
                            callback: function(convo) {
                                data.check_out_time = "00:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "00:30",
                            callback: function(convo) {
                                data.check_out_time = "00:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:00",
                            callback: function(convo) {
                                data.check_out_time = "01:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "01:30",
                            callback: function(convo) {
                                data.check_out_time = "01:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:00",
                            callback: function(convo) {
                                data.check_out_time = "02:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "02:30",
                            callback: function(convo) {
                                data.check_out_time = "02:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:00",
                            callback: function(convo) {
                                data.check_out_time = "03:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "03:30",
                            callback: function(convo) {
                                data.check_out_time = "03:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:00",
                            callback: function(convo) {
                                data.check_out_time = "04:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "04:30",
                            callback: function(convo) {
                                data.check_out_time = "04:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:00",
                            callback: function(convo) {
                                data.check_out_time = "05:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "05:30",
                            callback: function(convo) {
                                data.check_out_time = "05:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:00",
                            callback: function(convo) {
                                data.check_out_time = "06:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "06:30",
                            callback: function(convo) {
                                data.check_out_time = "06:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:00",
                            callback: function(convo) {
                                data.check_out_time = "07:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "07:30",
                            callback: function(convo) {
                                data.check_out_time = "07:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:00",
                            callback: function(convo) {
                                data.check_out_time = "08:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "08:30",
                            callback: function(convo) {
                                data.check_out_time = "08:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:00",
                            callback: function(convo) {
                                data.check_out_time = "09:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "09:30",
                            callback: function(convo) {
                                data.check_out_time = "09:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:00",
                            callback: function(convo) {
                                data.check_out_time = "10:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "10:30",
                            callback: function(convo) {
                                data.check_out_time = "10:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:00",
                            callback: function(convo) {
                                data.check_out_time = "11:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "11:30",
                            callback: function(convo) {
                                data.check_out_time = "11:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:00",
                            callback: function(convo) {
                                data.check_out_time = "12:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "12:30",
                            callback: function(convo) {
                                data.check_out_time = "12:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:00",
                            callback: function(convo) {
                                data.check_out_time = "13:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "13:30",
                            callback: function(convo) {
                                data.check_out_time = "13:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:00",
                            callback: function(convo) {
                                data.check_out_time = "14:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "14:30",
                            callback: function(convo) {
                                data.check_out_time = "14:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:00",
                            callback: function(convo) {
                                data.check_out_time = "15:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "15:30",
                            callback: function(convo) {
                                data.check_out_time = "15:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:00",
                            callback: function(convo) {
                                data.check_out_time = "16:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "16:30",
                            callback: function(convo) {
                                data.check_out_time = "16:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:00",
                            callback: function(convo) {
                                data.check_out_time = "17:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "17:30",
                            callback: function(convo) {
                                data.check_out_time = "17:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:00",
                            callback: function(convo) {
                                data.check_out_time = "18:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "18:30",
                            callback: function(convo) {
                                data.check_out_time = "18:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:00",
                            callback: function(convo) {
                                data.check_out_time = "19:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "19:30",
                            callback: function(convo) {
                                data.check_out_time = "19:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:00",
                            callback: function(convo) {
                                data.check_out_time = "20:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "20:30",
                            callback: function(convo) {
                                data.check_out_time = "20:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:00",
                            callback: function(convo) {
                                data.check_out_time = "21:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "21:30",
                            callback: function(convo) {
                                data.check_out_time = "21:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:00",
                            callback: function(convo) {
                                data.check_out_time = "22:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "22:30",
                            callback: function(convo) {
                                data.check_out_time = "22:30",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:00",
                            callback: function(convo) {
                                data.check_out_time = "23:00",
                                convo.next();
                            }
                        },
                        {
                            pattern: "23:30",
                            callback: function(convo) {
                                data.check_out_time = "23:30",
                                convo.next();
                            }
                        }
                    ]);

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {

                            convo.say("Roger that! I will send check in logs on weekdays at " + data.check_in_time + " and check out logs on weekdays at " + data.check_out_time + ", " + data.timezone + " time");

                            info.customization.logging = {
                                timezone: data.timezone,
                                check_in_time: data.check_in_time,
                                check_out_time: data.check_out.time,
                                channel: message.channel
                            };
                            controller.storage.users.save(info);

                        } else {
                            convo.say("Whoops! I wasn't able to save this. Would you mind trying again?");
                        }
                    });
                });
            }
        });
    })
}