/* README: reverse polish way is unfinished and this is the eval() way */

var res = String("");
var reg_opr = /[\+\-\*\/\(\)]/, reg_opr1 = /[\-\.]/, reg_opr2 = /[\+\-\*\/]/, reg_opr3 = /[\(\)]/;
var reg_num = /\d+/;
var eql = 0;
function get(value) {
  var outp = document.getElementById("output");
  var inp = document.getElementById("input");
  if(eql == 1) {
    eql = 0;
    outp.textContent = "0";
    inp.textContent = "0";
  }
  
  if(value == "←") {
    if(res != "") res = res.slice(0, -1);
  }
  else if(value == "CE") {
    res = "";
    eql = 0;
  }
  else if(value == ".") {
    if(res != "" && res[res.length - 1] == ".")
      res = res.slice(0, -1);
    res += value;
  }
  else if(reg_opr2.test(value)) {
    if(res != "" && reg_opr2.test(res[res.length - 1]))
      res = res.slice(0, -1);
    else if(res == "") res += "0";
    res += value;
  }
  else if(reg_opr3.test(value)) res += value;
  else if(reg_num.test(value)) {
    if(res == "0") res = "";
    if(res.length >= 2 && res[res.length - 1] == "0" && 
      reg_opr.test(res[res.length - 2]))
      res = res.slice(0, -1);
    res += value;
  }

  else if(value == "=") {
    eql = 1;
    if(res != "") {
      try {
        var tmp = eval(res);
        if(isNaN(tmp))
          alert("not a number!");
        res = String(tmp);
        var dot_pos = res.search(/\./);
        if(dot_pos != -1) {
          if(res.length > (dot_pos + 10))
            res = res.slice(0, dot_pos + 9);
        }
      }

      catch(exp) {
        alert("invalid!");
        outp.textContent = "0";
        inp.testContent = "0";
        res = "";
      }
      outp.textContent = res;
      //inp.textContent = "0";
    }
  }

  else
    alert("undefined input!");
  if(eql == 0) {
    if(res != "") inp.textContent = res;
    else {
      outp.textContent = "0";
      inp.textContent = "0";
    }
  }
  
}


window.onload = function() {
  var but = document.getElementsByTagName('button');
  for(var i = 0; i < but.length; i++){
     but[i].onclick = (function(k){
      return function(){   
        get(but[k].innerText);
      }
    })(i);
  }
}
/*
//use reverse polish method to calculate, instead of eval()    ----unfinished

//stack to store operators and temp inputs
var oprs = [], tmps = [];
var reg_num = /\d+/, reg_opr = /[\-\.]/;
var sum = "";
function calculate(value) {
  var in = document.getElementById("input");
  if(value == "←") {
    if(sum != "") sum = sum.slice(0, -1);
    in.value = in.value.slice(0, -1);
    if(!in.value) in.value = "0";
  }
  else if(value == "CE") {
    sum = "";
    res = "";
    oprs = [];
    tmps = [];
    in.value = "0";
  }
  //if it's a number, connect it
  else if(reg_num.test(value)) {
    sum += value;
    res += value;
    in.value += value;
  }
  else {
    tmps.push(parseInt(sum));
    sum = "";
    if(value == "(")
      oprs.push(value);
    else if(value == ")") {
      while(oprs.top() != "(") {
        tmps.push(oprs.pop());
      }
      oprs.pop();
    }
    else if(value == "+" || value == "-") {
      for(var opr = oprs.top(); !oprs.empty(); opr = oprs.top()) {
        if(opr == "(") break;
        else
          tmps.push(oprs.pop());
      }
      oprs.push(value);
    }
    else if(value == "*" || value == "/") {
      for(var opr = oprs.top(); !oprs.empty(); opr = oprs.top()) {
        if(opr == "+" || opr == "-" || opr == "(") break;
        else 
          tmps.push(oprs.pop());
      }
      oprs.push(value);
    }
    else if(value == ".") {
      todo
    }
    else if(value == "=") {
      while(!oprs.empty()) {
        tmps.push(oprs.pop());
    }
    for(var i = tmps.length - 1; i >= 0; i--) {
      todo
    }
    oprs = [];
  }
}
*/