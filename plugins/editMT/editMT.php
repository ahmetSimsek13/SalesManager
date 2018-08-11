<?php
class editMT extends meridyen_plugin
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
			<div id="editMT_containerDiv">
				<div id="editMT_inputsContainer">
					<div class="editMT_inputDiv">
						<label class="editMT_label">MT/Yönetici:</label>
						<div class="editMT_selectDiv">
							<select class="editMT_select" id="editMT_mtSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="editMT_inputDiv">
						<label class="editMT_label">İsim:</label>
						<input class="editMT_input" id="editMT_nameInput" type="text"/>
					</div>
					<div class="editMT_inputDiv">
						<label class="editMT_label">Soyisim:</label>
						<input class="editMT_input" id="editMT_surnameInput" type="text"/>
					</div>
					<div class="editMT_inputDiv">
						<label class="editMT_label">E-mail:</label>
						<input class="editMT_input" id="editMT_emailInput" type="text"/>
					</div>
					<div class="editMT_inputDiv">
						<label class="editMT_label">Sektör:</label>
						<div class="editMT_selectDiv">
							<select class="editMT_select" id="editMT_sectorSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="editMT_inputDiv">
						<label class="editMT_label">Yetki:</label>
						<div class="editMT_selectDiv">
							<select class="editMT_select" id="editMT_accessLevelSelect">
								<option value="-1">Seçiniz</option>
								<option value="1">Müşteri Temsilcisi</option>
								<option value="2">Grup Yöneticisi</option>
							</select>
						</div>
					</div>
					<div class="editMT_inputDiv">
						<label class="editMT_label">Maks. Kilit:</label>
						<input class="editMT_input" id="editMT_maxLockInput" type="text"/>
					</div>
				</div>
				<div id="editMT_buttonContainer" style="margin-top: 5px;">
					<button id="editMT_submitButton" onclick="editMT_saveRecord()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/editMT/editMT.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/editMT/editMT.css";
		return $this->cssList;
	}
	
	public static function getSectorsAndMts($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getSectorsStatement = $db->prepare("SELECT sectorId,description FROM sector");
		if($getSectorsStatement->execute())
		{
			$data["sectors"] = array();
			$getSectorsStatement->store_result();
			$getSectorsStatement->bind_result($sectorId, $description);
			while($getSectorsStatement->fetch())
			{
				$data["sectors"][] = array("sectorId" => $sectorId, "description" => $description);
			}
			$getSectorsStatement->free_result();
		}
		$getSectorsStatement->close();
		
		$getMtsStatement = $db->prepare("SELECT userId,name,surname FROM users WHERE accessLevel=1 OR accessLevel=2");
		if($getMtsStatement->execute())
		{
			$data["mts"] = array();
			$getMtsStatement->store_result();
			$getMtsStatement->bind_result($userId, $name, $surname);
			while($getMtsStatement->fetch())
			{
				$data["mts"][] = array("userId" => $userId, "mtName" => $name . " " . $surname);
			}
			$getMtsStatement->free_result();
		}
		$getMtsStatement->close();
		
		return $data;
	}
	
	public static function getUserDetails($meridyen, $userId)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getUserDetailsStatement = $db->prepare("SELECT email, name, surname, accessLevel, sectorId, maxLockCount FROM users WHERE userId=?");
		$getUserDetailsStatement->bind_param("d", $userId);
		
		if($getUserDetailsStatement->execute())
		{
			$data["status"] = "Ok";
			$getUserDetailsStatement->store_result();
			$getUserDetailsStatement->bind_result($email, $name, $surname, $accessLevel, $sectorId, $maxLockCount);
			$getUserDetailsStatement->fetch();
			$data["email"] = $email;
			$data["name"] = $name;
			$data["surname"] = $surname;
			$data["accessLevel"] = $accessLevel;
			$data["sectorId"] = $sectorId;
			$data["maxLockCount"] = $maxLockCount;
			$getUserDetailsStatement->free_result();
		}
		else
			$data["status"] = "Error";
			
		$getUserDetailsStatement->close();
		return $data;
	}
	
	public static function updateMT($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$updateMTStatement = $db->prepare("UPDATE users SET email=?,name=?,surname=?,accessLevel=?,sectorId=?, maxLockCount=?
			WHERE userId=?");
		
		$updateMTStatement->bind_param("sssdddd",$postArray["email"],$postArray["name"],$postArray["surname"]
			,$postArray["accessLevel"], $postArray["sectorId"], $postArray["maxLockCount"], $postArray["userId"]);
		
		if($updateMTStatement->execute())
		{
			$data["status"] = "Ok";
			$updateMTStatement->free_result();
		}
		else
		{
			$data["status"] = "Error";
		}
		$updateMTStatement->close();
		return $data;
	}
	
}