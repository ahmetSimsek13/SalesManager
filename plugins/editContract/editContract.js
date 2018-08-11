$(editContract_init);

var editContract_coreURL = 'plugins/editContract/editContract_core.php';

var editContract_fairNameInput;
var editContract_fairDateInput;
var editContract_fairKeeperInput;
var editContract_fairCustomerRepresentativeInput;
var editContract_fairPriceInput;
var editContract_customerRepresentativeInput;
var editContract_mtSectorInput;
var editContract_customerContactInput;
var editContract_extraCommitmentsInput;
var editContract_dateInput;
var editContract_productGroupInput;
var editContract_shippingOptionSelect;
var editContract_standRequestSelect;
var editContract_standAreaInput;
var editContract_unitPriceInput;
var editContract_contractAmountInput;
var editContract_discountRateInput;
var editContract_discountAmountInput;
var editContract_kdvAmountInput;
var editContract_contractAmountWithKdvInput;
var editContract_paymentCountInput;
var editContract_extraNavlunInput;
var editContract_navlunAreaInput;
var editContract_navlunPriceInput;
var editContract_extraCommitmentsInput;

var editContract_lastContractId;

function editContract_init()
{
	editContract_fairNameInput = document.getElementById("editContract_fairNameInput");
	editContract_fairDateInput = document.getElementById("editContract_fairDateInput");
	editContract_fairKeeperInput = document.getElementById("editContract_fairKeeperInput");
	editContract_fairCustomerRepresentativeInput = document.getElementById("editContract_fairCustomerRepresentativeInput");
	editContract_fairPriceInput = document.getElementById("editContract_fairPriceInput");
	editContract_customerRepresentativeInput = document.getElementById("editContract_customerRepresentativeInput");
	editContract_mtSectorInput = document.getElementById("editContract_mtSectorInput");
	editContract_customerContactInput = document.getElementById("editContract_customerContactInput");
	editContract_paymentCountInput = document.getElementById("editContract_paymentCountInput");
	editContract_dateInput = document.getElementById("editContract_dateInput");
	editContract_productGroupInput = document.getElementById("editContract_productGroupInput");
	editContract_shippingOptionSelect = document.getElementById("editContract_shippingOptionSelect");
	editContract_standRequestSelect = document.getElementById("editContract_standRequestSelect");
	editContract_standAreaInput = document.getElementById("editContract_standAreaInput");
	editContract_unitPriceInput = document.getElementById("editContract_unitPriceInput");
	editContract_contractAmountInput = document.getElementById("editContract_contractAmountInput");
	editContract_discountRateInput = document.getElementById("editContract_discountRateInput");
	editContract_discountAmountInput = document.getElementById("editContract_discountAmountInput");
	editContract_kdvAmountInput = document.getElementById("editContract_kdvAmountInput");
	editContract_contractAmountWithKdvInput = document.getElementById("editContract_contractAmountWithKdvInput");
	editContract_extraNavlunInput = document.getElementById("editContract_extraNavlunInput");
	editContract_navlunAreaInput = document.getElementById("editContract_navlunAreaInput");
	editContract_navlunPriceInput = document.getElementById("editContract_navlunPriceInput");
	editContract_extraCommitmentsInput = document.getElementById("editContract_extraCommitmentsInput");
	
	$("#editContract_shippingOptionSelect").selectmenu({maxHeight: 100});
	$("#editContract_standRequestSelect").selectmenu({maxHeight: 100});
	$("#editContract_submitButton").button();
	
	$("#editContract_standAreaInput").change(function() {
		editContract_priceOrStandValueChanged();
	});
	
	$("#editContract_unitPriceInput").change(function() {
		editContract_priceOrStandValueChanged();
	});
	
	$("#editContract_paymentCountInput").change(function(){
		editContract_paymentCountValueChanged();
	});
	
	$("#editContract_navlunAreaInput").change(function() {
		editContract_priceOrStandValueChanged();
	});
	
	$("#editContract_navlunPriceInput").change(function() {
		editContract_priceOrStandValueChanged();
	});
}

