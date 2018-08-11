$(newFair_init);

var newFair_coreURL = 'plugins/newFair/newFair_core.php';
var newFair_fairNameInput;
var newFair_fairStartDateInput;
var newFair_fairEndDateInput;
var newFair_countryInput;
var newFair_cityInput;
var newFair_fairTypeInput;
var newFair_sectorSelect;
var newFair_fairPriceInput;
var newFair_fairKeeperSelect;
var newFair_customerRepresentativeInput;

function newFair_init()
{
	newFair_fairNameInput = document.getElementById("newFair_fairNameInput");
	newFair_fairStartDateInput = document.getElementById("newFair_fairStartDateInput");
	newFair_fairEndDateInput = document.getElementById("newFair_fairEndDateInput");
	newFair_countryInput = document.getElementById("newFair_countryInput");
	newFair_cityInput = document.getElementById("newFair_cityInput");
	newFair_fairTypeInput = document.getElementById("newFair_fairTypeInput");
	newFair_sectorSelect = document.getElementById("newFair_sectorSelect");
	newFair_fairPriceInput = document.getElementById("newFair_fairPriceInput");
	newFair_fairKeeperSelect = document.getElementById("newFair_fairKeeperSelect");
	newFair_customerRepresentativeInput = document.getElementById("newFair_customerRepresentativeInput");
	
	$("#newFair_sectorSelect").selectmenu({maxHeight: 100});
	$("#newFair_fairKeeperSelect").selectmenu({maxHeight: 100});
	$("#newFair_submitButton").button();
	$("#newFair_fairStartDateInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#newFair_fairEndDateInput").datepicker({dateFormat: "dd/mm/yy"});
	
	newFair_getSelectContents();
}

function newFair_getSelectContents()
{
	$.ajax({
		url: newFair_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSelectContents',
		success: function(data)
		{
			newFair_setSelectContents(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function newFair_setSelectContents(data)
{
	for(var i = 0; i < data.sectors.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.sectors[i].sectorId);
		newOption.innerHTML = data.sectors[i].description;
		newFair_sectorSelect.appendChild(newOption);
	}
	$("#newFair_sectorSelect").selectmenu({maxHeight: 100});
	
	for(var i = 0; i < data.users.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.users[i].userId);
		newOption.innerHTML = data.users[i].fullname;
		newFair_fairKeeperSelect.appendChild(newOption);
	}
	$("#newFair_fairKeeperSelect").selectmenu({maxHeight: 100});
}

function newFair_setInputsToDefaults()
{
	newFair_fairNameInput.value = "";
	newFair_fairStartDateInput.value = "";
	newFair_fairEndDateInput.value = "";
	newFair_countryInput.value = "";
	newFair_cityInput.value = "";
	newFair_fairTypeInput.value = "";
	$("#newFair_sectorSelect").selectmenu("value","-1");
	newFair_fairPriceInput.value = "";
	$("#newFair_fairKeeperSelect").selectmenu("value","-1");
	newFair_customerRepresentativeInput.value = "";
}

function newFair_openPopup()
{
	newFair_setInputsToDefaults();
	corePopupPlugin("newFair",{});
}

function newFair_saveRecord()
{
	var fairName = newFair_fairNameInput.value;
	var fairStartDate = newFair_fairStartDateInput.value;
	var fairEndDate = newFair_fairEndDateInput.value;
	var country = newFair_countryInput.value;
	var city = newFair_cityInput.value;
	var type = newFair_fairTypeInput.value;
	var sectorId =  $("#newFair_sectorSelect").selectmenu("value");
	var price = newFair_fairPriceInput.value;
	var fairKeeperId = $("#newFair_fairKeeperSelect").selectmenu("value");
	var customerRepresentative = newFair_customerRepresentativeInput.value;
	
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
	
	var postString = "fairName=" + encodeURIComponent(fairName) + "&fairStartDate=" + encodeURIComponent(fairStartDate)
		+ "&fairEndDate=" + encodeURIComponent(fairEndDate) + "&country=" + encodeURIComponent(country) + "&city=" + encodeURIComponent(city)
		+ "&type=" + encodeURIComponent(type) + "&sectorId=" + encodeURIComponent(sectorId) + "&price=" + encodeURIComponent(price)
		+ "&fairKeeperId=" + encodeURIComponent(fairKeeperId) + "&customerRepresentative=" + encodeURIComponent(customerRepresentative);
		
	$.ajax({
		url: newFair_coreURL + "?op=saveNewFair",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Fuar başarıyla eklenmiştir.");
				coreClosePopupWindow("newFair");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}