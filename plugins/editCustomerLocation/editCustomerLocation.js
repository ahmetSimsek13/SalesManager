$(editCustomerLocation_init);

var editCustomerLocation_coreURL = 'plugins/editCustomerLocation/editCustomerLocation_core.php';

var editCustomerLocation_typeSelect;
var editCustomerLocation_addressInput;
var editCustomerLocation_countyInput;
var editCustomerLocation_citySelect;
var editCustomerLocation_countrySelect;
var editCustomerLocation_websiteInput;
var editCustomerLocation_emailInput;
var editCustomerLocation_phone1Input;
var editCustomerLocation_phone2Input;
var editCustomerLocation_phone3Input;
var editCustomerLocation_faxInput;
var editCustomerLocation_notesInput;

var editCustomerLocation_lastCustomerId;
var editCustomerLocation_lastBranchId;

function editCustomerLocation_init()
{
	editCustomerLocation_typeSelect = document.getElementById("editCustomerLocation_typeSelect");
	editCustomerLocation_addressInput = document.getElementById("editCustomerLocation_addressInput");
	editCustomerLocation_countyInput = document.getElementById("editCustomerLocation_countyInput");
	editCustomerLocation_citySelect = document.getElementById("editCustomerLocation_citySelect");
	editCustomerLocation_countrySelect = document.getElementById("editCustomerLocation_countrySelect");
	editCustomerLocation_websiteInput = document.getElementById("editCustomerLocation_websiteInput");
	editCustomerLocation_emailInput = document.getElementById("editCustomerLocation_emailInput");
	editCustomerLocation_phone1Input = document.getElementById("editCustomerLocation_phone1Input");
	editCustomerLocation_phone2Input = document.getElementById("editCustomerLocation_phone2Input");
	editCustomerLocation_phone3Input = document.getElementById("editCustomerLocation_phone3Input");
	editCustomerLocation_faxInput = document.getElementById("editCustomerLocation_faxInput");
	editCustomerLocation_notesInput = document.getElementById("editCustomerLocation_notesInput");
	
	$("#editCustomerLocation_typeSelect").selectmenu({maxHeight: 100});
	$("#editCustomerLocation_citySelect").selectmenu({maxHeight: 100});
	$("#editCustomerLocation_countrySelect").selectmenu({maxHeight: 100});
	
	$("#editCustomerLocation_phone1Input").mask("0-(999) 9999999");
	$("#editCustomerLocation_phone2Input").mask("0-(999) 9999999");
	$("#editCustomerLocation_phone3Input").mask("0-(999) 9999999");
	
	$("#editCustomerLocation_submitButton").button();
	editCustomerLocation_getCountries();
}

