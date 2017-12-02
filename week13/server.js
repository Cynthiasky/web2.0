var http = require('http');
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var users = {};

var server = http.createServer(myrequest);

function myrequest(request, response) {
  fs.readFile("./user.txt", function(err, data) {
    if(data) users = JSON.parse(data);
    switch(request.url) {
      case "/img/*.jpg":
      case "/detail.js":
      case "/detail.css":
      case "/signup.js":

    }
  });
  var pathname = url.parse(request.url).pathname;
  var ext = pathname.match(/(\.[^.]+|)$/)[0];
  var findinguser = qs.parse(url.parse(request.url).query).username;
  if(pathname != "/postlogin" && findinguser == undefined) {
    switch(ext) {
      case ".css":
      case ".js":
      fs.readFile("."+request.url, 'utf-8', function(err, data) {
        if(err) throw err;
        response.writeHead(200, {
          "Content-Type": {
            ".css":"text/css",
            ".js":"text/javascript",
          }[ext]
        });
        response.write(data);
        response.end();
      }
    }
  }
}

server.listen(8000);



function solveDetail(data, json) {
  response.writeHead(200, {"Content-Type":"text/html"});
  response.write("");
  response.end()
}




// if find the user show detail page
Find = function(username) {
  var data = fs.readFileSync("user.txt");
  var tmp = data.toString();
  var users = tmp.split("#");
  for(var i = 0; i < users.length - 1; i++) {
    var info = users[i].split(" ");
    if(info[0] == username)
      return users[i];
  }
  return null;
}

Repeat = function(username, userid, phone, email) {
  var data = fs.readFileSync("user.txt");
  var tmp = data.toString();
  var users = tmp.split("#");
  var repeat = "";
  for(var i = 0; i < users.length; i++) {
    var info = users[i].split(" ");
    if(info[0] == username) repeat += "a";
    if(info[1] == userid) repeat += "b";
    if(info[2] == phone) repeat += "c";
    if(info[3] == email) repeat += "d";
  }
  return repeat;
}

console.log("open in localhost:8000");