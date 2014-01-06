$(function  () {
  var LogEntryObject = Parse.Object.extend("LogEntry");
  var logQuery = new Parse.Query(LogEntryObject);

  Parse.initialize("qoaGnqvRsGAsQ4UiPbR2ExmB7HcqiGBAueYxQXND", "QvA1IsAoo7wAnMdTu9lgeoKB9X7PJTAGeexGXHWZ");

  function renderLog(log) {
    var logHtml = $(_.template( $("#log_entry_template").html(), {log: log}));
    $('table tbody').append(logHtml);
  };

  logQuery.ascending('createdAt').find().then(function(logs) {
    _.each(logs, renderLog);
  });

})