function editContract_paymentCountValueChanged()
{
	var paymentCount = editContract_paymentCountInput.value;
	var editContract_paymentPlanDiv = document.getElementById("editContract_paymentPlanDiv");
	editContract_paymentPlanDiv.innerHTML = "";
	
	for(var i = 1; i <= paymentCount; i++)
	{
		var editContract_inputDiv = document.createElement("div");
		editContract_inputDiv.setAttribute("class", "editContract_inputDiv");
		
		var editContract_label = document.createElement("label");
		editContract_label.setAttribute("class", "editContract_label");
		editContract_label.innerHTML = i + ". Taksit:";
		editContract_inputDiv.appendChild(editContract_label);
		
		var editContract_paymentInput = document.createElement("input");
		editContract_paymentInput.setAttribute("class", "editContract_paymentInput");
		editContract_paymentInput.setAttribute("type", "text");
		editContract_paymentInput.setAttribute("placeholder", "Miktar");
		editContract_paymentInput.setAttribute("id","editContract_payment" + i + "Input");
		editContract_inputDiv.appendChild(editContract_paymentInput);
		
		var editContract_dueDateInput = document.createElement("input");
		editContract_dueDateInput.setAttribute("class", "editContract_dueDateInput");
		editContract_dueDateInput.setAttribute("type", "text");
		editContract_dueDateInput.setAttribute("placeholder", "Ödeme Tarihi");
		editContract_dueDateInput.setAttribute("id","editContract_dueDate" + i + "Input");
		editContract_inputDiv.appendChild(editContract_dueDateInput);
		
		var editContract_paidCheckbox = document.createElement("input");
		editContract_paidCheckbox.setAttribute("class", "editContract_paidCheckbox");
		editContract_paidCheckbox.setAttribute("type", "checkbox");
		editContract_paidCheckbox.setAttribute("id","editContract_paid" + i + "Checkbox");
		editContract_inputDiv.appendChild(editContract_paidCheckbox);
		
		var editContract_paidSpan = document.createElement("span");
		editContract_paidSpan.setAttribute("class", "editContract_paidSpan");
		editContract_paidSpan.innerHTML = "Ödendi";
		editContract_inputDiv.appendChild(editContract_paidSpan);
		
		editContract_paymentPlanDiv.appendChild(editContract_inputDiv);
		$("#editContract_dueDate" + i + "Input").datepicker({dateFormat: "dd/mm/yy"});
	}
}

function editContract_priceOrStandValueChanged()
{
	$("#editContract_contractAmountInput").val("");
	$("#editContract_discountRateInput").val("");
	$("#editContract_discountAmountInput").val("");
	$("#editContract_kdvAmountInput").val("");
	$("#editContract_contractAmountWithKdvInput").val("");
	var standAreaValue = $("#editContract_standAreaInput").val();
	var unitPriceValue = $("#editContract_unitPriceInput").val();
	var fairPrice = $("#editContract_fairPriceInput").val();
	if(isNumber(standAreaValue) && isNumber(unitPriceValue) && isNumber(fairPrice))
	{
		var contractAmount = standAreaValue * unitPriceValue;
		var contractAmountWithNavlun = standAreaValue * unitPriceValue;
		if(editContract_extraNavlunInput.checked)
		{
			var editContract_navlunAreaInput = document.getElementById("editContract_navlunAreaInput");
			var editContract_navlunPriceInput = document.getElementById("editContract_navlunPriceInput");
			var navlunArea = editContract_navlunAreaInput.value;
			var navlunPrice = editContract_navlunPriceInput.value;
			
			if(isNumber(navlunArea) && isNumber(navlunPrice))
			{
				contractAmountWithNavlun += navlunArea * navlunPrice;
			}
		}
		$("#editContract_contractAmountInput").val(contractAmountWithNavlun.toFixed(2));
		var discountRate = Math.round(((fairPrice - unitPriceValue) / fairPrice) * 100);
		$("#editContract_discountRateInput").val(discountRate);
		var discountAmount = fairPrice * standAreaValue - unitPriceValue * standAreaValue;
		$("#editContract_discountAmountInput").val(discountAmount.toFixed(2));
		var kdvAmount = contractAmountWithNavlun * 0.04;
		$("#editContract_kdvAmountInput").val(kdvAmount.toFixed(2));
		var contractAmountWithKdv = contractAmountWithNavlun + kdvAmount;
		$("#editContract_contractAmountWithKdvInput").val(contractAmountWithKdv.toFixed(2));
	}
}

