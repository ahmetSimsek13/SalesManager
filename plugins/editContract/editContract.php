<?php
class editContract extends meridyen_plugin
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
			<div id="editContract_containerDiv">
				<div id="editContract_inputsContainer">
					<div id="editContract_leftDiv">
						<div class="editContract_inputDiv">
							<label class="editContract_label">Fuar Adı:</label>
							<input class="editContract_input" id="editContract_fairNameInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Fuar Tarihi:</label>
							<input class="editContract_input" id="editContract_fairDateInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Proje Sorumlusu:</label>
							<input class="editContract_input" id="editContract_fairKeeperInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Müşteri Hizmetleri Sorumlusu:</label>
							<input class="editContract_input" id="editContract_fairCustomerRepresentativeInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">İndirimsiz Satış Fiyatı:</label>
							<input class="editContract_input" id="editContract_fairPriceInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Müşteri Temsilcisi Adı:</label>
							<input class="editContract_input" id="editContract_customerRepresentativeInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">MT Grubu:</label>
							<input class="editContract_input" id="editContract_mtSectorInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Katılımcı Firma Yetkili:</label>
							<input class="editContract_input" id="editContract_customerContactInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Taksit Sayısı:</label>
							<input class="editContract_input" id="editContract_paymentCountInput" type="text"/>
						</div>
						<div id="editContract_paymentPlanDiv">
						</div>
					</div>
					<div id="editContract_rightDiv">
						<div class="editContract_inputDiv">
							<label class="editContract_label">Sözleşme Tarihi:</label>
							<input class="editContract_input" id="editContract_dateInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Ürün Grubu:</label>
							<input class="editContract_input" id="editContract_productGroupInput" type="text"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Nakliye Durumu:</label>
							<div class="editContract_selectDiv">
								<select id="editContract_shippingOptionSelect" class="editContract_input">
									<option value="-1">Seçiniz</option>
									<option value="0">Nakliyesiz</option>
									<option value="1">Nakliyeli</option>
								</select>
							</div>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Stand Durumu:</label>
							<div class="editContract_selectDiv">
								<select id="editContract_standRequestSelect" class="editContract_input">
									<option value="-1">Seçiniz</option>
									<option value="0">Standsız</option>
									<option value="1">Standlı</option>
								</select>
							</div>
						</div>
						<div id="editContract_extraNavlunDiv">
							<div class="editContract_inputDiv" style="text-align:left;">
								<label class="editContract_label">Ekstra Navlun:</label>
								<input type="checkbox" id="editContract_extraNavlunInput"/>
							</div>
							<div class="editContract_inputDiv" id="editContract_extraNavlunInput1Div" style="height:40px;">
								<label class="editContract_label">Ekstra Navlun Miktar (m<sup>3</sup>):</label>
								<input class="editContract_input" id="editContract_navlunAreaInput" type="text"/>
							</div>
							<div class="editContract_inputDiv" id="editContract_extraNavlunInput2Div" style="height:40px;">
								<label class="editContract_label">Ekstra Navlun <br> Fiyat:</label>
								<input class="editContract_input" id="editContract_navlunPriceInput" type="text"/>
							</div>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Stand m<sup>2</sup>:</label>
							<input class="editContract_input" id="editContract_standAreaInput" type="text"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">m<sup>2</sup> Birim Fiyatı:</label>
							<input class="editContract_input" id="editContract_unitPriceInput" type="text"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Sözleşme Tutarı:</label>
							<input class="editContract_input" id="editContract_contractAmountInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">İndirim Oranı:</label>
							<input class="editContract_input" id="editContract_discountRateInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">İndirim Tutarı:</label>
							<input class="editContract_input" id="editContract_discountAmountInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">KDV Tutarı:</label>
							<input class="editContract_input" id="editContract_kdvAmountInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv">
							<label class="editContract_label">Sözleşme Bedeli(KDVli):</label>
							<input class="editContract_input" id="editContract_contractAmountWithKdvInput" type="text" disabled="true"/>
						</div>
						<div class="editContract_inputDiv" style="height:80px;">
							<label class="editContract_label">Ekstra Taahhütler:</label>
							<textarea id="editContract_extraCommitmentsInput" rows="5" style="resize:none;"></textarea>
						</div>
					</div>
				</div>
				<div id="editContract_buttonContainer" style="margin-top: 5px;">
					<button id="editContract_submitButton" onclick="editContract_saveContract()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/editContract/editContract.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/editContract/editContract.css";
		return $this->cssList;
	}
	
	public static function getContractDetails($meridyen, $contractId)
	{
		$data = array();
		$db = $meridyen->db;
		$getContractInformation = $db->prepare("SELECT fairId, customerRepresentativeId, customerId, productGroup, shippingOption, standRequest,
			standArea, unitPrice, contractAmount, discountRate, discountAmount, kdvAmount, contractAmountWithKdv, extraCommitments,
			customerContactId,contractDate, extraNavlun, extraNavlunArea, extraNavlunPrice, pdfUploaded FROM contract WHERE contractId=?");
		$getContractInformation->bind_param("d",$contractId);
		
		if($getContractInformation->execute())
		{
			$data["status"] = "Ok";
			$getContractInformation->store_result();
			$getContractInformation->bind_result($fairId, $customerRepresentativeId, $customerId, $productGroup, $shippingOption, $standRequest,
				$standArea, $unitPrice, $contractAmount, $discountRate, $discountAmount, $kdvAmount,$contractAmountWithKdv, $extraCommitments,
				$customerContactId, $contractDate, $extraNavlun, $extraNavlunArea, $extraNavlunPrice, $pdfUploaded);
			$getContractInformation->fetch();
			$contractDateSplitted = explode("-",$contractDate);
			$contractDateMerged = $contractDateSplitted[2] . "/" . $contractDateSplitted[1] . "/" . $contractDateSplitted[0];
			
			if($extraNavlun == 0)
				$extraNavlun = false;
			else
				$extraNavlun = true;
			
			$data["generalInfo"] = array("productGroup" => $productGroup, "shippingOption" => $shippingOption, "standRequest" => $standRequest
				, "standArea" => $standArea, "unitPrice" => $unitPrice, "contractAmount" => $contractAmount, "discountRate" => $discountRate
				, "discountAmount" => $discountAmount, "kdvAmount" => $kdvAmount, "contractAmountWithKdv" => $contractAmountWithKdv
				, "extraCommitments" => $extraCommitments, "contractDate" => $contractDateMerged, "extraNavlun" => $extraNavlun
				, "extraNavlunArea" => $extraNavlunArea, "extraNavlunPrice" => $extraNavlunPrice);
			$getContractInformation->free_result();
			
			$getFairInfoStatement = $db->prepare("SELECT f.name,f.price,f.customerRepresentative,f.startDate,f.endDate FROM fair f 
				WHERE f.fairId=?");
			$getFairInfoStatement->bind_param("d",$fairId);
			$getFairInfoStatement->execute();
			$getFairInfoStatement->store_result();
			$getFairInfoStatement->bind_result($fairName, $price, $customerRepresentative, $startDate, $endDate);
			$getFairInfoStatement->fetch();
			
			$startDateSplitted = explode("-",$startDate);
			$startDateMerged = $startDateSplitted[2] . "/" . $startDateSplitted[1] . "/" . $startDateSplitted[0];
			
			$endDateSplitted = explode("-",$endDate);
			$endDateMerged = $endDateSplitted[2] . "/" . $endDateSplitted[1] . "/" . $endDateSplitted[0];
			
			$fkName = "";
			$fkSurname = "";
			$getFairKeeperInfoStatement = $db->prepare("SELECT u.name,u.surname FROM fair f, users u
				WHERE f.fairId=? AND f.fairKeeperId=u.userId");
			$getFairKeeperInfoStatement->bind_param("d",$fairId);
			$getFairKeeperInfoStatement->execute();
			$getFairKeeperInfoStatement->store_result();
			$getFairKeeperInfoStatement->bind_result($fkName, $fkSurname);
			$getFairKeeperInfoStatement->fetch();
			$getFairKeeperInfoStatement->free_result();
			$getFairKeeperInfoStatement->close();
			
			$data["fairInfo"] = array("fairName" => $fairName, "price" => $price, "mtName" => ($customerRepresentative)
				, "fkName" => ($fkName . " " . $fkSurname), "startDate" => $startDateMerged, "endDate" => $endDateMerged);
			$getFairInfoStatement->free_result();
			$getFairInfoStatement->close();
			
			$getCustomerInfoStatement = $db->prepare("SELECT title FROM customer WHERE customerId=?");
			$getCustomerInfoStatement->bind_param("d",$customerId);
			$getCustomerInfoStatement->execute();
			$getCustomerInfoStatement->store_result();
			$getCustomerInfoStatement->bind_result($title);
			$getCustomerInfoStatement->fetch();
			
			$data["customerTitle"] = $title;
			$getCustomerInfoStatement->free_result();
			$getCustomerInfoStatement->close();
			
			$getCustomerContactInfoStatement = $db->prepare("SELECT name, surname FROM customercontact WHERE customerContactId=?");
			$getCustomerContactInfoStatement->bind_param("d",$customerContactId);
			$getCustomerContactInfoStatement->execute();
			$getCustomerContactInfoStatement->store_result();
			$getCustomerContactInfoStatement->bind_result($contactName, $contactSurname);
			$getCustomerContactInfoStatement->fetch();
			$data["customerContactName"] = $contactName . " " . $contactSurname;
			$getCustomerContactInfoStatement->free_result();
			$getCustomerContactInfoStatement->close();
			
			$getCustomerRepresentativeInfoStatement = $db->prepare("SELECT u.name, u.surname, s.description FROM users u, sector s WHERE userId=? AND
				u.sectorId=s.sectorId");
			$getCustomerRepresentativeInfoStatement->bind_param("d",$customerRepresentativeId);
			$getCustomerRepresentativeInfoStatement->execute();
			$getCustomerRepresentativeInfoStatement->store_result();
			$getCustomerRepresentativeInfoStatement->bind_result($crName, $crSurname, $description);
			$getCustomerRepresentativeInfoStatement->fetch();
			$data["customerRepresentativeInfo"] = array("name" => ($crName . " " . $crSurname), "sector" => $description);
			$getCustomerRepresentativeInfoStatement->free_result();
			$getCustomerRepresentativeInfoStatement->close();
			
			$getPaymentsStatement = $db->prepare("SELECT amount, dueDate, paid FROM contractpayments WHERE contractId=? ORDER BY paymentOrder ASC");
			$getPaymentsStatement->bind_param("d",$contractId);
			$getPaymentsStatement->execute();
			$getPaymentsStatement->store_result();
			$getPaymentsStatement->bind_result($paymentAmount, $paymentDueDate, $paymentPaid);
			$data["payments"] = array();
			while($getPaymentsStatement->fetch())
			{
				$paymentDueDateSplitted = explode("-",$paymentDueDate);
				$paymentDueDateMerged = $paymentDueDateSplitted[2] . "/" . $paymentDueDateSplitted[1] . "/" . $paymentDueDateSplitted[0];
				
				if($paymentPaid == 1)
					$paymentPaid = true;
				else
					$paymentPaid = false;
				
				$data["payments"][] = array("paymentAmount" => $paymentAmount, "paymentDueDate" => $paymentDueDateMerged, "paymentPaid" => $paymentPaid);
			}
			$getPaymentsStatement->free_result();
			$getPaymentsStatement->close();
		}
		else
			$data["status"] = "Error";
		$getContractInformation->close();
		return $data;
	}
	
	public static function updateContract($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$updateContractStatement = $db->prepare("UPDATE contract SET productGroup = ?,shippingOption = ?,
			standRequest = ?, standArea = ?, unitPrice = ?,contractAmount = ?,discountRate = ?,discountAmount = ?,
			kdvAmount = ?,contractAmountWithKdv = ?,extraCommitments = ?,extraNavlun = ?,extraNavlunPrice = ?,extraNavlunArea = ? WHERE contractId=?");
		$updateContractStatement->bind_param("sdddddddddsdddd",$postArray["productGroup"], $postArray["shippingOption"], 
			$postArray["standRequest"], $postArray["standArea"], $postArray["unitPrice"], $postArray["contractAmount"], 
			$postArray["discountRate"], $postArray["discountAmount"],
			$postArray["kdvAmount"], $postArray["contractAmountWithKdv"], $postArray["extraCommitments"],
			$postArray["extraNavlunChecked"], $postArray["extraNavlunPrice"],
			$postArray["extraNavlunArea"],$postArray["contractId"]);
		
		if($updateContractStatement->execute())
		{
			$deletePaymentStatement = $db->prepare("DELETE FROM contractpayments WHERE contractId=?");
			$deletePaymentStatement->bind_param("d",$postArray["contractId"]);
			$deletePaymentStatement->execute();
			$deletePaymentStatement->close();
			
			for($i = 1; $i <= $postArray["paymentCount"]; $i++)
			{
				$ithPayment = $postArray[$i . "payment"];
				$ithDueDate = $postArray[$i . "dueDate"];
				$ithDueDateSplitted = explode("/",$ithDueDate);
				$ithDueDateMerged = $ithDueDateSplitted[2] . "-" . $ithDueDateSplitted[1] . "-" . $ithDueDateSplitted[0];
				$ithPaid = $postArray[$i . "paid"];
			
				$savePaymentStatement = $db->prepare("INSERT INTO contractpayments(contractId,amount,paymentOrder,dueDate,paid) VALUES(?,?,?,?,?)");
				$savePaymentStatement->bind_param("dddsd",$postArray["contractId"], $ithPayment, $i, $ithDueDateMerged, $ithPaid);
				$savePaymentStatement->execute();
				$savePaymentStatement->close();
			}
			
			$data["status"] = "Ok";
			$updateContractStatement->free_result();
		}
		$updateContractStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
}