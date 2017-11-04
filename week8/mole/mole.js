var game = {
  start: false,
  random_pos: 0,
  score: 0,
};

window.onload = function() {
  var time = document.getElementById("time");
  var score = document.getElementById("score");
  var info = document.getElementById("info");
  var start = document.getElementById("start");
  var moles;
  //generate moles
  var append_mole = document.createDocumentFragment();
  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 10; j++) {
      var mole = document.createElement("div");
      mole.className = "mole";
      append_mole.appendChild(mole);
    }
    var new_line = document.createElement("br");
    append_mole.appendChild(new_line);
  }
  game_container.appendChild(append_mole);

  function gamestart() {
    moles = document.getElementsByClassName("mole");
    game.start = true;
    game.score++;
    score.innerText = game.score;
    info.innerText = "Playing";

    for(var i = 0; i < moles.length; i++) {
      moles[i].onclick = function() {
        if(this.className === "active" && game.start) {
          game.score++;
          score.innerText = parseInt(game.score);
          this.className = "mole";
          generatenum();
        }
        else if(game.start) {
          game.score--;
          score.innerText = parseInt(game.score);
        }
      }
    }
    score.innerText = 0;
    time.innerText = 30;
    generatenum();
  }

  function generatenum() {
    game.random_pos = parseInt(Math.random() * 60);
    moles[game.random_pos].className = "active";
  }

  function count() {
    if(time.innerText)
      time.innerText = parseInt(time.innerText) - 1;
  }

  function gameover() {
    info.innerText = "Game Over";
    var change = document.getElementsByClassName("active");
    for(var i = 0; i < change.length; i++) {
      change[i].className = "mole";
    }
    clearInterval(timei);
    alert("Game Over\nYour score is " + score.innerText);
    
    game.start = false;
  }

  //start | stop button
  document.getElementById("start").onclick = function() {
    if(!game.start) {
      gamestart();
      timei = setInterval(count, 1000);
      totalt = setTimeout(gameover, 31000);
    }
    else {
      gameover();
      clearTimeout(totalt);
      clearInterval(timei);
    }
  }
}