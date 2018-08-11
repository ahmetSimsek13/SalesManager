<?php
if(!isset($_GET['op']))
	die();

define('MASTER_PAGE', 1);
require_once('meridyen_setenv.php');
$data = array();
if(strcmp($meridyen->user->userName,"") == 0)
{
	$data['status'] = 'userError';
}
else
{
	switch($_GET['op'])
	{
		
	}
}

$jsonString = utf8_encode(json_encode($data));
echo $jsonString;
?>
