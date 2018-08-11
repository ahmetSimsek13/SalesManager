<?php
class uploadifyPlugin extends meridyen_plugin
{
	private $meridyen;
	
	public function __construct(&$meridyen)
    {
    	parent::__construct();
		$this->meridyen = $meridyen;
   	}
	
	public function getMainHTML()
	{
		return '
			<div id="uploadifyPlugin_containerDiv">
				<form>
					<div id="queue"></div>
					<input id="file_upload" name="file_upload" type="file" multiple="true">
				</form>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/uploadifyPlugin/uploadifyPlugin.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/uploadifyPlugin/uploadifyPlugin.css";
		return $this->cssList;
	}
	
	public static function setFileUploaded($meridyen, $contractId)
	{
		$data = array();
		$db = $meridyen->db;
		
		$updateContractStatement = $db->prepare("UPDATE contract SET pdfUploaded=1 WHERE contractId=?");
		$updateContractStatement->bind_param("d",$contractId);
		if($updateContractStatement->execute())
		{
			$data["status"] = true;
			$updateContractStatement->free_result();
		}
		else
			$data["status"] = false;
		$updateContractStatement->close();
		return $data;
	}
}