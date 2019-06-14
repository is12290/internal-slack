module.exports = function(controller) {

    controller.hears(['check in', 'Check in', 'check In', 'Check In'], 'direct_message', function(bot, message) {

        bot.startConversation(message, function(err, convo) {

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
                        attachment_type: 'deafult',
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
            },[
                {
                    pattern: 'Perfect',
                    callback: function(reply, convo) {
                        score.push(4);
                        convo.next();
                    }
                },
                {
                    pattern: 'Sufficient',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Restless',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Terrible',
                    callback: function(reply, convo) {
                        score.push(1);
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
                        attachment_type: 'deafult',
                        color: '#2A02FF',
                        actions: [
                            {
                                'name': 'full-button',
                                'value': 'Full',
                                'text': 'Full',
                                'type': 'button'
                            },
                            {
                                'name': 'half-button',
                                'value': 'Half',
                                'text': 'Half',
                                'type': 'button'
                            },
                            {
                                'name': 'dying-button',
                                'value': 'Dying',
                                'text': 'Dying',
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
            },[
                {
                    pattern: 'Full',
                    callback: function(reply, convo) {
                        score.push(4);
                        convo.next();
                    }
                },
                {
                    pattern: 'Half',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Dying',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Dead',
                    callback: function(reply, convo) {
                        score.push(1);
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
                        attachment_type: 'deafult',
                        color: '#8A02FF',
                        actions: [
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
                                'name': 'anxious-button',
                                'value': 'Anxious',
                                'text': 'Anxious',
                                'type': 'button'
                            },
                            {
                                'name': 'negative-button',
                                'value': 'Negative',
                                'text': 'Negative',
                                'type': 'button'
                            },
                        ]
                    }
                ]
            },[
                {
                    pattern: 'Positive',
                    callback: function(reply, convo) {
                        score.push(4);
                        convo.next();
                    }
                },
                {
                    pattern: 'Indifferent',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Anxious',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Negative',
                    callback: function(reply, convo) {
                        score.push(1);
                        convo.next();
                    }
                }
            ]);

            // Motivation
            convo.addQuestion({
                attachments: [
                    {
                        title: "Motivation",
                        callback_id: 'checkin-motivation',
                        attachment_type: 'deafult',
                        color: '#CF02FF',
                        actions: [
                            {
                                'name': 'conquer-button',
                                'value': 'Conquer',
                                'text': 'Conquer',
                                'type': 'button'
                            },
                            {
                                'name': 'excel-button',
                                'value': 'Excel',
                                'text': 'Excel',
                                'type': 'button'
                            },
                            {
                                'name': 'cope-button',
                                'value': 'Cope',
                                'text': 'Cope',
                                'type': 'button'
                            },
                            {
                                'name': 'nap-button',
                                'value': 'Nap',
                                'text': 'Nap',
                                'type': 'button'
                            },
                        ]
                    }
                ]
            },[
                {
                    pattern: 'Conquer',
                    callback: function(reply, convo) {
                        score.push(4);
                        convo.next();
                    }
                },
                {
                    pattern: 'Excel',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Cope',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Nap',
                    callback: function(reply, convo) {
                        score.push(1);
                        convo.next();
                    }
                }
            ]);
            


            convo.activate();


            // capture the results of the conversation and see what happened...
            convo.on('end', function(convo) {

                if (convo.successful()) {
                    // Compute score
                    var sum = score.reduce(function(a, b) { return a+b; }, 0);
                    score.push(sum);

                    controller.storage.results.get(message.user, function(err, user) {
                        if (!user) {
                            user = {};
                            user.id = message.user,
                            user.team = message.team,
                            user.checkin = score;
                            controller.storage.results.save(user);
                        } else {
                            user.checkin = score;
                            controller.storage.results.save(user);
                        }
                    });

                    controller.storage.personal.get(message.user, function(err, user) {
                        var d = new Date();
                        var n = d.getDay();
                        if (!user) {
                            user = {};
                            user.id = message.user,
                            user[n] = score;
                            controller.storage.personal.save(user);
                        } else {
                            user[n] = [score];
                            controller.storage.personal.save(user);
                        }
                    });

                    controller.storage.full.get(message.user, function(err, user) {
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0');
                        var yyyy = today.getFullYear();

                        today = mm + '/' + dd + '/' + yyyy;

                        if (!user) {
                            user = {};
                            user.id = message.user,
                            user.team = message.team,
                            user[today] = score;
                            controller.storage.full.save(user);
                        } else {
                            user[today] = score;
                            controller.storage.full.save(user);
                        }

                    })

                    
                    bot.reply(message, 'Thanks for checking in!');
                }
                else {
                    bot.reply(message, 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?')
                }


            });
        });

    });

};
