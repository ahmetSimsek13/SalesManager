<?php
class newFair extends meridyen_plugin
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
			<div id="newFair_containerDiv">
				<div id="newFair_inputsContainer">
					<div class="newFair_inputDiv">
						<label class="newFair_label">Fuar Adı:</label>
						<input class="newFair_input" id="newFair_fairNameInput" type="text"/>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Fuar Başlangıç Tarihi:</label>
						<input class="newFair_input" id="newFair_fairStartDateInput" type="text"/>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Fuar Bitiş Tarihi:</label>
						<input class="newFair_input" id="newFair_fairEndDateInput" type="text"/>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Ülke:</label>
						<input class="newFair_input" id="newFair_countryInput" type="text"/>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Şehir:</label>
						<input class="newFair_input" id="newFair_cityInput" type="text"/>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Tür:</label>
						<input class="newFair_input" id="newFair_fairTypeInput" type="text"/>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Sektör:</label>
						<div class="newFair_selectDiv">
							<select class="newFair_select" id="newFair_sectorSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Satış Fiyatı:</label>
						<input class="newFair_input" id="newFair_fairPriceInput" type="text"/>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Proje Sorumlusu:</label>
						<div class="newFair_selectDiv">
							<select class="newFair_select" id="newFair_fairKeeperSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="newFair_inputDiv">
						<label class="newFair_label">Müşteri Hizmetleri Sorumlusu:</label>
						<input class="newFair_input" id="newFair_customerRepresentativeInput" type="text"/>
					</div>
				</div>
				<div id="newFair_buttonContainer" style="margin-top: 5px;">
					<button id="newFair_submitButton" onclick="newFair_saveRecord()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/newFair/newFair.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/newFair/newFair.css";
		return $this->cssList;
	}
	
	public static function getSelectContents($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getUsersStatement = $db->prepare("SELECT name,surname,userId FROM users WHERE accessLevel=2");
	//	$getUsersStatement->bind_param("d",$meridyen->user->sectorId);
		if($getUsersStatement->execute())
		{
			$data["users"] = array();
			$getUsersStatement->store_result();
			$getUsersStatement->bind_result($name, $surname, $userId);
			while($getUsersStatement->fetch())
			{
				$data["users"][] = array("userId" => $userId, "fullname" => ($name . " " . $surname));
			}
			$getUsersStatement->free_result();
		}
		$getUsersStatement->close();
		
		$getSectorsStatement = $db->prepare("SELECT sectorId,description FROM sector");
	//	$getSectorsStatement->bind_param("d",$meridyen->user->sectorId);
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
	
	public static function saveNewFair($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$countryFound = false;
		$getCountryStatement = $db->prepare("SELECT countryId FROM country WHERE name=?");
		$getCountryStatement->bind_param("s", $postArray["country"]);
		if($getCountryStatement->execute())
		{
			$getCountryStatement->store_result();
			if($getCountryStatement->num_rows == 1)
			{
				$getCountryStatement->bind_result($countryId);
				$getCountryStatement->fetch();
				$countryFound = true;
			}
			else
			{
				$insertCountryStatement = $db->prepare("INSERT INTO country(name) VALUES(?)");
				$insertCountryStatement->bind_param("s", $postArray["country"]);
				if($insertCountryStatement->execute())
				{
					$countryId = $db->insert_id;
				}
				$insertCountryStatement->close();
			}
			$getCountryStatement->free_result();
		}
		$getCountryStatement->close();
		
		if($countryFound)
		{
			$getCityStatement = $db->prepare("SELECT cityId FROM city WHERE name=? AND countryId=?");
			$getCityStatement->bind_param("sd", $postArray["city"], $countryId);
			if($getCityStatement->execute())
			{
				$getCityStatement->store_result();
				if($getCityStatement->num_rows == 1)
				{
					$getCityStatement->bind_result($cityId);
					$getCityStatement->fetch();
					$data["cityId"] = $cityId;
				}
				else
				{
					$insertCityStatement = $db->prepare("INSERT INTO city(name,countryId) VALUES(?,?)");
					$insertCityStatement->bind_param("sd", $postArray["city"], $countryId);
					if($insertCityStatement->execute())
						$cityId = $db->insert_id;
					$insertCityStatement->close();
				}
				$getCityStatement->free_result();
			}
			$getCityStatement->close();
		}
		else
		{
			$insertCityStatement = $db->prepare("INSERT INTO city(cityId,name,countryId) VALUES(1,?,?)");
			$insertCityStatement->bind_param("sd", $postArray["city"], $countryId);
			$insertCityStatement->execute();
			$insertCityStatement->close();
			$cityId = 1;
		}
		
		$insertFairStatement = $db->prepare("INSERT INTO fair(name,countryId,cityId,type,sectorId,price,fairKeeperId,customerRepresentative,startDate,endDate)
			VALUES(?,?,?,?,?,?,?,?,?,?)");
		
		$splittedStartDate = explode("/", $postArray["fairStartDate"]);
		$fairStartDate = $splittedStartDate[2] . "-" . $splittedStartDate[1] . "-" . $splittedStartDate[0];
		
		$splittedEndDate = explode("/", $postArray["fairEndDate"]);
		$fairEndDate = $splittedEndDate[2] . "-" . $splittedEndDate[1] . "-" . $splittedEndDate[0];
		
		if($postArray["fairKeeperId"] == "-1")
			$fairKeeperId = null;
		else
			$fairKeeperId = $postArray["fairKeeperId"];
		
		$insertFairStatement->bind_param("sddsdddsss",$postArray["fairName"],$countryId,$cityId
			,$postArray["type"],$postArray["sectorId"],$postArray["price"],$fairKeeperId
			,$postArray["customerRepresentative"],$fairStartDate,$fairEndDate);
		
		if($insertFairStatement->execute())
		{
			$data["status"] = "Ok";
			$insertFairStatement->free_result();
		}
		else
		{
			$data["status"] = "Error";
		}
		$insertFairStatement->close();
		return $data;
	}
	
}