<?php
if(!isset($_GET['op']))
	die();

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');

$jsonString;
$data = array();

switch($_GET['op'])
{
	case 'authenticate':
		$data = login::authenticateUser($meridyen, $_GET['mail'], $_GET['password']);
		$data['email'] = $meridyen->user->email;
		$data['loginIp'] = $meridyen->user->loginIP;
	break;
	
	case 'logout':
		$data = login::logout($meridyen);
	break;
	
	case "getMailAddress":
		$data['email'] = $meridyen->user->email;
		$data['accessLevel'] = $meridyen->user->accessLevel;
		$data['emptyPassword'] = $meridyen->user->emptyPassword;
		$data['passwordUpdate'] = $meridyen->user->passwordUpdate;
	break;
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>