<?php
session_start();
require_once 'meridyen_shared.php';

if (!defined('INSTALL_PATH')) {
  define('INSTALL_PATH', realpath(dirname(__FILE__)) . "/../../");
}
// make sure path_separator is defined
if (!defined('PATH_SEPARATOR')) {
  define('PATH_SEPARATOR', (strtoupper(substr(PHP_OS, 0, 3)) == 'WIN') ? ';' : ':');
}

$include_path = INSTALL_PATH . PATH_SEPARATOR;
$include_path.= INSTALL_PATH . 'core' . PATH_SEPARATOR;
$include_path.= INSTALL_PATH . 'core/lib' . PATH_SEPARATOR;
$include_path.= INSTALL_PATH . 'core/inc' . PATH_SEPARATOR;
$include_path.= INSTALL_PATH . 'config'. PATH_SEPARATOR;
$include_path.= ini_get('include_path');

if (set_include_path($include_path) === false) {
  die('Fatal error: ini_set/set_include_path does not work.');
}

//ini_set('error_reporting', E_ALL);
ini_set('session.name', 'meridyen_sessid');
ini_set('session.use_cookies', 1);
ini_set('session.use_only_cookies', 1);

//@set_time_limit(120);
date_default_timezone_set("Asia/Istanbul");

function meridyen_autoloader($classname)
{
	if(file_exists_incpath($classname. '.php'))
	{
		//CORE FILES
		include($classname. '.php');
	}
	else if(file_exists(INSTALL_PATH.'plugins/'.$classname.'/'.$classname.'.php'))
	{
		//PLUGINS
		include(INSTALL_PATH.'plugins/'.$classname.'/'.$classname.'.php');
	}
}

spl_autoload_register('meridyen_autoloader');

/**
 * Local callback function for PEAR errors
 */
require_once 'config.php';

$meridyen = new meridyen();
$meridyen->db = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
$meridyen->db ->set_charset("utf8");

if(!isset($_SESSION['meridyenuser']))
{
	$meridyen->user = new meridyen_user($meridyen);
	$_SESSION['meridyenuser'] = serialize($meridyen->user);
}
else
{
	$meridyen->user = unserialize($_SESSION['meridyenuser']);
	$meridyen->user->setRoot($meridyen);
}
?>