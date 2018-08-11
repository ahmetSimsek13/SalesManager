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
		case 'getContactInformation':
			$data = editCustomerContact::getContactInformation($meridyen, $_GET["contactId"]);
		break;
		case 'addContact':
			$data = editCustomerContact::addContact($meridyen, $_POST);
		break;
		case 'updateContact':
			$data = editCustomerContact::updateContact($meridyen, $_POST);
		break;
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>