$(suMainScreen_init);

var suMainScreen_coreURL = 'plugins/suMainScreen/suMainScreen_core.php';
var suMainScreen_musteriAramaSirketUnvaniInput;
var suMainScreen_musteriAramaSirketTelInput;
var suMainScreen_musteriAramaSirketMarkaInput;
var suMainScreen_musteriAramaCalisanAdiInput;
var suMainScreen_musteriAramaCalisanSoyadiInput;
var suMainScreen_musteriAramaAdresUlkeSelect;
var suMainScreen_musteriAdresIlSelect;

function suMainScreen_init()
{
	$("#suMainScreen_accordion").accordion();
	$("#suMainScreen_aramaTabs").tabs({disabled: [ 1 ] });
	$("#suMainScreen_satisTabs").tabs({disabled: [ 1 ] });
	$("#suMainScreen_istatistikTabs").tabs();
	
	$("#suMainScreen_musteriAramaSirketUnvaniInput, #suMainScreen_musteriAramaSirketTelInput, #suMainScreen_musteriAramaSirketMarkaInput" +
		", #suMainScreen_musteriAramaCalisanAdiInput, #suMainScreen_musteriAramaCalisanSoyadiInput").keyup(function(event){
		if(event.keyCode == 13)
		{
			$("#suMainScreen_musteriAramaSearchButton").click();
		}
	});
	
	suMainScreen_musteriAramaSirketUnvaniInput = document.getElementById("suMainScreen_musteriAramaSirketUnvaniInput");
	suMainScreen_musteriAramaSirketTelInput = document.getElementById("suMainScreen_musteriAramaSirketTelInput");
	suMainScreen_musteriAramaSirketMarkaInput = document.getElementById("suMainScreen_musteriAramaSirketMarkaInput");
	suMainScreen_musteriAramaCalisanAdiInput = document.getElementById("suMainScreen_musteriAramaCalisanAdiInput");
	suMainScreen_musteriAramaCalisanSoyadiInput = document.getElementById("suMainScreen_musteriAramaCalisanSoyadiInput");
	suMainScreen_musteriAramaAdresUlkeSelect = $("#suMainScreen_musteriAramaAdresUlkeSelect");
	suMainScreen_musteriAdresIlSelect = $("#suMainScreen_musteriAdresIlSelect");
	
	suMainScreen_musteriAramaAdresUlkeSelect.selectmenu({maxHeight: 100});
	suMainScreen_musteriAdresIlSelect.selectmenu({maxHeight: 100});
	$("#suMainScreen_musteriAramaSearchButton").button();
	
	$("#suMainScreen_mtFirmaAramaMTSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_mtFirmaAramaLockTypeSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_mtFirmaAramaSearchButton").button();
	
	$("#suMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_satisAramaSearchButton").button();
	$("#suMainScreen_satisAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_satisAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#suMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_gorusmeAramaSearchButton").button();
	$("#suMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_gorusmeAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#suMainScreen_firmaIstatistikSearchButton").button();
	$("#suMainScreen_firmaIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_firmaIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_firmaIstatistikFirmaSelect").selectmenu({maxHeight: 100});
	
	$("#suMainScreen_mtIstatistikSearchButton").button();
	$("#suMainScreen_mtIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_mtIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_mtIstatistikMTSelect").selectmenu({maxHeight: 100});
	
	$("#suMainScreen_fuarIstatistikSearchButton").button();
	$("#suMainScreen_fuarIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_fuarIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_fuarIstatistikFuarSelect").selectmenu({maxHeight: 100});
	
	$("#suMainScreen_grupIstatistikSearchButton").button();
	$("#suMainScreen_grupIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_grupIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#suMainScreen_grupIstatistikGrupSelect").selectmenu({maxHeight: 100});
	
	var login_buttonsDiv = document.getElementById("login_buttonsDiv");
	var newGYButton = document.createElement("button");
	
	newGYButton.setAttribute("onclick","newGY_openPopup()");
	newGYButton.innerHTML = "Yönetici Ekle";
	newGYButton.setAttribute("id","suMainScreen_newGYButton");
	
	var newFairButton = document.createElement("button");
	newFairButton.setAttribute("onclick","newFair_openPopup()");
	newFairButton.innerHTML = "Fuar Ekle";
	newFairButton.setAttribute("id","suMainScreen_newFairButton");
	
	var editFairButton = document.createElement("button");
	editFairButton.setAttribute("onclick","editFair_openPopup()");
	editFairButton.innerHTML = "Fuar Düzenle";
	editFairButton.setAttribute("id","suMainScreen_editFairButton");
	
	var showFairsButton = document.createElement("button");
	showFairsButton.setAttribute("onclick","showFairs_openPopup()");
	showFairsButton.innerHTML = "Fuarları Görüntüle";
	showFairsButton.setAttribute("id","suMainScreen_showFairsButton");
	
	var editMTButton = document.createElement("button");
	editMTButton.setAttribute("onclick","editMT_openPopup()");
	editMTButton.innerHTML = "MT Düzenle";
	editMTButton.setAttribute("id","suMainScreen_editMTButton");
	
	var deleteMTButton = document.createElement("button");
	deleteMTButton.setAttribute("onclick","deleteMT_openPopup()");
	deleteMTButton.innerHTML = "MT Sil";
	deleteMTButton.setAttribute("id","suMainScreen_deleteMTButton");
	
	login_buttonsDiv.appendChild(newFairButton);
	login_buttonsDiv.appendChild(editFairButton);
	login_buttonsDiv.appendChild(showFairsButton);
	login_buttonsDiv.appendChild(newGYButton);
	login_buttonsDiv.appendChild(editMTButton);
	login_buttonsDiv.appendChild(deleteMTButton);
	
	$("#suMainScreen_newGYButton").button();
	$("#suMainScreen_newFairButton").button();
	$("#suMainScreen_editFairButton").button();
	$("#suMainScreen_showFairsButton").button();
	$("#suMainScreen_editMTButton").button();
	$("#suMainScreen_deleteMTButton").button();
	
	suMainScreen_getSectors();
	suMainScreen_getCountries();
	suMainScreen_getFairs();
	suMainScreen_getCustomerRepresentatives();
	suMainScreen_getAllCustomers();
}

