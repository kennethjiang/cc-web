$(function  () {
  var LogObject = Parse.Object.extend("LogEntry");
  var logQuery = new Parse.Query(LogObject);
  
  Parse.initialize("qoaGnqvRsGAsQ4UiPbR2ExmB7HcqiGBAueYxQXND", "QvA1IsAoo7wAnMdTu9lgeoKB9X7PJTAGeexGXHWZ");
  $('.reset-logs').click( function() {
    clearLogs();
  });

  clearLogs = function() {
    logQuery.find().then(function(logs) {
        _.each(logs, function(log) {
          log.destroy();
         }); 
         alert('All logs are cleared');
      });
    };
      
})
