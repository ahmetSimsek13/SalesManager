<?php
if(!isset($_GET['op']))
	die();

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');
$jsonString;
$data = array();

if($meridyen->user->accessLevel != 2)
{
	$data['status'] = 'userError';
}
else
{
	switch($_GET['op'])
	{
		case 'getSectors':
			$data = newMT::getSectors($meridyen);
		break;
		
		case 'saveNewMT':
			$data = newMT::saveNewMT($meridyen, $_POST);
		break;
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>