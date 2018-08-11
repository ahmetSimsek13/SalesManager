<?php
class newMT extends meridyen_plugin
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
			<div id="newMT_containerDiv">
				<div id="newMT_inputsContainer">
					<div class="newMT_inputDiv">
						<label class="newMT_label">İsim:</label>
						<input class="newMT_input" id="newMT_nameInput" type="text"/>
					</div>
					<div class="newMT_inputDiv">
						<label class="newMT_label">Soyisim:</label>
						<input class="newMT_input" id="newMT_surnameInput" type="text"/>
					</div>
					<div class="newMT_inputDiv">
						<label class="newMT_label">E-mail:</label>
						<input class="newMT_input" id="newMT_emailInput" type="text"/>
					</div>
					<div class="newMT_inputDiv">
						<label class="newMT_label">Sektör:</label>
						<div class="newMT_selectDiv">
							<select class="newMT_select" id="newMT_sectorSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="newMT_inputDiv">
						<label class="newMT_label">Maks. Kilit:</label>
						<input class="newMT_input" id="newMT_maxLockInput" type="text"/>
					</div>
				</div>
				<div id="newMT_buttonContainer" style="margin-top: 5px;">
					<button id="newMT_submitButton" onclick="newMT_saveRecord()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/newMT/newMT.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/newMT/newMT.css";
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
	
	public static function saveNewMT($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$insertMTStatement = $db->prepare("INSERT INTO users(email,name,surname,password,accessLevel,sectorId, maxLockCount)
			VALUES(?,?,?,'',1,?,?)");
		
		$insertMTStatement->bind_param("sssdd",$postArray["email"],$postArray["name"],$postArray["surname"]
			,$postArray["sectorId"], $postArray["maxLock"]);
		
		if($insertMTStatement->execute())
		{
			$data["status"] = "Ok";
			$insertMTStatement->free_result();
		}
		else
		{
			$data["status"] = "Error";
		}
		$insertMTStatement->close();
		return $data;
	}
	
}