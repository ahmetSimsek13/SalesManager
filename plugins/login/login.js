$(login_init);

var login_coreURL = 'plugins/login/login_core.php';
var login_usernameInput;
var login_passwordInput;

function login_init()
{
	login_usernameInput = $('#loginEpostaTextInput');
	login_passwordInput = $('#loginSifreTextInput');
	$('#loginEpostaTextInput').keypress(submitEnter);
	$('#loginSifreTextInput').keypress(submitEnter);
	$('#loginSubmitPassword').button();
	$('#logoutButton').button();
	$('#login_mainMenu').superfish();
	coreCheckWhetherLogin();
}

function submitEnter(e)
{
	if(e.which == 13) 
	{
		meridyen_loginToSite();
	}
}

function meridyen_loginToSite()
{
	if(login_usernameInput.val().length < 8)
	{
		alert("Mail en az 8 karakter olmalıdır.");
		login_usernameInput.val('');
		login_passwordInput.val('');
		return;
	}
	
	$.ajax({
		url: login_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=authenticate&password='+encodeURIComponent(login_passwordInput.val())+'&mail='+encodeURIComponent(login_usernameInput.val()),
		success: login_onAuthReply
	});
}

function login_onAuthReply(data)
{
	if(data.status == 'ok')
	{
		document.location.href = 'index.php';
		coreCheckWhetherLogin();
	}
	else
	{
		alert('Mail ya da şifre hatalı.')
		login_passwordInput.val('');
	}
}

function meridyen_logout()
{
	$.ajax({
		url: login_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=logout',
		success: login_onAuthReply
	});
}