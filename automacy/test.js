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

controller.storage.teams.all(function (error, all_teams) {
  if (error) {
    console.log("ERROR: ", error);
  }
  for (var i = 0; i < all_teams.length; i++) {
    controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
      controller.storage.users.find({ team: all_teams[i].id }, function (error, results) {
        if (error) {
          console.log("error: ", error);
        }
        for (var j = 0; j < results.length; j++) {
          var user = results[j].id;

          bot.startPrivateConversation({user: user }, function (err, convo) {
            if (err) {
              console.log("error: ", err);
            }

            convo.addMessage({
              text: 'This is a conversation!'
            }, function (response, convo) {
              console.log('Went through message');
              convo.next();
            });
            console.log("Out of message");

            convo.addQuestion({
              text: "How you be?"
            }, function (response, convo) {
              console.log("went through question");
              convo.next();
            });

            convo.activate();

            convo.on('end', function (convo) {
              if (convo.sucessful()) {
                console.log("Success!");
              }
            });
            console.log("Skipped convo.on('end')")
          })
          console.log("Out of conversation");
        }
        console.log("Out of for loop");
      });
    })
    console.log("Out of spawned bot");
  }
});