<?php

defined( 'MASTER_PAGE' ) or die( 'Restricted access' );

class meridyen
{
	public $db;
	public $config;
	public $html;
	public $user;
	
	public function __construct()
	{
	}
	
	public function initHTML()
	{
		$this->html = new meridyen_html();	
		$this->html->addLinkCSS('core/css/jquery-ui-1.10.3.custom.css');
		$this->html->addLinkCSS('core/css/jquery.ui.selectmenu.css');
		$this->html->addLinkCSS('core/css/core.css');
		$this->html->addLinkCSS('core/css/superfish.css');
		
		$this->html->addLinkJS('core/js/jquery-1.9.1.js');
		$this->html->addLinkJS('core/js/jquery-ui-1.10.3.custom.min.js');
		$this->html->addLinkJS('core/js/jquery.ui.selectmenu.js');
		$this->html->addLinkJS('core/js/superfish.min.js');
		$this->html->addLinkJS('core/js/hoverIntent.js');
		$this->html->addLinkJS('core/js/amcharts/amcharts.js');
		$this->html->addLinkJS('core/js/amcharts/funnel.js');
		$this->html->addLinkJS('core/js/amcharts/gauge.js');
		$this->html->addLinkJS('core/js/amcharts/pie.js');
		$this->html->addLinkJS('core/js/amcharts/radar.js');
		$this->html->addLinkJS('core/js/amcharts/serial.js');
		$this->html->addLinkJS('core/js/amcharts/xy.js');
		$this->html->addLinkJS('core/js/jquery.uploadify.min.js');
		$this->html->addLinkJS('core/js/jquery.cookies.2.2.0.min.js');
		$this->html->addLinkJS('core/js/jquery.maskedinput.min.js');
		$this->html->addLinkJS('core/js/core.js');	
	}
	
	public function getScript()
	{
		
	}
}
?>