function editCustomerLocation_getCountries()
{
	$.ajax({
		url: editCustomerLocation_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCountries',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				for(var i = 0; i < data.countries.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.countries[i].countryId);
					newOption.innerHTML = data.countries[i].name;
					editCustomerLocation_countrySelect.appendChild(newOption);
				}
				$("#editCustomerLocation_countrySelect").selectmenu({select: editCustomerLocation_countryChanged});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editCustomerLocation_countryChanged(event,optionElement)
{
	editCustomerLocation_getCitiesOfCountry(optionElement.value);
}

function editCustomerLocation_getCitiesOfCountry(countryId)
{
	$.ajax({
		url: editCustomerLocation_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: 'op=getCitiesOfCountry&countryId=' + encodeURIComponent(countryId),
		success: function(data)
		{
			if(data.status == "Ok")
			{
				editCustomerLocation_citySelect.innerHTML = "";
				var secinizOption = document.createElement("option");
				secinizOption.setAttribute("value", -1);
				secinizOption.innerHTML = "Seçiniz";
				editCustomerLocation_citySelect.appendChild(secinizOption);
				
				for(var i = 0; i < data.cities.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.cities[i].cityId);
					newOption.innerHTML = data.cities[i].name;
					editCustomerLocation_citySelect.appendChild(newOption);
				}
				$("#editCustomerLocation_citySelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editCustomerLocation_setInputsToDefaults()
{
	$("#editCustomerLocation_typeSelect").selectmenu("index", 0);
	editCustomerLocation_addressInput.value = "";
	editCustomerLocation_countyInput.value = "";
	editCustomerLocation_citySelect.innerHTML = "<option value='-1'>Seçiniz</option>";
	$("#editCustomerLocation_citySelect").selectmenu({maxHeight: 100});
	$("#editCustomerLocation_countrySelect").selectmenu("value", '-1');
	editCustomerLocation_websiteInput.value = "";
	editCustomerLocation_emailInput.value = "";
	editCustomerLocation_phone1Input.value = "";
	editCustomerLocation_phone2Input.value = "";
	editCustomerLocation_phone3Input.value = "";
	editCustomerLocation_faxInput.value = "";
	editCustomerLocation_notesInput.value = "";
}

function editCustomerLocation_openEditPopup(branchId,customerId)
{
	editCustomerLocation_lastBranchId = branchId;
	editCustomerLocation_lastCustomerId = customerId;
	editCustomerLocation_setInputsToDefaults();
	editCustomerLocation_getBranchInformation();
	corePopupPlugin("editCustomerLocation",{});
}

function editCustomerLocation_openPopup(customerId)
{
	editCustomerLocation_lastCustomerId = customerId;
	editCustomerLocation_lastBranchId = -1;
	editCustomerLocation_setInputsToDefaults();
	corePopupPlugin("editCustomerLocation",{});
}

function editCustomerLocation_getBranchInformation()
{
	$.ajax({
		url: editCustomerLocation_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: "op=getBranchInformation&branchId=" + editCustomerLocation_lastBranchId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				editCustomerLocation_showBranchInformation(data.customerBranchInfo);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editCustomerLocation_showBranchInformation(branchInfo)
{
	for(var i = 0; i < editCustomerLocation_typeSelect.options.length; i++)
	{
		if(editCustomerLocation_typeSelect.options[i].innerHTML == branchInfo.type)
		{
			$("#editCustomerLocation_typeSelect").selectmenu("index", i);
			break;
		}
	}
	
	editCustomerLocation_addressInput.value = branchInfo.address;
	editCustomerLocation_countyInput.value = branchInfo.county;
	$("#editCustomerLocation_countrySelect").selectmenu("value", branchInfo.countryId);
	editCustomerLocation_getCitiesOfCountry(branchInfo.countryId);
	$("#editCustomerLocation_citySelect").selectmenu("value", branchInfo.cityId);
	editCustomerLocation_websiteInput.value = branchInfo.website;
	editCustomerLocation_emailInput.value = branchInfo.email;
	editCustomerLocation_phone1Input.value = branchInfo.phoneNumber1;
	editCustomerLocation_phone2Input.value = branchInfo.phoneNumber2;
	editCustomerLocation_phone3Input.value = branchInfo.phoneNumber3;
	editCustomerLocation_faxInput.value = branchInfo.fax;
	editCustomerLocation_notesInput.value = branchInfo.notes;
}

function editCustomerLocation_updateOrInsertCustomerLocation()
{
	var type = $("#editCustomerLocation_typeSelect").selectmenu("value");
	var address = editCustomerLocation_addressInput.value;
	var county = editCustomerLocation_countyInput.value;
	var cityId = $("#editCustomerLocation_citySelect").selectmenu("value");
	var countryId = $("#editCustomerLocation_countrySelect").selectmenu("value");
	var website = editCustomerLocation_websiteInput.value;
	var email = editCustomerLocation_emailInput.value;
	var phoneNumber1 = editCustomerLocation_phone1Input.value;
	var phoneNumber2 = editCustomerLocation_phone2Input.value;
	var phoneNumber3 = editCustomerLocation_phone3Input.value;
	var fax = editCustomerLocation_faxInput.value;
	var notes = editCustomerLocation_notesInput.value;
	
	if(type == -1 || address == "" || county == "" || cityId == -1 || countryId == -1 || phoneNumber1 == "")
	{
		alert("Lütfen gerekli alanları doldurunuz.");
		return;
	}
	
	var postString = "type=" + encodeURIComponent(type) + "&address=" + encodeURIComponent(address) + "&county=" + encodeURIComponent(county) 
		+ "&cityId=" + encodeURIComponent(cityId) + "&countryId=" + encodeURIComponent(countryId) + "&website=" + encodeURIComponent(website)
		+ "&email=" + encodeURIComponent(email) + "&phoneNumber1=" + encodeURIComponent(phoneNumber1) + "&phoneNumber2=" + encodeURIComponent(phoneNumber2)
		+ "&phoneNumber3=" + encodeURIComponent(phoneNumber3) + "&fax=" + encodeURIComponent(fax)+ "&notes=" + encodeURIComponent(notes);
	
	var url = editCustomerLocation_coreURL;
	if(editCustomerLocation_lastBranchId == -1)
	{
		url += "?op=addBranch";
		postString += "&customerId=" + editCustomerLocation_lastCustomerId;
	}
	else
	{
		url += "?op=updateBranch";
		postString += "&branchId=" + editCustomerLocation_lastBranchId;
	}
	
	
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("İşlem başarıyla gerçekleştirilmiştir.");
				coreClosePopupWindow("editCustomerLocation");
				if(data.accessLevel == 1)
					mtMainScreen_getCustomerDetails(editCustomerLocation_lastCustomerId);
				else
					gyMainScreen_getCustomerDetails(editCustomerLocation_lastCustomerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}