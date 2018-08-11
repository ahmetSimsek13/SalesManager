<?php
class passwordPlugin extends meridyen_plugin
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
			<div id="passwordPlugin_containerDiv">
				<div id="passwordPlugin_infoDiv">
				</div>
				<div id="passwordPlugin_inputsContainer">
					<div class="passwordPlugin_inputDiv">
						<label class="passwordPlugin_label">Şifre:</label>
						<input class="passwordPlugin_input" id="passwordPlugin_passwordInput" type="password"/>
					</div>
					<div class="passwordPlugin_inputDiv">
						<label class="passwordPlugin_label">Şifre(Tekrar):</label>
						<input class="passwordPlugin_input" id="passwordPlugin_passwordAgainInput" type="password"/>
					</div>
				</div>
				<div id="passwordPlugin_buttonContainer" style="margin-top: 5px;">
					<button id="passwordPlugin_submitButton" onclick="passwordPlugin_savePassword()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/passwordPlugin/passwordPlugin.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/passwordPlugin/passwordPlugin.css";
		return $this->cssList;
	}
	
	public static function savePassword($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$password = $postArray["password"];
		
		$updatePasswordStatement = $db->prepare("UPDATE users SET password=?, sifreTarihi=CURDATE() WHERE userId=?");
		$updatePasswordStatement->bind_param("sd",$password,$meridyen->user->userId);
		if($updatePasswordStatement->execute())
		{
			$data["status"] = "Ok";
			$updatePasswordStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$updatePasswordStatement->close();
		$meridyen->user->setEmptyPassword(false);
		$meridyen->user->setPasswordUpdate(false);
		return $data;
	}
}