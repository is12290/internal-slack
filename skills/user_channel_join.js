module.exports = function (controller) {
    controller.on('member_joined_channel', function (bot, message) {
        controller.storage.users.get(message.user, function (err, user) {
            if (err) {
                console.log("err: ", err);
            }
            if (!user) {
                bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                    if (err) {
                        console.log("err: ", err);
                    }
                    convo.say("Nice to meet you, <@" + message.user + ">! I'm Internal, a bot you use to know how your coworkers are feeling everyday");
​
                    convo.activate();
​
                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            bot.api.users.info({user: message.user }, function (err, api_user) {
                                user = {};
                                let { name, real_name } = api_user.user;
                                user.name = real_name;
                                user.email = api_user.user.profile.email;
                                user.timezone = api_user.user.tz
                                user.id = message.user,
                                user.team = api_user.user.team_id,
                                user.channel = convo.context.channel;
                                controller.users.storage.save(user);
                            })
                        }
                    })
                })
            } else {
                // Pass
            }
        })
    })
}