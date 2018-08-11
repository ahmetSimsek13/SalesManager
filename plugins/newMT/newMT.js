$(newMT_init);

var newMT_coreURL = 'plugins/newMT/newMT_core.php';
var newMT_nameInput;
var newMT_surnameInput;
var newMT_emailInput;
var newMT_sectorSelect;
var newMT_maxLockInput; 

function newMT_init()
{
	newMT_nameInput = document.getElementById("newMT_nameInput");
	newMT_surnameInput = document.getElementById("newMT_surnameInput");
	newMT_emailInput = document.getElementById("newMT_emailInput");
	newMT_sectorSelect = document.getElementById("newMT_sectorSelect");
	newMT_maxLockInput = document.getElementById("newMT_maxLockInput");
	
	$("#newMT_sectorSelect").selectmenu({maxHeight: 100});
	$("#newMT_submitButton").button();
	
	newMT_getSectors();
}

function newMT_getSectors()
{
	$.ajax({
		url: newMT_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectors',
		success: function(data)
		{
			newMT_setSelectContents(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function newMT_setSelectContents(data)
{
	for(var i = 0; i < data.sectors.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.sectors[i].sectorId);
		newOption.innerHTML = data.sectors[i].description;
		newMT_sectorSelect.appendChild(newOption);
	}
	$("#newMT_sectorSelect").selectmenu({maxHeight: 100});
}

function newMT_setInputsToDefaults()
{
	newMT_nameInput.value = "";
	newMT_surnameInput.value = "";
	newMT_emailInput.value = "";
	newMT_maxLockInput.value = "";
	$("#newMT_sectorSelect").selectmenu("value","-1");
}

function newMT_openPopup()
{
	newMT_setInputsToDefaults();
	corePopupPlugin("newMT",{});
}

function newMT_saveRecord()
{
	var name = newMT_nameInput.value;
	var surname = newMT_surnameInput.value;
	var eMail = newMT_emailInput.value;
	var sectorId =  $("#newMT_sectorSelect").selectmenu("value");
	var maxLock = newMT_maxLockInput.value;
	
	if(name == "" || surname == "" || eMail == "" || sectorId == -1 || maxLock == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var postString = "name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname)
		+ "&email=" + encodeURIComponent(eMail) + "&sectorId=" + encodeURIComponent(sectorId) + "&maxLock=" + encodeURIComponent(maxLock);
		
	$.ajax({
		url: newMT_coreURL + "?op=saveNewMT",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Yeni müşteri temsilcisi başarıyla eklenmiştir.");
				coreClosePopupWindow("newMT");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}