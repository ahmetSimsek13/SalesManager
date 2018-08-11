<?php
class newGY extends meridyen_plugin
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
			<div id="newGY_containerDiv">
				<div id="newGY_inputsContainer">
					<div class="newGY_inputDiv">
						<label class="newGY_label">İsim:</label>
						<input class="newGY_input" id="newGY_nameInput" type="text"/>
					</div>
					<div class="newGY_inputDiv">
						<label class="newGY_label">Soyisim:</label>
						<input class="newGY_input" id="newGY_surnameInput" type="text"/>
					</div>
					<div class="newGY_inputDiv">
						<label class="newGY_label">E-mail:</label>
						<input class="newGY_input" id="newGY_emailInput" type="text"/>
					</div>
					<div class="newGY_inputDiv">
						<label class="newGY_label">Sektör:</label>
						<div class="newGY_selectDiv">
							<select class="newGY_select" id="newGY_sectorSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="newGY_inputDiv">
						<label class="newGY_label">Maks. Kilit:</label>
						<input class="newGY_input" id="newGY_maxLockInput" type="text"/>
					</div>
					<div class="newGY_inputDiv">
						<label class="newGY_label">Yetki:</label>
						<div class="newGY_selectDiv">
							<select class="newGY_select" id="newGY_accessLevelSelect">
								<option value="-1">Seçiniz</option>
								<option value="2">Grup Yöneticisi</option>
								<option value="3">Super User</option>
							</select>
						</div>
					</div>
				</div>
				<div id="newGY_buttonContainer" style="margin-top: 5px;">
					<button id="newGY_submitButton" onclick="newGY_saveRecord()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/newGY/newGY.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/newGY/newGY.css";
		return $this->cssList;
	}
	
	public static function getSectors($meridyen)
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
		
		return $data;
	}
	
	public static function savenewGY($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$insertGYStatement = $db->prepare("INSERT INTO users(email,name,surname,password,accessLevel,sectorId, maxLockCount)
			VALUES(?,?,?,'',?,?,?)");
		
		if($postArray["sectorId"] == -1)
			$sectorId = null;
		else
			$sectorId = $postArray["sectorId"];
			
		if(strcmp($postArray["maxLock"], "") == 0)
			$maxLock = null;
		else
			$maxLock = $postArray["maxLock"];
		
		$insertGYStatement->bind_param("sssddd",$postArray["email"],$postArray["name"],$postArray["surname"], $postArray["accessLevel"]
			,$sectorId, $maxLock);
		
		if($insertGYStatement->execute())
		{
			$data["status"] = "Ok";
			$insertGYStatement->free_result();
		}
		else
		{
			$data["status"] = "Error";
		}
		$insertGYStatement->close();
		return $data;
	}
	
}