$(editFair_init);

var editFair_coreURL = 'plugins/editFair/editFair_core.php';
var editFair_fairNameInput;
var editFair_fairStartDateInput;
var editFair_fairEndDateInput;
var editFair_countryInput;
var editFair_cityInput;
var editFair_fairTypeInput;
var editFair_sectorSelect;
var editFair_fairPriceInput;
var editFair_fairKeeperSelect;
var editFair_customerRepresentativeInput;
var editFair_fairSelect;
var editFair_lastFairId;

function editFair_init()
{
	editFair_fairNameInput = document.getElementById("editFair_fairNameInput");
	editFair_fairStartDateInput = document.getElementById("editFair_fairStartDateInput");
	editFair_fairEndDateInput = document.getElementById("editFair_fairEndDateInput");
	editFair_countryInput = document.getElementById("editFair_countryInput");
	editFair_cityInput = document.getElementById("editFair_cityInput");
	editFair_fairTypeInput = document.getElementById("editFair_fairTypeInput");
	editFair_sectorSelect = document.getElementById("editFair_sectorSelect");
	editFair_fairPriceInput = document.getElementById("editFair_fairPriceInput");
	editFair_fairKeeperSelect = document.getElementById("editFair_fairKeeperSelect");
	editFair_customerRepresentativeInput = document.getElementById("editFair_customerRepresentativeInput");
	editFair_fairSelect = document.getElementById("editFair_fairSelect");
	
	$("#editFair_fairSelect").selectmenu({maxHeight: 100, select: editFair_fairChanged});
	$("#editFair_sectorSelect").selectmenu({maxHeight: 100});
	$("#editFair_fairKeeperSelect").selectmenu({maxHeight: 100});
	$(".editFair_submitButton").button();
	$("#editFair_fairStartDateInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#editFair_fairEndDateInput").datepicker({dateFormat: "dd/mm/yy"});
	
	editFair_getSelectContents();
}

