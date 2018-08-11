<?php
if(!isset($_GET['op']))
	die();

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');
$jsonString;
$data = array();

if($meridyen->user->accessLevel == 0)
{
	$data['status'] = 'userError';
}
else
{
	switch($_GET['op'])
	{
		case 'getFairs':
			$data = addContract::getFairs($meridyen, $_GET["customerId"]);
		break;
		case 'getCustomerRepresentatives':
			$data = addContract::getCustomerRepresentatives($meridyen);
		break;
		case 'getSectors':
			$data = addContract::getSectors($meridyen);
		break;
		case 'getFairDetails':
			$data = addContract::getFairDetails($meridyen, $_GET["fairId"]);
		break;
		case 'getCustomerContacts':
			$data = addContract::getCustomerContacts($meridyen, $_GET["customerId"]);
		break;
		case 'saveContract':
			$data = addContract::saveContract($meridyen, $_POST);
		break;
		
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>