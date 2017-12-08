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
        if(num >= 5) $("#info-bar").removeClass("disable").addClass("enable").unbind("click").bind("click", InfoHandler);
        if(callback) callback(null);
      }
    });
  }

  function Shuffle() {
    var order = [0, 1, 2, 3, 4];
    var randomi,tmp,currenti = order.length;

    for(var i = 0; i < 5; i++) {
      randomi = Math.floor(Math.random() * currenti);
      currenti--;
      tmp = order[currenti];
      order[currenti] = order[randomi];
      order[randomi] = tmp;
    }
    return order;
  }

  function apbHandler(event) {
    event.stopPropagation();
    var order = [];
    var tmps = $.makeArray(rings);
    var callbacks = [];
    order = Shuffle();
    var show_order = "";
    for(var i = 0; i < 5; i++) {
        show_order += String.fromCharCode(order[i] + 65);
        show_order += " ";
    }
    $("#order").text(show_order);
    function done(err) {
      InfoHandler();
    }
    for(var i = 0; i < 4; i++) {
      (function(i){
        callbacks[order[i]] = function(err) {
          SubringHandler($(tmps[order[i + 1]]), callbacks[order[i + 1]]);
        }
      })(i);
    }
    callbacks[order[4]] = done;
    SubringHandler($(tmps[order[0]]), callbacks[order[0]]);
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

