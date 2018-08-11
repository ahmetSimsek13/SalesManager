$(editMT_init);

var editMT_coreURL = 'plugins/editMT/editMT_core.php';
var editMT_nameInput;
var editMT_surnameInput;
var editMT_emailInput;
var editMT_sectorSelect;
var editMT_maxLockInput; 
var editMT_mtSelect;
var editMT_accessLevelSelect;

function editMT_init()
{
	editMT_nameInput = document.getElementById("editMT_nameInput");
	editMT_surnameInput = document.getElementById("editMT_surnameInput");
	editMT_emailInput = document.getElementById("editMT_emailInput");
	editMT_sectorSelect = document.getElementById("editMT_sectorSelect");
	editMT_maxLockInput = document.getElementById("editMT_maxLockInput");
	editMT_mtSelect = document.getElementById("editMT_mtSelect");
	editMT_accessLevelSelect = document.getElementById("editMT_accessLevelSelect");
	
	$("#editMT_sectorSelect").selectmenu({maxHeight: 100});
	$("#editMT_mtSelect").selectmenu({maxHeight: 100});
	$("#editMT_accessLevelSelect").selectmenu({maxHeight: 100});
	$("#editMT_submitButton").button();
	
	editMT_getSectorsAndMts();
}

function editMT_getSectorsAndMts()
{
	$.ajax({
		url: editMT_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectorsAndMts',
		success: function(data)
		{
			editMT_setSelectContents(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editMT_setSelectContents(data)
{
	for(var i = 0; i < data.sectors.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.sectors[i].sectorId);
		newOption.innerHTML = data.sectors[i].description;
		editMT_sectorSelect.appendChild(newOption);
	}
	
	for(var i = 0; i < data.mts.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.mts[i].userId);
		newOption.innerHTML = data.mts[i].mtName;
		editMT_mtSelect.appendChild(newOption);
	}
	$("#editMT_sectorSelect").selectmenu({maxHeight: 100});
	$("#editMT_mtSelect").selectmenu({maxHeight: 100, select: editMT_mtSelectChanged});
}

function editMT_setInputsToDefaults()
{
	editMT_nameInput.value = "";
	editMT_surnameInput.value = "";
	editMT_emailInput.value = "";
	editMT_maxLockInput.value = "";
	$("#editMT_sectorSelect").selectmenu("value","-1");
	$("#editMT_mtSelect").selectmenu("value","-1");
	$("#editMT_accessLevelSelect").selectmenu("value","-1");
}

function editMT_openPopup()
{
	editMT_setInputsToDefaults();
	corePopupPlugin("editMT",{});
}

function editMT_mtSelectChanged(event, optionElement)
{
	var userId = optionElement.value;
	if(userId != -1)
	{
		$.ajax({
			url: editMT_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=getUserDetails&userId=' + userId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					editMT_nameInput.value = data.name;
					editMT_surnameInput.value = data.surname;
					editMT_emailInput.value = data.email;
					editMT_maxLockInput.value = data.maxLockCount;
					$("#editMT_sectorSelect").selectmenu("value",data.sectorId);
					$("#editMT_accessLevelSelect").selectmenu("value",data.accessLevel);
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
	else
	{
		editMT_setInputsToDefaults();
	}
}

function editMT_saveRecord()
{
	var name = editMT_nameInput.value;
	var surname = editMT_surnameInput.value;
	var email = editMT_emailInput.value;
	var maxLockCount = editMT_maxLockInput.value;
	var sectorId = $("#editMT_sectorSelect").selectmenu("value");
	var userId = $("#editMT_mtSelect").selectmenu("value");
	var accessLevel = $("#editMT_accessLevelSelect").selectmenu("value");
	
	if(userId == -1)
	{
		alert("Lütfen bir MT seçiniz.");
		return;
	}
	
	if(name == "" || surname == "" || email == "" || sectorId == -1 || maxLockCount == "" || accessLevel == -1)
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var postString = "name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname)
		+ "&email=" + encodeURIComponent(email) + "&sectorId=" + encodeURIComponent(sectorId) + "&maxLockCount=" + encodeURIComponent(maxLockCount)
		+ "&accessLevel=" + encodeURIComponent(accessLevel) + "&userId=" + encodeURIComponent(userId);
		
	$.ajax({
		url: editMT_coreURL + "?op=updateMT",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Müşteri temsilcisi başarıyla güncellenmiştir.");
				coreClosePopupWindow("editMT");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}