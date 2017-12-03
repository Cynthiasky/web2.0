var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var users = {};

http.createServer(Onrequest).listen(8000);
function Onrequest(request, response) {
  fs.readFile('./user.txt', function(err, data){
    if(data){
      
      users = JSON.parse(data);
    }
    switch(request.url){
      case '/index.js':
       sendFile(response, 'index.js', 'text/javascipt');
       break;
      case '/signup.css':
      sendFile(response, 'signup.css', 'text/css');
      break;
      case '/timg.jpg' :
      sendFile(response, 'timg.jpg', 'image/jpeg');
      break;
      default:
        request.method === 'POST' ? registUser(request,response) :sendHtml(request,response);
    }
  });
  
  
}

function sendFile(res,filepath,mime) {
  res.writeHead(200, {"Content-Type": mime});
  res.end(fs.readFileSync(filepath));
  
}
//注册用户的界面
function registUser(req,res) {
  req.on('data', function(chunk){
    var repeat = "";
    var valid = "";
    var user = querystring.parse(chunk.toString());
      // 检验信息是否重复
    repeat = isRepeated(user.username, user.userid, user.phone, user.email);
      // 校验输入是否合法
     valid = isValid(user.username, user.userid, user.phone, user.email);
        if (repeat != "" || valid != "") {
          res.write("<div id='div1'>");
          if (repeat.indexOf("a") != -1) res.write("<p>username has been used</p>");
          if (repeat.indexOf("b") != -1) res.write("<p>studentid has been used</p>");
          if (repeat.indexOf("c") != -1) res.write("<p>phone number has been used</p>");
          if (repeat.indexOf("d") != -1) res.write("<p>email address has been used</p>");
          if (repeat == "" && valid.indexOf("a") != -1) res.write("<p>username invalid");
          if (repeat == "" && valid.indexOf("b") != -1) res.write("<p>studentid invalid</p>");
          if (repeat == "" && valid.indexOf("c") != -1) res.write("<p>phone number invalid</p>");
          if (repeat == "" && valid.indexOf("d") != -1) res.write("<p>email invalid</p>");
          res.write("<p><strong>please go back to register again</strong></p>");
          res.write("</div>");
      }
        else if(repeat == ""&&valid == ""){
          users[user.username] = user;
          fs.writeFile('./user.txt', JSON.stringify(users), 'utf-8');
          showDetail(res,user);
          res.writeHead(301, {Location: '?username=' +user.username}); 
      }
      res.end();  
  });
}

function sendHtml(request,response) {
  var username = parseUsername(request);
  if(!username || !isRegistedUser(username)) {
    showSignup(response);
  }else {
    showDetail(response,users[username]);
  }
}

function parseUsername(req){
  return querystring.parse(url.parse(req.url).query).username;
}
 
function isRegistedUser(username){
  return !!users[username];
}

function showSignup(res) {
  fs.readFile('./signup.html', 'utf-8', function(err, data) {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": 'text/html'});
        res.write(data);
        res.end();
      });
}

function showDetail(response,user){
  response.writeHead(200, {"Content-Type":"text/html"});
      response.write("<DOCTYPE html>");
      response.write("<html>");
      response.write("<head>");
      response.write("<style>");
      response.write("h1 {font-size: 40pt;font-family:'Microsoft Yahei';text-align:center}");
      response.write("p {font-size: 16pt;font-family:'Microsoft Yahei';height:50px;margin-left:40px}");
      response.write("div{border:8px solid rgb(150, 208, 230);border-radius:10px;width:520px;height:300px;margin:auto}");
      response.write("</style>");
      response.write("</head>");
      response.write("<body>");
      response.write("<h1>User Information</h1>");
      response.write("<div>");
      response.write("<p>username: ")
      response.write(user.username);
      response.write("</p>");
      response.write("<p>studentid: ")
      response.write(user.userid);
      response.write("</p>");
      response.write("<p>phone number: ")
      response.write(user.phone);
      response.write("</p>");
      response.write("<p>email: ")
      response.write(user.email);
      response.write("</p>");
      response.write("</div>");
      response.write("</body>");
      response.write("</html>");
      response.end();
}


isRepeated = function(username, userid, phone, email) {
  var repeat = "";
    for (var i in users){
    if (users[i].username == username) repeat+="a";
    if (users[i].userid == userid) repeat+="b";
    if (users[i].phone == phone) repeat+="c";
    if (users[i].email == email) repeat+="d";
  }
  return repeat;
}


isValid = function (username, userid, phone, email) {
  var valid = "";
  if (username.match(/[a-zA-Z]{1}\w{5,17}/) == null) valid += "a";
  if (userid.match(/[^0]{1}\d{7}/) == null) valid += "b";
  if (phone.match(/[^0]{1}\d{10}/) == null) valid += "c";
  if (email.match(/^[a-zA-Z_0-9\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z0-9]{2,4}$/) == null) valid+="d";
  return valid;
}

console.log("Server is listening at 8000");