function editContract_setInputsToDefaults()
{
	editContract_fairNameInput.value = "";
	editContract_fairDateInput.value = "";
	editContract_fairKeeperInput.value = "";
	editContract_fairCustomerRepresentativeInput.value = "";
	editContract_fairPriceInput.value = "";
	editContract_customerRepresentativeInput.value = "";
	editContract_mtSectorInput.value = "";
	editContract_customerContactInput.value = "";
	editContract_paymentCountInput.value = "";
	editContract_dateInput.value = "";
	editContract_productGroupInput.value = "";
	$("#editContract_shippingOptionSelect").selectmenu("value","-1");
	$("#editContract_standRequestSelect").selectmenu("value","-1");
	editContract_standAreaInput.value = "";
	editContract_unitPriceInput.value = "";
	editContract_contractAmountInput.value = "";
	editContract_discountRateInput.value = "";
	editContract_discountAmountInput.value = "";
	editContract_kdvAmountInput.value = "";
	editContract_contractAmountWithKdvInput.value = "";
	editContract_extraNavlunInput.checked = false;
	editContract_navlunAreaInput.value = "";
	editContract_navlunPriceInput.value = "";
	editContract_extraCommitmentsInput.value = "";
	var editContract_paymentPlanDiv = document.getElementById("editContract_paymentPlanDiv");
	editContract_paymentPlanDiv.innerHTML = "";
}

function editContract_openPopup(contractId)
{
	editContract_lastContractId = contractId;
	editContract_setInputsToDefaults();
	editContract_getContractDetails();
	corePopupPlugin("editContract",{});
}

