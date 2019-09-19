var debug = require('debug')('botkit:user_registration');

module.exports = function(controller) {

    /* Handle event caused by a user logging in with oauth */
    controller.on('oauth:success', function(payload) {

        debug('Got a successful login!', payload);
        if (!payload.identity.team_id) {
            debug('Error: received an oauth response without a team id', payload);
        }
        controller.storage.teams.get(payload.identity.team_id, function (err, team) {
            if (err) {
                debug('Error: could not load team from storage system:', payload.identity.team_id, err);
            }

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;

            var end = new Date();
            var numberOfDaysToAdd = 14;
            end.setDate(end.getDate() + numberOfDaysToAdd);

            var dd = end.getDate();
            var mm = end.getMonth() + 1;
            var y = end.getFullYear();

            var endDate = mm + '/' + dd + '/' + y;

            var new_team = false;
            if (!team) {
                team = {
                    id: payload.identity.team_id,
                    createdBy: payload.identity.user_id,
                    url: payload.identity.url,
                    name: payload.identity.team,
                    status: {
                        subscription: {
                            status: 'inactive',
                            seats: 0,
                            seats_used: 0
                        },
                        trial: {
                            start: today,
                            end: endDate,
                            status: 'active',
                            tally: 1
                        }
                    }
                };
                var new_team = true;
            }

            team.bot = {
                token: payload.bot.bot_access_token,
                user_id: payload.bot.bot_user_id,
                createdBy: payload.identity.user_id,
                app_token: payload.access_token,
            };

            var testbot = controller.spawn(team.bot);

            testbot.api.auth.test({}, function(err, bot_auth) {
                if (err) {
                    debug('Error: could not authenticate bot user', err);
                } else {
                    team.bot.name = bot_auth.user;

                    // add in info that is expected by Botkit
                    testbot.identity = bot_auth;

                    testbot.identity.id = bot_auth.user_id;
                    testbot.identity.name = bot_auth.user;

                    testbot.team_info = team;

                    // Replace this with your own database!

                    controller.storage.teams.save(team, function(err, id) {
                        if (err) {
                            debug('Error: could not save team record:', err);
                        } else {
                            if (new_team) {
                                controller.trigger('create_team', [testbot, team]);
                            } else {
                                controller.trigger('update_team', [testbot, team]);
                            }
                        }
                    });
                }
            });
        });
    });


    controller.on('create_team', function(bot, team) {

        debug('Team created:', team);

        // Trigger an event that will establish an RTM connection for this bot
        controller.trigger('rtm:start', [bot.config]);

        // Trigger an event that will cause this team to receive onboarding messages
        controller.trigger('onboard', [bot, team]);

    });


    controller.on('update_team', function(bot, team) {

        debug('Team updated:', team);
        // Trigger an event that will establish an RTM connection for this bot
        controller.trigger('rtm:start', [bot]);

    });

}
