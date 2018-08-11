<?php
if(!isset($_GET['op']))
	die();	

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');

$jsonString;
$data = array();

switch($_GET['op'])
{
	case 'getSectors':
		$data = meridyen_common::getSectors($meridyen);
	break;
	
	case 'getCountries':
		$data = meridyen_common::getCountries($meridyen);
	break;
	
	case 'getCitiesOfCountry':
		$data = meridyen_common::getCitiesOfCountry($meridyen,$_GET["countryId"]);
	break;

	case 'getFairs':
		$data = suMainScreen::getFairs($meridyen);
	break;
	
	case 'getCustomerRepresentatives':
		$data = suMainScreen::getCustomerRepresentatives($meridyen);
	break;
	
	case 'searchCustomers':
		$data = suMainScreen::searchCustomers($meridyen,$_POST);
	break;
	
	case 'getCustomerDetails':
		$data = meridyen_common::getCustomerDetails($meridyen,$_GET["customerId"]);
	break;
	
	case 'searchContracts':
		$data = suMainScreen::searchContracts($meridyen,$_POST);
	break;
	
	case 'getContractDetails':
		$data = suMainScreen::getContractDetails($meridyen,$_GET["contractId"]);
	break;
	
	case 'searchMeetings':
		$data = suMainScreen::searchMeetings($meridyen,$_POST);
	break;
	
	case 'searchCustomerMeetings':
		$data = suMainScreen::searchCustomerMeetings($meridyen,$_POST);
	break;
	
	case 'searchCustomerContracts':
		$data = suMainScreen::searchCustomerContracts($meridyen,$_POST);
	break;
	
	case 'getAllCustomers':
		$data = meridyen_common::getAllCustomers($meridyen);
	break;
	
	case 'getCustomerStats':
		$data = meridyen_common::getCustomerStats($meridyen,$_POST);
	break;
	
	case 'getMTStats':
		$data = meridyen_common::getMTStats($meridyen,$_POST);
	break;
	
	case 'getFairStats':
		$data = meridyen_common::getFairStats($meridyen,$_POST);
	break;
	
	case 'getGroupStats':
		$data = meridyen_common::getGroupStats($meridyen,$_POST);
	break;
	
	case 'getMTLockedCustomers':
		$data = meridyen_common::getMTLockedCustomers($meridyen,$_GET["mtId"], $_GET["lockType"]);
	break;
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>