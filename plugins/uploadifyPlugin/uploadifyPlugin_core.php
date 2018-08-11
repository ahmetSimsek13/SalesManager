<?php

define('MASTER_PAGE', 1);
require_once('../../core/inc/meridyen_setenv.php');

$targetFolder = '/meridyen/uploads'; // Relative to the root

if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
	$targetFile = rtrim($targetPath,'/') . '/' . $_POST["contractId"] . ".pdf";
	
	// Validate the file type
	$fileTypes = array('pdf'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes))
	{
		move_uploaded_file($tempFile,$targetFile);
		$data = uploadifyPlugin::setFileUploaded($meridyen,$_POST["contractId"]);
		if($data["status"])
			echo 'Dosya başarıyla kaydedildi.';
		else
			echo 'Bir hata oluştu, lütfen tekrar deneyiniz.';
	}
	else {
		echo 'Lütfen sadece pdf türü dosya gönderiniz.';
	}
}
?>