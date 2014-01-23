$(function  () {
  var LogEntryObject = Parse.Object.extend("LogEntry");

  Parse.initialize("qoaGnqvRsGAsQ4UiPbR2ExmB7HcqiGBAueYxQXND", "QvA1IsAoo7wAnMdTu9lgeoKB9X7PJTAGeexGXHWZ");

  function delayedLoop()
  {
  var q1 = new Parse.Query(LogEntryObject);
  q1.exists("comments");
  q1.count().then(function(c) {
    if (c == 0) {
      $("td.comments_num>a").text("None");
      $("td.comments_num").removeClass("negative");
    }
    else {
      $("td.comments_num>a").text(c);
      $("td.comments_num").addClass("negative");
    }
  });

  var q2 = new Parse.Query(LogEntryObject);
  q2.equalTo("status", "Yes");
  q2.count().then(function(c) {
    if (c == 0) {
      $("td.alerts_num>a").text("None");
      $("td.alerts_num").removeClass("negative");
    }
    else {
      $("td.alerts_num>a").html("<strong>&nbsp;!&nbsp;</strong>");
      $("td.alerts_num").addClass("negative");
    }
  });

    window.setTimeout(delayedLoop, 1000);
  }

  delayedLoop(); // (6) start the loop

})
