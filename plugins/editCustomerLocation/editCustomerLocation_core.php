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
		case 'getCountries':
			$data = editCustomerLocation::getCountries($meridyen);
		break;
		case 'getCitiesOfCountry':
			$data = editCustomerLocation::getCitiesOfCountry($meridyen,$_GET["countryId"]);
		break;
		case 'getBranchInformation':
			$data = editCustomerLocation::getBranchInformation($meridyen, $_GET["branchId"]);
		break;
		case 'addBranch':
			$data = editCustomerLocation::addBranch($meridyen, $_POST);
		break;
		case 'updateBranch':
			$data = editCustomerLocation::updateBranch($meridyen, $_POST);
		break;
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>