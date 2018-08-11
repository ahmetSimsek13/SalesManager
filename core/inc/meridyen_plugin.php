<?php

abstract class meridyen_plugin
{
	private $cssList;
	private $scriptList;
	
	function __construct()
	{
		$this->cssList = array();
		$this->scriptList = array();
	}
    abstract public function getMainHTML();
    abstract public function getScript();
	abstract public function getCss();
}


?>