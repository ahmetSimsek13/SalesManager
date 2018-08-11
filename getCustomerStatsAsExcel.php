<?php
define('MASTER_PAGE', 1);

require_once('core/inc/meridyen_setenv.php');
if($meridyen->user->accessLevel < 2)
{
	die();
}
$data = array();
$db = $meridyen->db;

download_send_headers("musteri_istatistik_baslangic_" . $_GET["startDate"] . "_bitis_" . $_GET["endDate"] . "_musteriID_" . $_GET["customerId"] . ".csv");
$data = array();
$db = $meridyen->db;

$mtNames = array();
$startDateInput = $_GET["startDate"];
$startDateSplitted = explode("/",$startDateInput);
$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];

$endDateInput = $_GET["endDate"];
$endDateSplitted = explode("/",$endDateInput);
$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];

$data["sozlesmesayi"] = array();
$contractCountStatement = $db->prepare("SELECT u.userId, count(c.contractId) FROM contract c,users u WHERE customerId=? AND contractDate>=? 
	AND contractDate <=? AND confirmed = 1 AND cancelled = 0 AND c.customerRepresentativeId=u.userId GROUP BY u.userId");
$contractCountStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($contractCountStatement->execute())
{
	$contractCountStatement->store_result();
	$contractCountStatement->bind_result($userId,$contractCount);
	while($contractCountStatement->fetch())
	{
		$data["sozlesmesayi"][$userId] = $contractCount;
		if(!in_array($userId, $mtNames))
			$mtNames[] = $userId;
	}
	$contractCountStatement->free_result();
}
$contractCountStatement->close();

$data["iptalsozlesmesayi"] = array();
$cancelledContractCountStatement = $db->prepare("SELECT u.userId, count(c.contractId) FROM contract c,users u WHERE customerId=? AND contractDate>=? 
	AND contractDate <=? AND cancelled = 1 AND c.customerRepresentativeId=u.userId GROUP BY u.userId");
$cancelledContractCountStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($cancelledContractCountStatement->execute())
{
	$cancelledContractCountStatement->store_result();
	$cancelledContractCountStatement->bind_result($userId,$contractCount);
	while($cancelledContractCountStatement->fetch())
	{
		$data["iptalsozlesmesayi"][$userId] = $contractCount;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$cancelledContractCountStatement->free_result();
}
$cancelledContractCountStatement->close();

$data["gorusmesayi"] = array();
$gorusmeCountStatement = $db->prepare("SELECT u.userId,count(meetingId) FROM customermeeting c, users u WHERE customerId=?
	AND u.userId=c.customerRepresentativeId AND c.meetingType=0 AND meetingDate>=? 
	AND meetingDate <=? AND c.customerRepresentativeId=u.userId GROUP BY u.userId");
$gorusmeCountStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($gorusmeCountStatement->execute())
{
	$gorusmeCountStatement->store_result();
	$gorusmeCountStatement->bind_result($userId,$gorusmeCount);
	while($gorusmeCountStatement->fetch())
	{
		$data["gorusmesayi"][$userId] = $gorusmeCount;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$gorusmeCountStatement->free_result();
}
$gorusmeCountStatement->close();

$data["randevusayi"] = array();
$randevuCountStatement = $db->prepare("SELECT u.userId,count(meetingId) FROM customermeeting c, users u WHERE customerId=?
	AND u.userId=c.customerRepresentativeId AND c.meetingType=1 AND meetingDate>=? 
	AND meetingDate <=? AND c.customerRepresentativeId=u.userId GROUP BY u.userId");
$randevuCountStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($randevuCountStatement->execute())
{
	$randevuCountStatement->store_result();
	$randevuCountStatement->bind_result($userId,$gorusmeCount);
	while($randevuCountStatement->fetch())
	{
		$data["randevusayi"][$userId] = $gorusmeCount;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$randevuCountStatement->free_result();
}
$randevuCountStatement->close();

$data["satism2"] = array();
$contractStandAreaStatement = $db->prepare("SELECT u.userId,SUM(standArea) FROM contract c, users u WHERE customerId=?
	AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY u.userId");
$contractStandAreaStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($contractStandAreaStatement->execute())
{
	$contractStandAreaStatement->store_result();
	$contractStandAreaStatement->bind_result($userId,$standArea);
	while($contractStandAreaStatement->fetch())
	{
		$data["satism2"][$userId] = $standArea;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$contractStandAreaStatement->free_result();
}
$contractStandAreaStatement->close();

$data["iptalSatism2"] = array();
$cancelledContractStandAreaStatement = $db->prepare("SELECT u.userId,SUM(standArea) FROM contract c, users u WHERE customerId=?
	AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY u.userId");
$cancelledContractStandAreaStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($cancelledContractStandAreaStatement->execute())
{
	$cancelledContractStandAreaStatement->store_result();
	$cancelledContractStandAreaStatement->bind_result($userId,$standArea);
	while($cancelledContractStandAreaStatement->fetch())
	{
		$data["iptalSatism2"][$userId] = $standArea;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$cancelledContractStandAreaStatement->free_result();
}
$cancelledContractStandAreaStatement->close();

$data["satisFiyat"] = array();
$contractPriceStatement = $db->prepare("SELECT u.userId,SUM(contractAmountWithKdv) FROM contract c, users u WHERE customerId=?
	AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY u.userId");
$contractPriceStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($contractPriceStatement->execute())
{
	$contractPriceStatement->store_result();
	$contractPriceStatement->bind_result($userId,$price);
	while($contractPriceStatement->fetch())
	{
		$data["satisFiyat"][$userId] = $price;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$contractPriceStatement->free_result();
}
$contractPriceStatement->close();

$data["iptalSatisFiyat"] = array();
$cancelledContractPriceStatement = $db->prepare("SELECT u.userId,SUM(contractAmountWithKdv) FROM contract c, users u WHERE customerId=?
	AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY u.userId");
$cancelledContractPriceStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($cancelledContractPriceStatement->execute())
{
	$cancelledContractPriceStatement->store_result();
	$cancelledContractPriceStatement->bind_result($userId,$price);
	while($cancelledContractPriceStatement->fetch())
	{
		$data["iptalSatisFiyat"][$userId] = $price;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$cancelledContractPriceStatement->free_result();
}
$cancelledContractPriceStatement->close();

$data["indirimTutar"] = array();
$contractDiscountAmountStatement = $db->prepare("SELECT u.userId,SUM(discountAmount) FROM contract c, users u WHERE customerId=?
	AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY u.userId");
$contractDiscountAmountStatement->bind_param("dss", $_GET["customerId"], $startDateMerged, $endDateMerged);

if($contractDiscountAmountStatement->execute())
{
	$contractDiscountAmountStatement->store_result();
	$contractDiscountAmountStatement->bind_result($userId,$discountAmount);
	while($contractDiscountAmountStatement->fetch())
	{
		$data["indirimTutar"][$userId] = $discountAmount;
		if(!in_array($userId,$mtNames))
			$mtNames[] = $userId;
	}
	$contractDiscountAmountStatement->free_result();
}
$contractDiscountAmountStatement->close();

$customerTitleStatement = $db->prepare("SELECT title FROM customer where customerId=?");
$customerTitleStatement->bind_param("d", $_GET["customerId"]);
$customerTitle = "";
if($customerTitleStatement->execute())
{
	$customerTitleStatement->store_result();
	$customerTitleStatement->bind_result($customerTitle);
	$customerTitleStatement->fetch();
}
$customerTitleStatement->free_result();

$realData = array();
foreach($mtNames as $mtName)
{
	$sozlesmesayi = 0;
	$iptalsozlesmesayi = 0; 
	$gorusmesayi = 0;
	$randevusayi = 0; 
	$satism2 = 0; 
	$iptalSatism2 = 0; 
	$satisFiyat = 0;
	$iptalSatisFiyat = 0;
	$indirimTutar = 0;
	
	if(isset($data["sozlesmesayi"][$mtName]))
		$sozlesmesayi = floatval($data["sozlesmesayi"][$mtName]);
	
	if(isset($data["iptalsozlesmesayi"][$mtName]))
		$iptalsozlesmesayi = floatval($data["iptalsozlesmesayi"][$mtName]);
	
	if(isset($data["gorusmesayi"][$mtName]))
		$gorusmesayi = floatval($data["gorusmesayi"][$mtName]);
	
	if(isset($data["randevusayi"][$mtName]))
		$randevusayi = floatval($data["randevusayi"][$mtName]);
	
	if(isset($data["satism2"][$mtName]))
		$satism2 = floatval($data["satism2"][$mtName]);
		
	if(isset($data["iptalSatism2"][$mtName]))
		$iptalSatism2 = floatval($data["iptalSatism2"][$mtName]);
		
	if(isset($data["satisFiyat"][$mtName]))
		$satisFiyat = floatval($data["satisFiyat"][$mtName]);
		
	if(isset($data["iptalSatisFiyat"][$mtName]))
		$iptalSatisFiyat = floatval($data["iptalSatisFiyat"][$mtName]);
		
	if(isset($data["indirimTutar"][$mtName]))
		$indirimTutar = floatval($data["indirimTutar"][$mtName]);
	
	$mtNameStatement = $db->prepare("SELECT name, surname FROM users where userId=?");
	$mtNameStatement->bind_param("d", $mtName);
	$mtRealName = "";
	if($mtNameStatement->execute())
	{
		$mtNameStatement->store_result();
		$mtNameStatement->bind_result($mtFirstName, $mtSurname);
		$mtNameStatement->fetch();
		$mtRealName = $mtFirstName . " " . $mtSurname;
	}
	$mtNameStatement->free_result();
	
	$realData[] = array($_GET["customerId"], $customerTitle, $mtName, $mtRealName, $sozlesmesayi, $iptalsozlesmesayi, $gorusmesayi, $randevusayi, $satism2, $iptalSatism2, 
		$satisFiyat, $iptalSatisFiyat, $indirimTutar);
	
}
//var_dump($realData);
$arrHeader = array("Firma ID", "Firma Ünvan", "MT ID", "MT İsim", "Sözleşme Sayı", "İptal Edilen Sözleşme Sayı", "Görüşme Sayı", "Randevu Sayı", "Satış (m2)",
	"İptal Edilen Satış (m2)", "Satış Fiyat", "İptal Edilen Satış Fiyat", "İndirim Tutarı");
outputCSV($arrHeader, $realData);

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
