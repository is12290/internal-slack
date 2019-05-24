module.exports  = function(controller) {
    controller.hears(['Week results', 'week results', 'Weekly results', 'weekly results'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.week.find({team: message.team}, function(error, output) {
            var results = getOutput(output);
    
            bot.reply(message, {
                text: 'Hey there! Here are your weekly organization averages...\n',
                attachments: [
                    {
                        title: 'Sleep',
                        color: '#02D2FF',
                        attachment_type: 'default',
                        text: results[0] + '\n'
                    },
                    {
                        title: 'Energy',
                        color: '#2A02FF',
                        attachment_type: 'default',
                        text: results[1] + '\n'
                    },
                    {
                        title: 'Mood',
                        color: '#8A02FF',
                        attachment_type: 'default',
                        text: results[2] + '\n'
                    },
                    {
                        title: 'Motivation',
                        color: '#CF02FF',
                        attachment_type: 'default',
                        text: results[3] + '\n'
                    },
                    {
                        title: 'Efficiency',
                        color: '#FF029D',
                        attachment_type: 'default',
                        text: results[4] + '\n'
                    },
                    {
                        title: 'Fulfillment',
                        color: '#FF8402',
                        attachment_type: 'default',
                        text: results[5] + '\n'
                    },
                    {
                        title: 'Overall',
                        color: '#02FF57',
                        attachment_type: 'default',
                        text: results[6]
                    }
                ]
            });
        });
    })
    

      function getOutput(results) {
          var sleep = (results['1'][0] + results['2'][0] + results['3'][0] + results['4'][0] + results['5'][0]) / 5;
          var energy = (results['1'][1] + results['2'][1] + results['3'][1] + results['4'][1] + results['5'][1]) / 5;
          var mood = (results['1'][2] + results['2'][2] + results['3'][2] + results['4'][2] + results['5'][2]) / 5;
          var motivation = (results['1'][3] + results['2'][3] + results['3'][3] + results['4'][3] + results['5'][3]) / 5;
          var efficiency = (results['1'][4] + results['2'][4] + results['3'][4] + results['4'][4] + results['5'][4]) / 5;
          var fulfillment = (results['1'][5] + results['2'][5] + results['3'][5] + results['4'][5] + results['5'][5]) / 5;
          var overall = (results['1'][6] + results['2'][6] + results['3'][6] + results['4'][6] + results['5'][6]) / 5;

          if (sleep < 2) {
              var sleepWeek = 'Average: *Positive*';
          } else {
              var sleepWeek = 'Average: *Negative*';
          }

          if (energy < 2) {
              var energyWeek = 'Average: *Positive*';
          } else {
              var energyWeek = 'Average: *Negative*';
          }

          if (mood < 2) {
              var moodWeek = 'Average: *Positive*';
          } else {
              var moodWeek = 'Average: *Negative*';
          }

          if (motivation < 2) {
              var motivationWeek = 'Average: *Positive*';
          } else {
              var motivationWeek = 'Average: *Negative*';
          }

          if (efficiency < 2) {
              var efficiencyWeek = 'Average: *Positive*';
          } else {
              var efficiencyWeek = 'Average: *Negative*';
          }

          if (fulfillment < 2) {
              var fulfillmentWeek = 'Average: *Positive*';
          } else {
              var fulfillmentWeek = 'Average: *Negative*';
          }

          if (overall < 2) {
              var overallWeek = 'The overall emotional fitness this week was *positive*!';
          }
          else {
              var overallWeek = 'The overall emotional fitness this week was *negative*';
          }

          var weeklyReport = [sleepWeek, energyWeek, moodWeek, motivationWeek, efficiencyWeek, fulfillmentWeek, overallWeek];
          return weeklyReport;
      }
}