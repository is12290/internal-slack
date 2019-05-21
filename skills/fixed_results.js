module.exports = function(controller) {
    controller.hears(['test'], 'direct_message', function(bot, message) {
        controller.storage.results.find({team: message.team}, function(error, output) {
            var outputLength = output.length;
            var i;
            for (i = 0; i < outputLength; i++) {
                var instance = output[i];
                var checkIn = instance.checkin;
                var checkOut = instance.checkout;
                console.log("INSTANCE: ", instance);
                console.log("CHECKIN: ", checkIn);
                console.log("CHECKOUT: ",checkOut);
            }
        })
    })
}