$(document).ready(function() {
  var rings = $(".subring");
  var num = 0;
  $("#button").mouseenter(function(event) {
    event.stopPropagation();
    $(".unread").hide();
    $("#info-bar").text("").unbind("click").removeClass("enable").addClass("disable");
    rings.unbind("click").bind("click",SubringHandler).removeClass("disable").addClass("enable");
    num = 0;
  });

  function SubringHandler(event) {
    var status = $(event.target).children();
    status.show().text("...");
    rings.unbind("click").removeClass("enable").addClass("disable");
    $(event.target).removeClass("disable").addClass("enable");
    $("#info-bar").removeClass("enable").addClass("disable").unbind("click", InfoHandler)
    $.post("/", function(data, stu) {
      if(stu == "success") {
        rings.unbind("click").bind("click", SubringHandler).removeClass("disable").addClass("enable");
        $(event.target).unbind("click", SubringHandler).removeClass("enable").addClass("disable");
        status.text(data);
        num++;
        if(num >= 5) $("#info-bar").removeClass("disable").addClass("enable").unbind("click").bind("click", InfoHandler);
      }
    });
  }

  function InfoHandler(event) {
      var sum = 0;
      for(var i = 1; i <= 5; i++) {
        var tmp = parseInt($(".subring:nth-child(" + String(i) + ")").children().text());
        sum += tmp;
      }
      $("#info-bar").text(sum).removeClass("enable").addClass("disable");
      rings.removeClass("disable").addClass("enable").unbind("click").bind("click",SubringHandler);
  }
});