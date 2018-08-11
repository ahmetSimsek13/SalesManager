<?php
class login extends meridyen_plugin
{
	private $meridyen;
	
	public function __construct(&$meridyen)
    {
    	parent::__construct();
		$this->meridyen = $meridyen;
   	}
	
	public function getMainHTML()
	{
		return '
			<div id="loginDiv">
				<div id="epostaInputHolder">
					<label id="loginEpostaLabel"> E-mail: </label>
					<input type="text" id="loginEpostaTextInput"/>
				</div>
				<div id="sifreInputHolder">
					<label id="loginSifreLabel"> Şifre: </label>
					<input type="password" id="loginSifreTextInput"/>
				</div>
				<div id="loginButtonHolder">
					<button id="loginSubmitPassword" onclick="meridyen_loginToSite()">Giriş</button>
				</div>
			</div>
		';
	}

	public function loginDivAfterLogin($meridyen)
	{
		date_default_timezone_set('Etc/GMT+2');
		$today = getdate();
		$headerHTML = '
			<div id="headerDiv">
				<div id="logoDiv">
					<img src="core/css/images/company_logo.gif"/>
				</div>
				<div id="dateDiv">
					' . $today["mday"] . '/' . $today["mon"] . '/' . $today['year'] . '
				</div>
				<div id="topButtonsDiv">
					<span id="login_nameSpan">' . $meridyen->user->name . " " . $meridyen->user->surname . "</span>" .
					'<div id="login_buttonsDiv">
						<button id="logoutButton" onclick="meridyen_logout()">Çıkış</button>
					</div>
				</div>
			</div>';
		$menuHTML = "";
		// if($meridyen->user->accessLevel == 2)
		// {
			// $menuHTML = '<ul id="login_mainMenu" class="sf-menu">
				// <li class="current">
					// <a href="followed.html">menu item 1</a>
				// </li>
				// <li>
					// <a href="followed.html">menu item 2</a>
				// </li>
				// <li>
					// <a href="followed.html">menu item 3</a>
				// </li>
				// <li>
					// <a href="followed.html">menu item 4</a>
				// </li>	
			// </ul>';
		// }
		return 
			$headerHTML . $menuHTML;
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/login/login.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/login/login.css";
		return $this->cssList;
	}
	
	public static function logout(&$meridyen)
	{
		$msg = array();
		$meridyen->user->logoutUser();
		
		$msg['status'] = 'ok';
		$msg['accessLevel'] = $meridyen->user->accessLevel;
		return $msg;
		
	}
	
	public static function authenticateUser(&$meridyen, $userName, $password)
	{
		$msg = array();
		if(!$meridyen->user->checkUser($userName, $password))
		{
			$msg['status'] = 'fail';
		}
		else
		{
			$msg['status'] = 'ok';
			$msg['accessLevel'] = $meridyen->user->accessLevel;
		}
		
		return $msg;
	}
}