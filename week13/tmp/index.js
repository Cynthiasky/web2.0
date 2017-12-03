$(function(){
	var namevalid,idvalid,mobilevalid,emailvalid;
	$('#resetting').click(function(){
		$('#text1').value= "";
		$('#text2').value= "";
		$('#text3').value= "";
		$('#text4').value= "";
	});

	$('#text1').on("input", function() {
		function checkName(name) {
			if (name.match(/[a-zA-Z]{1}\w{5,17}/) == null) return "name is invalid";
			else return "";
		}
		var text = checkName($(this).val());
		$("#error1").text(text);
		if(text == "") namevalid = true;
		else namevalid = false;
	});

	$('#text2').on("input", function() {
		function checkName(id) {
			if (id.match(/[^0]{1}\d{7}/) == null) return "id is invalid";
			else return "";
		}
		var text = checkName($(this).val());
		$("#error2").text(text);
		if(text == "") idvalid = true;
		else idvalid = false;
	});

	$('#text3').on("input", function() {
		function checkName(mobile) {
			if (mobile.match(/[^0]{1}\d{10}/) == null) return "mobile is invalid";
			else return "";
		}
		var text = checkName($(this).val());
		$("#error3").text(text);
		if(text == "") mobilevalid = true;
		else mobilevalid = false;
	});

	$('#text4').on("input", function() {
		function checkName(email) {
			if (email.match(/^[a-zA-Z_0-9\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z0-9]{2,4}$/) == null) return "email is invalid";
			else return "";
		}
		var text = checkName($(this).val());
		$("#error4").text(text);
		if(text == "") emailvalid = true;
		else emailvalid = false;
	});
	$('#submission').click(function(){
		if (!namevalid) alert("注册失败:用户名格式错误");
		if (!idvalid) alert("注册失败:学号格式错误");
		if (!mobilevalid) alert("注册失败:电话格式错误");
		if (!emailvalid) alert("注册失败:邮箱格式错误");
	});
})