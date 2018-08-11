<?php
class editFair extends meridyen_plugin
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
			<div id="editFair_containerDiv">
				<div id="editFair_inputsContainer">
					<div class="editFair_inputDiv">
						<label class="editFair_label">Fuar:</label>
						<div class="editFair_selectDiv">
							<select class="editFair_select" id="editFair_fairSelect">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Fuar Adı:</label>
						<input class="editFair_input" id="editFair_fairNameInput" type="text" disabled="true"/>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Fuar Başlangıç Tarihi:</label>
						<input class="editFair_input" id="editFair_fairStartDateInput" type="text" disabled="true"/>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Fuar Bitiş Tarihi:</label>
						<input class="editFair_input" id="editFair_fairEndDateInput" type="text" disabled="true"/>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Ülke:</label>
						<input class="editFair_input" id="editFair_countryInput" type="text" disabled="true"/>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Şehir:</label>
						<input class="editFair_input" id="editFair_cityInput" type="text" disabled="true"/>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Tür:</label>
						<input class="editFair_input" id="editFair_fairTypeInput" type="text" disabled="true"/>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Sektör:</label>
						<div class="editFair_selectDiv">
							<select class="editFair_select" id="editFair_sectorSelect" disabled="true">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Satış Fiyatı:</label>
						<input class="editFair_input" id="editFair_fairPriceInput" type="text" disabled="true"/>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Proje Sorumlusu:</label>
						<div class="editFair_selectDiv">
							<select class="editFair_select" id="editFair_fairKeeperSelect" disabled="true">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="editFair_inputDiv">
						<label class="editFair_label">Müşteri Hizmetleri Sorumlusu:</label>
						<input class="editFair_input" id="editFair_customerRepresentativeInput" type="text" disabled="true"/>
					</div>
				</div>
				<div id="editFair_buttonContainer" style="margin-top: 5px;">
					<button class="editFair_submitButton" onclick="editFair_saveRecord()">Kaydet</button>
					<button class="editFair_submitButton" style="margin-left:5px;" onclick="editFair_deleteRecord()">Sil</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/editFair/editFair.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/editFair/editFair.css";
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
	
	public static function getFairs($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getFairsStatement = $db->prepare("SELECT fairId,name FROM fair ORDER BY startDate DESC");
	//	$getUsersStatement->bind_param("d",$meridyen->user->sectorId);
		if($getFairsStatement->execute())
		{
			$data["fairs"] = array();
			$getFairsStatement->store_result();
			$getFairsStatement->bind_result($fairId, $fairName);
			while($getFairsStatement->fetch())
			{
				$data["fairs"][] = array("fairId" => $fairId, "fairName" => $fairName);
			}
			$getFairsStatement->free_result();
		}
		$getFairsStatement->close();
		return $data;
	}
	
	public static function getFairDetails($meridyen, $fairId)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getFairDetailsStatement = $db->prepare("SELECT f.name,c.name, d.name,type,sectorId,price,fairKeeperId,customerRepresentative,startDate,endDate
			FROM fair f, city c,country d WHERE f.cityId=c.cityId AND f.countryId=d.countryId AND
			f.fairId=?");
		$getFairDetailsStatement->bind_param("d",$fairId);
		if($getFairDetailsStatement->execute())
		{
			$getFairDetailsStatement->store_result();
			$getFairDetailsStatement->bind_result($fairName, $city, $country, $type, $sectorId, $price, $fairKeeperId, $customerRepresentative, $startDate,
				$endDate);
			$getFairDetailsStatement->fetch();
			
			$startDateSplitted = explode("-",$startDate);
			$startDateMerged = $startDateSplitted[2] . "/" . $startDateSplitted[1] . "/" . $startDateSplitted[0];
			
			$endDateSplitted = explode("-",$endDate);
			$endDateMerged = $endDateSplitted[2] . "/" . $endDateSplitted[1] . "/" . $endDateSplitted[0];
			
			$data["fairName"] = $fairName;
			$data["city"] = $city;
			$data["country"] = $country;
			$data["type"] = $type;
			$data["sectorId"] = $sectorId;
			$data["price"] = $price;
			$data["fairKeeperId"] = $fairKeeperId;
			$data["customerRepresentative"] = $customerRepresentative;
			$data["startDate"] = $startDateMerged;
			$data["endDate"] = $endDateMerged;
			
			$getFairDetailsStatement->free_result();
		}
		$getFairDetailsStatement->close();
		return $data;
	}
	
	public static function updateFair($meridyen, $postArray)
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
		
		$updateFairStatement = $db->prepare("UPDATE fair SET name=?,countryId=?,cityId=?,type=?,sectorId=?,price=?,fairKeeperId=?
			,customerRepresentative=?,startDate=?,endDate=? WHERE fairId=?");
		
		$splittedStartDate = explode("/", $postArray["fairStartDate"]);
		$fairStartDate = $splittedStartDate[2] . "-" . $splittedStartDate[1] . "-" . $splittedStartDate[0];
		
		$splittedEndDate = explode("/", $postArray["fairEndDate"]);
		$fairEndDate = $splittedEndDate[2] . "-" . $splittedEndDate[1] . "-" . $splittedEndDate[0];
		
		if($postArray["fairKeeperId"] == "-1")
			$fairKeeperId = null;
		else
			$fairKeeperId = $postArray["fairKeeperId"];
		
		$updateFairStatement->bind_param("sddsdddsssd",$postArray["fairName"],$countryId,$cityId
			,$postArray["type"],$postArray["sectorId"],$postArray["price"],$fairKeeperId
			,$postArray["customerRepresentative"],$fairStartDate,$fairEndDate, $postArray["fairId"]);
		
		if($updateFairStatement->execute())
		{
			$data["status"] = "Ok";
			$updateFairStatement->free_result();
		}
		else
		{
			$data["status"] = "Error";
		}
		$updateFairStatement->close();
		return $data;
	}

	public static function deleteFair($meridyen, $fairId)
	{
		$data = array();
		$db = $meridyen->db;
		
		$deleteFairStatement = $db->prepare("DELETE
			FROM fair WHERE
			fairId=?");
		$deleteFairStatement->bind_param("d",$fairId);
		if($deleteFairStatement->execute())
		{
			$data["status"] = "Ok";
		}
		$deleteFairStatement->close();
		return $data;
	}
}