function suMainScreen_getSectors()
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectors',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var suMainScreen_grupIstatistikGrupSelect = document.getElementById("suMainScreen_grupIstatistikGrupSelect");
				for(var i = 0; i < data.sectors.length; i++)
				{
					var newOption2 = document.createElement("option");
					newOption2.setAttribute("value", data.sectors[i].sectorId);
					newOption2.innerHTML = data.sectors[i].description;
					suMainScreen_grupIstatistikGrupSelect.appendChild(newOption2);
				}
				$("#suMainScreen_grupIstatistikGrupSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_getCountries()
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCountries',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var suMainScreen_musteriAramaAdresUlkeSelect = document.getElementById("suMainScreen_musteriAramaAdresUlkeSelect");
				for(var i = 0; i < data.countries.length; i++)
				{
					var newOption2 = document.createElement("option");
					newOption2.setAttribute("value", data.countries[i].countryId);
					newOption2.innerHTML = data.countries[i].name;
					suMainScreen_musteriAramaAdresUlkeSelect.appendChild(newOption2);
				}
				$("#suMainScreen_musteriAramaAdresUlkeSelect").selectmenu({select: suMainScreen_musteriAramaAdresUlkeSelectChanged});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_musteriAramaAdresUlkeSelectChanged(event,optionElement)
{
	suMainScreen_getCitiesOfCountry(1,optionElement.value);
}

function suMainScreen_yeniMusteriKayitUlkeSelectChanged(event, optionElement)
{
	suMainScreen_getCitiesOfCountry(2,optionElement.value);
}

function suMainScreen_getCitiesOfCountry(which, countryId)
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCitiesOfCountry&countryId=' + encodeURIComponent(countryId),
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var currentSelect;
				var currentSelectId;
				if(which == 1)
				{
					currentSelect = document.getElementById("suMainScreen_musteriAdresIlSelect");
					currentSelectId = "#suMainScreen_musteriAdresIlSelect";
				}
				else if(which == 2)
				{
					currentSelect = document.getElementById("suMainScreen_yeniMusteriKayitSehirSelect");
					currentSelectId = "#suMainScreen_yeniMusteriKayitSehirSelect";
				}
				currentSelect.innerHTML = "";
				var secinizOption = document.createElement("option");
				secinizOption.setAttribute("value", -1);
				secinizOption.innerHTML = "Seçiniz";
				currentSelect.appendChild(secinizOption);
				
				for(var i = 0; i < data.cities.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.cities[i].cityId);
					newOption.innerHTML = data.cities[i].name;
					currentSelect.appendChild(newOption);
				}
				$(currentSelectId).selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_getFairs()
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairs',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_fillFairsSelect(data.fairs);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_fillFairsSelect(fairs)
{
	var suMainScreen_satisAramaFuarSelect = document.getElementById("suMainScreen_satisAramaFuarSelect");
	var suMainScreen_gorusmeAramaFuarSelect = document.getElementById("suMainScreen_gorusmeAramaFuarSelect");
	var suMainScreen_fuarIstatistikFuarSelect = document.getElementById("suMainScreen_fuarIstatistikFuarSelect");
	
	for(var i = 0; i < fairs.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = fairs[i].name;
		newOption.setAttribute("value", fairs[i].fairId);
		suMainScreen_satisAramaFuarSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = fairs[i].name;
		newOption2.setAttribute("value", fairs[i].fairId);
		suMainScreen_gorusmeAramaFuarSelect.appendChild(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.innerHTML = fairs[i].name;
		newOption3.setAttribute("value", fairs[i].fairId);
		suMainScreen_fuarIstatistikFuarSelect.appendChild(newOption3);
	}
	
	$("#suMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_fuarIstatistikFuarSelect").selectmenu({maxHeight: 100});
}

function suMainScreen_getCustomerRepresentatives()
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCustomerRepresentatives',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_fillCustomerRepresentativesSelect(data.customerRepresentatives);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_fillCustomerRepresentativesSelect(customerRepresentatives)
{
	var suMainScreen_satisAramaMTSelect = document.getElementById("suMainScreen_satisAramaMTSelect");
	var suMainScreen_gorusmeAramaMTSelect = document.getElementById("suMainScreen_gorusmeAramaMTSelect");
	var suMainScreen_mtIstatistikMTSelect = document.getElementById("suMainScreen_mtIstatistikMTSelect");
	var suMainScreen_mtFirmaAramaMTSelect = document.getElementById("suMainScreen_mtFirmaAramaMTSelect");
	
	for(var i = 0; i < customerRepresentatives.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = customerRepresentatives[i].name;
		newOption.setAttribute("value", customerRepresentatives[i].userId);
		suMainScreen_satisAramaMTSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = customerRepresentatives[i].name;
		newOption2.setAttribute("value", customerRepresentatives[i].userId);
		suMainScreen_gorusmeAramaMTSelect.appendChild(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.innerHTML = customerRepresentatives[i].name;
		newOption3.setAttribute("value", customerRepresentatives[i].userId);
		suMainScreen_mtIstatistikMTSelect.appendChild(newOption3);
		
		var newOption4 = document.createElement("option");
		newOption4.innerHTML = customerRepresentatives[i].name;
		newOption4.setAttribute("value", customerRepresentatives[i].userId);
		suMainScreen_mtFirmaAramaMTSelect.appendChild(newOption4);
	}
	
	$("#suMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_mtIstatistikMTSelect").selectmenu({maxHeight: 100});
	$("#suMainScreen_mtFirmaAramaMTSelect").selectmenu({maxHeight: 100});
}

function suMainScreen_searchCustomers()
{
	var title = suMainScreen_musteriAramaSirketUnvaniInput.value;
	var phoneNumber = suMainScreen_musteriAramaSirketTelInput.value;
	var brand = suMainScreen_musteriAramaSirketMarkaInput.value;
	var name = suMainScreen_musteriAramaCalisanAdiInput.value;
	var surname = suMainScreen_musteriAramaCalisanSoyadiInput.value;
	var countryId = suMainScreen_musteriAramaAdresUlkeSelect.selectmenu("value");
	var cityId = suMainScreen_musteriAdresIlSelect.selectmenu("value");
	
	if(title == "" && phoneNumber == "" && brand == "" && name == "" && surname == "" && countryId == -1 && cityId == -1)
	{
		alert("Lütfen en az bir kriteri giriniz.");
		return;
	}
	
	var postString = "title=" + encodeURIComponent(title) + "&phoneNumber=" + encodeURIComponent(phoneNumber) + "&brand=" + encodeURIComponent(brand)
		+ "&name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) + "&countryId=" + encodeURIComponent(countryId)
		+ "&cityId=" + encodeURIComponent(cityId);
		
	$.ajax({
		url: suMainScreen_coreURL + "?op=searchCustomers",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_showCustomers(data.customers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showCustomers(customers)
{
	var suMainScreen_musteriSonucDiv = document.getElementById("suMainScreen_musteriSonucDiv");
	suMainScreen_musteriSonucDiv.innerHTML = "";
	
	var suMainScreen_musteriSonucHeaderRow = document.createElement("div");
	suMainScreen_musteriSonucHeaderRow.setAttribute("class","suMainScreen_musteriSonucHeaderRow");
	
	var suMainScreen_musteriSonucLockHeader = document.createElement("div");
	suMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	suMainScreen_musteriSonucLockHeader.setAttribute("class","suMainScreen_musteriSonucLockCell");
	
	var suMainScreen_musteriSonucTitleHeader = document.createElement("div");
	suMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	suMainScreen_musteriSonucTitleHeader.setAttribute("class","suMainScreen_musteriSonucTitleCell");
	
	var suMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	suMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	suMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","suMainScreen_musteriSonucPhoneNumberCell");
	
	var suMainScreen_musteriSonucMailHeader = document.createElement("div");
	suMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	suMainScreen_musteriSonucMailHeader.setAttribute("class","suMainScreen_musteriSonucMailCell");
	
	var suMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	suMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	suMainScreen_musteriSonucWebsiteHeader.setAttribute("class","suMainScreen_musteriSonucWebsiteCell");
	
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucLockHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucTitleHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucPhoneNumberHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucMailHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucWebsiteHeader);
	
	suMainScreen_musteriSonucDiv.appendChild(suMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var suMainScreen_musteriSonucRow = document.createElement("div");
		suMainScreen_musteriSonucRow.setAttribute("class","suMainScreen_musteriSonucRow");
		
		var suMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		suMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		suMainScreen_musteriSonucLockCell.setAttribute("class","suMainScreen_musteriSonucLockCell");
		
		var suMainScreen_musteriSonucTitleCell = document.createElement("div");
		suMainScreen_musteriSonucTitleCell.innerHTML = "<span class='suMainScreen_musteriSonucLink' onclick='suMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		suMainScreen_musteriSonucTitleCell.setAttribute("class","suMainScreen_musteriSonucTitleCell");
		
		var suMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		suMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		suMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","suMainScreen_musteriSonucPhoneNumberCell");
		
		var suMainScreen_musteriSonucMailCell = document.createElement("div");
		suMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		suMainScreen_musteriSonucMailCell.setAttribute("class","suMainScreen_musteriSonucMailCell");
		
		var suMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		suMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		suMainScreen_musteriSonucWebsiteCell.setAttribute("class","suMainScreen_musteriSonucWebsiteCell");
		
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucLockCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucTitleCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucPhoneNumberCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucMailCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucWebsiteCell);
		
		suMainScreen_musteriSonucDiv.appendChild(suMainScreen_musteriSonucRow);
	}
}

function suMainScreen_getCustomerDetails(customerId)
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getCustomerDetails&customerId=" + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_showCustomerDetails(data,customerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showCustomerDetails(data,customerId)
{
	var suMainScreen_musteriDetaylariContainerDiv = document.getElementById("suMainScreen_musteriDetaylariContainerDiv");
	suMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
	
	var suMainScreen_musteriDetaylariTopDiv = document.createElement("div");
	suMainScreen_musteriDetaylariTopDiv.setAttribute("class","suMainScreen_musteriDetaylariTopDiv");
	
	var suMainScreen_musteriDetaylariLeftDiv = document.createElement("div");
	suMainScreen_musteriDetaylariLeftDiv.setAttribute("class","suMainScreen_musteriDetaylariLeftDiv");
	
	var lockedMT = ""
	if(data.lockedMT != null)
		lockedMT = data.lockedMT;
	
	var suMainScreen_musteriDetaylariGeneralInfoDiv = document.createElement("div");
	suMainScreen_musteriDetaylariGeneralInfoDiv.setAttribute("style","margin-bottom:5px;");
	suMainScreen_musteriDetaylariGeneralInfoDiv.innerHTML += 
		"<div style='margin-bottom:10px;'>" +
			"<span style='font-weight:bold; font-size:16px;text-align:center;'>" + data.customerInfo.title + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='suMainScreen_musteriDetaylariLabel'>Ekleyen MT:</label>" +
			"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerInfo.addedName + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='suMainScreen_musteriDetaylariLabel'>Kilitleyen MT:</label>" +
			"<span class='suMainScreen_musteriDetaylariSpan'>" + lockedMT + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='suMainScreen_musteriDetaylariLabel'>Marka</label>" +
			"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerInfo.brand + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='suMainScreen_musteriDetaylariLabel'>Vergi Dairesi</label>" +
			"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerInfo.taxOffice + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='suMainScreen_musteriDetaylariLabel'>Vergi No</label>" +
			"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerInfo.taxId + "</span>" +
		"</div>";
		
	suMainScreen_musteriDetaylariLeftDiv.appendChild(suMainScreen_musteriDetaylariGeneralInfoDiv);
	
	var suMainScreen_musteriDetaylariContactsDiv = document.createElement("div");
	suMainScreen_musteriDetaylariContactsDiv.setAttribute("class","suMainScreen_musteriDetaylariContactsDiv");
	if(data.customerContacts.length != 0)
		suMainScreen_musteriDetaylariContactsDiv.innerHTML = "<div style='font-weight:bold;margin-bottom:5px;'>İrtibat Kurulabilecek Kişiler</div>";
	
	for(var i = 0; i < data.customerContacts.length; i++)
	{
		var phone = "";
		if(data.customerContacts[i].contactPhone != null)
			phone = data.customerContacts[i].contactPhone;
			
		var title = "";
		if(data.customerContacts[i].contactTitle != null)
			title = data.customerContacts[i].contactTitle;
		
		suMainScreen_musteriDetaylariContactsDiv.innerHTML += 
			"<div class='suMainScreen_musteriDetaylariContactDiv'>" +
				"<div class='suMainScreen_musteriDetaylariContactInfoDiv'>" +
					data.customerContacts[i].contactName + " " + data.customerContacts[i].contactSurname + "-" + title
					+ "-" + phone + "-" + data.customerContacts[i].branchType +
				"</div>" +
			"</div>";
	}
	suMainScreen_musteriDetaylariLeftDiv.appendChild(suMainScreen_musteriDetaylariContactsDiv);
	suMainScreen_musteriDetaylariTopDiv.appendChild(suMainScreen_musteriDetaylariLeftDiv);
			
	var suMainScreen_musteriDetaylariRightDiv = document.createElement("div");
	suMainScreen_musteriDetaylariRightDiv.setAttribute("class","suMainScreen_musteriDetaylariRightDiv");
	var sectorsText = "";
	for(var i = 0; i < data.customerSectors.length; i++)
	{
		sectorsText += data.customerSectors[i].description;
		if(i != data.customerSectors.length - 1)
			sectorsText += "-";
	}
	
	var lastContractFair = "-------";
	var lastContractDate = "-------";
	var checkedString = "";
	
	if(data.contractCheck)
	{
		lastContractFair = data.lastContractFair;
		lastContractDate = data.lastContractDate;
		checkedString = "checked=true";
	}
	
	suMainScreen_musteriDetaylariRightDiv.innerHTML = "<div style='height: 25px;'>" +
			"<label class='suMainScreen_musteriDetaylariRightLabel'>Sektörler:</label>" +
			"<span class='suMainScreen_musteriDetaylariRightSpan'>" + sectorsText + "</span>" +
			"<div class='suMainScreen_contractCheckboxDiv' style='float: left; margin-right:8px;'>" +
				"<label class='suMainScreen_musteriDetaylariRightLabel'>Sözleşme:</label>" +
				"<input type='checkbox' id='suMainScreen_contractCheckInput' disabled='true' " + checkedString + "'/>" +
			"</div>" +
			"<label class='suMainScreen_musteriDetaylariRightLabel'>Tarih:</label>" +
			"<span class='suMainScreen_musteriDetaylariRightSpan'>" + lastContractDate + "</span>" +
			"<label class='suMainScreen_musteriDetaylariRightLabel'>Fuar:</label>" +
			"<span class='customerDetails_fairNameSpan'>" + lastContractFair + "</span>" +
		"</div>";
		
	var suMainScreen_musteriDetaylariSubelerTabs = document.createElement("div");
	suMainScreen_musteriDetaylariSubelerTabs.setAttribute("class","suMainScreen_musteriDetaylariSubelerTabs");
	suMainScreen_musteriDetaylariRightDiv.appendChild(suMainScreen_musteriDetaylariSubelerTabs);
	
	var subelerTabUlHTML = "<ul>";
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		subelerTabUlHTML += '<li><a href="#suMainScreen_musteriDetaylariSube' + i + 'Tab">' 
									+ data.customerBranches[i].type + '</a></li>';
	}
	subelerTabUlHTML += "</ul>";
	suMainScreen_musteriDetaylariSubelerTabs.innerHTML = subelerTabUlHTML;
	
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		suMainScreen_musteriDetaylariSubelerTabs.innerHTML += 
			"<div id='suMainScreen_musteriDetaylariSube" + i + "Tab'>" +  
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Adres:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].address + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>İlçe:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].county + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Şehir:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].cityName + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Ülke:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].countryName + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Website:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].website + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>E-mail:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].email + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Tel-1:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber1 + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Tel-2:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber2 + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Tel-3:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber3 + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Faks:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].fax + "</span>" +
				"</div>" +
				"<div class='suMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='suMainScreen_musteriDetaylariLabel'>Notlar:</label>" +
					"<span class='suMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].notes + "</span>" +
				"</div>" +
			"</div>";
	}
	suMainScreen_musteriDetaylariTopDiv.appendChild(suMainScreen_musteriDetaylariRightDiv);
	suMainScreen_musteriDetaylariContainerDiv.appendChild(suMainScreen_musteriDetaylariTopDiv);
	$(".suMainScreen_musteriDetaylariSubelerTabs").tabs();
	$("#suMainScreen_accordion").accordion('option', 'active', 0);
	$( "#suMainScreen_aramaTabs" ).tabs( "option", "disabled", false );
	$( "#suMainScreen_aramaTabs" ).tabs( "option", "active", 1 );	
}

