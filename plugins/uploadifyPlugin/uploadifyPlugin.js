$(uploadifyPlugin_init);

function uploadifyPlugin_init()
{
	//uploadifyPlugin_openPopup(1);
}

function uploadifyPlugin_openPopup(contractId)
{
	$('#file_upload').uploadify({
		'formData'     : {
			'contractId' : contractId
		},
		'buttonText': 'Dosya Seçiniz',
		'swf'      : 'plugins/uploadifyPlugin/uploadify.swf',
		'uploader' : 'plugins/uploadifyPlugin/uploadifyPlugin_core.php',
		'onUploadSuccess' : function(file, data, response) {
			alert(data);
			coreClosePopupWindow("uploadifyPlugin");
		}
	});
	corePopupPlugin("uploadifyPlugin",{});
}