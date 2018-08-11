<?php
define('MASTER_PAGE', 1);

require_once('core/inc/meridyen_setenv.php');
if($meridyen->user->accessLevel == 0)
{
	die();
}
$data = array();
$db = $meridyen->db;

download_send_headers("mt_portföy_userId_" . $_GET["userId"] . ".csv");

$mtNameStatement = $db->prepare("SELECT name, surname FROM users where userId=?");
$mtNameStatement->bind_param("d", $_GET["userId"]);
$mtRealName = "";
if($mtNameStatement->execute())
{
	$mtNameStatement->store_result();
	$mtNameStatement->bind_result($mtFirstName, $mtSurname);
	$mtNameStatement->fetch();
	$mtRealName = $mtFirstName . " " . $mtSurname;
}
$mtNameStatement->free_result();
$mtNameStatement->close();

$contractQueryString = "SELECT c.title, co.contractDate, co.confirmed, co.cancelled FROM customer c, contract co WHERE co.customerId=c.customerId 
	AND co.customerRepresentativeId = ? ORDER BY co.contractDate DESC;";
$contractStatement = $db->prepare($contractQueryString);
$contractStatement->bind_param("d", $_GET["userId"]);

if($contractStatement->execute())
{
	$contractStatement->store_result();
	$contractStatement->bind_result($title, $contractDate, $confirmed, $cancelled);
	while($contractStatement->fetch())
	{
		$contractDateSplitted = explode("-",$contractDate);
		$contractDateMerged = $contractDateSplitted[2] . "/" . $contractDateSplitted[1] . "/" . $contractDateSplitted[0];
		$tur = "Sözleşme";
		if($cancelled == 1)
		{
			$tur = "İptal Edilmiş " . $tur;
		}
		else if($confirmed == 0)
		{
			$tur = "Onaylanmamış " . $tur;
		}
		else
			$tur = "Onaylanmış " . $tur;
		
		$data[] = array($_GET["userId"], $mtRealName, $title, $contractDateMerged, $tur);
	}
	$contractStatement->free_result();
}
$contractStatement->close();


$gorusmeQueryString = "SELECT c.title, cm.meetingDate FROM customer c, customermeeting cm WHERE cm.customerId=c.customerId 
	AND cm.customerRepresentativeId = ? AND cm.meetingType = 0 ORDER BY cm.meetingDate DESC;";
$gorusmeStatement = $db->prepare($gorusmeQueryString);
$gorusmeStatement->bind_param("d", $_GET["userId"]);

if($gorusmeStatement->execute())
{
	$gorusmeStatement->store_result();
	$gorusmeStatement->bind_result($title, $meetingDate);
	while($gorusmeStatement->fetch())
	{
		$meetingDateSplitted = explode("-",$meetingDate);
		$meetingDateMerged = $meetingDateSplitted[2] . "/" . $meetingDateSplitted[1] . "/" . $meetingDateSplitted[0];
		
		$data[] = array($_GET["userId"], $mtRealName, $title, $meetingDateMerged, "Görüşme");
	}
	$gorusmeStatement->free_result();
}
$gorusmeStatement->close();

$randevuQueryString = "SELECT c.title, cm.meetingDate FROM customer c, customermeeting cm WHERE cm.customerId=c.customerId 
	AND cm.customerRepresentativeId = ? AND cm.meetingType = 1 ORDER BY cm.meetingDate DESC;";
$randevuStatement = $db->prepare($randevuQueryString);
$randevuStatement->bind_param("d", $_GET["userId"]);

if($randevuStatement->execute())
{
	$randevuStatement->store_result();
	$randevuStatement->bind_result($title, $meetingDate);
	while($randevuStatement->fetch())
	{
		$meetingDateSplitted = explode("-",$meetingDate);
		$meetingDateMerged = $meetingDateSplitted[2] . "/" . $meetingDateSplitted[1] . "/" . $meetingDateSplitted[0];
		
		$data[] = array($_GET["userId"], $mtRealName, $title, $meetingDateMerged, "Randevu");
	}
	$randevuStatement->free_result();
}
$randevuStatement->close();



$arrHeader = array("MT ID", "MT İsim Soyisim", "Firma Ünvanı", "Tarih", "Tür");
outputCSV($arrHeader, $data);

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