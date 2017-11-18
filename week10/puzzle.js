var init_order = [];
var playing = false;

window.onload = function() {
  var counter = document.getElementById("counter");
  var start = document.getElementById("start");
  var count_num = 0;

  init();
  start.onclick = function() {
    if(document.getElementsByClassName("piece").empty) init();
    init_order = [];
    //init order for shuffle
    for(var order = 0; order < 15; order++) {
      init_order.push(order);
    }
    shuffle();
    if(playing) {
      var pieces = document.getElementsByClassName("piece");
      pieces[15].className = "piece no15";
    }
    playing = true;
    count_num = 0;
    counter.innerText = 0;
  };

  var pieces = document.getElementsByClassName("piece");
  for(var i = 0; i < 16; i++) {
    pieces[i].onclick = function(i) {
      return function() {
          if(move(i) && playing) {
            var b = -1;
            for(var j = 0; j < 16; j++) {
              if(init_order[j] == 15) {
                b = j;
                break;
              }
            }

            var blank = pieces[b];
            var tmp_name = pieces[i].className;
            pieces[i].className = blank.className;
            blank.className = tmp_name;
            
            var p = init_order[i];
            init_order[i] = init_order[b];
            init_order[b] = p;

            count_num++;
            counter.innerText = count_num;
            check();
          }   
        }
      }(i);
    }
  


  function move(pos) {
    if(init_order[pos] == 15) return false;

    switch (pos%4) {
      case 0: return (init_order[pos+1] == 15 || init_order[pos+4] == 15 || init_order[pos-4] == 15);
      case 3: return (init_order[pos-1] == 15 || init_order[pos+4] == 15 || init_order[pos-4] == 15);
      default: return (init_order[pos+1] == 15 || init_order[pos-1] == 15 || init_order[pos+4] == 15 || init_order[pos-4] == 15);
    }
    //if(pos == blank + 1 || pos == blank - 1 || pos == blank + 4 || pos == blank - 4) return true;
  }




  function init() {
    //generate pieces
    var append_piece = document.createDocumentFragment();
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        var tmp = document.createElement("div");
        tmp.className = "piece";
        tmp.classList.add("no" + (i*4+j));
        //tmp.style.backgroundPosition = parseFloat(-5 + j * 39.5) + "% " + parseFloat(-5 + i * 39.5) + "%";
        append_piece.appendChild(tmp);
      }
      var new_line = document.createElement("br");
      append_piece.appendChild(new_line);
    }
    piece_container.appendChild(append_piece);
  }
  

  //传说中通过三轮换法打乱能得到可复原拼图
  function shuffle() {
    var pieces = document.getElementsByClassName("piece");
    var tmp;
   
    for(var i = 0; i < 5; i++) {
      init_order.sort(function() {
        return Math.random()>0.5?-1:1;
      });
      for(var j = 0; j < 15; j+=3) {
        tmp = init_order[j];
        init_order[j] = init_order[j+1];
        init_order[j+1] = init_order[j+2];
        init_order[j+2] = tmp;
      }
      //var reg = new RegExp("no"+"/d{2}");
      for(var k = 0; k < 15; k++) {
        pieces[init_order[k]].className = "piece " + "no" + k;
      }
    }
    init_order.push(15);
  }


  function check() {
    var pieces = document.getElementsByClassName("piece");
    for(var i = 0; i < pieces.length; i++) {
      var tmp = "piece" + " no" + i;
      if(pieces[i].className != tmp) return;
    }
    //var tmp = document.getElementsByClassName("hidden");
    //tmp[0].classList.remove("hidden");
    alert("You win!\n" + "Used " + count_num + " steps.");
    playing = false;
    count_num = 0;
    counter.innerText = count_num;
    init_order = [];
  }
}