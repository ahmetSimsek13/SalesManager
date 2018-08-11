$(document).ready(coreInit);

var regTimerFunctions;
var coreURL = 'core/inc/ets_core.php';
var corePopupList;
var coreDebug = true;

function coreInit()
{
	regTimerFunctions = new Array();
	corePopupList = new Array();
	coreSetPopupWindow("login", $('#login_holder'), true, $('#login_holder'), 320, "Giriş Ekranı", false, false, false);
	coreSetPopupWindow("newFair", $('#newFair_holder'), true, $('#newFair_holder'), 600, "Fuar Giriş Ekranı", false, true, true);
	coreSetPopupWindow("editFair", $('#editFair_holder'), true, $('#editFair_holder'), 600, "Fuar Düzenleme Ekranı", false, true, true);
	coreSetPopupWindow("showFairs", $('#showFairs_holder'), true, $('#showFairs_holder'), 900, "Fuar Görüntüleme Ekranı", false, true, true);
	coreSetPopupWindow("newMT", $('#newMT_holder'), true, $('#newMT_holder'), 600, "Müşteri Temsilcisi Giriş Ekranı", false, true, true);
	coreSetPopupWindow("newGY", $('#newGY_holder'), true, $('#newGY_holder'), 600, "Grup Yöneticisi Giriş Ekranı", false, true, true);
	coreSetPopupWindow("passwordPlugin", $('#passwordPlugin_holder'), true, $('#passwordPlugin_holder'), 400, "Şifre Belirleme Ekranı", false, true, true);
	coreSetPopupWindow("editCustomer", $('#editCustomer_holder'), true, $('#editCustomer_holder'), 600, "Müşteri Düzenleme Ekranı", false, true, true);
	coreSetPopupWindow("editCustomerLocation", $('#editCustomerLocation_holder'), true, $('#editCustomerLocation_holder'), 600, 
		"Şube Düzenleme Ekranı", false, true, true);
	coreSetPopupWindow("editCustomerContact", $('#editCustomerContact_holder'), true, $('#editCustomerContact_holder'), 600, 
		"Kişi Düzenleme Ekranı", false, true, true);
	coreSetPopupWindow("addContract", $('#addContract_holder'), true, $('#addContract_holder'), 900, 
		"Sözleşme Düzenleme Ekranı", false, true, true);
	coreSetPopupWindow("addMeeting", $('#addMeeting_holder'), true, $('#addMeeting_holder'), 900, 
		"Görüşme Düzenleme Ekranı", false, true, true);
	
	coreSetPopupWindow("uploadifyPlugin", $('#uploadifyPlugin_holder'), true, $('#uploadifyPlugin_holder'), 200, 
		"Dosya Ekleme Ekranı", false, true, true);
	coreSetPopupWindow("editContract", $('#editContract_holder'), true, $('#editContract_holder'), 900, 
		"Sözleşme Düzenleme Ekranı", false, true, true);
	coreSetPopupWindow("editMT", $('#editMT_holder'), true, $('#editMT_holder'), 600, "Müşteri Temsilcisi Düzenleme Ekranı", false, true, true);
	coreSetPopupWindow("deleteMT", $('#deleteMT_holder'), true, $('#deleteMT_holder'), 600, "Müşteri Temsilcisi Silme Ekranı", false, true, true);
	$("#loginEpostaTextInput").cookieBind();
	$("#loginEpostaTextInput").cookify();
	$('#loginEpostaTextInput').cookieFill();
}

function corePopupPlugin(pluginName, parameters)
{
	for(i = 0; i < corePopupList.length; i++)
	{
		if(corePopupList[i].pluginName == pluginName)
		{
			$(corePopupList[i].paramDiv).attr(parameters);
			var pluginFound = false;
			for(z = 0; z < regTimerFunctions.length; z++)
			{
							
				if(regTimerFunctions[z].pluginName == pluginName)
				{
					pluginFound = true;
					regTimerFunctions[z].fp();
					break;
				}
			}
			corePopupList[i].popup.dialog('open');
			break;
		}
	}
}

function coreClosePopupWindow(pluginName)
{
	for(i = 0; i < corePopupList.length; i++)
	{
		if(corePopupList[i].pluginName == pluginName)
		{
			corePopupList[i].popup.dialog("close");
			break;
		}
	}
}

function coreSetPopupWindow(pluginName, popupDiv, isModal, paramDiv, pwidth, caption, resizable, draggable, closeable)
{
	var newPopup = new Object();
	newPopup.pluginName = pluginName;
	newPopup.div = popupDiv;
	newPopup.paramDiv = paramDiv;
	
	var resize = resizable;
	var drag = draggable;
	var isclosable = closeable;
	var onescapeclose = true;
	
	if(isclosable == null)
		isclosable = true;
		
	if(resize == null)
		resize = true;
	if(drag == null)
		drag = true;
	
	if(!isclosable)
	{
		isclosable = function(event, ui) { $(".ui-dialog-titlebar-close").hide(); };
		onescapeclose = false;
	}
	else	
		isclosable = function(event, ui) { $(".ui-dialog-titlebar-close").show(); };
	
	if(pluginName=="newRecord")
	{
		newPopup.popup = $(popupDiv).dialog({
			bgiframe: true,
			autoOpen: false,
			height: 'auto',
			width: pwidth,
			title: caption,
			modal: isModal,
			resizable: resize,
			draggable: drag,
			open: isclosable,
			closeOnEscape: onescapeclose,
			zIndex:990,
			close: function( event, ui ) {
				newRecord_popupClosed();
			}
		});
	}
	else
	{
		newPopup.popup = $(popupDiv).dialog({
			bgiframe: true,
			autoOpen: false,
			height: 'auto',
			width: pwidth,
			title: caption,
			modal: isModal,
			resizable: resize,
			draggable: drag,
			open: isclosable,
			closeOnEscape: onescapeclose,
			zIndex:990
		});
	}
	
	corePopupList.push(newPopup);
}

function coreCheckWhetherLogin()
{
	$.ajax({
		url: login_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: 'op=getMailAddress',
		success: function(data)
		{
			if(data.email == '')
				corePopupPlugin('login',{});
			else if(data.emptyPassword)
				passwordPlugin_openPopup();
			else if(data.passwordUpdate)
			{
				document.getElementById("passwordPlugin_infoDiv").innerHTML = "Şifrenizi son değiştirmenizin üzerinden 3 ay geçmiş bulunmaktadır. Lütfen yeni bir şifre belirleyiniz.";
				passwordPlugin_openPopup();
			}
		}
	});
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}