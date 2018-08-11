<?php
class showFairs extends meridyen_plugin
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
			<div id="showFairs_containerDiv">
				<div id="showFairs_fairsListDiv">
					<ol id="showFairs_fairsList">
				</div>
				<div id="showFairs_labelsContainer">
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/showFairs/showFairs.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/showFairs/showFairs.css";
		return $this->cssList;
	}
	
	public static function getFairs($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getFairsStatement = $db->prepare("SELECT fairId,name FROM fair ORDER BY startDate DESC");
		if($getFairsStatement->execute())
		{
			$data["fairs"] = array();
			$getFairsStatement->store_result();
			$getFairsStatement->bind_result($fairId, $name);
			while($getFairsStatement->fetch())
			{
				$data["fairs"][] = array("fairId" => $fairId, "name" => $name);
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
		
		$getFairDetailsStatement = $db->prepare("SELECT f.name,c.name,c1.name,type,s.description,price,u.name,u.surname,customerRepresentative,startDate,endDate FROM fair f, country c, city c1
			,users u, sector s WHERE c.countryId=f.countryId AND c1.cityId=f.cityId AND s.sectorId=f.sectorId AND f.fairKeeperId=u.userId AND f.fairId=?");
		
		$getFairDetailsStatement->bind_param("d",$fairId);
		if($getFairDetailsStatement->execute())
		{
			$getFairDetailsStatement->store_result();
			$getFairDetailsStatement->bind_result($fairName, $country, $city, $type, $sector,$price,$fkName,$fkSurname,$customerRepresentative,$startDate,$endDate);
			$getFairDetailsStatement->fetch();
			
			$startDateSplitted = explode("-",$startDate);
			$startDateMerged = $startDateSplitted[2] . "/" . $startDateSplitted[1] . "/" . $startDateSplitted[0];
			
			$endDateSplitted = explode("-",$endDate);
			$endDateMerged = $endDateSplitted[2] . "/" . $endDateSplitted[1] . "/" . $endDateSplitted[0];
			
			$data = array("fairName" => $fairName, "country" => $country, "city" => $city, "type" => $type, "sector" => $sector, "price" => $price, "fkName" => ($fkName . " " . $fkSurname),
				"customerRepresentative" => $customerRepresentative, "startDate" => $startDateMerged, "endDate" => $endDateMerged);
			$getFairDetailsStatement->free_result();
		}
		$getFairDetailsStatement->close();
		return $data;
	}
	
}