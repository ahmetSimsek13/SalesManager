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
		case 'getCustomerInformation':
			$data = editCustomer::getCustomerInformation($meridyen, $_GET["customerId"]);
		break;
		case 'updateCustomer':
			$data = editCustomer::updateCustomer($meridyen, $_POST);
		break;
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>