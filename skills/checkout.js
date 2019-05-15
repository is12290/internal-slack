module.exports = function(controller) {

    controller.hears('^check ^out$', 'direct_message', function(bot, message) {

        bot.startConversation(message, function(err, convo) {

            // Keep Score
            const score = [];

            convo.addMessage({
                text: "Hey, here's your check out questionnaire! Just choose which option vibes best for each of the 4 topics..."
            });

            // Sleep
            convo.addQuestion({
                attachments: [
                    {
                        title: "Effeciency",
                        callback_id: 'checkout-effeciency',
                        attachment_type: 'deafult',
                        color: '#02D2FF',
                        actions: [
                            {
                                'name': 'overdrive-button',
                                'value': 'Overdrive',
                                'text': 'Overdrive',
                                'type': 'button'
                            },
                            {
                                'name': 'normal-button',
                                'value': 'Normal',
                                'text': 'Normal',
                                'type': 'button'
                            },
                            {
                                'name': 'slow-button',
                                'value': 'Slow',
                                'text': 'Slow',
                                'type': 'button'
                            },
                            {
                                'name': 'dragging-button',
                                'value': 'Dragging',
                                'text': 'Dragging',
                                'type': 'button'
                            },
                        ]
                    }
                ]
            },[
                {
                    pattern: 'Overdrive',
                    callback: function(reply, convo) {
                        score.push(1);
                        convo.next();
                    }
                },
                {
                    pattern: 'Normal',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Slow',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Dragging',
                    callback: function(reply, convo) {
                        score.push(4);
                        convo.next();
                    }
                }
            ]);

            // Energy
            convo.addQuestion({
                attachments: [
                    {
                        title: "Energy",
                        callback_id: 'checkout-energy',
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
                        score.push(1);
                        convo.next();
                    }
                },
                {
                    pattern: 'Half',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Dying',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Dead',
                    callback: function(reply, convo) {
                        score.push(4);
                        convo.next();
                    }
                }
            ]);

            // Mood
            convo.addQuestion({
                attachments: [
                    {
                        title: "Mood",
                        callback_id: 'checkout-mood',
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
                                'name': 'frustrated-button',
                                'value': 'Frustrated',
                                'text': 'Frustrated',
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
                        score.push(1);
                        convo.next();
                    }
                },
                {
                    pattern: 'Indifferent',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Frustrated',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Negative',
                    callback: function(reply, convo) {
                        score.push(4);
                        convo.next();
                    }
                }
            ]);

            // Motivation
            convo.addQuestion({
                attachments: [
                    {
                        title: "Fulfillment",
                        callback_id: 'checkin-motivation',
                        attachment_type: 'deafult',
                        color: '#CF02FF',
                        actions: [
                            {
                                'name': 'complete-button',
                                'value': 'Complete',
                                'text': 'Complete',
                                'type': 'button'
                            },
                            {
                                'name': 'present-button',
                                'value': 'Present',
                                'text': 'Present',
                                'type': 'button'
                            },
                            {
                                'name': 'searching-button',
                                'value': 'Searching',
                                'text': 'Searching',
                                'type': 'button'
                            },
                            {
                                'name': 'nonExistent-button',
                                'value': 'Non-Existent',
                                'text': 'Non-Existent',
                                'type': 'button'
                            },
                        ]
                    }
                ]
            },[
                {
                    pattern: 'Complete',
                    callback: function(reply, convo) {
                        score.push(1);
                        convo.next();
                    }
                },
                {
                    pattern: 'Present',
                    callback: function(reply, convo) {
                        score.push(2);
                        convo.next();
                    }
                },
                {
                    pattern: 'Searching',
                    callback: function(reply, convo) {
                        score.push(3);
                        convo.next();
                    }
                },
                {
                    pattern: 'Non-Existent',
                    callback: function(reply, convo) {
                        score.push(4);
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
                        user.checkout = score;
                        controller.storage.results.save(user);
                    });
                
                    bot.reply(message, 'Thanks for checking out!');
                }


            });
        });

    });

};