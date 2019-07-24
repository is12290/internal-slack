const dotenv = require('dotenv');
dotenv.config();
const Botkit = require('botkit');

var bot_options = {
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  clientSigningSecret: process.env.clientSigningSecret,
  // debug: true,
  scopes: ['bot'],
  studio_token: process.env.studio_token,
  studio_command_uri: process.env.studio_command_uri
};

var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true, tables: ['teams', 'user'] });
bot_options.storage = mongoStorage;

var controller = Botkit.slackbot(bot_options);
controller.startTicking();

var test = [];

controller.storage.teams.all(function (error, all_teams) {
  if (error) {
    console.log("ERROR: ", error);
  }
  all_teams.forEach((team) => {
    console.log(team);
    controller.spawn({ token: team.bot.token }, function (bot) {

      controller.storage.users.find({ team: team.id }, function (error, results) {
        test.push(results);
      //   if (error) {
      //     console.log("error: ", error);
      //   }
      //   results.forEach((result) => {
      //     console.log(result)
      //     var user = result.id;

      //     bot.startPrivateConversation({user: user }, function (err, convo) {
      //       if (err) {
      //         console.log("error: ", err);
      //       }

      //       convo.addQuestion({
      //         text: "How you be?"
      //       }, function (response, convo) {
      //         console.log("Response: ", response)
      //         convo.next();
      //       });

      //       convo.activate();

      //       convo.on('end', function (convo) {
      //         if (convo.successful()) {
      //           console.log("Success!");
      //         }
      //       });
      //     })
      //   })
      });
      console.log(test);
    })
  })
});