module.exports = function (controller) {
    controller.on('slash_command', function (bot, message) {
        console.log(message);

    });
}