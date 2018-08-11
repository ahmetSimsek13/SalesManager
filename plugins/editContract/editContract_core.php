<?php
if(!isset($_GET['op']))
	die();

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');
$jsonString;
$data = array();

if($meridyen->user->accessLevel != 4)
{
	$data['status'] = 'userError';
}
else
{
	switch($_GET['op'])
	{
		case 'getContractDetails':
			$data = editContract::getContractDetails($meridyen, $_GET["contractId"]);
		break;
		case 'updateContract':
			$data = editContract::updateContract($meridyen, $_POST);
		break;
		
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>