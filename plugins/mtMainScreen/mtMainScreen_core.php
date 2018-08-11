<?php
if(!isset($_GET['op']))
	die();	

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');

$jsonString;
$data = array();

switch($_GET['op'])
{
	case 'getSectorInformation':
		$data = meridyen_common::getSectorInformation($meridyen);
	break;
	
	case 'getCountries':
		$data = meridyen_common::getCountries($meridyen);
	break;
	
	case 'getCitiesOfCountry':
		$data = meridyen_common::getCitiesOfCountry($meridyen,$_GET["countryId"]);
	break;

	case 'saveNewCustomer':
		$data = mtMainScreen::saveNewCustomer($meridyen,$_POST);
	break;

	case 'getFairs':
		$data = mtMainScreen::getFairs($meridyen);
	break;
	
	case 'getCustomerRepresentatives':
		$data = mtMainScreen::getCustomerRepresentatives($meridyen);
	break;
	
	case 'searchCustomers':
		$data = mtMainScreen::searchCustomers($meridyen,$_POST);
	break;
	
	case 'getCustomerDetails':
		$data = meridyen_common::getCustomerDetails($meridyen,$_GET["customerId"]);
	break;
	
	case 'deleteCustomerContact':
		$data = meridyen_common::deleteCustomerContact($meridyen,$_GET["customerContactId"]);
	break;
	
	case 'deleteCustomerBranch':
		$data = meridyen_common::deleteCustomerBranch($meridyen,$_GET["branchId"]);
	break;
	
	case 'deleteCustomer':
		$data = meridyen_common::deleteCustomer($meridyen,$_GET["customerId"]);
	break;
	
	case 'getMyCustomers':
		$data = meridyen_common::getMyCustomers($meridyen);
	break;
	
	case 'searchContracts':
		$data = mtMainScreen::searchContracts($meridyen,$_POST);
	break;
	
	case 'getContractDetails':
		$data = mtMainScreen::getContractDetails($meridyen,$_GET["contractId"]);
	break;
	
	case 'searchMeetings':
		$data = mtMainScreen::searchMeetings($meridyen,$_POST);
	break;
	
	case 'searchCustomerMeetings':
		$data = mtMainScreen::searchCustomerMeetings($meridyen,$_POST);
	break;
	
	case 'searchCustomerContracts':
		$data = mtMainScreen::searchCustomerContracts($meridyen,$_POST);
	break;
	
	case 'unlockCustomer':
		$data = meridyen_common::unlockCustomer($meridyen,$_GET["customerId"]);
	break;
	
	case 'getFairCustomers':
		$data = meridyen_common::getFairCustomers($meridyen,$_GET["fairId"]);
	break;
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>