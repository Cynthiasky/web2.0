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
  return true;
}

$(document).ready(function() {
  $("#reset").click(function() {
    $(".input").val("");
    $(".error").removeClass("warning");
  })
  $("#submit").click(submit);
})