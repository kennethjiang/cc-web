$(function  () {
  var LogEntryObject = Parse.Object.extend("LogEntry");
  var logQuery = new Parse.Query(LogEntryObject);

  Parse.initialize("qoaGnqvRsGAsQ4UiPbR2ExmB7HcqiGBAueYxQXND", "QvA1IsAoo7wAnMdTu9lgeoKB9X7PJTAGeexGXHWZ");

  function renderLog(log) {
    var logHtml = $(_.template( $("#log_entry_template").html(), {log: log}));
    $('table tbody').append(logHtml);
    skipLog++;
    if (firstTaskTS == null) {
      firstTaskTS = log.createdAt;
    }
    $('span.duration').text(moment.duration(log.createdAt - firstTaskTS).humanize());
  };

  var skipLog = 0;
  var firstTaskTS = null;
   
  function delayedLoop()
  {
    logQuery.ascending('createdAt').skip(skipLog).find().then(function(logs) {
    _.each(logs, renderLog);
    });
    window.setTimeout(delayedLoop, 1000);
  }

  delayedLoop(); // (6) start the loop

})
