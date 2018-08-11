<?php
//Shared functions
function file_exists_incpath ($file)
{
	$paths = explode(PATH_SEPARATOR, get_include_path());
	foreach ($paths as $path) 
	{
		// Formulate the absolute path
		$fullpath = $path . DIRECTORY_SEPARATOR . $file;
	
		// Check it
		if (file_exists($fullpath)) 
		{
			return $fullpath;
		}
	}
	
	return false;
}

function loadLibrary($library)
{
	require_once(INSTALL_PATH . 'core\inc\\' . $library . '.php');
}
?>