$(addContract_init);

var addContract_coreURL = 'plugins/addContract/addContract_core.php';

var addContract_fairSelect;
var addContract_fairDateInput;
var addContract_fairKeeperInput;
var addContract_customerRepresentativeInput;
var addContract_fairPriceInput;
var addContract_customerRepresentativeSelect;
var addContract_sectorSelect;
var addContract_customerContactSelect;
var addContract_extraCommitmentsInput;
var addContract_dateInput;
var addContract_productGroupInput;
var addContract_shippingOptionSelect;
var addContract_standRequestSelect;
var addContract_standAreaInput;
var addContract_unitPriceInput;
var addContract_contractAmountInput;
var addContract_discountRateInput;
var addContract_discountAmountInput;
var addContract_kdvAmountInput;
var addContract_contractAmountWithKdvInput;
var addContract_paymentCountInput;
var addContract_extraNavlunInput;

var addContract_lastCustomerId;

function addContract_init()
{
	addContract_fairSelect = document.getElementById("addContract_fairSelect");
	addContract_fairDateInput = document.getElementById("addContract_fairDateInput");
	addContract_fairKeeperInput = document.getElementById("addContract_fairKeeperInput");
	addContract_customerRepresentativeInput = document.getElementById("addContract_customerRepresentativeInput");
	addContract_fairPriceInput = document.getElementById("addContract_fairPriceInput");
	addContract_customerRepresentativeSelect = document.getElementById("addContract_customerRepresentativeSelect");
	addContract_sectorSelect = document.getElementById("addContract_sectorSelect");
	addContract_customerContactSelect = document.getElementById("addContract_customerContactSelect");
	addContract_extraCommitmentsInput = document.getElementById("addContract_extraCommitmentsInput");
	addContract_dateInput = document.getElementById("addContract_dateInput");
	addContract_productGroupInput = document.getElementById("addContract_productGroupInput");
	addContract_shippingOptionSelect = document.getElementById("addContract_shippingOptionSelect");
	addContract_standRequestSelect = document.getElementById("addContract_standRequestSelect");
	addContract_standAreaInput = document.getElementById("addContract_standAreaInput");
	addContract_unitPriceInput = document.getElementById("addContract_unitPriceInput");
	addContract_contractAmountInput = document.getElementById("addContract_contractAmountInput");
	addContract_discountRateInput = document.getElementById("addContract_discountRateInput");
	addContract_discountAmountInput = document.getElementById("addContract_discountAmountInput");
	addContract_kdvAmountInput = document.getElementById("addContract_kdvAmountInput");
	addContract_contractAmountWithKdvInput = document.getElementById("addContract_contractAmountWithKdvInput");
	addContract_paymentCountInput = document.getElementById("addContract_paymentCountInput");
	addContract_extraNavlunInput = document.getElementById("addContract_extraNavlunInput");
	
	$("#addContract_customerRepresentativeSelect").selectmenu({maxHeight: 100});
	$("#addContract_sectorSelect").selectmenu({maxHeight: 100});
	$("#addContract_customerContactSelect").selectmenu({maxHeight: 100});
	$("#addContract_shippingOptionSelect").selectmenu({maxHeight: 100,select: addContract_priceOrStandValueChanged});
	$("#addContract_standRequestSelect").selectmenu({maxHeight: 100,select: addContract_priceOrStandValueChanged});
	$("#addContract_fairSelect").selectmenu({maxHeight: 100});
	$("#addContract_submitButton").button();
	$("#addContract_dateInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#addContract_standAreaInput").change(function() {
		addContract_priceOrStandValueChanged();
	});
	
	$("#addContract_unitPriceInput").change(function() {
		addContract_priceOrStandValueChanged();
	});
	
	$("#addContract_paymentCountInput").change(function(){
		addContract_paymentCountValueChanged();
	});
	
	addContract_getSectors();
	addContract_getCustomerRepresentatives();
}

