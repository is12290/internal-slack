var moment = require('moment');
var startOfMonth = moment().startOf('month');
var endOfMonth = moment().endOf('month');

var day = startOfMonth;

var days = [];
while (day <= endOfMonth) {
    days.push(day.format('L'));
    day = day.clone().add(1, 'd');
}

console.log(days);