var http = require("http");
var urlTool = require("url");
var qs = require("querystring");
var jade = require("jade");
var fs = require("fs");
var validator = require("./validator");

var users = {};


http.createServer(function(req, res) {
  switch(req.url) {
    case "/validator.js":
      sendFile(res, "validator.js", "text/javascript");
      break;
    case "/signup.js":
      sendFile(res, "signup.js", "text/javascript");
      break;
    case "/signup.css":
      sendFile(res, "signup.css", "text/css");
      break;
    case "/jquery-3.2.1.min.js":
      sendFile(res, "jquery-3.2.1.min.js", "text/javascript");
      break;
    default:
      req.method === 'POST' ? registUser(req, res) : sendHtml(req, res);
  }
}).listen(8000);

console.log("server is listening at 8000");

function sendFile(res, filepath, mime) {
  res.writeHead(200, {"Content-Type":mime});
  res.end(fs.readFileSync(filepath));
}

function registUser(req, res) {
  req.on("data", function(chunk){
    try {
      var user = parseUser(chunk.toString());
      checkUser(user);
      users[user.username] = user;
      res.writeHead(301, {Location: "?username=" + user.username});
      res.end();
    }
    catch(err) {
      console.warn("regist error: ", err);
      showSignup(res, user, err.message);
    }
  });
}


function checkUser(user) {
  var errorMessages = [];
  for(var key in user) {
    if(!validator.isFieldValid(key, user[key])) errorMessages.push(validator.form[key].errorMessage);
    if(!validator.isAttrValueUnique(users, user, key)) errorMessages.push(
      "key: " + key + " is not unique by value: " + user[key]);
  }
  if(errorMessages.length > 0) throw new Error(errorMessages.join("<br />"));
}

function parseUser(message) {
  params = message.match(/username=(.+)&userid=(.+)&phone=(.+)&email=(.+)/)
  var user = {username: params[1], userid: params[2], phone: params[3], email: decodeURIComponent(params[4])}
  console.log("user parsed is: ", user);
  return user;
}

function sendHtml(req, res) {
  var username = parseUsername(req);
  if(!username || !isRegistedUser(username)) {
    showSignup(res, {username: username}, null);
  }
  else {
    shouDetail(res, users[username]);
  }
}

function parseUsername(req) {
  return qs.parse(urlTool.parse(req.url).query).username;
}

function isRegistedUser(username) {
  return !!users[username];
}

function showSignup(res, user, err) {
  showHtml(res,"signup.jade", {user: user, error: err});
}

function shouDetail(res, user) {
  showHtml(res,"detail.jade", user);
}

function showHtml(res, template, data) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(jade.renderFile(template, data));
}