<?php
define('MASTER_PAGE', 1);

require_once('core/inc/meridyen_setenv.php');
if($meridyen->user->accessLevel == 0)
{
	die();
}
$data = array();
$db = $meridyen->db;
download_send_headers("sozlesme_baslangic_" . $_GET["startDate"] . "_bitis_" . $_GET["endDate"] . "_fuarId_" . $_GET["fairId"]
	. "_userId_" . $_GET["userId"] . ".csv");
$startDateInput = $_GET["startDate"];
$startDateSplitted = explode("/",$startDateInput);
$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];
		
$endDateInput = $_GET["endDate"];
$endDateSplitted = explode("/",$endDateInput);
$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];
	
$queryString = "SELECT c.contractId FROM contract c, fair f
	WHERE f.fairId = c.fairId AND c.contractDate >= ? 
	AND c.contractDate <= ? AND c.confirmed = 1 AND c. cancelled = 0";

if($_GET["fairId"] != 0)
	$queryString .= " AND c.fairId=?";
if($_GET["userId"] != 0)
	$queryString .= " AND c.customerRepresentativeId=?";
$queryString .= " ORDER BY c.contractDate DESC";
		
$searchContractsStatement = $db->prepare($queryString);
if($_GET["fairId"] == 0 && $_GET["userId"] == 0)
{
	$searchContractsStatement->bind_param("ss", $startDateMerged, $endDateMerged);
}
else if($_GET["fairId"] == 0)
{
	$searchContractsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $_GET["userId"]);
}
else if($_GET["userId"] == 0)
{
	$searchContractsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $_GET["fairId"]);
}
else
{
	$searchContractsStatement->bind_param("ssdd", $startDateMerged, $endDateMerged, $_GET["fairId"], $_GET["userId"]);
}
		
