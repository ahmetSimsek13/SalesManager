$(editCustomer_init);

var editCustomer_coreURL = 'plugins/editCustomer/editCustomer_core.php';

var editCustomer_titleInput;
var editCustomer_brandInput;
var editCustomer_taxOfficeInput;
var editCustomer_taxIdInput;

var editCustomer_lastCustomerId;

function editCustomer_init()
{
	editCustomer_titleInput = document.getElementById("editCustomer_titleInput");
	editCustomer_brandInput = document.getElementById("editCustomer_brandInput");
	editCustomer_taxOfficeInput = document.getElementById("editCustomer_taxOfficeInput");
	editCustomer_taxIdInput = document.getElementById("editCustomer_taxIdInput");
	
	$("#editCustomer_submitButton").button();
}

function editCustomer_setInputsToDefaults()
{
	editCustomer_titleInput.value = "";
	editCustomer_brandInput.value = "";
	editCustomer_taxOfficeInput.value = "";
	editCustomer_taxIdInput.value = "";
}

function editCustomer_openPopup(customerId)
{
	editCustomer_lastCustomerId = customerId;
	editCustomer_setInputsToDefaults();
	editCustomer_getCustomerInformation();
	corePopupPlugin("editCustomer",{});
}

function editCustomer_getCustomerInformation()
{
	$.ajax({
		url: editCustomer_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: "op=getCustomerInformation&customerId=" + editCustomer_lastCustomerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				editCustomer_showCustomerInformation(data.customerInfo);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editCustomer_showCustomerInformation(customerInfo)
{
	editCustomer_titleInput.value = customerInfo.title;
	editCustomer_brandInput.value = customerInfo.brand;
	editCustomer_taxOfficeInput.value = customerInfo.taxOffice;
	editCustomer_taxIdInput.value = customerInfo.taxId;
}

function editCustomer_updateCustomer()
{
	var title = editCustomer_titleInput.value;
	var brand = editCustomer_brandInput.value;
	var taxOffice = editCustomer_taxOfficeInput.value;
	var taxId = editCustomer_taxIdInput.value;
	
	if(title == "" || brand == "" || taxOffice == "" || taxId == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var postString = "title=" + encodeURIComponent(title) + "&brand=" + encodeURIComponent(brand) + "&taxOffice=" + encodeURIComponent(taxOffice) 
		+ "&taxId=" + encodeURIComponent(taxId) + "&customerId=" + encodeURIComponent(editCustomer_lastCustomerId);
	$.ajax({
		url: editCustomer_coreURL + "?op=updateCustomer",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Müşteri başarıyla güncellenmiştir.");
				coreClosePopupWindow("editCustomer");
				if(data.accessLevel == 1)
					mtMainScreen_getCustomerDetails(editCustomer_lastCustomerId);
				else
					gyMainScreen_getCustomerDetails(editCustomer_lastCustomerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}