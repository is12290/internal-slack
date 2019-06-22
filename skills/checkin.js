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
            },[
                {
                    pattern: 'Perfect',
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
            },[
                {
                    pattern: 'Full',
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
            },[
                {
                    pattern: 'Ecstatic',
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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
                    callback: function(reply, convo) {
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

            // Motivation
            convo.addQuestion({
                attachments: [
                    {
                        title: "Motivation",
                        callback_id: 'checkin-motivation',
                        attachment_type: 'default',
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
                        bot.replyInteractive(reply, 
                            {
                                attachments: [
                                    {
                                        title: "Motivation",
                                        callback_id: 'checkin-motivation',
                                        attachment_type: 'default',
                                        color: '#CF02FF',
                                        actions: [
                                            {
                                                'name': 'conquer-button',
                                                'value': 'Conquer',
                                                'style': 'primary',
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
                            }
                        );
                        convo.next();
                    }
                },
                {
                    pattern: 'Excel',
                    callback: function(reply, convo) {
                        score.push(3);
                        bot.replyInteractive(reply, 
                            {
                                attachments: [
                                    {
                                        title: "Motivation",
                                        callback_id: 'checkin-motivation',
                                        attachment_type: 'default',
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
                                                'style': 'primary',
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
                            }
                        );
                        convo.next();
                    }
                },
                {
                    pattern: 'Cope',
                    callback: function(reply, convo) {
                        score.push(2);
                        bot.replyInteractive(reply, 
                            {
                                attachments: [
                                    {
                                        title: "Motivation",
                                        callback_id: 'checkin-motivation',
                                        attachment_type: 'default',
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
                                                'style': 'primary',
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
                            }
                        );
                        convo.next();
                    }
                },
                {
                    pattern: 'Nap',
                    callback: function(reply, convo) {
                        score.push(1);
                        bot.replyInteractive(reply, 
                            {
                                attachments: [
                                    {
                                        title: "Motivation",
                                        callback_id: 'checkin-motivation',
                                        attachment_type: 'default',
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
                                                'style': 'primary',
                                                'text': 'Nap',
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
            


            convo.activate();


            // capture the results of the conversation and see what happened...
            convo.on('end', function(convo) {

                if (convo.successful()) {
                    // Compute score
                    var sum = score.reduce(function(a, b) { return a+b; }, 0);
                    score.push(sum);

                    controller.storage.users.get(message.user, function(err, user) {
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();

                        today = mm + '/' + dd + '/' + yyyy;
                        
                        if (!user) {
                            user = {};
                            user.id = message.user,
                            user.team = message.team,
                            user.channels = [message.channel]
                            user.logs = {
                                [today]: {
                                    check_in: score,
                                }
                            };
                            controller.storage.users.save(user);
                        } else if(!user.logs[today]) {
                            user.logs[today] = {
                                check_in: score,
                            };
                            controller.storage.users.save(user);
                        } else {
                            user.logs[today].check_in = score;
                            controller.storage.users.save(user);
                        }
                    });
                    
                    bot.reply(message, 'Thanks for checking in!');
                }
                else {
                    bot.reply(message, 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?')
                }


            });
        });

    });

};