if($searchContractsStatement->execute())
{
	$data["contracts"] = array();
	$searchContractsStatement->store_result();
	$searchContractsStatement->bind_result($contractId);
	while($searchContractsStatement->fetch())
	{
		$getContractInformation = $db->prepare("SELECT fairId, customerRepresentativeId, customerId, productGroup, shippingOption, standRequest,
			standArea, unitPrice, contractAmount, discountRate, discountAmount, kdvAmount, contractAmountWithKdv, extraCommitments,
			customerContactId,contractDate, extraNavlun, extraNavlunPrice, extraNavlunArea FROM contract WHERE contractId=?");
		$getContractInformation->bind_param("d",$contractId);
		
		if($getContractInformation->execute())
		{
			$getContractInformation->store_result();
			$getContractInformation->bind_result($fairId, $customerRepresentativeId, $customerId, $productGroup, $shippingOption, $standRequest,
				$standArea, $unitPrice, $contractAmount, $discountRate, $discountAmount, $kdvAmount,$contractAmountWithKdv, $extraCommitments,
				$customerContactId, $contractDate, $extraNavlun, $extraNavlunPrice, $extraNavlunArea);
			$getContractInformation->fetch();
			$contractDateSplitted = explode("-",$contractDate);
			$contractDateMerged = $contractDateSplitted[2] . "/" . $contractDateSplitted[1] . "/" . $contractDateSplitted[0];
			
			if($extraNavlun == 0)
				$extraNavlun = false;
			else
				$extraNavlun = true;
			if($shippingOption == 0)
			{
				$shippingOption = "Nakliyesiz";
			}
			else
			{
				$shippingOption = "Nakliyeli";
			}	
			
			if($standRequest == 0)
			{
				$standRequest = "Standsız";
			}
			else
			{
				$standRequest = "Standlı";
			}
			
			$getContractInformation->free_result();
			
			$getFairInfoStatement = $db->prepare("SELECT f.name,f.price,f.startDate,f.endDate FROM fair f 
				WHERE f.fairId=?");
			$getFairInfoStatement->bind_param("d",$fairId);
			$getFairInfoStatement->execute();
			$getFairInfoStatement->store_result();
			$getFairInfoStatement->bind_result($fairName, $price, $startDate, $endDate);
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
			
			$getFairInfoStatement->free_result();
			$getFairInfoStatement->close();
			
			$getCustomerInfoStatement = $db->prepare("SELECT title FROM customer WHERE customerId=?");
			$getCustomerInfoStatement->bind_param("d",$customerId);
			$getCustomerInfoStatement->execute();
			$getCustomerInfoStatement->store_result();
			$getCustomerInfoStatement->bind_result($title);
			$getCustomerInfoStatement->fetch();
			$getCustomerInfoStatement->free_result();
			$getCustomerInfoStatement->close();
			
			$getCustomerContactInfoStatement = $db->prepare("SELECT name, surname FROM customercontact WHERE customerContactId=?");
			$getCustomerContactInfoStatement->bind_param("d",$customerContactId);
			$getCustomerContactInfoStatement->execute();
			$getCustomerContactInfoStatement->store_result();
			$getCustomerContactInfoStatement->bind_result($contactName, $contactSurname);
			$getCustomerContactInfoStatement->fetch();
			$getCustomerContactInfoStatement->free_result();
			$getCustomerContactInfoStatement->close();
			
			$getCustomerRepresentativeInfoStatement = $db->prepare("SELECT u.name, u.surname, s.description FROM users u, sector s WHERE userId=? AND
				u.sectorId=s.sectorId");
			$getCustomerRepresentativeInfoStatement->bind_param("d",$customerRepresentativeId);
			$getCustomerRepresentativeInfoStatement->execute();
			$getCustomerRepresentativeInfoStatement->store_result();
			$getCustomerRepresentativeInfoStatement->bind_result($crName, $crSurname, $description);
			$getCustomerRepresentativeInfoStatement->fetch();
			$getCustomerRepresentativeInfoStatement->free_result();
			$getCustomerRepresentativeInfoStatement->close();
			
			$data["contracts"][] = array($contractId,$title,$productGroup,$shippingOption,$standRequest
				,$standArea,$unitPrice,$contractAmount,$discountRate
				,$discountAmount,$kdvAmount,$contractAmountWithKdv
				,$extraCommitments,$contractDateMerged,($crName . " " . $crSurname)
				,$description,$contactName . " " . $contactSurname,$fairName,$price
				,($fkName . " " . $fkSurname),$startDateMerged,$endDateMerged, $extraNavlun, $extraNavlunPrice, $extraNavlunArea);
		}
	}
	$searchContractsStatement->free_result();
}
$searchContractsStatement->close();
$arrHeader = array("Sözleşme ID", "Firma Ünvan", "Ürün Grubu", "Nakliye", "Stand İsteği", "Stand Alanı", "Birim Fiyat",
	"Sözleşme Tutar", "İndirim Oranı", "İndirim Tutarı", "Kdv Tutarı", "Kdvli Sözleşme Tutarı", "Ekstra Taahhütler",
	"Sözleşme Tarihi", "Müşteri Temsilcisi", "Sektör", "İrtibat Kurulan Kişi", "Fuar Adı", "Fuar Ücreti", "Fuar Sorumlu",
	"Fuar Başlangıç Tarihi", "Fuar Bitiş Tarihi", "Ekstra Navlun", "Ekstra Navlun Ücret", "Ekstra Navlun Alan");
outputCSV($arrHeader, $data["contracts"]);

function download_send_headers($filename) {
    // disable caching
	$now = gmdate("D, d M Y H:i:s");
    header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
    header("Last-Modified: {$now} GMT");
	header('Content-type: text/csv; charset=utf-8');

    // disposition / encoding on response body
    header("Content-Disposition: attachment;filename={$filename}");
    header("Content-Transfer-Encoding: binary");
}

function outputCSV($header,$data) {
    $output = fopen("php://output", "w");
	$bom = chr(239) . chr(187) . chr(191);
	fwrite($output, $bom);
	fputcsv($output, $header, ';');
    foreach ($data as $row) {
		for($i = 0; $i < count($row); $i++)
			$row[$i] = str_replace(".",",",$row[$i]);
        fputcsv($output, $row, ';');
    }
    fclose($output);
}

?>