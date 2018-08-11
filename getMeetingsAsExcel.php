<?php
define('MASTER_PAGE', 1);

require_once('core/inc/meridyen_setenv.php');
if($meridyen->user->accessLevel == 0)
{
	die();
}
$data = array();
$db = $meridyen->db;

download_send_headers("gorusmeverandevu_baslangic_" . $_GET["startDate"] . "_bitis_" . $_GET["endDate"] . "_fuarId_" . $_GET["fairId"]
	. "_userId_" . $_GET["userId"] . ".csv");
$startDateInput = $_GET["startDate"];
$startDateSplitted = explode("/",$startDateInput);
$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];

$endDateInput = $_GET["endDate"];
$endDateSplitted = explode("/",$endDateInput);
$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];

$queryString = "SELECT c.meetingId, c.topic, c.description, c.meetingDate, c.meetingType, b.title, f.name, u.name, u.surname
	FROM customermeeting c, fair f, customer b, users u
	WHERE b.customerId = c.customerId AND f.fairId = c.fairId AND u.userId = c.customerRepresentativeId AND c.meetingDate >= ? 
	AND c.meetingDate <= ?";

if($_GET["fairId"] != 0)
	$queryString .= " AND c.fairId=?";
if($_GET["userId"] != 0)
	$queryString .= " AND c.customerRepresentativeId=?";
$queryString .= " ORDER BY c.meetingDate DESC";

$searchMeetingsStatement = $db->prepare($queryString);

if($_GET["fairId"] == 0 && $_GET["userId"] == 0)
{
	$searchMeetingsStatement->bind_param("ss", $startDateMerged, $endDateMerged);
}
else if($_GET["fairId"] == 0)
{
	$searchMeetingsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $_GET["userId"]);
}
else if($_GET["userId"] == 0)
{
	$searchMeetingsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $_GET["fairId"]);
}
else
{
	$searchMeetingsStatement->bind_param("ssdd", $startDateMerged, $endDateMerged, $_GET["fairId"], $_GET["userId"]);
}

if($searchMeetingsStatement->execute())
{
	$data["status"] = "Ok";
	$data["meetings"] = array();
	$searchMeetingsStatement->store_result();
	$searchMeetingsStatement->bind_result($meetingId, $topic, $description, $meetingDate, $meetingType, $customerTitle, $fairName,
		$mtName, $mtSurname);
	while($searchMeetingsStatement->fetch())
	{
		$meetingDateSplitted = explode("-",$meetingDate);
		$meetingDateMerged = $meetingDateSplitted[2] . "/" . $meetingDateSplitted[1] . "/" . $meetingDateSplitted[0];
		
		if($meetingType == 0)
			$meetingType = "Görüşme";
		else
			$meetingType = "Randevu";
		
		$data["meetings"][] = array("meetingId" => $meetingId, "topic" => $topic, "description" => $description, "meetingDate" => $meetingDateMerged
			, "customerTitle" => $customerTitle, "fairName" => $fairName, "mtName" => ($mtName . " " . $mtSurname), "meetingType" => $meetingType);
	}
	$searchMeetingsStatement->free_result();
}
$searchMeetingsStatement->close();
$arrHeader = array("ID", "Konu", "Açıklama", "Tarih", "Firma Ünvan", "Fuar Adı", "Müşteri Temsilcisi",
	"Tür");
outputCSV($arrHeader, $data["meetings"]);

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