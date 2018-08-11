<?php
if(!isset($_GET['op']))
	die();

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');
$jsonString;
$data = array();

if($meridyen->user->accessLevel != 4 && $meridyen->user->accessLevel != 3)
{
	$data['status'] = 'userError';
}
else
{
	switch($_GET['op'])
	{
		case 'getSelectContents':
			$data = editFair::getSelectContents($meridyen);
		break;
		
		case 'getFairs':
			$data = editFair::getFairs($meridyen);
		break;
		
		case 'getFairDetails':
			$data = editFair::getFairDetails($meridyen, $_GET["fairId"]);
		break;
		
		case 'getCitiesOfCountry':
			$data = editFair::getCitiesOfCountry($meridyen,$_GET["countryId"]);
		break;
		
		case 'updateFair':
			$data = editFair::updateFair($meridyen, $_POST);
		break;
		
		case 'deleteFair':
			$data = editFair::deleteFair($meridyen, $_GET["fairId"]);
		break;
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>