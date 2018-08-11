$(editCustomerContact_init);

var editCustomerContact_coreURL = 'plugins/editCustomerContact/editCustomerContact_core.php';

var editCustomerContact_typeSelect;
var editCustomerContact_nameInput;
var editCustomerContact_surnameInput;
var editCustomerContact_titleInput;
var editCustomerContact_phoneNumberInput;
var editCustomerContact_emailInput;

var editCustomerContact_lastCustomerId;
var editCustomerContact_lastContactId;

function editCustomerContact_init()
{
	editCustomerContact_typeSelect = document.getElementById("editCustomerContact_typeSelect");
	editCustomerContact_nameInput = document.getElementById("editCustomerContact_nameInput");
	editCustomerContact_surnameInput = document.getElementById("editCustomerContact_surnameInput");
	editCustomerContact_phoneNumberInput = document.getElementById("editCustomerContact_phoneNumberInput");
	editCustomerContact_emailInput = document.getElementById("editCustomerContact_emailInput");
	editCustomerContact_titleInput = document.getElementById("editCustomerContact_titleInput");
	$("#editCustomerContact_typeSelect").selectmenu({maxHeight: 100});
	$("#editCustomerContact_phoneNumberInput").mask("0-(999) 9999999");
	$("#editCustomerContact_submitButton").button();
}

function editCustomerContact_setInputsToDefaults()
{
	$("#editCustomerContact_typeSelect").selectmenu("index", 0);
	editCustomerContact_nameInput.value = "";
	editCustomerContact_surnameInput.value = "";
	editCustomerContact_phoneNumberInput.value = "";
	editCustomerContact_emailInput.value = "";
	editCustomerContact_titleInput.value = "";
}

function editCustomerContact_openEditPopup(contactId,customerId)
{
	editCustomerContact_lastContactId = contactId;
	editCustomerContact_lastCustomerId = customerId;
	editCustomerContact_setInputsToDefaults();
	editCustomerContact_getContactInformation();
	corePopupPlugin("editCustomerContact",{});
}

function editCustomerContact_openPopup(customerId)
{
	editCustomerContact_lastCustomerId = customerId;
	editCustomerContact_lastContactId = -1;
	editCustomerContact_setInputsToDefaults();
	corePopupPlugin("editCustomerContact",{});
}

function editCustomerContact_getContactInformation()
{
	$.ajax({
		url: editCustomerContact_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: "op=getContactInformation&contactId=" + editCustomerContact_lastContactId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				editCustomerContact_showContactInformation(data.customerContactInfo);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editCustomerContact_showContactInformation(contactInfo)
{
	for(var i = 0; i < editCustomerContact_typeSelect.options.length; i++)
	{
		if(editCustomerContact_typeSelect.options[i].innerHTML == contactInfo.branchType)
		{
			$("#editCustomerContact_typeSelect").selectmenu("index", i);
			break;
		}
	}
	
	editCustomerContact_nameInput.value = contactInfo.name;
	editCustomerContact_surnameInput.value = contactInfo.surname;
	editCustomerContact_phoneNumberInput.value = contactInfo.phone;
	editCustomerContact_emailInput.value = contactInfo.emailAddress;
	editCustomerContact_titleInput.value = contactInfo.title;
}

function editCustomerContact_updateOrInsertCustomerContact()
{
	var branchType = $("#editCustomerContact_typeSelect").selectmenu("value");
	var name = editCustomerContact_nameInput.value;
	var surname = editCustomerContact_surnameInput.value;
	var email = editCustomerContact_emailInput.value;
	var title = editCustomerContact_titleInput.value;
	var phoneNumber = editCustomerContact_phoneNumberInput.value;
	
	if(name == "" || surname == "")
	{
		alert("Lütfen gerekli alanları doldurunuz.");
		return;
	}
	
	var postString = "branchType=" + encodeURIComponent(branchType) + "&name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) 
		+ "&email=" + encodeURIComponent(email) + "&title=" + encodeURIComponent(title) + "&phoneNumber=" + encodeURIComponent(phoneNumber);
	
	var url = editCustomerContact_coreURL;
	if(editCustomerContact_lastContactId == -1)
	{
		url += "?op=addContact";
		postString += "&customerId=" + editCustomerContact_lastCustomerId;
	}
	else
	{
		url += "?op=updateContact";
		postString += "&contactId=" + editCustomerContact_lastContactId;
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
				coreClosePopupWindow("editCustomerContact");
				if(data.accessLevel == 1)
					mtMainScreen_getCustomerDetails(editCustomerContact_lastCustomerId);
				else
					gyMainScreen_getCustomerDetails(editCustomerContact_lastCustomerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}