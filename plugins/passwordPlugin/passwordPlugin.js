$(passwordPlugin_init);

var passwordPlugin_coreURL = 'plugins/passwordPlugin/passwordPlugin_core.php';

var passwordPlugin_passwordInput;
var passwordPlugin_passwordAgainInput;

function passwordPlugin_init()
{
	passwordPlugin_passwordInput = document.getElementById("passwordPlugin_passwordInput");
	passwordPlugin_passwordAgainInput = document.getElementById("passwordPlugin_passwordAgainInput");
	
	$("#passwordPlugin_submitButton").button();
}

function passwordPlugin_openPopup()
{
	corePopupPlugin("passwordPlugin",{});
}

function passwordPlugin_savePassword()
{
	var password = passwordPlugin_passwordInput.value;
	var passwordAgain = passwordPlugin_passwordAgainInput.value;
	
	if(password == "" || passwordAgain == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	if(password != passwordAgain)
	{
		alert("Şifreler birbiriyle uyuşmamaktadır, lütfen kontrol ediniz.");
		return;
	}
	
	if(password.length < 4)
	{
		alert("Şifreniz minimum 4 karakter olmalıdır.");
		return;
	}
	
	var postString = "password=" + encodeURIComponent(password);
	
	$.ajax({
		url: passwordPlugin_coreURL + "?op=savePassword",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Şifreniz başarılı bir şekilde kaydedilmiştir.");
				coreClosePopupWindow("passwordPlugin");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}