function editFair_getSelectContents()
{
	$.ajax({
		url: editFair_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSelectContents',
		success: function(data)
		{
			editFair_setSelectContents(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editFair_setSelectContents(data)
{
	for(var i = 0; i < data.sectors.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.sectors[i].sectorId);
		newOption.innerHTML = data.sectors[i].description;
		editFair_sectorSelect.appendChild(newOption);
	}
	$("#editFair_sectorSelect").selectmenu({maxHeight: 100});
	
	for(var i = 0; i < data.users.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.users[i].userId);
		newOption.innerHTML = data.users[i].fullname;
		editFair_fairKeeperSelect.appendChild(newOption);
	}
	$("#editFair_fairKeeperSelect").selectmenu({maxHeight: 100});
}

function editFair_getFairs()
{
	$.ajax({
		url: editFair_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairs',
		success: function(data)
		{
			editFair_setFairs(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editFair_setFairs(data)
{
	editFair_fairSelect.innerHTML = "";
	var newOption = document.createElement("option");
	newOption.setAttribute("value", "-1");
	newOption.innerHTML = "Seçiniz";
	editFair_fairSelect.appendChild(newOption);

	for(var i = 0; i < data.fairs.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.fairs[i].fairId);
		newOption.innerHTML = data.fairs[i].fairName;
		editFair_fairSelect.appendChild(newOption);
	}
	$("#editFair_fairSelect").selectmenu({maxHeight: 100});
}

function editFair_fairChanged()
{
	var fairId = $("#editFair_fairSelect").selectmenu("value");
	editFair_lastFairId = fairId;
	if(editFair_lastFairId != -1)
	{
		$.ajax({
			url: editFair_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=getFairDetails&fairId=' + editFair_lastFairId,
			success: function(data)
			{
				editFair_setFairDetails(data);
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
	else
	{
		editFair_setInputsToDefaults();
	}
}

function editFair_setFairDetails(data)
{
	editFair_fairNameInput.value = data.fairName;
	editFair_fairStartDateInput.value = data.startDate;
	editFair_fairEndDateInput.value = data.endDate;
	editFair_countryInput.value = data.country;
	editFair_cityInput.value = data.city;
	editFair_fairTypeInput.value = data.type;
	$("#editFair_sectorSelect").selectmenu("value",data.sectorId);
	editFair_fairPriceInput.value = data.price;
	$("#editFair_fairKeeperSelect").selectmenu("value",data.fairKeeperId);
	editFair_customerRepresentativeInput.value = data.customerRepresentative;
	
	editFair_fairNameInput.removeAttribute("disabled");
	editFair_fairStartDateInput.removeAttribute("disabled");
	editFair_fairEndDateInput.removeAttribute("disabled");
	editFair_countryInput.removeAttribute("disabled");
	editFair_cityInput.removeAttribute("disabled");
	editFair_fairTypeInput.removeAttribute("disabled");
	editFair_sectorSelect.removeAttribute("disabled");
	editFair_fairPriceInput.removeAttribute("disabled");
	editFair_fairKeeperSelect.removeAttribute("disabled");
	editFair_customerRepresentativeInput.removeAttribute("disabled");
	
	$("#editFair_sectorSelect").selectmenu({maxHeight: 100});
	$("#editFair_fairKeeperSelect").selectmenu({maxHeight: 100});
}

function editFair_setInputsToDefaults()
{
	editFair_fairNameInput.setAttribute("disabled","true");
	editFair_fairStartDateInput.setAttribute("disabled","true");
	editFair_fairEndDateInput.setAttribute("disabled","true");
	editFair_countryInput.setAttribute("disabled","true");
	editFair_cityInput.setAttribute("disabled","true");
	editFair_fairTypeInput.setAttribute("disabled","true");
	editFair_sectorSelect.setAttribute("disabled","true");
	editFair_fairPriceInput.setAttribute("disabled","true");
	editFair_fairKeeperSelect.setAttribute("disabled","true");
	editFair_customerRepresentativeInput.setAttribute("disabled","true");
	
	$("#editFair_sectorSelect").selectmenu({maxHeight: 100});
	$("#editFair_fairKeeperSelect").selectmenu({maxHeight: 100});
	
	$("#editFair_fairSelect").selectmenu("value","-1");
	editFair_fairNameInput.value = "";
	editFair_fairStartDateInput.value = "";
	editFair_fairEndDateInput.value = "";
	editFair_countryInput.value = "";
	editFair_cityInput.value = "";
	editFair_fairTypeInput.value = "";
	$("#editFair_sectorSelect").selectmenu("value","-1");
	editFair_fairPriceInput.value = "";
	$("#editFair_fairKeeperSelect").selectmenu("value","-1");
	editFair_customerRepresentativeInput.value = "";
}

function editFair_openPopup()
{
	editFair_setInputsToDefaults();
	editFair_getFairs();
	corePopupPlugin("editFair",{});
}

function editFair_saveRecord()
{
	if(editFair_lastFairId == -1)
		return;
	var fairName = editFair_fairNameInput.value;
	var fairStartDate = editFair_fairStartDateInput.value;
	var fairEndDate = editFair_fairEndDateInput.value;
	var country = editFair_countryInput.value;
	var city = editFair_cityInput.value;
	var type = editFair_fairTypeInput.value;
	var sectorId =  $("#editFair_sectorSelect").selectmenu("value");
	var price = editFair_fairPriceInput.value;
	var fairKeeperId = $("#editFair_fairKeeperSelect").selectmenu("value");
	var customerRepresentative = editFair_customerRepresentativeInput.value;
	
	if(fairName == "" || fairStartDate == "" || fairEndDate == "" || country == "" || city == "" || type == "" || sectorId == -1 || price == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	if(fairName.length > 100)
	{
		alert("Fuar adı maksimum 100 karakter olmalıdır.");
		return;
	}
	
	if(type.length > 50)
	{
		alert("Fuar türü maksimum 50 karakter olmalıdır.");
		return;
	}
	
	if(!isNumber(price))
	{
		alert("Satış fiyatı nümerik formatta girilmelidir.");
		return;
	}
	
	var postString = "fairId=" + editFair_lastFairId + "&fairName=" + encodeURIComponent(fairName) + "&fairStartDate=" + encodeURIComponent(fairStartDate)
		+ "&fairEndDate=" + encodeURIComponent(fairEndDate) + "&country=" + encodeURIComponent(country) + "&city=" + encodeURIComponent(city)
		+ "&type=" + encodeURIComponent(type) + "&sectorId=" + encodeURIComponent(sectorId) + "&price=" + encodeURIComponent(price)
		+ "&fairKeeperId=" + encodeURIComponent(fairKeeperId) + "&customerRepresentative=" + encodeURIComponent(customerRepresentative);
		
	$.ajax({
		url: editFair_coreURL + "?op=updateFair",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Fuar başarıyla düzenlenmiştir.");
				coreClosePopupWindow("editFair");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editFair_deleteRecord()
{
	if(editFair_lastFairId == -1)
		return;
	$.ajax({
		url: editFair_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=deleteFair&fairId=' + editFair_lastFairId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Fuar başarıyla silinmiştir.");
				coreClosePopupWindow("editFair");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}