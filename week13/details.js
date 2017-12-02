window.onload = function() {
  var rand = Math.round((Math.random() * 9));
  var str = "url(\"./img/icon" + String(rand) + ".jpg\")";
  $(".changebg").css({"background-image":str});
}