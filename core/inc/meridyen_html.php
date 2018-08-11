<?php

define('MERIDYEN_LINK_CSS',	0);
define('MERIDYEN_LINK_JS',	1);
define('MERIDYEN_TEXT_CSS',	2);
define('MERIDYEN_TEXT_JS',	3);
define('MERIDYEN_PLAIN_TEXT',	4);

class meridyen_html
{
	private $body, $html;
	private $title, $icon;
	private $headerContent;
	private $encoding;
	
	public function __construct()
	{
		$this->headerContent = array();
		$this->encoding = 'utf-8';
	}
	
	public function setTitle($title)
	{
		$this->title = $title;
	}
	
	public function setEncoding($encoding)
	{
		$this->encoding = $encoding;
	}
	
	public function setFavicon($icon)
	{
		$this->icon = $icon;
	}
	
	public function addTextJS($JS)
	{
		$this->addHeaderContent($JS, MERIDYEN_TEXT_JS);	
	}
	
	public function addTextCSS($CSS)
	{
		$this->addHeaderContent($CSS, MERIDYEN_TEXT_CSS);
	}
	
	public function addLinkJS($JS)
	{
		$this->addHeaderContent($JS, MERIDYEN_LINK_JS);
	}
	
	public function addLinkCSS($CSS)
	{
		$this->addHeaderContent($CSS, MERIDYEN_LINK_CSS);
	}
		
	public function addBodyContent($content)
	{
		$this->body .= $content."\n";
	}
	
	public function addPlainHeaderContent($content)
	{
		$this->addHeaderContent($content, MERIDYEN_PLAIN_TEXT);
	}
	
	public function addPlugin($plugin)
	{
		$this->addLinkCSS($plugin->getCSS());
		$this->addLinkJS($plugin->getScript());
		$this->addBodyContent($plugin->getMainHTML());
	}
	
	private function addHeaderContent($content, $type)
	{
		if($content == NULL)
			return;
		
		if(is_array($content))
		{
			foreach($content as $cont)
				$this->headerContent[] = array('data' => $cont, 'type' => $type);
		}
		else
		{
			$this->headerContent[] = array('data' => $content, 'type' => $type);
		}	
	}
	
	private function buildHeaderContent()
	{
		$header = '';
		foreach($this->headerContent as $content)
		{
			switch($content['type'])
			{
				case MERIDYEN_LINK_CSS:
				$header .= '<link type="text/css" href="'.$content['data'].'" rel="stylesheet" />'."\n";
				break;
				
				case MERIDYEN_LINK_JS:
				$header .= '<script type="text/javascript" src="'.$content['data'].'"></script>'."\n";
				break;
				
				case MERIDYEN_TEXT_CSS:
				$header .= '<style>'."\n".$content['data'].'</style>'."\n";
				break;
				
				case MERIDYEN_TEXT_JS:
				$header .= '<script language="javascript">'."\n".$content['data'].'</script>'."\n";
				break;
				
				case MERIDYEN_PLAIN_TEXT:
				$header .= $content['data']."\n";
				break;
				
			}
		}
		
		return $header;
	}
	
	public function finalize()
	{
		//HEAD START
		$this->html = '<html>'."\n".'<head>'."\n";
		$this->html .= '<meta http-equiv="Content-Type" content="text/html; charset='.$this->encoding.'" />'."\n";
		$this->html .= '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
		if(strlen($this->icon) > 0)
			$this->html .= '<link rel="shortcut icon" href="'.$this->icon.'" />'."\n";
		$this->html .= '<title>'.$this->title.'</title>'."\n";
		
		$this->html .= $this->buildHeaderContent().'</head>'."\n";
		//BODY START
		$this->html .= '<body>'.$this->body.'</body>'."\n";
		$this->html .= '</html>';
	}
	
	public function getFinalHTML()
	{
		return $this->html;
	}
}


?>