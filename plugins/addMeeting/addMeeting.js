$(addMeeting_init);

var addMeeting_coreURL = 'plugins/addMeeting/addMeeting_core.php';

var addMeeting_meetingTypeSelect;
var addMeeting_customerContactSelect;
var addMeeting_meetingDateInput;
var addMeeting_titleInput;
var addMeeting_descriptionInput;
var addMeeting_fairSelect;

var addMeeting_lastCustomerId;

function addMeeting_init()
{
	addMeeting_meetingTypeSelect = document.getElementById("addMeeting_meetingTypeSelect");
	addMeeting_customerContactSelect = document.getElementById("addMeeting_customerContactSelect");
	addMeeting_meetingDateInput = document.getElementById("addMeeting_meetingDateInput");
	addMeeting_titleInput = document.getElementById("addMeeting_titleInput");
	addMeeting_descriptionInput = document.getElementById("addMeeting_descriptionInput");
	addMeeting_fairSelect = document.getElementById("addMeeting_fairSelect");
	
	$("#addMeeting_meetingTypeSelect").selectmenu({maxHeight: 100});
	$("#addMeeting_customerContactSelect").selectmenu({maxHeight: 100});
	$("#addMeeting_fairSelect").selectmenu({maxHeight: 100});
	$("#addMeeting_submitButton").button();
	$("#addMeeting_meetingDateInput").datepicker({dateFormat: "dd/mm/yy", minDate: 0});
	//addMeeting_getCustomerContacts();
}

function addMeeting_getFairs()
{
	$.ajax({
		url: addMeeting_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: 'op=getFairs&customerId=' + addMeeting_lastCustomerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				addMeeting_fairSelect.innerHTML = "";
				var newOption = document.createElement("option");
				newOption.setAttribute("value", "-1");
				newOption.innerHTML = "Seçiniz";
				addMeeting_fairSelect.appendChild(newOption);
				for(var i = 0; i < data.fairs.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.fairs[i].fairId);
					newOption.innerHTML = data.fairs[i].name;
					addMeeting_fairSelect.appendChild(newOption);
				}
				$("#addMeeting_fairSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addMeeting_setInputsToDefaults()
{
	$("#addMeeting_fairSelect").selectmenu("value","-1");
	$("#addMeeting_meetingTypeSelect").selectmenu("value","-1");
	addMeeting_customerContactSelect.innerHTML = "<option value='-1'>Seçiniz</option>";
	$("#addMeeting_customerContactSelect").selectmenu({maxHeight: 100});
	$("#addMeeting_customerContactSelect").selectmenu("value","-1");
	addMeeting_meetingDateInput.value = "";
	addMeeting_titleInput.value = "";
	addMeeting_descriptionInput.value = "";
}

function addMeeting_getCustomerContacts()
{
	$.ajax({
		url: addMeeting_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: 'op=getCustomerContacts&customerId=' + addMeeting_lastCustomerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				for(var i = 0; i < data.contacts.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.contacts[i].contactId);
					newOption.innerHTML = data.contacts[i].name;
					addMeeting_customerContactSelect.appendChild(newOption);
				}
				$("#addMeeting_customerContactSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addMeeting_openPopup(customerId)
{
	addMeeting_lastCustomerId = customerId;
	addMeeting_setInputsToDefaults();
	addMeeting_getCustomerContacts();
	addMeeting_getFairs();
	addMeeting_getMTRemainingLockCount();
	corePopupPlugin("addMeeting",{});
}

function addMeeting_saveMeeting()
{
	var meetingType = $("#addMeeting_meetingTypeSelect").selectmenu("value");
	var customerContactId = $("#addMeeting_customerContactSelect").selectmenu("value");
	var meetingDate = addMeeting_meetingDateInput.value;
	var title = addMeeting_titleInput.value;
	var description = addMeeting_descriptionInput.value;
	var fairId = $("#addMeeting_fairSelect").selectmenu("value");
	
	if(meetingType == -1 || customerContactId == -1 || meetingDate == "" || title == "" || description == "" || fairId == -1)
	{
		alert("Lütfen gerekli alanları doldurunuz.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&description=" + encodeURIComponent(description) 
		+ "&title=" + encodeURIComponent(title) + "&meetingDate=" + encodeURIComponent(meetingDate) 
		+ "&customerContactId=" + encodeURIComponent(customerContactId) + "&meetingType=" + encodeURIComponent(meetingType)
		+ "&customerId=" + addMeeting_lastCustomerId;
	
	var url = addMeeting_coreURL;
	url += "?op=saveMeeting";
	
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
				coreClosePopupWindow("addMeeting");
				if(data.accessLevel == 1)
					mtMainScreen_getCustomerDetails(addMeeting_lastCustomerId);
				else if(data.accessLevel == 2)
					gyMainScreen_getCustomerDetails(addMeeting_lastCustomerId);
				else if(data.accessLevel == 4)
					flMainScreen_getCustomerDetails(addMeeting_lastCustomerId);
			}
			else if(data.status == "maxLockError")
			{
				alert("Maksimum kilit sayısını aştığınız için yeni görüşme ya da randevu ekleyemezsiniz.");
				coreClosePopupWindow("addMeeting");
			}
			else if(data.status == "dateError")
			{
				alert("Sadece bugün için görüşme ve randevu ekleyebilirsiniz.")
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addMeeting_getMTRemainingLockCount()
{
	$.ajax({
		url: addMeeting_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: 'op=getMTRemainingLockCount&customerId=' + addMeeting_lastCustomerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				addMeeting_maxLockLabel = document.getElementById("addMeeting_maxLockLabel");
				addMeeting_maxLockLabel.innerHTML = data.lockCount;
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}