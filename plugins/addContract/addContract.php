<?php
class addContract extends meridyen_plugin
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
			<div id="addContract_containerDiv">
				<div id="addContract_inputsContainer">
					<div id="addContract_leftDiv">
						<div class="addContract_inputDiv">
							<label class="addContract_label">Fuar Adı:</label>
							<div class="addContract_selectDiv">
								<select id="addContract_fairSelect" class="addContract_input">
									<option value="-1">Seçiniz</option>
								</select>
							</div>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Fuar Tarihi:</label>
							<input class="addContract_input" id="addContract_fairDateInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Proje Sorumlusu:</label>
							<input class="addContract_input" id="addContract_fairKeeperInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Müşteri Hizmetleri Sorumlusu:</label>
							<input class="addContract_input" id="addContract_customerRepresentativeInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">İndirimsiz Satış Fiyatı:</label>
							<input class="addContract_input" id="addContract_fairPriceInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Müşteri Temsilcisi Adı:</label>
							<div class="addContract_selectDiv">
								<select id="addContract_customerRepresentativeSelect" class="addContract_input" disabled="true">
									<option value="-1">Seçiniz</option>
								</select>
							</div>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">MT Grubu:</label>
							<div class="addContract_selectDiv">
								<select id="addContract_sectorSelect" class="addContract_input" disabled="true">
									<option value="-1">Seçiniz</option>
								</select>
							</div>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Katılımcı Firma Yetkili:</label>
							<div class="addContract_selectDiv">
								<select id="addContract_customerContactSelect" class="addContract_input">
									<option value="-1">Seçiniz</option>
								</select>
							</div>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Taksit Sayısı:</label>
							<input class="addContract_input" id="addContract_paymentCountInput" type="text"/>
						</div>
						<div id="addContract_paymentPlanDiv">
						</div>
					</div>
					<div id="addContract_rightDiv">
						<div class="addContract_inputDiv">
							<label class="addContract_label">Sözleşme Tarihi:</label>
							<input class="addContract_input" id="addContract_dateInput" type="text"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Ürün Grubu:</label>
							<input class="addContract_input" id="addContract_productGroupInput" type="text"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Nakliye Durumu:</label>
							<div class="addContract_selectDiv">
								<select id="addContract_shippingOptionSelect" class="addContract_input">
									<option value="-1">Seçiniz</option>
									<option value="0">Nakliyesiz</option>
									<option value="1">Nakliyeli</option>
								</select>
							</div>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Stand Durumu:</label>
							<div class="addContract_selectDiv">
								<select id="addContract_standRequestSelect" class="addContract_input">
									<option value="-1">Seçiniz</option>
									<option value="0">Standsız</option>
									<option value="1">Standlı</option>
								</select>
							</div>
						</div>
						<div id="addContract_extraNavlunDiv">
							<div class="addContract_inputDiv" style="text-align:left;">
								<label class="addContract_label">Ekstra Navlun:</label>
								<input type="checkbox" id="addContract_extraNavlunInput" onclick="addContract_extraNavlunCheckboxChanged();"/>
							</div>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Stand m<sup>2</sup>:</label>
							<input class="addContract_input" id="addContract_standAreaInput" type="text"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">m<sup>2</sup> Birim Fiyatı:</label>
							<input class="addContract_input" id="addContract_unitPriceInput" type="text"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Sözleşme Tutarı:</label>
							<input class="addContract_input" id="addContract_contractAmountInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">İndirim Oranı:</label>
							<input class="addContract_input" id="addContract_discountRateInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">İndirim Tutarı:</label>
							<input class="addContract_input" id="addContract_discountAmountInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">KDV Tutarı:</label>
							<input class="addContract_input" id="addContract_kdvAmountInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv">
							<label class="addContract_label">Sözleşme Bedeli(KDVli):</label>
							<input class="addContract_input" id="addContract_contractAmountWithKdvInput" type="text" disabled="true"/>
						</div>
						<div class="addContract_inputDiv" style="height:80px;">
							<label class="addContract_label">Ekstra Taahhütler:</label>
							<textarea id="addContract_extraCommitmentsInput" rows="5" style="resize:none;"></textarea>
						</div>
					</div>
				</div>
				<div id="addContract_buttonContainer" style="margin-top: 5px;">
					<button id="addContract_submitButton" onclick="addContract_saveContract()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/addContract/addContract.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/addContract/addContract.css";
		return $this->cssList;
	}
	
	public static function getFairs($meridyen, $customerId)
	{
		$data = array();
		$db = $meridyen->db;
		if($meridyen->user->accessLevel == 1)
		{
			$getFairsStatement = $db->prepare("SELECT fairId,name FROM fair WHERE sectorId=? ORDER BY startDate DESC");
			$getFairsStatement->bind_param("d",$meridyen->user->sectorId);
			if($getFairsStatement->execute())
			{
				$data["fairs"] = array();
				$data["status"] = "Ok";
				$getFairsStatement->store_result();
				$getFairsStatement->bind_result($fairId, $name);
				while($getFairsStatement->fetch())
				{
					$data["fairs"][] = array("fairId" => $fairId, "name" => $name);
				}
				$getFairsStatement->free_result();
			}
			else
				$data["status"] = "Error";
			$getFairsStatement->close();
		}
		else if($meridyen->user->accessLevel == 2 || $meridyen->user->accessLevel == 4)
		{
			$getFairsStatement = $db->prepare("SELECT f.fairId,f.name FROM fair f, customersectorrelation cs WHERE f.sectorId=cs.sectorId AND
				cs.customerId=? ORDER BY startDate DESC");
			$getFairsStatement->bind_param("d",$customerId);
			if($getFairsStatement->execute())
			{
				$data["fairs"] = array();
				$data["status"] = "Ok";
				$getFairsStatement->store_result();
				$getFairsStatement->bind_result($fairId, $name);
				while($getFairsStatement->fetch())
				{
					$data["fairs"][] = array("fairId" => $fairId, "name" => $name);
				}
				$getFairsStatement->free_result();
			}
			else
				$data["status"] = "Error";
			$getFairsStatement->close();
		}
		
		return $data;
	}
	
	public static function getCustomerRepresentatives($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$getUsersStatement = $db->prepare("SELECT userId,name,surname FROM users WHERE accessLevel!=3 AND active=1");
		if($getUsersStatement->execute())
		{
			$data["customerRepresentatives"] = array();
			$data["status"] = "Ok";
			$getUsersStatement->store_result();
			$getUsersStatement->bind_result($userId, $name, $surname);
			while($getUsersStatement->fetch())
			{
				$data["customerRepresentatives"][] = array("userId" => $userId, "name" => ($name . " " . $surname));
			}
			$data["selectedUserId"] = $meridyen->user->userId;
			$getUsersStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$getUsersStatement->close();
		return $data;
	}
	
	public static function getSectors($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$sectorId = $meridyen->user->sectorId;
		$getSectorInformationStatement = $db->prepare("SELECT sectorId,description FROM sector");
		if($getSectorInformationStatement->execute())
		{
			$data["sectors"] = array();
			$data["status"] = "Ok";
			$getSectorInformationStatement->store_result();
			$getSectorInformationStatement->bind_result($sectorId, $description);
			while($getSectorInformationStatement->fetch())
			{
				$data["sectors"][] = array("sectorId" => $sectorId, "description" => $description);
			}
			$getSectorInformationStatement->free_result();
			$data["selectedSectorId"] = $meridyen->user->sectorId;
		}
		$getSectorInformationStatement->close();
		return $data;
	}
	
	public static function getFairDetails($meridyen, $fairId)
	{
		$data = array();
		$db = $meridyen->db;
		$getFairDetailsStatement = $db->prepare("SELECT price,fairKeeperId,customerRepresentative,startDate,endDate FROM fair WHERE fairId=?");
		$getFairDetailsStatement->bind_param("d",$fairId);
		if($getFairDetailsStatement->execute())
		{
			$data["status"] = "Ok";
			$getFairDetailsStatement->store_result();
			$getFairDetailsStatement->bind_result($price, $fairKeeperId, $customerRepresentative, $startDate, $endDate);
			$getFairDetailsStatement->fetch();
			$data["price"] = $price;
			$data["startDate"] = $startDate;
			$data["endDate"] = $endDate;
			$data["customerRepresentative"] = $customerRepresentative;
			
			$getFairKeeperStatement = $db->prepare("SELECT name, surname FROM users WHERE userId=?");
			$getFairKeeperStatement->bind_param("d",$fairKeeperId);
			$getFairKeeperStatement->execute();
			$getFairKeeperStatement->store_result();
			$getFairKeeperStatement->bind_result($name, $surname);
			$getFairKeeperStatement->fetch();
			$data["fairKeeper"] = $name . " " . $surname;
			$getFairKeeperStatement->free_result();
			$getFairKeeperStatement->close();
			
			$getFairDetailsStatement->free_result();
		}
		$getFairDetailsStatement->close();
		return $data;
	}
	
	public static function getCustomerContacts($meridyen, $customerId)
	{
		$data = array();
		$db = $meridyen->db;
		$getCustomerContactsStatement = $db->prepare("SELECT customerContactId,name,surname FROM customercontact WHERE customerId=?");
		$getCustomerContactsStatement->bind_param("d",$customerId);
		if($getCustomerContactsStatement->execute())
		{
			$data["status"] = "Ok";
			$data["contacts"] = array();
			$getCustomerContactsStatement->store_result();
			$getCustomerContactsStatement->bind_result($customerContactId, $name, $surname);
			while($getCustomerContactsStatement->fetch())
			{
				$data["contacts"][] = array("contactId" => $customerContactId, "name" => ($name . " " . $surname));
			}
			$getCustomerContactsStatement->free_result();
		}
		$getCustomerContactsStatement->close();
		return $data;
	}
	
	public static function saveContract($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getCustomerLockStatement = $db->prepare("SELECT count(distinct(userId)) FROM customerlock WHERE untilDate >= curdate() AND customerId=? AND userId!=?");
		$getCustomerLockStatement->bind_param("dd",$postArray["customerId"], $meridyen->user->userId);
		$getCustomerLockStatement->execute();
		$getCustomerLockStatement->store_result();
		$getCustomerLockStatement->bind_result($lockCount);
		$getCustomerLockStatement->fetch();
		$getCustomerLockStatement->free_result();
		$getCustomerLockStatement->close();
		if($lockCount > 0)
		{
			$data["status"] = "lockError";
			return $data;
		}
		
		if($meridyen->user->accessLevel == 1)
			$confirmed = 0;
		else
			$confirmed = 1;
		
		$dateInput = $postArray["date"];
		$dateSplitted = explode("/",$dateInput);
		$dateMerged = $dateSplitted[2] . "-" . $dateSplitted[1] . "-" . $dateSplitted[0];
		$saveContractStatement = $db->prepare("INSERT INTO contract(fairId,customerRepresentativeId,customerId,productGroup,shippingOption,
			standRequest,standArea,unitPrice,contractAmount,discountRate,discountAmount,kdvAmount,contractAmountWithKdv
			,extraCommitments,customerContactId,contractDate,extraNavlun,extraNavlunPrice,extraNavlunArea,confirmed)
			VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$saveContractStatement->bind_param("dddsdddddddddsdsdddd",$postArray["fairId"],$meridyen->user->userId,$postArray["customerId"],
			$postArray["productGroup"], $postArray["shippingOption"], $postArray["standRequest"], $postArray["standArea"], 
			$postArray["unitPrice"], $postArray["contractAmount"], $postArray["discountRate"], $postArray["discountAmount"],
			$postArray["kdvAmount"], $postArray["contractAmountWithKdv"], $postArray["extraCommitments"],
			$postArray["customerContactId"],$dateMerged, $postArray["extraNavlunChecked"], $postArray["extraNavlunPrice"],
			$postArray["extraNavlunArea"],$confirmed);
		
		if($saveContractStatement->execute())
		{
			$contractId = $db->insert_id;
			$data["contract"] = $postArray["paymentCount"];
			for($i = 1; $i <= $postArray["paymentCount"]; $i++)
			{
				$ithPayment = $postArray[$i . "payment"];
				$ithDueDate = $postArray[$i . "dueDate"];
				$ithDueDateSplitted = explode("/",$ithDueDate);
				$ithDueDateMerged = $ithDueDateSplitted[2] . "-" . $ithDueDateSplitted[1] . "-" . $ithDueDateSplitted[0];
				$ithPaid = $postArray[$i . "paid"];
			
				$savePaymentStatement = $db->prepare("INSERT INTO contractpayments(contractId,amount,paymentOrder,dueDate,paid) VALUES(?,?,?,?,?)");
				$savePaymentStatement->bind_param("dddsd",$contractId, $ithPayment, $i, $ithDueDateMerged, $ithPaid);
				$savePaymentStatement->execute();
				$savePaymentStatement->close();
			}
		
			$saveLockStatement = $db->prepare("INSERT INTO customerlock(customerId,untilDate,userId,lockType) VALUES(?,DATE_ADD(?, INTERVAL 1 YEAR),?,2)");
			$saveLockStatement->bind_param("dsd",$postArray["customerId"], $dateMerged, $meridyen->user->userId);
			$saveLockStatement->execute();
			$saveLockStatement->close();
			$data["status"] = "Ok";
			$saveContractStatement->free_result();
		}
		$saveContractStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
}