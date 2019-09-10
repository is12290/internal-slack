module.exports = function (controller) {
    controller.hears(['^invite'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (err) {
                console.log("error: ", err);
            }

            bot.startConversation(message, function (err, convo) {
                var team_members = [];
                bot.api.users.list({ token: bot.config.bot.token }, function (err, response) {

                    for (var x = 0; x < response.members.length; x++) {
                        if (response.members[x].deleted == 'false') {
                            team_members.push({ text: response.members[x].real_name, value: response.members[x].id });
                        }
                    }
                });
                team_members.push({ text: "None, Actually", value: "No" })

                convo.addQuestion({
                    attachments: [
                        {
                            title: 'Invite Teammate',
                            text: "Select a teammate you would like to invite to <#" + team.bot.channel + ">",
                            callback_id: 'invite',
                            attachment_type: 'default',
                            color: "#0294ff",
                            actions: [
                                {
                                    "name": "Invite",
                                    "text": "Invite",
                                    "type": "select",
                                    "options": team_members
                                }
                            ]
                        }
                    ]
                }, function (reply, convo) {
                    if (reply.text != "No") {
                        bot.api.channels.invite({ token: bot.config.token, channel: team.bot.channel, user: reply.text }, function (err, outcome) {
                            if (err) {
                                console.log(err);
                            }
                            bot.reply(message, "Your recommendation has been successfully added to <#" + team.bot.channel + ">!");
                        })
                    } else {
                        bot.reply(message, "Okay, no problemo!");
                    }
                });

                convo.on('end', function (convo) {
                    if (convo.successful()) {
                        // Pass
                    }
                })
            })
        })
    })
}