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
		case 'getMts':
			$data = deleteMT::getMts($meridyen);
		break;
		
		case 'getUserDetails':
			$data = deleteMT::getUserDetails($meridyen, $_GET["userId"]);
		break;
		
		case 'deleteRecord':
			$data = deleteMT::deleteRecord($meridyen, $_GET["userId"]);
		break;
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>