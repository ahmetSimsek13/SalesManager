$(newGY_init);

var newGY_coreURL = 'plugins/newGY/newGY_core.php';
var newGY_nameInput;
var newGY_surnameInput;
var newGY_emailInput;
var newGY_sectorSelect;
var newGY_maxLockInput; 

function newGY_init()
{
	newGY_nameInput = document.getElementById("newGY_nameInput");
	newGY_surnameInput = document.getElementById("newGY_surnameInput");
	newGY_emailInput = document.getElementById("newGY_emailInput");
	newGY_sectorSelect = document.getElementById("newGY_sectorSelect");
	newGY_maxLockInput = document.getElementById("newGY_maxLockInput");
	
	$("#newGY_sectorSelect").selectmenu({maxHeight: 100});
	$("#newGY_accessLevelSelect").selectmenu({maxHeight: 100});
	$("#newGY_submitButton").button();
	
	newGY_getSectors();
}

function newGY_getSectors()
{
	$.ajax({
		url: newGY_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectors',
		success: function(data)
		{
			newGY_setSelectContents(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function newGY_setSelectContents(data)
{
	for(var i = 0; i < data.sectors.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.sectors[i].sectorId);
		newOption.innerHTML = data.sectors[i].description;
		newGY_sectorSelect.appendChild(newOption);
	}
	$("#newGY_sectorSelect").selectmenu({maxHeight: 100});
}

function newGY_setInputsToDefaults()
{
	newGY_nameInput.value = "";
	newGY_surnameInput.value = "";
	newGY_emailInput.value = "";
	newGY_maxLockInput.value = "";
	$("#newGY_sectorSelect").selectmenu("value","-1");
	$("#newGY_accessLevelSelect").selectmenu("value","-1");
}

function newGY_openPopup()
{
	newGY_setInputsToDefaults();
	corePopupPlugin("newGY",{});
}

function newGY_saveRecord()
{
	var name = newGY_nameInput.value;
	var surname = newGY_surnameInput.value;
	var eMail = newGY_emailInput.value;
	var sectorId =  $("#newGY_sectorSelect").selectmenu("value");
	var accessLevel = $("#newGY_accessLevelSelect").selectmenu("value");
	var maxLock = newGY_maxLockInput.value;
	
	if(name == "" || surname == "" || eMail == "" || accessLevel == -1)
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var postString = "name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname)
		+ "&email=" + encodeURIComponent(eMail) + "&sectorId=" + encodeURIComponent(sectorId) + "&maxLock=" + encodeURIComponent(maxLock) + "&accessLevel=" + encodeURIComponent(accessLevel);
		
	$.ajax({
		url: newGY_coreURL + "?op=savenewGY",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Yeni yönetici başarıyla eklenmiştir.");
				coreClosePopupWindow("newGY");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}