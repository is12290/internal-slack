var debug = require('debug')('botkit:onboarding');

module.exports = function (controller) {

    controller.on('onboard', function (bot, team) {
        debug('Starting an onboarding experience!');

        bot.startPrivateConversation({ user: bot.config.createdBy }, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say("Hey! I'm Internal and _you_ happen to be the first person to add me to this fresh, new Slack team. Due to this, you get a bit more power than your friends :)");
                convo.say("For instance, I need to create a public channel where I will post you and your teammates overall check in scores (So long as I'm given permission)");
                var channel_name = '';
                convo.addQuestion({
                    attachments: [
                        {
                            text: "What could and should the name of this channel be?",
                            callback_id: 'channel',
                            attachment_type: 'default',
                            color: '#0294ff',
                            actions: [
                                {
                                    "name": "channel",
                                    "text": "Channel",
                                    "type": "select",
                                    "options": [
                                        {
                                            "text": '#internal',
                                            "value": "internal"
                                        },
                                        {
                                            "text": '#internal-vibe',
                                            "value": "internal-vibe"
                                        },
                                        {
                                            "text": '#internal-scores',
                                            "value": "internal-scores"
                                        },
                                        {
                                            "text": '#internal-mood',
                                            "value": "internal-mood"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }, function (response, convo) {
                    channel_name = channel_name + response.text;
                    bot.api.reactions.add({
                        name: 'thumbsup',
                        channel: response.channel,
                        timestamp: response.ts
                    });
                    convo.next();
                });
                convo.say("Awesome! I'll create that right now...");

                convo.say("Let's run through a few quick things about me:\n\n*Logging*\nParticipating users carry out Check Ins and Reflections in direct message with me every day. As expected, Check Ins are completed at the start of the work day and Check Outs at the end. The logs are 4 topics with 4 possible answers for each - A total of 16 possible choices - and can be carried out by sending me a message saying `Check In` or `Reflect`\n\n*Reporting*\nYour personal results can be tracked on a weekly or monthly basis by simply telling me `Weekly Report` or `Monthly Report`. You can search for your historic scores, or compare your scores with historic scores, by telling me `Search` or `Compare`. Managers have the capability of viewing all scores, but only in aggregate so that no one’s scores are personally identifiable\n\n*Customization*\nI have the capability of automatically sending you Check Ins, Reflections, and Reports at the time of your choice so that you don’t have to remember to invoke them yourself. You can choose a time by direct messaging me `Customize Logs` or `Customize Reports`\n\nThat is pretty much it for basic understanding! I know it’s a bit to take in at once, so ask me for `help` at any time and I’ll provide some guidance.\n\nIf you have additional questions, comments, or problems, be sure to contact my creator at support@getinternal.co");

                convo.activate();

                convo.on('end', function (convo) {
                    if (convo.successful()) {
                        bot.api.channels.create({ token: bot.config.app_token, name: channel_name }, function (err, response) {
                            if (err) {
                                console.log("error: ", err);
                            }
                            console.log("channel: ", response.channel.id);
                            bot.api.channels.setPurpose({ token: bot.config.app_token, channel: response.channel.id, purpose: "This channel is used by the Internal app to share the daily overall emotional fitness scores of those who opt to share." }, function (err, response) {
                                console.log("error: ", err);
                            })
                            bot.api.channels.setTopic({ token: bot.config.app_token, channel: response.channel.id, topic: "Know how your coworkers are doing today" }, function (err, response) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            })

                            team.bot.channel = response.channel.id;
                            controller.storage.teams.save(team);
                        });
                    }
                })
            }
        });
    });
}