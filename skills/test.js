module.exports = function (controller) {
    controller.hears(['test'], 'direct_message', function (bot, message) {
        console.log(message.team);
        controller.storage.teams.get(message.team, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        })
    })
}