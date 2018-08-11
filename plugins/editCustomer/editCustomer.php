<?php
class editCustomer extends meridyen_plugin
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
			<div id="editCustomer_containerDiv">
				<div id="editCustomer_inputsContainer">
					<div class="editCustomer_inputDiv">
						<label class="editCustomer_label">Ünvan:</label>
						<input class="editCustomer_input" id="editCustomer_titleInput" type="text"/>
					</div>
					<div class="editCustomer_inputDiv">
						<label class="editCustomer_label">Marka:</label>
						<input class="editCustomer_input" id="editCustomer_brandInput" type="text"/>
					</div>
					<div class="editCustomer_inputDiv">
						<label class="editCustomer_label">Vergi Dairesi:</label>
						<input class="editCustomer_input" id="editCustomer_taxOfficeInput" type="text"/>
					</div>
					<div class="editCustomer_inputDiv">
						<label class="editCustomer_label">Vergi No:</label>
						<input class="editCustomer_input" id="editCustomer_taxIdInput" type="text"/>
					</div>
				</div>
				<div id="editCustomer_buttonContainer" style="margin-top: 5px;">
					<button id="editCustomer_submitButton" onclick="editCustomer_updateCustomer()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/editCustomer/editCustomer.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/editCustomer/editCustomer.css";
		return $this->cssList;
	}
	
	public static function getCustomerInformation($meridyen, $customerId)
	{
		$data = array();
		$db = $meridyen->db;
		$getCustomerInformation = $db->prepare("SELECT title,taxOffice,taxId,brand FROM customer WHERE customerId=?");
		$getCustomerInformation->bind_param("d",$customerId);
		if($getCustomerInformation->execute())
		{
			$data["status"] = "Ok";
			$getCustomerInformation->store_result();
			$getCustomerInformation->bind_result($title, $taxOffice, $taxId, $brand);
			$getCustomerInformation->fetch();
			$data["customerInfo"] = array("title" => $title, "taxOffice" => $taxOffice, "taxId" => $taxId, "brand" => $brand);
			$getCustomerInformation->free_result();
		}
		else
			$data["status"] = "Error";
		$getCustomerInformation->close();
		return $data;
	}
	
	public static function updateCustomer($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$title = $postArray["title"];
		$brand = $postArray["brand"];
		$taxOffice = $postArray["taxOffice"];
		$taxId = $postArray["taxId"];
		$customerId = $postArray["customerId"];
		
		$updateCustomerStatement = $db->prepare("UPDATE customer SET title=?, taxOffice=?,taxId=?,brand=? WHERE customerId=?");
		$updateCustomerStatement->bind_param("ssssd",$title, $taxOffice,$taxId,$brand,$customerId);
		if($updateCustomerStatement->execute())
		{
			$data["status"] = "Ok";
			$updateCustomerStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$updateCustomerStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
}