function suMainScreen_searchContracts()
{
	var fairId = $("#suMainScreen_satisAramaFuarSelect").selectmenu("value");
	var userId = $("#suMainScreen_satisAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("suMainScreen_satisAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("suMainScreen_satisAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#suMainScreen_satisAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#suMainScreen_satisAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: suMainScreen_coreURL + "?op=searchContracts",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_showContracts(data.contracts, postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showContracts(contracts, postString)
{
	var suMainScreen_satisSonucDiv = document.getElementById("suMainScreen_satisSonucDiv");
	suMainScreen_satisSonucDiv.innerHTML = "";
	var totalArea = 0;
	
	for(var i = 0; i < contracts.length; i++)
	{
		var suMainScreen_satisSonucRow = document.createElement("div");
		suMainScreen_satisSonucRow.setAttribute("class","suMainScreen_satisSonucRow");
		
		suMainScreen_satisSonucRow.innerHTML = contracts[i].contractDate + " - " + contracts[i].title + " - " + contracts[i].fairName + " - " +
			contracts[i].standArea + " m<sup>2</sup>";
		suMainScreen_satisSonucRow.setAttribute("onclick","suMainScreen_getContractDetails(" + contracts[i].contractId + ")");
		suMainScreen_satisSonucDiv.appendChild(suMainScreen_satisSonucRow);
		totalArea += contracts[i].standArea;
	}
	
	var suMainScreen_satisOzetDiv = document.getElementById("suMainScreen_satisOzetDiv");
	suMainScreen_satisOzetDiv.innerHTML = "Toplam " + contracts.length + " tane sözleşme bulundu. Toplam " + totalArea + " m<sup>2</sup>." +
		"<a style='margin-left:10px;' target='_blank' href='getContractsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
}

function suMainScreen_getContractDetails(contractId)
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getContractDetails&contractId=" + contractId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_showContractDetails(data, contractId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showContractDetails(data, contractId)
{
	var suMainScreen_satisDetaylariContainerDiv = document.getElementById("suMainScreen_satisDetaylariContainerDiv");
	suMainScreen_satisDetaylariContainerDiv.innerHTML = "";
	
	var pdfDownloadLinkHTML = "";
	if(data.generalInfo.pdfUpload)
		pdfDownloadLinkHTML = '<a style="margin-left:10px;" target="_blank" href="uploads/' + contractId + '.pdf">PDF İndir</a>';
	
	suMainScreen_satisDetaylariContainerDiv.innerHTML=
		'<div id="suMainScreen_showContractDetails_topDiv">' +
			'<div id="suMainScreen_showContractDetails_leftDiv">' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Fuar Adı:</label>' +
					data.fairInfo.fairName +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Fuar Tarihi:</label>' +
					data.fairInfo.startDate + " - " + data.fairInfo.endDate +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Proje Sorumlusu:</label>' +
					data.fairInfo.fkName +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Müşteri Hizmetleri Sorumlusu:</label>' +
					data.fairInfo.mtName +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">İndirimsiz Satış Fiyatı:</label>' +
					data.fairInfo.price + " &#8364;" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Müşteri Temsilcisi Adı:</label>' +
					data.customerRepresentativeInfo.name +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">MT Grubu:</label>' +
					data.customerRepresentativeInfo.sector +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Katılımcı Firma Yetkili:</label>' +
					data.customerContactName +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Taksit Sayısı:</label>' +
					data.payments.length +
				'</div>' +
				'<div id="suMainScreen_paymentPlanDiv">' +
				'</div>' +
			'</div>' +				
			'<div id="suMainScreen_showContractDetails_rightDiv">' +	
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Katılımcı Firma Ünvanı:</label>' +
					data.customerTitle +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Sözleşme Tarihi:</label>' +
					data.generalInfo.contractDate +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Ürün Grubu:</label>' +
					data.generalInfo.productGroup +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Nakliye Durumu:</label>' +
					data.generalInfo.shippingOption +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Stand Durumu:</label>' +
					data.generalInfo.standRequest +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Ekstra Navlun:</label>' +
					'<input type="checkbox" id="suMainScreen_extraNavlunInput" disabled="true"/>' +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Ekstra Navlun Miktar:</label>' +
					data.generalInfo.extraNavlunArea + " m<sup>3</sup>" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Ekstra Navlun Fiyat:</label>' +
					data.generalInfo.extraNavlunPrice + " &#8364;" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Stand m<sup>2</sup>:</label>' +
					data.generalInfo.standArea + " m<sup>2</sup>" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">m<sup>2</sup> Birim Fiyatı:</label>' +
					data.generalInfo.unitPrice + " &#8364;" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Sözleşme Tutarı:</label>' +
					data.generalInfo.contractAmount + " &#8364;" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">İndirim Oranı:</label>' +
					" %" + data.generalInfo.discountRate +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">İndirim Tutarı:</label>' +
					data.generalInfo.discountAmount + " &#8364;" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">KDV Tutarı:</label>' +
					data.generalInfo.kdvAmount  + " &#8364;" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv">' +
					'<label class="suMainScreen_showContractDetails_label">Sözleşme Bedeli(KDVli):</label>' +
					data.generalInfo.contractAmountWithKdv  + " &#8364;" +
				'</div>' +
				'<div class="suMainScreen_showContractDetails_outputDiv" style="height:80px;">' +
					'<label class="suMainScreen_showContractDetails_label">Ekstra Taahhütler:</label>' +
					'<textarea id="suMainScreen_showContractDetails_extraCommitmentsInput" rows="5" style="resize:none;" disabled="true"></textarea>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="suMainScreen_showContractDetails_outputDiv">' +
			pdfDownloadLinkHTML +
		'</div>';
	
	if(data.generalInfo.extraNavlun)
		document.getElementById("suMainScreen_extraNavlunInput").checked = true;
	var suMainScreen_showContractDetails_extraCommitmentsInput = document.getElementById("suMainScreen_showContractDetails_extraCommitmentsInput");
	suMainScreen_showContractDetails_extraCommitmentsInput.value = data.generalInfo.extraCommitments;
	$( "#suMainScreen_satisTabs" ).tabs( "option", "disabled", false );
	$( "#suMainScreen_satisTabs" ).tabs( "option", "active", 1 );
		
	var suMainScreen_paymentPlanDiv = document.getElementById("suMainScreen_paymentPlanDiv");
	var paymentCount = data.payments.length;
	for(var i = 1; i <= paymentCount; i++)
	{
		var suMainScreen_showContractDetails_outputDiv = document.createElement("div");
		suMainScreen_showContractDetails_outputDiv.setAttribute("class", "suMainScreen_showContractDetails_outputDiv");
		
		var suMainScreen_showContractDetails_label = document.createElement("label");
		suMainScreen_showContractDetails_label.setAttribute("class", "suMainScreen_showContractDetails_label");
		suMainScreen_showContractDetails_label.innerHTML = i + ". Taksit:";
		suMainScreen_showContractDetails_outputDiv.appendChild(suMainScreen_showContractDetails_label);
		
		var suMainScreen_paymentLabel = document.createElement("label");
		suMainScreen_paymentLabel.setAttribute("class", "suMainScreen_paymentLabel");
		suMainScreen_paymentLabel.innerHTML = data.payments[i - 1].paymentAmount + " &#8364;";
		suMainScreen_showContractDetails_outputDiv.appendChild(suMainScreen_paymentLabel);
		
		var suMainScreen_paymentDueDateLabel = document.createElement("label");
		suMainScreen_paymentDueDateLabel.setAttribute("class", "suMainScreen_paymentDueDateLabel");
		suMainScreen_paymentDueDateLabel.innerHTML = data.payments[i - 1].paymentDueDate;
		suMainScreen_showContractDetails_outputDiv.appendChild(suMainScreen_paymentDueDateLabel);
		
		var suMainScreen_paymentPaidCheckbox = document.createElement("input");
		suMainScreen_paymentPaidCheckbox.setAttribute("class", "suMainScreen_paymentPaidCheckbox");
		suMainScreen_paymentPaidCheckbox.setAttribute("type", "checkbox");
		suMainScreen_paymentPaidCheckbox.setAttribute("disabled", "true");
		suMainScreen_paymentPaidCheckbox.checked = data.payments[i - 1].paymentPaid;
		suMainScreen_showContractDetails_outputDiv.appendChild(suMainScreen_paymentPaidCheckbox);
		
		var suMainScreen_paymentPaidSpan = document.createElement("span");
		suMainScreen_paymentPaidSpan.setAttribute("class", "suMainScreen_paymentPaidSpan");
		suMainScreen_paymentPaidSpan.innerHTML = "Ödendi";
		suMainScreen_showContractDetails_outputDiv.appendChild(suMainScreen_paymentPaidSpan);
		
		suMainScreen_paymentPlanDiv.appendChild(suMainScreen_showContractDetails_outputDiv);
	}
}

function suMainScreen_searchMeetings()
{
	var fairId = $("#suMainScreen_gorusmeAramaFuarSelect").selectmenu("value");
	var userId = $("#suMainScreen_gorusmeAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("suMainScreen_gorusmeAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("suMainScreen_gorusmeAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#suMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#suMainScreen_gorusmeAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: suMainScreen_coreURL + "?op=searchMeetings",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_showMeetings(data.meetings, postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showMeetings(meetings, postString)
{
	var suMainScreen_gorusmeSonucDiv = document.getElementById("suMainScreen_gorusmeSonucDiv");
	suMainScreen_gorusmeSonucDiv.innerHTML = "";
	
	if(meetings.length == 0)
		suMainScreen_gorusmeSonucDiv.innerHTML = "Aradığınız kriterlere uygun görüşme bulunamamıştır.";
	
	for(var i = 0; i < meetings.length; i++)
	{
		var suMainScreen_gorusmeSonucRow = document.createElement("div");
		suMainScreen_gorusmeSonucRow.setAttribute("class","suMainScreen_gorusmeSonucRow");
		
		suMainScreen_gorusmeSonucRow.innerHTML = meetings[i].meetingDate + " - " + meetings[i].customerTitle + " - " + meetings[i].fairName + " - " +
			meetings[i].mtName + " - " + meetings[i].topic + " - " + meetings[i].description;
		suMainScreen_gorusmeSonucDiv.appendChild(suMainScreen_gorusmeSonucRow);
	}
	
	var suMainScreen_gorusmeOzetDiv = document.getElementById("suMainScreen_gorusmeOzetDiv");
	suMainScreen_gorusmeOzetDiv.innerHTML = "Toplam " + meetings.length + " tane görüşme bulundu." +
		"<a style='margin-left:10px;' target='_blank' href='getMeetingsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
}

function suMainScreen_getAllCustomers()
{
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getAllCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var suMainScreen_firmaIstatistikFirmaSelect = document.getElementById("suMainScreen_firmaIstatistikFirmaSelect");
				for(var i = 0; i < data.customers.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.customers[i].customerId);
					newOption.innerHTML = data.customers[i].title;
					suMainScreen_firmaIstatistikFirmaSelect.appendChild(newOption);
				}
				$("#suMainScreen_firmaIstatistikFirmaSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_createCustomerStats()
{
	var customerId = $("#suMainScreen_firmaIstatistikFirmaSelect").selectmenu("value");
	var startDate = document.getElementById("suMainScreen_firmaIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("suMainScreen_firmaIstatistikBitisTarihiInput").value;
	
	if(customerId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#suMainScreen_firmaIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#suMainScreen_firmaIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "customerId=" + encodeURIComponent(customerId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: suMainScreen_coreURL + "?op=getCustomerStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			suMainScreen_showCustomerStats(data,postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_createPieChart(contractCount, gorusmeCount, randevuCount, cancelledContractCount, divIdString)
{
	var pieData = [
		{
			"tur": "Sözleşme",
			"deger": contractCount
		},
		{
			"tur": "Görüşme",
			"deger": gorusmeCount
		},
		{
			"tur": "Randevu",
			"deger": randevuCount
		},
		{
			"tur": "İptal Edilen Sözleşme",
			"deger": cancelledContractCount
		}
	];
	
	var pieChart = new AmCharts.AmPieChart();
	pieChart.dataProvider = pieData;
	pieChart.titleField = "tur";
	pieChart.valueField = "deger";
	pieChart.outlineColor = "#2E6E9E";
	pieChart.color = "#2E6E9E";
	pieChart.outlineAlpha = 0.8;
	pieChart.labelsEnabled = false;
	pieChart.outlineThickness = 2;
	pieChart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
	// this makes the chart 3D
	pieChart.depth3D = 15;
	pieChart.angle = 30;
	pieChart.write(divIdString);
}

function suMainScreen_createChart(data, categoryField, chartTitle, valueTitle, valueField, divIdString, unit)
{
	var createdChart = new AmCharts.AmSerialChart();
	createdChart.dataProvider = data;
	createdChart.categoryField = categoryField;
	createdChart.depth3D = 20;
	createdChart.angle = 30;
	createdChart.addTitle(chartTitle, 13, "#2E6E9E", 1.0, true);
	
	var createdCategoryAxis = createdChart.categoryAxis;
	createdCategoryAxis.labelRotation = 90;
	createdCategoryAxis.dashLength = 5;
	createdCategoryAxis.axisColor = "#2E6E9E";
	createdCategoryAxis.gridColor = "#2E6E9E";
	createdCategoryAxis.color = "#2E6E9E";
	createdCategoryAxis.gridPosition = "start";
	
	var createdValueAxis = new AmCharts.ValueAxis();
	createdValueAxis.title = valueTitle;
	createdValueAxis.dashLength = 5;
	createdValueAxis.titleColor = "#2E6E9E";
	createdValueAxis.gridColor = "#2E6E9E";
	createdValueAxis.color = "#2E6E9E";
	createdValueAxis.axisColor = "#2E6E9E";
	createdChart.addValueAxis(createdValueAxis);
	
	var createdGraph = new AmCharts.AmGraph();
	createdGraph.valueField = valueField;
	createdGraph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]] " + unit + "</b></span>";
	createdGraph.type = "column";
	createdGraph.lineAlpha = 0;
	createdGraph.fillAlphas = 1;
	createdGraph.color = "#2E6E9E";
	createdChart.addGraph(createdGraph);
	
	// CURSOR
	var createdChartCursor = new AmCharts.ChartCursor();
	createdChartCursor.cursorAlpha = 0;
	createdChartCursor.zoomable = false;
	createdChartCursor.categoryBalloonEnabled = false;
	createdChart.addChartCursor(createdChartCursor);                
	createdChart.write(divIdString);
}

function suMainScreen_showCustomerStats(data, postString)
{
	suMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "suMainScreen_firmaIstatistikTypeChart");
	suMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "suMainScreen_firmaIstatistikSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "suMainScreen_firmaIstatistikSatisFiyatChart", "&#8364;");
	suMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "suMainScreen_firmaIstatistikIndirimTutarChart" ,"&#8364;");
	suMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "suMainScreen_firmaIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "suMainScreen_firmaIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var suMainScreen_firmaIstatistikOzetDiv = document.getElementById("suMainScreen_firmaIstatistikOzetDiv");
	suMainScreen_firmaIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getCustomerStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function suMainScreen_createMTStats()
{
	var mtId = $("#suMainScreen_mtIstatistikMTSelect").selectmenu("value");
	var startDate = document.getElementById("suMainScreen_mtIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("suMainScreen_mtIstatistikBitisTarihiInput").value;
	
	if(mtId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#suMainScreen_mtIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#suMainScreen_mtIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "mtId=" + encodeURIComponent(mtId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: suMainScreen_coreURL + "?op=getMTStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			suMainScreen_showMTStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showMTStats(data, postString)
{
	suMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "suMainScreen_mtIstatistikTypeChart");
	suMainScreen_createChart(data.satism2, "fair", "Fuar vs Stand Alanı", "Stand Alanı", "stand", "suMainScreen_mtIstatistikSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.satisFiyat, "fair", "Fuar vs Tutar", "Tutar", "fiyat", "suMainScreen_mtIstatistikSatisFiyatChart", "&#8364;");
	suMainScreen_createChart(data.indirimTutar, "fair", "Fuar vs İndirim Tutarı", "İndirim Tutarı", "tutar", "suMainScreen_mtIstatistikIndirimTutarChart" ,"&#8364;");
	suMainScreen_createChart(data.iptalSatism2, "fair", "Fuar vs Stand Alanı (İptal)", "Stand Alanı", "stand", "suMainScreen_mtIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.iptalSatisFiyat, "fair", "Fuar vs Tutar (İptal)", "Tutar", "fiyat", "suMainScreen_mtIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var suMainScreen_mtIstatistikOzetDiv = document.getElementById("suMainScreen_mtIstatistikOzetDiv");
	suMainScreen_mtIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getMtStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function suMainScreen_createFairStats()
{
	var fairId = $("#suMainScreen_fuarIstatistikFuarSelect").selectmenu("value");
	var startDate = document.getElementById("suMainScreen_fuarIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("suMainScreen_fuarIstatistikBitisTarihiInput").value;
	
	if(fairId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#suMainScreen_fuarIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#suMainScreen_fuarIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: suMainScreen_coreURL + "?op=getFairStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			suMainScreen_showFairStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showFairStats(data, postString)
{
	suMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "suMainScreen_fuarIstatistikTypeChart");
	suMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "suMainScreen_fuarIstatistikSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "suMainScreen_fuarIstatistikSatisFiyatChart", "&#8364;");
	suMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "suMainScreen_fuarIstatistikIndirimTutarChart" ,"&#8364;");
	suMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "suMainScreen_fuarIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "suMainScreen_fuarIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var suMainScreen_fuarIstatistikOzetDiv = document.getElementById("suMainScreen_fuarIstatistikOzetDiv");
	suMainScreen_fuarIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getFairStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function suMainScreen_createGroupStats()
{
	var groupId = $("#suMainScreen_grupIstatistikGrupSelect").selectmenu("value");
	var startDate = document.getElementById("suMainScreen_grupIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("suMainScreen_grupIstatistikBitisTarihiInput").value;
	
	if(groupId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#suMainScreen_grupIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#suMainScreen_grupIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "groupId=" + encodeURIComponent(groupId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: suMainScreen_coreURL + "?op=getGroupStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			suMainScreen_showGroupStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showGroupStats(data, postString)
{
	suMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "suMainScreen_grupIstatistikTypeChart");
	suMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "suMainScreen_grupIstatistikSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "suMainScreen_grupIstatistikSatisFiyatChart", "&#8364;");
	suMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "suMainScreen_grupIstatistikIndirimTutarChart" ,"&#8364;");
	suMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "suMainScreen_grupIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	suMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "suMainScreen_grupIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var suMainScreen_grupIstatistikOzetDiv = document.getElementById("suMainScreen_grupIstatistikOzetDiv");
	suMainScreen_grupIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getGroupStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function suMainScreen_getMTLockedCustomers()
{
	var mtId = $("#suMainScreen_mtFirmaAramaMTSelect").selectmenu("value");
	var lockType = $("#suMainScreen_mtFirmaAramaLockTypeSelect").selectmenu("value");
	if(mtId == -1 || lockType == -1)
	{
		alert("Lütfen tüm alanları seçiniz.");
		return;
	}
	$.ajax({
		url: suMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getMTLockedCustomers&mtId=' + mtId + "&lockType=" + lockType,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				suMainScreen_showMTLockedCustomers(data.lockedCustomers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function suMainScreen_showMTLockedCustomers(customers)
{
	var suMainScreen_mtFirmaSonucDiv = document.getElementById("suMainScreen_mtFirmaSonucDiv");
	suMainScreen_mtFirmaSonucDiv.innerHTML = "";
	
	var suMainScreen_musteriSonucHeaderRow = document.createElement("div");
	suMainScreen_musteriSonucHeaderRow.setAttribute("class","suMainScreen_musteriSonucHeaderRow");
	
	var suMainScreen_musteriSonucLockHeader = document.createElement("div");
	suMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	suMainScreen_musteriSonucLockHeader.setAttribute("class","suMainScreen_musteriSonucLockCell");
	
	var suMainScreen_musteriSonucTitleHeader = document.createElement("div");
	suMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	suMainScreen_musteriSonucTitleHeader.setAttribute("class","suMainScreen_musteriSonucTitleCell");
	
	var suMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	suMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	suMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","suMainScreen_musteriSonucPhoneNumberCell");
	
	var suMainScreen_musteriSonucMailHeader = document.createElement("div");
	suMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	suMainScreen_musteriSonucMailHeader.setAttribute("class","suMainScreen_musteriSonucMailCell");
	
	var suMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	suMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	suMainScreen_musteriSonucWebsiteHeader.setAttribute("class","suMainScreen_musteriSonucWebsiteCell");
	
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucLockHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucTitleHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucPhoneNumberHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucMailHeader);
	suMainScreen_musteriSonucHeaderRow.appendChild(suMainScreen_musteriSonucWebsiteHeader);
	
	suMainScreen_mtFirmaSonucDiv.appendChild(suMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var suMainScreen_musteriSonucRow = document.createElement("div");
		suMainScreen_musteriSonucRow.setAttribute("class","suMainScreen_musteriSonucRow");
		
		var suMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		suMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		suMainScreen_musteriSonucLockCell.setAttribute("class","suMainScreen_musteriSonucLockCell");
		
		var suMainScreen_musteriSonucTitleCell = document.createElement("div");
		suMainScreen_musteriSonucTitleCell.innerHTML = "<span class='suMainScreen_musteriSonucLink' onclick='suMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		suMainScreen_musteriSonucTitleCell.setAttribute("class","suMainScreen_musteriSonucTitleCell");
		
		var suMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		suMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		suMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","suMainScreen_musteriSonucPhoneNumberCell");
		
		var suMainScreen_musteriSonucMailCell = document.createElement("div");
		suMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		suMainScreen_musteriSonucMailCell.setAttribute("class","suMainScreen_musteriSonucMailCell");
		
		var suMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		suMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		suMainScreen_musteriSonucWebsiteCell.setAttribute("class","suMainScreen_musteriSonucWebsiteCell");
		
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucLockCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucTitleCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucPhoneNumberCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucMailCell);
		suMainScreen_musteriSonucRow.appendChild(suMainScreen_musteriSonucWebsiteCell);
		
		suMainScreen_mtFirmaSonucDiv.appendChild(suMainScreen_musteriSonucRow);
	}
}