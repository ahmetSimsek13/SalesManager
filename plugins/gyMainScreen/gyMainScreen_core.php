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

	case 'saveNewCustomer':
		$data = gyMainScreen::saveNewCustomer($meridyen,$_POST);
	break;

	case 'getFairs':
		$data = gyMainScreen::getFairs($meridyen);
	break;
	
	case 'getCustomerRepresentatives':
		$data = gyMainScreen::getCustomerRepresentatives($meridyen);
	break;
	
	case 'searchCustomers':
		$data = gyMainScreen::searchCustomers($meridyen,$_POST);
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
	
	case 'confirmCustomer':
		$data = gyMainScreen::confirmCustomer($meridyen,$_GET["customerId"]);
	break;
	
	case 'getMyCustomers':
		$data = meridyen_common::getMyCustomers($meridyen);
	break;
	
	case 'searchContracts':
		$data = gyMainScreen::searchContracts($meridyen,$_POST);
	break;
	
	case 'getContractDetails':
		$data = gyMainScreen::getContractDetails($meridyen,$_GET["contractId"]);
	break;
	
	case 'searchMeetings':
		$data = gyMainScreen::searchMeetings($meridyen,$_POST);
	break;
	
	case 'searchCustomerMeetings':
		$data = gyMainScreen::searchCustomerMeetings($meridyen,$_POST);
	break;
	
	case 'searchCustomerContracts':
		$data = gyMainScreen::searchCustomerContracts($meridyen,$_POST);
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
	
	case 'getWaitingCustomers':
		$data = gyMainScreen::getWaitingCustomers($meridyen);
	break;
	
	case 'getWaitingContracts':
		$data = gyMainScreen::getWaitingContracts($meridyen);
	break;
	
	case 'confirmContract':
		$data = gyMainScreen::confirmContract($meridyen,$_GET["contractId"]);
	break;
	
	case 'cancelContract':
		$data = gyMainScreen::cancelContract($meridyen,$_GET["contractId"]);
	break;
	
	case 'getNotLockedCustomers':
		$data = gyMainScreen::getNotLockedCustomers($meridyen);
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