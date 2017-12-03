function submit() {
  var username = $("#username").val();
  var userid = $("#userid").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  $(".error").removeClass("warning");

  if(!username.match(/[a-zA-Z]{1}\w{5,17}/)) {
    $("#name_error").addClass("warning");
    return false;
  }
  if(!userid.match(/[^0]{1}\d{7}/)) {
    $("#id_error").addClass("warning");
    return false;
  }
  if(!phone.match(/[^0]{1}\d{10}/)) {
    $("#phone_error").addClass("warning");
    return false;    
  } 
  if(!email.match(/^[a-zA-Z_0-9\-\.]+@(([a-zA-Z_\-])+\.)+[a-zA-Z0-9]{2,4}$/)) {
    $("#email_error").addClass("warning");
    return false;
  }
  var str = $("#form").serialize();
  $.post("localhost:8000", str, function(data, state) {
    var flag = true;
    for(var i = 0; i < data.length; i++) {
      if(data[i] == "a") {
        alert("repeat username");
        flag = false;
      }
      else if(data[i] == "b") {
        alert("repeat userid");
        flag = false;
      }
      else if(data[i] == "c") {
        alert("repeat phone");
        flag = false;
      }
      else if(data[i] == "d") {
        alert("repeat email");
        flag = false;
      }
    }
    return flag;
  });
  return true;
}

$(document).ready(function() {
  $(".input").blur(function() {
    submit();
  });
  $("#reset").click(function() {
    $(".input").val("");
    $(".error").removeClass("warning");
  });
  $("#submit").click(submit);
})