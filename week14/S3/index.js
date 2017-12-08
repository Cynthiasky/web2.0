$(document).ready(function() {
  var rings = $(".subring");
  var num = 0;
  $("#button").mouseenter(function(event) {
    event.stopPropagation();
    $(".unread").hide();
    $("#info-bar").text("").unbind("click").removeClass("enable").addClass("disable");
    rings.unbind("click").bind("click",passEvent).removeClass("disable").addClass("enable");
    $(".apb").unbind("click").bind("click", apbHandler);
    num = 0;
  });
  
  function passEvent(event) {
    SubringHandler(event.target, null);
  }

  function SubringHandler(data, callback) {
    var status = $(data).children();
    status.show().text("...");
    rings.unbind("click").removeClass("enable").addClass("disable");
    $(data).removeClass("disable").addClass("enable");
    $("#info-bar").removeClass("enable").addClass("disable").unbind("click", InfoHandler)
    $.post("/", function(dat, stu) {
      if(stu == "success") {
        rings.unbind("click").bind("click", passEvent).removeClass("disable").addClass("enable");
        $(data).unbind("click", passEvent).removeClass("enable").addClass("disable");
        status.text(dat);
        num++;
        //if(num >= 5) $("#info-bar").removeClass("disable").addClass("enable").unbind("click").bind("click", InfoHandler);
        if(callback) callback(null, num);
      }
    });
  }

  function apbHandler(event) {
    
    event.stopPropagation();
    var tmps = $.makeArray(rings);
    /*
    var callbacks = [];
    function done(err) {
      InfoHandler();
    }
    */
    function callback(err, number) {
      if(number == 5) InfoHandler();
    }
    for(var i = 0; i < 5; i++) {
      (function(i) {
          SubringHandler($(tmps[i]), callback);
      })(i);
    }
  }

  function InfoHandler() {
      var sum = 0;
      for(var i = 1; i <= 5; i++) {
        var tmp = parseInt($(".subring:nth-child(" + String(i) + ")").children().text());
        sum += tmp;
      }
      $("#info-bar").text(sum).removeClass("enable").addClass("disable");
      rings.removeClass("disable").addClass("enable").unbind("click").bind("click",passEvent);
  }

});

