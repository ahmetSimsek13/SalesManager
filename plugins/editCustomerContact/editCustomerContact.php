<?php
class editCustomerContact extends meridyen_plugin
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
			<div id="editCustomerContact_containerDiv">
				<div id="editCustomerContact_inputsContainer">
					<div class="editCustomerContact_inputDiv">
						<label class="editCustomerContact_label">İsim*:</label>
						<input class="editCustomerContact_input" id="editCustomerContact_nameInput" type="text"/>
					</div>
					<div class="editCustomerContact_inputDiv">
						<label class="editCustomerContact_label">Soyisim*:</label>
						<input class="editCustomerContact_input" id="editCustomerContact_surnameInput" type="text"/>
					</div>
					<div class="editCustomerContact_inputDiv">
						<label class="editCustomerContact_label">Ünvan:</label>
						<input class="editCustomerContact_input" id="editCustomerContact_titleInput" type="text"/>
					</div>
					<div class="editCustomerContact_inputDiv">
						<label class="editCustomerContact_label">Telefon:</label>
						<input class="editCustomerContact_input" id="editCustomerContact_phoneNumberInput" type="text"/>
					</div>
					<div class="editCustomerContact_inputDiv">
						<label class="editCustomerContact_label">E-mail:</label>
						<input class="editCustomerContact_input" id="editCustomerContact_emailInput" type="text"/>
					</div>
					<div class="editCustomerContact_inputDiv">
						<label class="editCustomerContact_label">Tip:</label>
						<div class="editCustomerContact_selectDiv">
							<select id="editCustomerContact_typeSelect" class="editCustomerContact_input">
								<option value="Merkez">Merkez</option>
								<option value="Şube">Şube</option>
								<option value="Depo">Depo</option>
							</select>
						</div>
					</div>
				</div>
				<div id="editCustomerContact_buttonContainer" style="margin-top: 5px;">
					<button id="editCustomerContact_submitButton" onclick="editCustomerContact_updateOrInsertCustomerContact()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/editCustomerContact/editCustomerContact.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/editCustomerContact/editCustomerContact.css";
		return $this->cssList;
	}
	
	public static function getContactInformation($meridyen, $contactId)
	{
		$data = array();
		$db = $meridyen->db;
		$getCustomerContactInformation = $db->prepare("SELECT name,surname,title,phone,branchType,emailAddress
			FROM customercontact WHERE customerContactId=?");
		$getCustomerContactInformation->bind_param("d",$contactId);
		if($getCustomerContactInformation->execute())
		{
			$data["status"] = "Ok";
			$getCustomerContactInformation->store_result();
			$getCustomerContactInformation->bind_result($name, $surname, $title, $phone, $branchType, $emailAddress);
			$getCustomerContactInformation->fetch();
			$data["customerContactInfo"] = array("name" => $name, "surname" => $surname, "title" => $title, "phone" => $phone,
				"branchType" => $branchType, "emailAddress" => $emailAddress);
			$getCustomerContactInformation->free_result();
		}
		else
			$data["status"] = "Error";
		$getCustomerContactInformation->close();
		return $data;
	}
	
	public static function addContact($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$branchType = $postArray["branchType"];
		$name = $postArray["name"];
		$surname = $postArray["surname"];
		$email = $postArray["email"];
		$title = $postArray["title"];
		$phoneNumber = $postArray["phoneNumber"];
		$customerId = $postArray["customerId"];
		
		$addContactStatement = $db->prepare("INSERT INTO customercontact(customerId,name,surname,title,phone,branchType,emailAddress) 
			VALUES(?,?,?,?,?,?,?)");
		$addContactStatement->bind_param("dssssss",$customerId,$name,$surname,$title,$phoneNumber,$branchType,$email);
		if($addContactStatement->execute())
		{
			$data["status"] = "Ok";
			$addContactStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$addContactStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
	
	public static function updateContact($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$branchType = $postArray["branchType"];
		$name = $postArray["name"];
		$surname = $postArray["surname"];
		$email = $postArray["email"];
		$title = $postArray["title"];
		$phoneNumber = $postArray["phoneNumber"];
		$contactId = $postArray["contactId"];
		
		$updateContactStatement = $db->prepare("UPDATE customercontact SET name=?,surname=?,title=?,phone=?,branchType=?,emailAddress=?
			WHERE customerContactId=?");
		$updateContactStatement->bind_param("ssssssd",$name,$surname,$title,$phoneNumber,$branchType,$emailAddress,$contactId);
		if($updateContactStatement->execute())
		{
			$data["status"] = "Ok";
			$updateContactStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$updateContactStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
}