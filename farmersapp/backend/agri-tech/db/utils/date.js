module.exports.getEndDate = function (date, dateLimit) {
    var dateMillis = date.getTime();
    var timePeriod = dateLimit;

    var parts = timePeriod.split(/:/);
    var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
        (parseInt(parts[1], 10) * 60 * 1000) +
        (parseInt(parts[2], 10) * 1000);

    var newDate = new Date();
    newDate.setTime(dateMillis + timePeriodMillis);

    return newDate;
}