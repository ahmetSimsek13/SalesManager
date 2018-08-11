<?php
if(!isset($_GET['op']))
	die();

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');
$jsonString;
$data = array();

if($meridyen->user->accessLevel != 3)
{
	$data['status'] = 'userError';
}
else
{
	switch($_GET['op'])
	{
		case 'getSectors':
			$data = newGY::getSectors($meridyen);
		break;
		
		case 'savenewGY':
			$data = newGY::savenewGY($meridyen, $_POST);
		break;
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>