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
			$data = addMeeting::getFairs($meridyen, $_GET["customerId"]);
		break;
		case 'getCustomerContacts':
			$data = addMeeting::getCustomerContacts($meridyen, $_GET["customerId"]);
		break;
		case 'saveMeeting':
			$data = addMeeting::saveMeeting($meridyen, $_POST);
		break;
		
		case 'getMTRemainingLockCount':
			$data = addMeeting::getMTRemainingLockCount($meridyen, $_GET["customerId"]);
		break;
		
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>