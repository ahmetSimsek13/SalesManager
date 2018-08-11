<?php
define('MASTER_PAGE', 1);

require_once('core/inc/meridyen_setenv.php');
if($meridyen->user->accessLevel < 2)
{
	die();
}
$data = array();
$db = $meridyen->db;

download_send_headers("mt_istatistik_baslangic_" . $_GET["startDate"] . "_bitis_" . $_GET["endDate"] . "_mtID_" . $_GET["mtId"] . ".csv");
$data = array();
$db = $meridyen->db;

$fairIds = array();
$startDateInput = $_GET["startDate"];
$startDateSplitted = explode("/",$startDateInput);
$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];

$endDateInput = $_GET["endDate"];
$endDateSplitted = explode("/",$endDateInput);
$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];

$data["sozlesmesayi"] = array();
$contractCountStatement = $db->prepare("SELECT f.fairId, count(c.contractId) FROM contract c,fair f WHERE c.customerRepresentativeId=? AND contractDate>=? 
	AND contractDate <=? AND confirmed = 1 AND cancelled = 0 AND c.fairId=f.fairId GROUP BY f.fairId");
$contractCountStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($contractCountStatement->execute())
{
	$contractCountStatement->store_result();
	$contractCountStatement->bind_result($fairId,$contractCount);
	while($contractCountStatement->fetch())
	{
		$data["sozlesmesayi"][$fairId] = $contractCount;
		if(!in_array($fairId, $fairIds))
			$fairIds[] = $fairId;
	}
	$contractCountStatement->free_result();
}
$contractCountStatement->close();

$data["iptalsozlesmesayi"] = array();
$cancelledContractCountStatement = $db->prepare("SELECT f.fairId, count(c.contractId) FROM contract c,fair f WHERE c.customerRepresentativeId=? AND contractDate>=? 
	AND contractDate <=? AND cancelled = 1 AND c.fairId=f.fairId GROUP BY f.fairId");
$cancelledContractCountStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($cancelledContractCountStatement->execute())
{
	$cancelledContractCountStatement->store_result();
	$cancelledContractCountStatement->bind_result($fairId,$contractCount);
	while($cancelledContractCountStatement->fetch())
	{
		$data["iptalsozlesmesayi"][$fairId] = $contractCount;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$cancelledContractCountStatement->free_result();
}
$cancelledContractCountStatement->close();

$data["gorusmesayi"] = array();
$gorusmeCountStatement = $db->prepare("SELECT f.fairId,count(meetingId) FROM customermeeting c, fair f WHERE c.customerRepresentativeId=?
	AND f.fairId=c.fairId AND c.meetingType=0 AND meetingDate>=? 
	AND meetingDate <=? GROUP BY f.fairId");
$gorusmeCountStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($gorusmeCountStatement->execute())
{
	$gorusmeCountStatement->store_result();
	$gorusmeCountStatement->bind_result($fairId,$gorusmeCount);
	while($gorusmeCountStatement->fetch())
	{
		$data["gorusmesayi"][$fairId] = $gorusmeCount;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$gorusmeCountStatement->free_result();
}
$gorusmeCountStatement->close();

$data["randevusayi"] = array();
$randevuCountStatement = $db->prepare("SELECT f.fairId,count(meetingId) FROM customermeeting c, fair f WHERE c.customerRepresentativeId=?
	AND f.fairId=c.fairId AND c.meetingType=1 AND meetingDate>=? 
	AND meetingDate <=? GROUP BY f.fairId");
$randevuCountStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($randevuCountStatement->execute())
{
	$randevuCountStatement->store_result();
	$randevuCountStatement->bind_result($fairId,$gorusmeCount);
	while($randevuCountStatement->fetch())
	{
		$data["randevusayi"][$fairId] = $gorusmeCount;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$randevuCountStatement->free_result();
}
$randevuCountStatement->close();

$data["satism2"] = array();
$contractStandAreaStatement = $db->prepare("SELECT f.fairId,SUM(standArea) FROM contract c, fair f WHERE c.customerRepresentativeId=?
	AND c.fairId= f.fairId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY f.fairId");
$contractStandAreaStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($contractStandAreaStatement->execute())
{
	$contractStandAreaStatement->store_result();
	$contractStandAreaStatement->bind_result($fairId,$standArea);
	while($contractStandAreaStatement->fetch())
	{
		$data["satism2"][$fairId] = $standArea;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$contractStandAreaStatement->free_result();
}
$contractStandAreaStatement->close();

$data["iptalSatism2"] = array();
$cancelledContractStandAreaStatement = $db->prepare("SELECT f.fairId,SUM(standArea) FROM contract c, fair f WHERE c.customerRepresentativeId=?
	AND c.fairId= f.fairId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY f.fairId");
$cancelledContractStandAreaStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($cancelledContractStandAreaStatement->execute())
{
	$cancelledContractStandAreaStatement->store_result();
	$cancelledContractStandAreaStatement->bind_result($fairId,$standArea);
	while($cancelledContractStandAreaStatement->fetch())
	{
		$data["iptalSatism2"][$fairId] = $standArea;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$cancelledContractStandAreaStatement->free_result();
}
$cancelledContractStandAreaStatement->close();

$data["satisFiyat"] = array();
$contractPriceStatement = $db->prepare("SELECT f.fairId,SUM(contractAmountWithKdv) FROM contract c, fair f WHERE c.customerRepresentativeId=?
	AND c.fairId= f.fairId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY f.fairId");
$contractPriceStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($contractPriceStatement->execute())
{
	$contractPriceStatement->store_result();
	$contractPriceStatement->bind_result($fairId,$price);
	while($contractPriceStatement->fetch())
	{
		$data["satisFiyat"][$fairId] = $price;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$contractPriceStatement->free_result();
}
$contractPriceStatement->close();

$data["iptalSatisFiyat"] = array();
$cancelledContractPriceStatement = $db->prepare("SELECT f.fairId,SUM(contractAmountWithKdv) FROM contract c, fair f WHERE c.customerRepresentativeId=?
	AND c.fairId= f.fairId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY f.fairId");
$cancelledContractPriceStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($cancelledContractPriceStatement->execute())
{
	$cancelledContractPriceStatement->store_result();
	$cancelledContractPriceStatement->bind_result($fairId,$price);
	while($cancelledContractPriceStatement->fetch())
	{
		$data["iptalSatisFiyat"][$fairId] = $price;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$cancelledContractPriceStatement->free_result();
}
$cancelledContractPriceStatement->close();

$data["indirimTutar"] = array();
$contractDiscountAmountStatement = $db->prepare("SELECT f.fairId,SUM(discountAmount) FROM contract c, fair f WHERE c.customerRepresentativeId=?
	AND c.fairId= f.fairId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY f.fairId");
$contractDiscountAmountStatement->bind_param("dss", $_GET["mtId"], $startDateMerged, $endDateMerged);

if($contractDiscountAmountStatement->execute())
{
	$contractDiscountAmountStatement->store_result();
	$contractDiscountAmountStatement->bind_result($fairId,$discountAmount);
	while($contractDiscountAmountStatement->fetch())
	{
		$data["indirimTutar"][$fairId] = $discountAmount;
		if(!in_array($fairId,$fairIds))
			$fairIds[] = $fairId;
	}
	$contractDiscountAmountStatement->free_result();
}
$contractDiscountAmountStatement->close();

$getUserNameStatement = $db->prepare("SELECT name,surname FROM users where userId=?");
$getUserNameStatement->bind_param("d", $_GET["mtId"]);
$mtNameAndSurname = "";
if($getUserNameStatement->execute())
{
	$getUserNameStatement->store_result();
	$getUserNameStatement->bind_result($mtName, $mtSurname);
	$getUserNameStatement->fetch();
	$mtNameAndSurname = $mtName . " " . $mtSurname;
}
$getUserNameStatement->free_result();

$realData = array();
foreach($fairIds as $fairId)
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
	
	if(isset($data["sozlesmesayi"][$fairId]))
		$sozlesmesayi = floatval($data["sozlesmesayi"][$fairId]);
	
	if(isset($data["iptalsozlesmesayi"][$fairId]))
		$iptalsozlesmesayi = floatval($data["iptalsozlesmesayi"][$fairId]);
	
	if(isset($data["gorusmesayi"][$fairId]))
		$gorusmesayi = floatval($data["gorusmesayi"][$fairId]);
	
	if(isset($data["randevusayi"][$fairId]))
		$randevusayi = floatval($data["randevusayi"][$fairId]);
	
	if(isset($data["satism2"][$fairId]))
		$satism2 = floatval($data["satism2"][$fairId]);
		
	if(isset($data["iptalSatism2"][$fairId]))
		$iptalSatism2 = floatval($data["iptalSatism2"][$fairId]);
		
	if(isset($data["satisFiyat"][$fairId]))
		$satisFiyat = floatval($data["satisFiyat"][$fairId]);
		
	if(isset($data["iptalSatisFiyat"][$fairId]))
		$iptalSatisFiyat = floatval($data["iptalSatisFiyat"][$fairId]);
		
	if(isset($data["indirimTutar"][$fairId]))
		$indirimTutar = floatval($data["indirimTutar"][$fairId]);
	
	$fairNameStatement = $db->prepare("SELECT name FROM fair where fairId=?");
	$fairNameStatement->bind_param("d", $fairId);
	$fairName = "";
	if($fairNameStatement->execute())
	{
		$fairNameStatement->store_result();
		$fairNameStatement->bind_result($fairName);
		$fairNameStatement->fetch();
	}
	$fairNameStatement->free_result();
	
	$realData[] = array($_GET["mtId"], $mtNameAndSurname, $fairId, $fairName, $sozlesmesayi, $iptalsozlesmesayi, $gorusmesayi, $randevusayi, $satism2, $iptalSatism2, 
		$satisFiyat, $iptalSatisFiyat, $indirimTutar);
	
}
//var_dump($realData);
$arrHeader = array("MT ID", "MT İsim", "Fuar ID", "Fuar İsim", "Sözleşme Sayı", "İptal Edilen Sözleşme Sayı", "Görüşme Sayı", "Randevu Sayı", "Satış (m2)",
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
