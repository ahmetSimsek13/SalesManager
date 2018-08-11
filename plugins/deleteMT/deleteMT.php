<?php
class deleteMT extends meridyen_plugin
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
			<div id="deleteMT_containerDiv">
				<div id="deleteMT_inputsContainer">
					<div class="deleteMT_inputDiv">
						<label class="deleteMT_label">MT/Yönetici:</label>
						<div class="deleteMT_selectDiv">
							<select class="deleteMT_select" id="deleteMT_mtSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
				</div>
				<div id="deleteMT_buttonContainer" style="margin-top: 5px;">
					<button id="deleteMT_submitButton" onclick="deleteMT_deleteRecord()">Kaydet</button>
				</div>
				<div id="deleteMT_ozetDiv">
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/deleteMT/deleteMT.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/deleteMT/deleteMT.css";
		return $this->cssList;
	}
	
	public static function getMts($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getMtsStatement = $db->prepare("SELECT userId,name,surname FROM users WHERE (accessLevel=1 OR accessLevel=2) AND active = 1");
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
	
	public static function deleteRecord($meridyen, $userId)
	{
		$data = array();
		$db = $meridyen->db;
		$data["status"] = "Ok";
		$updateMTStatement = $db->prepare("UPDATE users SET active=0 WHERE userId=?");
		$updateMTStatement->bind_param("d",$userId);
		
		if($updateMTStatement->execute())
		{
			$updateLockStatement = $db->prepare("UPDATE customerlock SET untilDate = subdate(curdate(), 1) WHERE untilDate >= curdate() AND userId=?");
			$updateLockStatement->bind_param("d",$userId);
			if($updateLockStatement->execute())
			{
				$data["status"] = "Ok";
				$updateLockStatement->free_result();
			}
			$updateLockStatement->close();
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