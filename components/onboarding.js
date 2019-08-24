var debug = require('debug')('botkit:onboarding');

module.exports = function (controller) {

    controller.on('onboard', function (bot) {
        debug('Starting an onboarding experience!');

        controller.storage.teams.get(bot.config.id, function (err, team) {
            if (err) {
                console.log("error: ", err);
                // pass
            } else {
                bot.startPrivateConversation({ user: bot.config.createdBy }, function (err, convo) {
                    if (err) {
                        console.log(err);
                    } else {
                        convo.say("Hey! _I'm_ Internal and _you_ happen to be the first person to add me to this fresh, new Slack team. Due to this, you get a bit more power than your friends :)");
                        var channel_name = '';
                        var team_name = '';
                        convo.addQuestion({
                            attachments: [
                                {
                                    text: "For instance, I need to create a public channel where I will post you and your teammates overall check in scores (So long as I'm given permission). What could and should the name of this channel be?",
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
                            team_name = team_name + response.team;
                            bot.api.reactions.add({
                                name: 'thumbsup',
                                channel: response.channel,
                                timestamp: response.ts
                            });
                            convo.next();
                        });
                        convo.say("Awesome! I'll create #" + channel_name + " right now!");

                        convo.say("Let's run through a few quick things about me:\n\n*Logging*\nParticipating users carry out Check In and Check Out logs in direct message with me every day. As expected, Check Ins are completed at the start of the work day and Check Outs at the end. The logs are 4 topics with 4 possible answers for each - A total of 16 possible choices - and can be carried out by sending me a message saying `Check In` or `Check Out`\n\n*Team Reporting*\nThe results of logs are aggregated and can be reported daily or weekly. Daily reports show the aggregate responses for that day, as weekly reports show the average of each day’s outcome within that given week. Team reports can be viewed by sending me direct message, or mentioning me (@), with the message `Daily Results` or `Weekly Results`\n\n*Personal Reporting*\nUsers can keep track of their own emotional fitness on a weekly basis. Personal reports are only accessible by the individual, meaning that they can only be reported over direct message by sending me `Personal Results`\n\n*Customization*\nI have the capability of automatically sending you check in and check out logs at the time of your choice so that you don’t have to remember to invoke the log with me. You can choose a time by direct messaging me `Set Up Logs`. I can also automatically send daily or weekly logs to a certain channel so long as I am a member of the channel. You can set up team-wide reports by sending me `Set Up Reports` or automatic personal reporting with `Set Up Personal Reports`. Lastly, you can append a custom question to your team-wide logs by direct messaging me `Custom Question`.\n\n*Notifications*\nI send notifications to remind users to carry out their logs and reporting, but need to be added to a public channel to do so. If you’re interested in this, would you mind inviting me by either mentioning me in the channel or clicking on ‘Channel Details’ -> ‘Add App’ -> ‘Internal’? Of course, I understand if you’re not interested because I can automatically send you your check in and out logs if you tell me to do so! Though, please note that I need to be added to a public channel in order to send automatic reports :+1:\n\nThat is it! I know it’s a lot to take in all at once, so ask me for `help` at any time and I’ll provide some guidance.\n\nIf you have additional questions, comments, or problems, be sure to contact my creator at support@getinternal.co");
                    
                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                controller.storage.teams.get(team_name, function (err, team) {
                                    bot.api.channels.create({ token: bot.config.app_token, name: channel_name }, function (err, response) {
                                        if (err) {
                                            console.log("error: ", err);
                                        }
                                        console.log("response: ", response);
                                        bot.api.channels.setPurpose({ token: bot.config.app_token, channel: response.channel.id, purpose: "This channel is used by the Internal app to share the daily overall emotional fitness scores of those who opt to share."}, function (err, response) {
                                            console.log("error: ", err);
                                        })
                                        bot.api.channels.setTopic({ token: bot.config.app_token, channel: response.channel.id, topic: "Know how your coworkers are doing today"}, function (err, response) {
                                            if (err) {
                                                console.log("error: ", err);
                                            }
                                        })
    
                                        team.bot.channel = response.channel.id;
                                        controller.storage.teams.save(team);
                                    });
                                })
                            }
                        })
                    }
                });
            }
        });
    });
}