<?php
class editCustomerLocation extends meridyen_plugin
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
			<div id="editCustomerLocation_containerDiv">
				<div id="editCustomerLocation_inputsContainer">
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Tip*:</label>
						<div class="editCustomerLocation_selectDiv">
							<select id="editCustomerLocation_typeSelect" class="editCustomerLocation_input">
								<option value="Merkez">Merkez</option>
								<option value="Şube">Şube</option>
								<option value="Depo">Depo</option>
							</select>
						</div>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Adres*:</label>
						<textarea class="editCustomerLocation_input" id="editCustomerLocation_addressInput" type="text">
						</textarea>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">İlçe*:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_countyInput" type="text"/>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Şehir*:</label>
						<div class="editCustomerLocation_selectDiv">
							<select id="editCustomerLocation_citySelect" class="editCustomerLocation_input">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Ülke*:</label>
						<div class="editCustomerLocation_selectDiv">
							<select id="editCustomerLocation_countrySelect" class="editCustomerLocation_input">
								<option value="-1">Seçiniz</option>
							</select>
						</div>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Website:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_websiteInput" type="text"/>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">E-mail:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_emailInput" type="text"/>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Tel-1*:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_phone1Input" type="text"/>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Tel-2:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_phone2Input" type="text"/>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Tel-3:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_phone3Input" type="text"/>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Faks:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_faxInput" type="text"/>
					</div>
					<div class="editCustomerLocation_inputDiv">
						<label class="editCustomerLocation_label">Notlar:</label>
						<input class="editCustomerLocation_input" id="editCustomerLocation_notesInput" type="text"/>
					</div>
				</div>
				<div id="editCustomerLocation_buttonContainer" style="margin-top: 5px;">
					<button id="editCustomerLocation_submitButton" onclick="editCustomerLocation_updateOrInsertCustomerLocation()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/editCustomerLocation/editCustomerLocation.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/editCustomerLocation/editCustomerLocation.css";
		return $this->cssList;
	}
	
	public static function getCountries($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$getCountriesStatement = $db->prepare("SELECT countryId,name FROM country");
		if($getCountriesStatement->execute())
		{
			$data["countries"] = array();
			$data["status"] = "Ok";
			$getCountriesStatement->store_result();
			$getCountriesStatement->bind_result($countryId, $name);
			while($getCountriesStatement->fetch())
			{
				$data["countries"][] = array("countryId" => $countryId, "name" => $name);
			}
			$getCountriesStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$getCountriesStatement->close();
		return $data;
	}
	
	public static function getCitiesOfCountry($meridyen, $countryId)
	{
		$data = array();
		$db = $meridyen->db;
		$getCitiesOfCountryStatement = $db->prepare("SELECT cityId,name FROM city WHERE countryId=?");
		$getCitiesOfCountryStatement->bind_param("d",$countryId);
		if($getCitiesOfCountryStatement->execute())
		{
			$data["status"] = "Ok";
			$getCitiesOfCountryStatement->store_result();
			$getCitiesOfCountryStatement->bind_result($cityId, $name);
			while($getCitiesOfCountryStatement->fetch())
			{
				$data["cities"][] = array("cityId" => $cityId, "name" => $name);
			}
			$getCitiesOfCountryStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$getCitiesOfCountryStatement->close();
		return $data;
	}
	
	public static function getBranchInformation($meridyen, $branchId)
	{
		$data = array();
		$db = $meridyen->db;
		$getCustomerBranchInformation = $db->prepare("SELECT type,address,county,cityId,countryId,website,email,phoneNumber1,phoneNumber2,
			phoneNumber3,fax,notes FROM customerbranch WHERE customerBranchId=?");
		$getCustomerBranchInformation->bind_param("d",$branchId);
		if($getCustomerBranchInformation->execute())
		{
			$data["status"] = "Ok";
			$getCustomerBranchInformation->store_result();
			$getCustomerBranchInformation->bind_result($type, $address, $county, $cityId, $countryId, $website, $email, $phoneNumber1,
				$phoneNumber2,$phoneNumber3,$fax,$notes);
			$getCustomerBranchInformation->fetch();
			$data["customerBranchInfo"] = array("type" => $type, "address" => $address, "county" => $county, "cityId" => $cityId,
				"countryId" => $countryId, "website" => $website, "email" => $email, "phoneNumber1" => $phoneNumber1,
				"phoneNumber2" => $phoneNumber2, "phoneNumber3" => $phoneNumber3, "fax" => $fax, "notes" => $notes);
			$getCustomerBranchInformation->free_result();
		}
		else
			$data["status"] = "Error";
		$getCustomerBranchInformation->close();
		return $data;
	}
	
	public static function addBranch($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$type = $postArray["type"];
		$address = $postArray["address"];
		$county = $postArray["county"];
		$cityId = $postArray["cityId"];
		$countryId = $postArray["countryId"];
		$website = $postArray["website"];
		$email = $postArray["email"];
		$phoneNumber1 = $postArray["phoneNumber1"];
		$phoneNumber2 = $postArray["phoneNumber2"];
		$phoneNumber3 = $postArray["phoneNumber3"];
		$fax = $postArray["fax"];
		$notes = $postArray["notes"];
		$customerId = $postArray["customerId"];
		
		$addBranchStatement = $db->prepare("INSERT INTO customerbranch(customerId,type,address,county,cityId,countryId,website,email,
			phoneNumber1,phoneNumber2,phoneNumber3,fax,notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$addBranchStatement->bind_param("dsssddsssssss",$customerId,$type,$address,$county,$cityId,$countryId,$website,$email,$phoneNumber1,$phoneNumber2
			,$phoneNumber3,$fax,$notes);
		if($addBranchStatement->execute())
		{
			$data["status"] = "Ok";
			$addBranchStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$addBranchStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
	
	public static function updateBranch($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$type = $postArray["type"];
		$address = $postArray["address"];
		$county = $postArray["county"];
		$cityId = $postArray["cityId"];
		$countryId = $postArray["countryId"];
		$website = $postArray["website"];
		$email = $postArray["email"];
		$phoneNumber1 = $postArray["phoneNumber1"];
		$phoneNumber2 = $postArray["phoneNumber2"];
		$phoneNumber3 = $postArray["phoneNumber3"];
		$fax = $postArray["fax"];
		$notes = $postArray["notes"];
		$branchId = $postArray["branchId"];
		
		$updateBranchStatement = $db->prepare("UPDATE customerbranch SET type=?,address=?,county=?,cityId=?,countryId=?,website=?,email=?,
			phoneNumber1=?,phoneNumber2=?,phoneNumber3=?,fax=?,notes=? WHERE customerBranchId=?");
		$updateBranchStatement->bind_param("sssddsssssssd",$type,$address,$county,$cityId,$countryId,$website,$email,$phoneNumber1,$phoneNumber2
			,$phoneNumber3,$fax,$notes,$branchId);
		if($updateBranchStatement->execute())
		{
			$data["status"] = "Ok";
			$updateBranchStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$updateBranchStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
}