function editContract_getContractDetails()
{
	$.ajax({
		url: editContract_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getContractDetails&contractId=" + editContract_lastContractId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				editContract_showContractDetails(data);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function editContract_showContractDetails(data)
{
	editContract_fairNameInput.value = data.fairInfo.fairName;
	editContract_fairDateInput.value = data.fairInfo.startDate + " - " + data.fairInfo.endDate;
	editContract_fairKeeperInput.value = data.fairInfo.fkName;
	editContract_fairCustomerRepresentativeInput.value = data.fairInfo.mtName;
	editContract_fairPriceInput.value = data.fairInfo.price;
	editContract_customerRepresentativeInput.value = data.customerRepresentativeInfo.name;
	editContract_mtSectorInput.value = data.customerRepresentativeInfo.sector;
	editContract_customerContactInput.value = data.customerContactName;
	editContract_paymentCountInput.value = data.payments.length;
	editContract_dateInput.value = data.generalInfo.contractDate;
	editContract_productGroupInput.value = data.generalInfo.productGroup;
	$("#editContract_shippingOptionSelect").selectmenu("value",data.generalInfo.shippingOption);
	$("#editContract_standRequestSelect").selectmenu("value",data.generalInfo.standRequest);
	editContract_standAreaInput.value = data.generalInfo.standArea;
	editContract_unitPriceInput.value = data.generalInfo.unitPrice;
	editContract_contractAmountInput.value = data.generalInfo.contractAmount;
	editContract_discountRateInput.value = data.generalInfo.discountRate;
	editContract_discountAmountInput.value = data.generalInfo.discountAmount;
	editContract_kdvAmountInput.value = data.generalInfo.kdvAmount;
	editContract_contractAmountWithKdvInput.value = data.generalInfo.contractAmountWithKdv;
	editContract_extraNavlunInput.checked = data.generalInfo.extraNavlun;
	editContract_navlunAreaInput.value = data.generalInfo.extraNavlunArea;
	editContract_navlunPriceInput.value = data.generalInfo.extraNavlunPrice;
	editContract_extraCommitmentsInput.value = data.generalInfo.extraCommitments;
	
	var editContract_paymentPlanDiv = document.getElementById("editContract_paymentPlanDiv");
	var paymentCount = data.payments.length;
	for(var i = 1; i <= paymentCount; i++)
	{
		var editContract_inputDiv = document.createElement("div");
		editContract_inputDiv.setAttribute("class", "editContract_inputDiv");
		
		var editContract_label = document.createElement("label");
		editContract_label.setAttribute("class", "editContract_label");
		editContract_label.innerHTML = i + ". Taksit:";
		editContract_inputDiv.appendChild(editContract_label);
		
		var editContract_paymentInput = document.createElement("input");
		editContract_paymentInput.setAttribute("class", "editContract_paymentInput");
		editContract_paymentInput.setAttribute("type", "text");
		editContract_paymentInput.setAttribute("placeholder", "Miktar");
		editContract_paymentInput.setAttribute("id","editContract_payment" + i + "Input");
		editContract_paymentInput.value = data.payments[i - 1].paymentAmount;
		editContract_inputDiv.appendChild(editContract_paymentInput);
		
		var editContract_dueDateInput = document.createElement("input");
		editContract_dueDateInput.setAttribute("class", "editContract_dueDateInput");
		editContract_dueDateInput.setAttribute("type", "text");
		editContract_dueDateInput.setAttribute("placeholder", "Ödeme Tarihi");
		editContract_dueDateInput.setAttribute("id","editContract_dueDate" + i + "Input");
		editContract_dueDateInput.value = data.payments[i - 1].paymentDueDate;
		editContract_inputDiv.appendChild(editContract_dueDateInput);
		
		var editContract_paidCheckbox = document.createElement("input");
		editContract_paidCheckbox.setAttribute("class", "editContract_paidCheckbox");
		editContract_paidCheckbox.setAttribute("type", "checkbox");
		editContract_paidCheckbox.setAttribute("id","editContract_paid" + i + "Checkbox");
		editContract_paidCheckbox.checked = data.payments[i - 1].paymentPaid;
		editContract_inputDiv.appendChild(editContract_paidCheckbox);
		
		var editContract_paidSpan = document.createElement("span");
		editContract_paidSpan.setAttribute("class", "editContract_paidSpan");
		editContract_paidSpan.innerHTML = "Ödendi";
		editContract_inputDiv.appendChild(editContract_paidSpan);
		
		editContract_paymentPlanDiv.appendChild(editContract_inputDiv);
		$("#editContract_dueDate" + i + "Input").datepicker({dateFormat: "dd/mm/yy"});
	}
}

function editContract_saveContract()
{
	var paymentCount = editContract_paymentCountInput.value;
	var productGroup = editContract_productGroupInput.value;
	var shippingOption = $("#editContract_shippingOptionSelect").selectmenu("value");
	var standRequest = $("#editContract_standRequestSelect").selectmenu("value");
	var standArea = editContract_standAreaInput.value;
	var unitPrice = editContract_unitPriceInput.value;
	var contractAmount = editContract_contractAmountInput.value;
	var discountRate = editContract_discountRateInput.value;
	var discountAmount = editContract_discountAmountInput.value;
	var kdvAmount = editContract_kdvAmountInput.value;
	var contractAmountWithKdv = editContract_contractAmountWithKdvInput.value;
	var extraNavlunChecked = editContract_extraNavlunInput.checked;
	var extraCommitments = editContract_extraCommitmentsInput.value;
	
	var navlunArea = 0;
	var navlunPrice = 0;
	if(extraNavlunChecked)
	{
		extraNavlunChecked = 1;
		var navlunAreaEntered = editContract_navlunAreaInput.value;
		var navlunPriceEntered = editContract_navlunPriceInput.value;
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
	
	if(productGroup == "" || shippingOption == -1 ||
		standRequest == -1 || standArea == "" || unitPrice == "" || contractAmount == "" || discountRate == "" || discountAmount == "" ||
		kdvAmount == ""  || contractAmountWithKdv == "")
	{
		alert("Lütfen gerekli alanları doldurunuz.");
		return;
	}
	
	var postString = "&contractId=" + editContract_lastContractId + "&extraCommitments=" + encodeURIComponent(extraCommitments) 
		+ "&productGroup=" + encodeURIComponent(productGroup) + "&shippingOption=" + encodeURIComponent(shippingOption)
		+ "&standRequest=" + encodeURIComponent(standRequest) + "&standArea=" + encodeURIComponent(standArea) 
		+ "&unitPrice=" + encodeURIComponent(unitPrice) + "&contractAmount=" + encodeURIComponent(contractAmount)
		+ "&discountRate=" + encodeURIComponent(discountRate) + "&discountAmount=" + encodeURIComponent(discountAmount)
		+ "&kdvAmount=" + encodeURIComponent(kdvAmount) + "&contractAmountWithKdv=" + encodeURIComponent(contractAmountWithKdv)
		+ "&paymentCount=" + encodeURIComponent(paymentCount) + "&extraNavlunChecked=" + encodeURIComponent(extraNavlunChecked)
		+ "&extraNavlunArea=" + encodeURIComponent(navlunArea) + "&extraNavlunPrice=" + encodeURIComponent(navlunPrice);
	
	for(var i = 1; i <= paymentCount; i++)
	{
		var ithPayment = document.getElementById("editContract_payment" + i + "Input").value;
		var ithDueDate = document.getElementById("editContract_dueDate" + i + "Input").value;
		var ithPaid = document.getElementById("editContract_paid" + i + "Checkbox").checked;
		
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
	
	var url = editContract_coreURL;
	url += "?op=updateContract";
	
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
				coreClosePopupWindow("editContract");
				flMainScreen_getContractDetails(editContract_lastContractId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}
