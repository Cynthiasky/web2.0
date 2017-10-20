//use reverse polish method to calculate, instead of eval()

//stack to store nums, operators and temp results
var nums = [], oprs = [], tmps = [];
var res = 0;
var reg_num = /\d+/, reg_opr = /[\-\.]/;
var sum = "";

function calculate(value) {
  var in = document.getElementById("input");
  if(value == "←") {
    if(sum != "") sum = sum.slice(0, -1);
    in.textContent = in.textContent.slice(0, -1);
    if(!in.textContent) in.textContent = "0";
  }
  else if(value == "CE") {
    sum = "";
    nums = [];
    oprs = [];
    tmps = [];
    in.textContent = "0";
  }
  //if it's a number, connect it
  if(reg_num.test(value))
    sum += value;
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
  }

  if(value == "="){
    oprs = [];
    for(var i = 0; i < nums.length; i++) {
      if(reg_num.test(nums[i])) {
          tmps.push(parseFloat(nums[i]));
      }
      else if(reg_opr.test(nums[i])) {
        if(nums[i] == "-") {
          tmps.push(-tmps.pop());
        }
        else if(nums[i] == ".") {
          tmps[tmps.length-2]=(tmps.pop()/10);
        }
      }
      else {
        if(nums[i] == "+")
          tmps.push(parseFloat(tmps.pop()) + parseFloat(tmps.pop()));
        if(nums[i] == "-")
          tmps.push(parseFloat(tmps.pop()) - parseFloat(tmps.pop()));
        if(nums[i] == "*")
          tmps.push(parseFloat(tmps.pop()) * parseFloat(tmps.pop()));
        if(nums[i] == "/")
          tmps.push(parseFloat(tmps.pop()) / parseFloat(tmps.pop()));
        if(nums[i] == "(")

      }
    }
    nums = [];
    if(tmps.length == 1) {   
      if(isNaN(tmps[0])) {
        in.textContent = "Not a number!";
        tmps = [];
      }
      else
        in.textContent = tmps[0];
    }
    else {
      res = tmps[0] + tmps[1];
      if(isNaN(res)){
        in.textContent = "Not a number!";
        tmps = [];
      }
      else
        in.textContent = result;
    }
  } 
}


/*
function showError(message) {
  document.getElementById("error").textContent = message;
}
function validInput(field, alerttxt) {
  with (field) {
  }
}
*/


window.onload = function() {
  var but = document.getElementByTagName("button");
  for(var i = 0; i < but.length; i++) {
    but[i].onclick = calculate(but[i].innerText);
  }
}