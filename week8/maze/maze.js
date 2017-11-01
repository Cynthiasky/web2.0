var game = {
  start: false,
  cheat: 0,
};

window.onload = function() {
  var s = document.getElementById("Sblock");
  var e = document.getElementById("Eblock");
  var info = document.getElementById("info");
  var walls = document.getElementsByClassName("maze_wall");
  var cheatl = document.getElementById("pass_left");
  var cheatr = document.getElementById("pass_right");

  s.onmouseover = function() {
    game.start = true;
    game.cheat = 1;
    info.innerText = " ";

    for(var i = 0; i < walls.length; i++) {
      walls[i].onmouseout = function() {
        this.className = "maze_wall";
      }
    }
  }

  e.onmouseover = function() {
    if(game.start == true) {
      if(game.cheat == 3) {
        info.innerText = 
          "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
      }
      else info.innerText = "You Win!";
      game.cheat = 0;
      game.start = false;
    }
  }
  
  cheatl.onmouseover = function() {
    if(game.cheat == 1) game.cheat = 2;
  }
  cheatr.onmouseover = function() {
    if(game.cheat == 2) game.cheat = 3;
  }

  for(var i = 0; i < walls.length; i++) {
    walls[i].onmouseover = function() {
      if(game.start) {
        this.className = "red_wall";
        info.innerText = "You Lose!";
        game.start = false;
      }
    }
  }
}