function addContract_paymentCountValueChanged()
{
	var paymentCount = addContract_paymentCountInput.value;
	var addContract_paymentPlanDiv = document.getElementById("addContract_paymentPlanDiv");
	addContract_paymentPlanDiv.innerHTML = "";
	
	for(var i = 1; i <= paymentCount; i++)
	{
		var addContract_inputDiv = document.createElement("div");
		addContract_inputDiv.setAttribute("class", "addContract_inputDiv");
		
		var addContract_label = document.createElement("label");
		addContract_label.setAttribute("class", "addContract_label");
		addContract_label.innerHTML = i + ". Taksit:";
		addContract_inputDiv.appendChild(addContract_label);
		
		var addContract_paymentInput = document.createElement("input");
		addContract_paymentInput.setAttribute("class", "addContract_paymentInput");
		addContract_paymentInput.setAttribute("type", "text");
		addContract_paymentInput.setAttribute("placeholder", "Miktar");
		addContract_paymentInput.setAttribute("id","addContract_payment" + i + "Input");
		addContract_inputDiv.appendChild(addContract_paymentInput);
		
		var addContract_dueDateInput = document.createElement("input");
		addContract_dueDateInput.setAttribute("class", "addContract_dueDateInput");
		addContract_dueDateInput.setAttribute("type", "text");
		addContract_dueDateInput.setAttribute("placeholder", "Ödeme Tarihi");
		addContract_dueDateInput.setAttribute("id","addContract_dueDate" + i + "Input");
		addContract_inputDiv.appendChild(addContract_dueDateInput);
		
		var addContract_paidCheckbox = document.createElement("input");
		addContract_paidCheckbox.setAttribute("class", "addContract_paidCheckbox");
		addContract_paidCheckbox.setAttribute("type", "checkbox");
		addContract_paidCheckbox.setAttribute("id","addContract_paid" + i + "Checkbox");
		addContract_inputDiv.appendChild(addContract_paidCheckbox);
		
		var addContract_paidSpan = document.createElement("span");
		addContract_paidSpan.setAttribute("class", "addContract_paidSpan");
		addContract_paidSpan.innerHTML = "Ödendi";
		addContract_inputDiv.appendChild(addContract_paidSpan);
		
		addContract_paymentPlanDiv.appendChild(addContract_inputDiv);
		$("#addContract_dueDate" + i + "Input").datepicker({dateFormat: "dd/mm/yy"});
	}
}

function addContract_priceOrStandValueChanged()
{
	$("#addContract_contractAmountInput").val("");
	$("#addContract_discountRateInput").val("");
	$("#addContract_discountAmountInput").val("");
	$("#addContract_kdvAmountInput").val("");
	$("#addContract_contractAmountWithKdvInput").val("");
	var standAreaValue = $("#addContract_standAreaInput").val();
	var unitPriceValue = $("#addContract_unitPriceInput").val();
	var fairPrice = $("#addContract_fairPriceInput").val();
	if(isNumber(standAreaValue) && isNumber(unitPriceValue) && isNumber(fairPrice))
	{
		var shippingOption = $("#addContract_shippingOptionSelect").selectmenu("value");
		var standRequest = $("#addContract_standRequestSelect").selectmenu("value");
		
		if(shippingOption == 0 && standRequest == 0)
		{
			fairPrice -= 60;
		}
		else if(shippingOption == 0 || standRequest == 0)
		{
			fairPrice -= 30;
		}
	
		var contractAmount = standAreaValue * unitPriceValue;
		var contractAmountWithNavlun = standAreaValue * unitPriceValue;
		if(addContract_extraNavlunInput.checked)
		{
			var addContract_navlunAreaInput = document.getElementById("addContract_navlunAreaInput");
			var addContract_navlunPriceInput = document.getElementById("addContract_navlunPriceInput");
			var navlunArea = addContract_navlunAreaInput.value;
			var navlunPrice = addContract_navlunPriceInput.value;
			
			if(isNumber(navlunArea) && isNumber(navlunPrice))
			{
				contractAmountWithNavlun += navlunArea * navlunPrice;
			}
		}
		$("#addContract_contractAmountInput").val(contractAmountWithNavlun.toFixed(2));
		var discountRate = Math.round(((fairPrice - unitPriceValue) / fairPrice) * 100);
		if(discountRate < 0)
			discountRate = 0;
		$("#addContract_discountRateInput").val(discountRate);
		var discountAmount = fairPrice * standAreaValue - unitPriceValue * standAreaValue;
		if(discountAmount < 0)
			discountAmount = 0;
		$("#addContract_discountAmountInput").val(discountAmount.toFixed(2));
		var kdvAmount = contractAmountWithNavlun * 0.04;
		$("#addContract_kdvAmountInput").val(kdvAmount.toFixed(2));
		var contractAmountWithKdv = contractAmountWithNavlun + kdvAmount;
		$("#addContract_contractAmountWithKdvInput").val(contractAmountWithKdv.toFixed(2));
	}
}

function addContract_getFairs()
{
	$.ajax({
		url: addContract_coreURL,
		dataType: 'json',
		async: false,
		type: 'GET',
		data: 'op=getFairs&customerId=' + addContract_lastCustomerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				addContract_fairSelect.innerHTML = "";
				var newOption = document.createElement("option");
				newOption.setAttribute("value", "-1");
				newOption.innerHTML = "Seçiniz";
				addContract_fairSelect.appendChild(newOption);
				for(var i = 0; i < data.fairs.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.fairs[i].fairId);
					newOption.innerHTML = data.fairs[i].name;
					addContract_fairSelect.appendChild(newOption);
				}
				$("#addContract_fairSelect").selectmenu({select: addContract_fairSelectChanged});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addContract_getSectors()
{
	$.ajax({
		url: addContract_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectors',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				for(var i = 0; i < data.sectors.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.sectors[i].sectorId);
					newOption.innerHTML = data.sectors[i].description;
					addContract_sectorSelect.appendChild(newOption);
				}
				$("#addContract_sectorSelect").selectmenu({maxHeight: 100});
				$("#addContract_sectorSelect").selectmenu("value", data.selectedSectorId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addContract_getCustomerRepresentatives()
{
	$.ajax({
		url: addContract_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCustomerRepresentatives',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				for(var i = 0; i < data.customerRepresentatives.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.customerRepresentatives[i].userId);
					newOption.innerHTML = data.customerRepresentatives[i].name;
					addContract_customerRepresentativeSelect.appendChild(newOption);
				}
				$("#addContract_customerRepresentativeSelect").selectmenu({maxHeight: 100});
				$("#addContract_customerRepresentativeSelect").selectmenu("value", data.selectedUserId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addContract_fairSelectChanged(event, optionElement)
{
	addContract_fairDateInput.value = "";
	addContract_fairKeeperInput.value = "";
	addContract_customerRepresentativeInput.value = "";
	addContract_fairPriceInput.value = "";
	addContract_getFairDetails(optionElement.value);
}

function addContract_getFairDetails(fairId)
{
	if(fairId != -1)
	{
		$.ajax({
			url: addContract_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=getFairDetails&fairId=' + fairId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					addContract_fairDateInput.value = data.startDate  + "  " + data.endDate;
					addContract_fairKeeperInput.value = data.fairKeeper;
					addContract_customerRepresentativeInput.value = data.customerRepresentative;
					addContract_fairPriceInput.value = data.price;
					addContract_priceOrStandValueChanged();
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function addContract_setInputsToDefaults()
{
	$("#addContract_fairSelect").selectmenu("value","-1");
	addContract_fairDateInput.value = "";
	addContract_fairKeeperInput.value = "";
	addContract_customerRepresentativeInput.value = "";
	addContract_fairPriceInput.value = "";
	addContract_customerContactSelect.innerHTML = "<option value='-1'>Seçiniz</option>";
	$("#addContract_customerContactSelect").selectmenu({maxHeight: 100});
	$("#addContract_customerContactSelect").selectmenu("value","-1");
	addContract_extraCommitmentsInput.value = "";
	addContract_dateInput.value = "";
	addContract_productGroupInput.value = "";
	$("#addContract_shippingOptionSelect").selectmenu("value","-1");
	$("#addContract_standRequestSelect").selectmenu("value","-1");
	addContract_standAreaInput.value = "";
	addContract_unitPriceInput.value = "";
	addContract_contractAmountInput.value = "";
	addContract_discountRateInput.value = "";
	addContract_discountAmountInput.value = "";
	addContract_kdvAmountInput.value = "";
	addContract_contractAmountWithKdvInput.value = "";
	addContract_paymentCountInput.value = "";
	var addContract_paymentPlanDiv = document.getElementById("addContract_paymentPlanDiv");
	addContract_paymentPlanDiv.innerHTML = "";
	addContract_extraNavlunInput.checked = false;
	addContract_extraNavlunCheckboxChanged();
}

function addContract_getCustomerContacts()
{
	$.ajax({
		url: addContract_coreURL,
		dataType: 'json',
		type: 'GET',
		async: false,
		data: 'op=getCustomerContacts&customerId=' + addContract_lastCustomerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				for(var i = 0; i < data.contacts.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.contacts[i].contactId);
					newOption.innerHTML = data.contacts[i].name;
					addContract_customerContactSelect.appendChild(newOption);
				}
				$("#addContract_customerContactSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addContract_openPopup(customerId)
{
	addContract_lastCustomerId = customerId;
	addContract_setInputsToDefaults();
	addContract_getCustomerContacts();
	addContract_getFairs();
	corePopupPlugin("addContract",{});
}

function addContract_saveContract()
{
	var fairId = $("#addContract_fairSelect").selectmenu("value");
	var customerContactId = $("#addContract_customerContactSelect").selectmenu("value");
	var extraCommitments = addContract_extraCommitmentsInput.value;
	var date = addContract_dateInput.value;
	var productGroup = addContract_productGroupInput.value;
	var shippingOption = $("#addContract_shippingOptionSelect").selectmenu("value");
	var standRequest = $("#addContract_standRequestSelect").selectmenu("value");
	var standArea = addContract_standAreaInput.value;
	var unitPrice = addContract_unitPriceInput.value;
	var contractAmount = addContract_contractAmountInput.value;
	var discountRate = addContract_discountRateInput.value;
	var discountAmount = addContract_discountAmountInput.value;
	var kdvAmount = addContract_kdvAmountInput.value;
	var contractAmountWithKdv = addContract_contractAmountWithKdvInput.value;
	var paymentCount = addContract_paymentCountInput.value;
	var extraNavlunChecked = addContract_extraNavlunInput.checked;
	
	var navlunArea = 0;
	var navlunPrice = 0;
	if(extraNavlunChecked)
	{
		extraNavlunChecked = 1;
		var addContract_navlunAreaInput = document.getElementById("addContract_navlunAreaInput");
		var addContract_navlunPriceInput = document.getElementById("addContract_navlunPriceInput");
		var navlunAreaEntered = addContract_navlunAreaInput.value;
		var navlunPriceEntered = addContract_navlunPriceInput.value;
		if(navlunAreaEntered == "" || navlunPriceEntered == "")
		{
			alert("Lütfen gerekli alanları doldurunuz.");
			return;
		}
		else
		{
			navlunArea = navlunAreaEntered;
			navlunPrice = navlunPriceEntered;
		}
	}
	else
		extraNavlunChecked = 0;
	
	if(fairId == -1 || customerContactId == -1 || productGroup == "" || shippingOption == -1 ||
		standRequest == -1 || standArea == "" || unitPrice == "" || contractAmount == "" || discountRate == "" || discountAmount == "" ||
		kdvAmount == ""  || contractAmountWithKdv == "" || date == "")
	{
		alert("Lütfen gerekli alanları doldurunuz.");
		return;
	}
	
	var fairDate = addContract_fairDateInput.value;
	var fairDateSplitted = fairDate.split("  ");
	var fairEndDate = fairDateSplitted[1];
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&customerContactId=" + encodeURIComponent(customerContactId) 
		+ "&extraCommitments=" + encodeURIComponent(extraCommitments) 
		+ "&productGroup=" + encodeURIComponent(productGroup) + "&shippingOption=" + encodeURIComponent(shippingOption)
		+ "&standRequest=" + encodeURIComponent(standRequest) + "&standArea=" + encodeURIComponent(standArea) 
		+ "&unitPrice=" + encodeURIComponent(unitPrice) + "&contractAmount=" + encodeURIComponent(contractAmount)
		+ "&discountRate=" + encodeURIComponent(discountRate) + "&discountAmount=" + encodeURIComponent(discountAmount)
		+ "&kdvAmount=" + encodeURIComponent(kdvAmount) + "&contractAmountWithKdv=" + encodeURIComponent(contractAmountWithKdv)
		+ "&customerId=" + addContract_lastCustomerId + "&date=" + encodeURIComponent(date) + "&fairEndDate=" + encodeURIComponent(fairEndDate)
		+ "&paymentCount=" + encodeURIComponent(paymentCount) + "&extraNavlunChecked=" + encodeURIComponent(extraNavlunChecked)
		+ "&extraNavlunArea=" + encodeURIComponent(navlunArea) + "&extraNavlunPrice=" + encodeURIComponent(navlunPrice);
	
	for(var i = 1; i <= paymentCount; i++)
	{
		var ithPayment = document.getElementById("addContract_payment" + i + "Input").value;
		var ithDueDate = document.getElementById("addContract_dueDate" + i + "Input").value;
		var ithPaid = document.getElementById("addContract_paid" + i + "Checkbox").checked;
		
		if(ithPaid == true)
			ithPaid = 1;
		else
			ithPaid = 0;
		
		if(!isNumber(ithPayment))
		{
			alert("Taksit değerleri nümerik olmalıdır.");
			return;
		}
		
		postString += "&" + i + "payment=" + encodeURIComponent(ithPayment)
					+ "&" + i + "dueDate=" + encodeURIComponent(ithDueDate)
					+ "&" + i + "paid=" + encodeURIComponent(ithPaid);
	}
	
	var url = addContract_coreURL;
	url += "?op=saveContract";
	
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
				coreClosePopupWindow("addContract");
				if(data.accessLevel == 1)
					mtMainScreen_getCustomerDetails(addContract_lastCustomerId);
				else if(data.accessLevel == 2)
					gyMainScreen_getCustomerDetails(addContract_lastCustomerId);
				else
					flMainScreen_getCustomerDetails(addContract_lastCustomerId);
			}
			else if(data.status == "maxLockError")
			{
				alert("Maksimum kilit sayısını aştığınız için yeni sözleşme ekleyemezsiniz.");
				coreClosePopupWindow("addContract");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function addContract_extraNavlunCheckboxChanged()
{
	var addContract_extraNavlunDiv = document.getElementById("addContract_extraNavlunDiv");
	var addContract_extraNavlunInput = document.getElementById("addContract_extraNavlunInput");
	var checked = addContract_extraNavlunInput.checked;
	
	if(checked)
	{
		var newDiv1 = document.createElement("div");
		newDiv1.setAttribute("class","addContract_inputDiv");
		newDiv1.setAttribute("id","addContract_extraNavlunInput1Div");
		newDiv1.setAttribute("style","height:40px;");
		newDiv1.innerHTML = '<label class="addContract_label">Ekstra Navlun Miktar (m<sup>3</sup>):</label>' + 
							'<input class="addContract_input" id="addContract_navlunAreaInput" type="text"/>';
							
		var newDiv2 = document.createElement("div");
		newDiv2.setAttribute("class","addContract_inputDiv");
		newDiv2.setAttribute("id","addContract_extraNavlunInput2Div");
		newDiv2.setAttribute("style","height:40px;");
		newDiv2.innerHTML = '<label class="addContract_label">Ekstra Navlun <br> Fiyat:</label>' + 
							'<input class="addContract_input" id="addContract_navlunPriceInput" type="text"/>';
		addContract_extraNavlunDiv.appendChild(newDiv1);
		addContract_extraNavlunDiv.appendChild(newDiv2);
		
		$("#addContract_navlunAreaInput").change(function() {
			addContract_priceOrStandValueChanged();
		});
		
		$("#addContract_navlunPriceInput").change(function() {
			addContract_priceOrStandValueChanged();
		});
	}
	else
	{
		var addContract_extraNavlunInput1Div = document.getElementById("addContract_extraNavlunInput1Div");
		var addContract_extraNavlunInput2Div = document.getElementById("addContract_extraNavlunInput2Div");
		if(addContract_extraNavlunInput1Div != null && addContract_extraNavlunInput2Div != null)
		{
			addContract_extraNavlunDiv.removeChild(addContract_extraNavlunInput1Div);
			addContract_extraNavlunDiv.removeChild(addContract_extraNavlunInput2Div);
		}
	}
}