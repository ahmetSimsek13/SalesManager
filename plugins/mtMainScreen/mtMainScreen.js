$(mtMainScreen_init);

var mtMainScreen_coreURL = 'plugins/mtMainScreen/mtMainScreen_core.php';
var mtMainScreen_musteriAramaSirketUnvaniInput;
var mtMainScreen_musteriAramaSirketTelInput;
var mtMainScreen_musteriAramaSirketMarkaInput;
var mtMainScreen_musteriAramaCalisanAdiInput;
var mtMainScreen_musteriAramaCalisanSoyadiInput;
var mtMainScreen_musteriAramaAdresUlkeSelect;
var mtMainScreen_musteriAdresIlSelect;

function mtMainScreen_init()
{
	$("#mtMainScreen_accordion").accordion();
	$("#mtMainScreen_firmalarimAccordion").accordion();
	$("#mtMainScreen_aramaTabs").tabs({disabled: [ 4 ],
		beforeActivate: function( event, ui ){
			var tab = ui.newTab;
			if(tab[0].innerText == "Firmalarım")
				mtMainScreen_getMyCustomers();
		}
	});
	$("#mtMainScreen_satisTabs").tabs({disabled: [ 1 ] });
	
	$("#mtMainScreen_musteriAramaSirketUnvaniInput, #mtMainScreen_musteriAramaSirketTelInput, #mtMainScreen_musteriAramaSirketMarkaInput" +
		", #mtMainScreen_musteriAramaCalisanAdiInput, #mtMainScreen_musteriAramaCalisanSoyadiInput").keyup(function(event){
		if(event.keyCode == 13)
		{
			$("#mtMainScreen_musteriAramaSearchButton").click();
		}
	});
	
	mtMainScreen_musteriAramaSirketUnvaniInput = document.getElementById("mtMainScreen_musteriAramaSirketUnvaniInput");
	mtMainScreen_musteriAramaSirketTelInput = document.getElementById("mtMainScreen_musteriAramaSirketTelInput");
	mtMainScreen_musteriAramaSirketMarkaInput = document.getElementById("mtMainScreen_musteriAramaSirketMarkaInput");
	mtMainScreen_musteriAramaCalisanAdiInput = document.getElementById("mtMainScreen_musteriAramaCalisanAdiInput");
	mtMainScreen_musteriAramaCalisanSoyadiInput = document.getElementById("mtMainScreen_musteriAramaCalisanSoyadiInput");
	mtMainScreen_musteriAramaAdresUlkeSelect = $("#mtMainScreen_musteriAramaAdresUlkeSelect");
	mtMainScreen_musteriAdresIlSelect = $("#mtMainScreen_musteriAdresIlSelect");
	
	mtMainScreen_musteriAramaAdresUlkeSelect.selectmenu({maxHeight: 100});
	mtMainScreen_musteriAdresIlSelect.selectmenu({maxHeight: 100});
	$("#mtMainScreen_musteriAramaSearchButton").button();
	$("#mtMainScreen_yeniMusteriKayitSehirSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_yeniMusteriKayitUlkeSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_yeniMusteriKayitSektorSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput").mask("0-(999) 9999999");
	$("#mtMainScreen_yeniMusteriKayitTel1Input").mask("0-(999) 9999999");
	$("#mtMainScreen_yeniMusteriKayitTel2Input").mask("0-(999) 9999999");
	$("#mtMainScreen_yeniMusteriKayitTel3Input").mask("0-(999) 9999999");
	$("#mtMainScreen_yeniMusteriKayitFaksInput").mask("0-(999) 9999999");
	$("#mtMainScreen_yeniMusteriKayitSaveButton").button();
	
	$("#mtMainScreen_fuarKatilimciAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_fuarKatilimciAramaSearchButton").button();
	
	$("#mtMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_satisAramaSearchButton").button();
	$("#mtMainScreen_satisAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#mtMainScreen_satisAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#mtMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_gorusmeAramaSearchButton").button();
	$("#mtMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#mtMainScreen_gorusmeAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	mtMainScreen_getSectorInformation();
	mtMainScreen_getCountries();
	mtMainScreen_getFairs();
	mtMainScreen_getCustomerRepresentatives();
	mtMainScreen_getMyCustomers();
}

function mtMainScreen_getSectorInformation()
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectorInformation',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var mtMainScreen_yeniMusteriKayitSektorSelect = document.getElementById("mtMainScreen_yeniMusteriKayitSektorSelect");
				var newOption = document.createElement("option");
				newOption.setAttribute("value", data.sectorId);
				newOption.innerHTML = data.description;
				mtMainScreen_yeniMusteriKayitSektorSelect.appendChild(newOption);
				$("#mtMainScreen_yeniMusteriKayitSektorSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_getCountries()
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCountries',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var mtMainScreen_yeniMusteriKayitUlkeSelect = document.getElementById("mtMainScreen_yeniMusteriKayitUlkeSelect");
				var mtMainScreen_musteriAramaAdresUlkeSelect = document.getElementById("mtMainScreen_musteriAramaAdresUlkeSelect");
				for(var i = 0; i < data.countries.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.countries[i].countryId);
					newOption.innerHTML = data.countries[i].name;
					mtMainScreen_yeniMusteriKayitUlkeSelect.appendChild(newOption);
					
					var newOption2 = document.createElement("option");
					newOption2.setAttribute("value", data.countries[i].countryId);
					newOption2.innerHTML = data.countries[i].name;
					mtMainScreen_musteriAramaAdresUlkeSelect.appendChild(newOption2);
				}
				$("#mtMainScreen_yeniMusteriKayitUlkeSelect").selectmenu({select: mtMainScreen_yeniMusteriKayitUlkeSelectChanged});
				$("#mtMainScreen_musteriAramaAdresUlkeSelect").selectmenu({select: mtMainScreen_musteriAramaAdresUlkeSelectChanged});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_musteriAramaAdresUlkeSelectChanged(event,optionElement)
{
	mtMainScreen_getCitiesOfCountry(1,optionElement.value);
}

function mtMainScreen_yeniMusteriKayitUlkeSelectChanged(event, optionElement)
{
	mtMainScreen_getCitiesOfCountry(2,optionElement.value);
}

function mtMainScreen_getCitiesOfCountry(which, countryId)
{
	$.ajax({
		url: mtMainScreen_coreURL,
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
					currentSelect = document.getElementById("mtMainScreen_musteriAdresIlSelect");
					currentSelectId = "#mtMainScreen_musteriAdresIlSelect";
				}
				else if(which == 2)
				{
					currentSelect = document.getElementById("mtMainScreen_yeniMusteriKayitSehirSelect");
					currentSelectId = "#mtMainScreen_yeniMusteriKayitSehirSelect";
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

function mtMainScreen_saveNewCustomer()
{
	var mtMainScreen_yeniMusteriKayitUnvanInput = document.getElementById("mtMainScreen_yeniMusteriKayitUnvanInput");
	var mtMainScreen_yeniMusteriKayitMarkaInput = document.getElementById("mtMainScreen_yeniMusteriKayitMarkaInput");
	var mtMainScreen_yeniMusteriKayitVergiDairesiInput = document.getElementById("mtMainScreen_yeniMusteriKayitVergiDairesiInput");
	var mtMainScreen_yeniMusteriKayitVergiNoInput = document.getElementById("mtMainScreen_yeniMusteriKayitVergiNoInput");
	var mtMainScreen_yeniMusteriKayitSektorSelect = $("#mtMainScreen_yeniMusteriKayitSektorSelect");
	var mtMainScreen_yeniMusteriKayitSirketSahibiIsimInput = document.getElementById("mtMainScreen_yeniMusteriKayitSirketSahibiIsimInput");
	var mtMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput = document.getElementById("mtMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput");
	var mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput = document.getElementById("mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput");
	var mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput = document.getElementById("mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput");
	var mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput = document.getElementById("mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput");
	var mtMainScreen_yeniMusteriKayitAdresInput = document.getElementById("mtMainScreen_yeniMusteriKayitAdresInput");
	var mtMainScreen_yeniMusteriKayitIlceInput = document.getElementById("mtMainScreen_yeniMusteriKayitIlceInput");
	var mtMainScreen_yeniMusteriKayitSehirSelect = $("#mtMainScreen_yeniMusteriKayitSehirSelect");
	var mtMainScreen_yeniMusteriKayitUlkeSelect = $("#mtMainScreen_yeniMusteriKayitUlkeSelect");
	var mtMainScreen_yeniMusteriKayitWebInput = document.getElementById("mtMainScreen_yeniMusteriKayitWebInput");
	var mtMainScreen_yeniMusteriKayitEmailInput = document.getElementById("mtMainScreen_yeniMusteriKayitEmailInput");
	var mtMainScreen_yeniMusteriKayitTel1Input = document.getElementById("mtMainScreen_yeniMusteriKayitTel1Input");
	var mtMainScreen_yeniMusteriKayitTel2Input = document.getElementById("mtMainScreen_yeniMusteriKayitTel2Input");
	var mtMainScreen_yeniMusteriKayitTel3Input = document.getElementById("mtMainScreen_yeniMusteriKayitTel3Input");
	var mtMainScreen_yeniMusteriKayitFaksInput = document.getElementById("mtMainScreen_yeniMusteriKayitFaksInput");
	var mtMainScreen_yeniMusteriKayitNotlarInput = document.getElementById("mtMainScreen_yeniMusteriKayitNotlarInput");
	
	var unvan = mtMainScreen_yeniMusteriKayitUnvanInput.value;
	var marka = mtMainScreen_yeniMusteriKayitMarkaInput.value;
	var vergiDairesi = mtMainScreen_yeniMusteriKayitVergiDairesiInput.value;
	var vergiNo = mtMainScreen_yeniMusteriKayitVergiNoInput.value;
	var sektor = mtMainScreen_yeniMusteriKayitSektorSelect.selectmenu("value");
	var sirketSahibiIsim = mtMainScreen_yeniMusteriKayitSirketSahibiIsimInput.value;
	var sirketSahibiSoyisim = mtMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput.value;
	var irtibatKurulacakKisiIsim = mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput.value;
	var irtibatKurulacakKisiSoyisim = mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput.value;
	var irtibatKurulacakKisiTel = mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput.value;
	var adres = mtMainScreen_yeniMusteriKayitAdresInput.value;
	var ilce = mtMainScreen_yeniMusteriKayitIlceInput.value;
	var sehir = mtMainScreen_yeniMusteriKayitSehirSelect.selectmenu("value");
	var ulke = mtMainScreen_yeniMusteriKayitUlkeSelect.selectmenu("value");
	var web = mtMainScreen_yeniMusteriKayitWebInput.value;
	var email = mtMainScreen_yeniMusteriKayitEmailInput.value;
	var tel1 = mtMainScreen_yeniMusteriKayitTel1Input.value;
	var tel2 = mtMainScreen_yeniMusteriKayitTel2Input.value;
	var tel3 = mtMainScreen_yeniMusteriKayitTel3Input.value;
	var faks = mtMainScreen_yeniMusteriKayitFaksInput.value;
	var notlar = mtMainScreen_yeniMusteriKayitNotlarInput.value;
	
	if(unvan == "" || marka == "" || sektor == -1 || sirketSahibiIsim == "" || 
		sirketSahibiSoyisim == "" || irtibatKurulacakKisiIsim == "" || irtibatKurulacakKisiSoyisim == "" ||
		irtibatKurulacakKisiTel == "" || adres == "" || ilce == "" || sehir == -1 || ulke == -1 || tel1 == "" || web == "" || email == "")
	{
		alert("Lütfen tüm gerekli alanları giriniz.");
		return;
	}
	
	var postedString = "unvan=" + encodeURIComponent(unvan) + "&marka=" + encodeURIComponent(marka) + "&vergiDairesi=" + encodeURIComponent(vergiDairesi)
		+ "&vergiNo=" + encodeURIComponent(vergiNo) + "&sektorId=" + encodeURIComponent(sektor) + "&sirketSahibiIsim=" + encodeURIComponent(sirketSahibiIsim)
		+ "&sirketSahibiSoyisim=" + encodeURIComponent(sirketSahibiSoyisim) + "&irtibatKurulacakKisiIsim=" + encodeURIComponent(irtibatKurulacakKisiIsim) 
		+ "&irtibatKurulacakKisiSoyisim=" + encodeURIComponent(irtibatKurulacakKisiSoyisim)
		+ "&irtibatKurulacakKisiTel=" + encodeURIComponent(irtibatKurulacakKisiTel) 
		+ "&adres=" + encodeURIComponent(adres) + "&ilce=" + encodeURIComponent(ilce)
		+ "&sehirId=" + encodeURIComponent(sehir) + "&ulkeId=" + encodeURIComponent(ulke) + "&web=" + encodeURIComponent(web)
		+ "&email=" + encodeURIComponent(email) + "&tel1=" + encodeURIComponent(tel1) + "&tel2=" + encodeURIComponent(tel2) 
		+ "&tel3=" + encodeURIComponent(tel3) + "&faks=" + encodeURIComponent(faks) + "&notlar=" + encodeURIComponent(notlar);	
	
	$.ajax({
		url: mtMainScreen_coreURL + "?op=saveNewCustomer",
		dataType: 'json',
		type: 'POST',
		data: postedString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Müşteri başarıyla kaydedildi");
				mtMainScreen_yeniMusteriKayitUnvanInput.value = "";
				mtMainScreen_yeniMusteriKayitMarkaInput.value = "";
				mtMainScreen_yeniMusteriKayitVergiDairesiInput.value = "";
				mtMainScreen_yeniMusteriKayitVergiNoInput.value = "";
				mtMainScreen_yeniMusteriKayitSektorSelect.selectmenu("value","-1");
				mtMainScreen_yeniMusteriKayitSirketSahibiIsimInput.value = "";
				mtMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput.value = "";
				mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput.value = "";
				mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput.value = "";
				mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput.value = "";
				mtMainScreen_yeniMusteriKayitAdresInput.value = "";
				mtMainScreen_yeniMusteriKayitIlceInput.value = "";
				document.getElementById("mtMainScreen_yeniMusteriKayitSehirSelect").innerHTML = "<option value='-1'>Seçiniz</option>";
				mtMainScreen_yeniMusteriKayitSehirSelect.selectmenu({maxHeight: 100});
				mtMainScreen_yeniMusteriKayitUlkeSelect.selectmenu("value","-1");
				mtMainScreen_yeniMusteriKayitWebInput.value = "";
				mtMainScreen_yeniMusteriKayitEmailInput.value = "";
				mtMainScreen_yeniMusteriKayitTel1Input.value = "";
				mtMainScreen_yeniMusteriKayitTel2Input.value = "";
				mtMainScreen_yeniMusteriKayitTel3Input.value = "";
				mtMainScreen_yeniMusteriKayitFaksInput.value = "";
				mtMainScreen_yeniMusteriKayitNotlarInput.value = "";
			}
			else
				alert(data.status);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_getFairs()
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairs',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_fillFairsSelect(data.fairs);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_fillFairsSelect(fairs)
{
	var mtMainScreen_satisAramaFuarSelect = document.getElementById("mtMainScreen_satisAramaFuarSelect");
	var mtMainScreen_gorusmeAramaFuarSelect = document.getElementById("mtMainScreen_gorusmeAramaFuarSelect");
	var mtMainScreen_fuarKatilimciAramaFuarSelect = document.getElementById("mtMainScreen_fuarKatilimciAramaFuarSelect");
	
	for(var i = 0; i < fairs.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = fairs[i].name;
		newOption.setAttribute("value", fairs[i].fairId);
		mtMainScreen_satisAramaFuarSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = fairs[i].name;
		newOption2.setAttribute("value", fairs[i].fairId);
		mtMainScreen_gorusmeAramaFuarSelect.appendChild(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.innerHTML = fairs[i].name;
		newOption3.setAttribute("value", fairs[i].fairId);
		mtMainScreen_fuarKatilimciAramaFuarSelect.appendChild(newOption3);
	}
	
	$("#mtMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_fuarKatilimciAramaFuarSelect").selectmenu({maxHeight: 100});
}

function mtMainScreen_getCustomerRepresentatives()
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCustomerRepresentatives',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_fillCustomerRepresentativesSelect(data.customerRepresentatives);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_fillCustomerRepresentativesSelect(customerRepresentatives)
{
	var mtMainScreen_satisAramaMTSelect = document.getElementById("mtMainScreen_satisAramaMTSelect");
	var mtMainScreen_gorusmeAramaMTSelect = document.getElementById("mtMainScreen_gorusmeAramaMTSelect");
	
	for(var i = 0; i < customerRepresentatives.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = customerRepresentatives[i].name;
		newOption.setAttribute("value", customerRepresentatives[i].userId);
		mtMainScreen_satisAramaMTSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = customerRepresentatives[i].name;
		newOption2.setAttribute("value", customerRepresentatives[i].userId);
		mtMainScreen_gorusmeAramaMTSelect.appendChild(newOption2);
	}
	
	$("#mtMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#mtMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
}

function mtMainScreen_searchCustomers()
{
	var title = mtMainScreen_musteriAramaSirketUnvaniInput.value;
	var phoneNumber = mtMainScreen_musteriAramaSirketTelInput.value;
	var brand = mtMainScreen_musteriAramaSirketMarkaInput.value;
	var name = mtMainScreen_musteriAramaCalisanAdiInput.value;
	var surname = mtMainScreen_musteriAramaCalisanSoyadiInput.value;
	var countryId = mtMainScreen_musteriAramaAdresUlkeSelect.selectmenu("value");
	var cityId = mtMainScreen_musteriAdresIlSelect.selectmenu("value");
	
	if(title == "" && phoneNumber == "" && brand == "" && name == "" && surname == "" && countryId == -1 && cityId == -1)
	{
		alert("Lütfen en az bir kriteri giriniz.");
		return;
	}
	
	var postString = "title=" + encodeURIComponent(title) + "&phoneNumber=" + encodeURIComponent(phoneNumber) + "&brand=" + encodeURIComponent(brand)
		+ "&name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) + "&countryId=" + encodeURIComponent(countryId)
		+ "&cityId=" + encodeURIComponent(cityId);
		
	$.ajax({
		url: mtMainScreen_coreURL + "?op=searchCustomers",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showCustomers(data.customers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_showCustomers(customers)
{
	var mtMainScreen_musteriSonucDiv = document.getElementById("mtMainScreen_musteriSonucDiv");
	mtMainScreen_musteriSonucDiv.innerHTML = "";
	
	var mtMainScreen_musteriSonucHeaderRow = document.createElement("div");
	mtMainScreen_musteriSonucHeaderRow.setAttribute("class","mtMainScreen_musteriSonucHeaderRow");
	
	var mtMainScreen_musteriSonucLockHeader = document.createElement("div");
	mtMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	mtMainScreen_musteriSonucLockHeader.setAttribute("class","mtMainScreen_musteriSonucLockCell");
	
	var mtMainScreen_musteriSonucTitleHeader = document.createElement("div");
	mtMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	mtMainScreen_musteriSonucTitleHeader.setAttribute("class","mtMainScreen_musteriSonucTitleCell");
	
	var mtMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	mtMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	mtMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","mtMainScreen_musteriSonucPhoneNumberCell");
	
	var mtMainScreen_musteriSonucMailHeader = document.createElement("div");
	mtMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	mtMainScreen_musteriSonucMailHeader.setAttribute("class","mtMainScreen_musteriSonucMailCell");
	
	var mtMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	mtMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	mtMainScreen_musteriSonucWebsiteHeader.setAttribute("class","mtMainScreen_musteriSonucWebsiteCell");
	
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucLockHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucTitleHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucPhoneNumberHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucMailHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucWebsiteHeader);
	
	mtMainScreen_musteriSonucDiv.appendChild(mtMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var mtMainScreen_musteriSonucRow = document.createElement("div");
		mtMainScreen_musteriSonucRow.setAttribute("class","mtMainScreen_musteriSonucRow");
		
		var mtMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		mtMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		mtMainScreen_musteriSonucLockCell.setAttribute("class","mtMainScreen_musteriSonucLockCell");
		
		var mtMainScreen_musteriSonucTitleCell = document.createElement("div");
		mtMainScreen_musteriSonucTitleCell.innerHTML = "<span class='mtMainScreen_musteriSonucLink' onclick='mtMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		mtMainScreen_musteriSonucTitleCell.setAttribute("class","mtMainScreen_musteriSonucTitleCell");
		
		var mtMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		mtMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		mtMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","mtMainScreen_musteriSonucPhoneNumberCell");
		
		var mtMainScreen_musteriSonucMailCell = document.createElement("div");
		mtMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		mtMainScreen_musteriSonucMailCell.setAttribute("class","mtMainScreen_musteriSonucMailCell");
		
		var mtMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		mtMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		mtMainScreen_musteriSonucWebsiteCell.setAttribute("class","mtMainScreen_musteriSonucWebsiteCell");
		
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucLockCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucTitleCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucPhoneNumberCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucMailCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucWebsiteCell);
		
		mtMainScreen_musteriSonucDiv.appendChild(mtMainScreen_musteriSonucRow);
	}
}

function mtMainScreen_getCustomerDetails(customerId)
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getCustomerDetails&customerId=" + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showCustomerDetails(data,customerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_showCustomerDetails(data,customerId)
{
	var mtMainScreen_musteriDetaylariContainerDiv = document.getElementById("mtMainScreen_musteriDetaylariContainerDiv");
	mtMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
	
	var mtMainScreen_musteriDetaylariTopDiv = document.createElement("div");
	mtMainScreen_musteriDetaylariTopDiv.setAttribute("class","mtMainScreen_musteriDetaylariTopDiv");
	
	var mtMainScreen_musteriDetaylariLeftDiv = document.createElement("div");
	mtMainScreen_musteriDetaylariLeftDiv.setAttribute("class","mtMainScreen_musteriDetaylariLeftDiv");
	
	var imageHTML = "";
	if(data.lockedByUser)
		imageHTML += "<img style='margin-left:5px;' src='core/css/images/Lock.png' title='Kilidi kaldırmak için tıklayınız.' onclick='mtMainScreen_unlockCustomer(" + customerId + ")'>";
	
	var lockedMT = ""
	if(data.lockedMT != null)
		lockedMT = data.lockedMT;
	
	var mtMainScreen_musteriDetaylariGeneralInfoDiv = document.createElement("div");
	mtMainScreen_musteriDetaylariGeneralInfoDiv.setAttribute("style","margin-bottom:5px;");
	mtMainScreen_musteriDetaylariGeneralInfoDiv.innerHTML += 
		"<div style='margin-bottom:10px;'>" +
			"<span style='font-weight:bold; font-size:16px;text-align:center;'>" + data.customerInfo.title + "</span>" +
			imageHTML +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='mtMainScreen_musteriDetaylariLabel'>Ekleyen MT:</label>" +
			"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerInfo.addedName + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='mtMainScreen_musteriDetaylariLabel'>Kilitleyen MT:</label>" +
			"<span class='mtMainScreen_musteriDetaylariSpan'>" + lockedMT + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='mtMainScreen_musteriDetaylariLabel'>Marka:</label>" +
			"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerInfo.brand + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='mtMainScreen_musteriDetaylariLabel'>Kayıt Tarihi:</label>" +
			"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerInfo.addedDate + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='mtMainScreen_musteriDetaylariLabel'>Vergi Daire-No:</label>" +
			"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerInfo.taxOffice + "-" + data.customerInfo.taxId + "</span>" +
		"</div>";
		
	mtMainScreen_musteriDetaylariLeftDiv.appendChild(mtMainScreen_musteriDetaylariGeneralInfoDiv);
	
	var mtMainScreen_musteriDetaylariContactsDiv = document.createElement("div");
	mtMainScreen_musteriDetaylariContactsDiv.setAttribute("class","mtMainScreen_musteriDetaylariContactsDiv");
	if(data.customerContacts.length != 0)
		mtMainScreen_musteriDetaylariContactsDiv.innerHTML = "<div style='font-weight:bold;margin-bottom:5px;'>İrtibat Kurulabilecek Kişiler</div>";
	
	for(var i = 0; i < data.customerContacts.length; i++)
	{
		var phone = "";
		if(data.customerContacts[i].contactPhone != null)
			phone = data.customerContacts[i].contactPhone;
			
		var title = "";
		if(data.customerContacts[i].contactTitle != null)
			title = data.customerContacts[i].contactTitle;
		
		var contactButtonsHTML = "";
		if(!data.lockedByAnotherUser)
		{
			contactButtonsHTML =
				"<div class='mtMainScreen_musteriDetaylariContactButtonsDiv'>" +
					"<a href='#' onclick='javascript:mtMainScreen_deleteCustomerContact(" + data.customerContacts[i].customerContactId + "," + customerId + ")'>Sil</a>" +
					"<a style='margin-left:5px;' href='#' onclick='javascript:editCustomerContact_openEditPopup(" 
						+ data.customerContacts[i].customerContactId + "," + customerId + ")'>Düzenle</a>" +
				"</div>";
		}
		
		mtMainScreen_musteriDetaylariContactsDiv.innerHTML += 
			"<div class='mtMainScreen_musteriDetaylariContactDiv'>" +
				"<div class='mtMainScreen_musteriDetaylariContactInfoDiv'>" +
					data.customerContacts[i].contactName + " " + data.customerContacts[i].contactSurname + "-" + title
					+ "-" + phone + "-" + data.customerContacts[i].branchType +
				"</div>" +
				contactButtonsHTML +
			"</div>";
	}
	mtMainScreen_musteriDetaylariLeftDiv.appendChild(mtMainScreen_musteriDetaylariContactsDiv);
	mtMainScreen_musteriDetaylariTopDiv.appendChild(mtMainScreen_musteriDetaylariLeftDiv);
			
	var mtMainScreen_musteriDetaylariRightDiv = document.createElement("div");
	mtMainScreen_musteriDetaylariRightDiv.setAttribute("class","mtMainScreen_musteriDetaylariRightDiv");
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
	
	mtMainScreen_musteriDetaylariRightDiv.innerHTML = "<div style='height: 25px;'>" +
			"<label class='mtMainScreen_musteriDetaylariRightLabel'>Sektörler:</label>" +
			"<span class='mtMainScreen_musteriDetaylariRightSpan'>" + sectorsText + "</span>" +
			"<div class='mtMainScreen_contractCheckboxDiv' style='float: left; margin-right:8px;'>" +
				"<label class='mtMainScreen_musteriDetaylariRightLabel'>Sözleşme:</label>" +
				"<input type='checkbox' id='mtMainScreen_contractCheckInput' disabled='true' " + checkedString + "'/>" +
			"</div>" +
			"<label class='mtMainScreen_musteriDetaylariRightLabel'>Tarih:</label>" +
			"<span class='mtMainScreen_musteriDetaylariRightSpan'>" + lastContractDate + "</span>" +
			"<label class='mtMainScreen_musteriDetaylariRightLabel'>Fuar:</label>" +
			"<span class='customerDetails_fairNameSpan'>" + lastContractFair + "</span>" +
		"</div>";
	
	var mtMainScreen_musteriDetaylariSubelerTabs = document.createElement("div");
	mtMainScreen_musteriDetaylariSubelerTabs.setAttribute("class","mtMainScreen_musteriDetaylariSubelerTabs");
	mtMainScreen_musteriDetaylariRightDiv.appendChild(mtMainScreen_musteriDetaylariSubelerTabs);
	
	var subelerTabUlHTML = "<ul>";
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		subelerTabUlHTML += '<li><a href="#mtMainScreen_musteriDetaylariSube' + i + 'Tab">' 
									+ data.customerBranches[i].type + '</a></li>';
	}
	subelerTabUlHTML += "</ul>";
	mtMainScreen_musteriDetaylariSubelerTabs.innerHTML = subelerTabUlHTML;
	
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		var deleteButtonHTML = "";
		if(data.customerBranches[i].type == "Merkez" || data.lockedByAnotherUser)
		{
			deleteButtonHTML = "<button disabled='true' class='mtMainScreen_musteriDetaylarSubeButton'>Bu Şubeyi Sil</button>";
		}
		else
			deleteButtonHTML = "<button class='mtMainScreen_musteriDetaylarSubeButton' onclick='mtMainScreen_deleteCustomerBranch(" + data.customerBranches[i].branchId + "," + customerId + ")'>Bu Şubeyi Sil</button>";
			
		var editButtonHTML = "";
		if(data.lockedByAnotherUser)
		{
			editButtonHTML = "<button disabled='true' class='mtMainScreen_musteriDetaylarSubeButton'>Düzenle</button>";
		}
		else
			editButtonHTML ="<button class='mtMainScreen_musteriDetaylarSubeButton' onclick='editCustomerLocation_openEditPopup(" 
						+ data.customerBranches[i].branchId + "," + customerId + ")'>Düzenle</button>";
		
		mtMainScreen_musteriDetaylariSubelerTabs.innerHTML += 
			"<div id='mtMainScreen_musteriDetaylariSube" + i + "Tab'>" +  
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Adres:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].address + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>İlçe:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].county + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Şehir:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].cityName + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Ülke:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].countryName + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Website:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].website + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>E-mail:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].email + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Tel-1:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber1 + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Tel-2:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber2 + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Tel-3:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber3 + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Faks:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].fax + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='mtMainScreen_musteriDetaylariLabel'>Notlar:</label>" +
					"<span class='mtMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].notes + "</span>" +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow' style='height:28px;'>" +
					deleteButtonHTML +
				"</div>" +
				"<div class='mtMainScreen_musteriDetaylarSubeRow' style='height:28px;'>" +
					editButtonHTML +
				"</div>" +
			"</div>";
	}
	mtMainScreen_musteriDetaylariTopDiv.appendChild(mtMainScreen_musteriDetaylariRightDiv);
	mtMainScreen_musteriDetaylariContainerDiv.appendChild(mtMainScreen_musteriDetaylariTopDiv);
	$(".mtMainScreen_musteriDetaylariSubelerTabs").tabs();
	$(".mtMainScreen_musteriDetaylarSubeButton").button();
	var mtMainScreen_musteriDetaylariButtonsDiv = document.createElement("div");
	mtMainScreen_musteriDetaylariButtonsDiv.setAttribute("class","mtMainScreen_musteriDetaylariButtonsDiv");
	
	var musteriDetaylariButtonsHTML = "";
	if(data.lockedByAnotherUser)
	{
		musteriDetaylariButtonsHTML = 
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' disabled='true'>Şirket Bilgilerini Düzenle</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' disabled='true'>Şirketi Sil</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' disabled='true'>Yeni Lokasyon Ekle</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' disabled='true'>Yeni Kişi Ekle</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' disabled='true'>Yeni Görüşme Oluştur</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' disabled='true'>Görüşmeleri Göster</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' disabled='true'>Satış Yap</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' disabled='true'>Sözleşme Bilgisi Göster</button>" +
			"</div>";
	}
	else
	{
		musteriDetaylariButtonsHTML = 
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' onclick='editCustomer_openPopup(" + customerId + ")'>Şirket Bilgilerini Düzenle</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' onclick='mtMainScreen_deleteCustomer(" + customerId + ")'>Şirketi Sil</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' onclick='editCustomerLocation_openPopup(" + customerId + ")'>Yeni Lokasyon Ekle</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' onclick='editCustomerContact_openPopup(" + customerId + ")'>Yeni Kişi Ekle</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' onclick='addMeeting_openPopup(" + customerId + ")'>Yeni Görüşme Oluştur</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' onclick='mtMainScreen_searchCustomerMeetings(" + customerId + ")'>Görüşmeleri Göster</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='mtMainScreen_musteriDetaylarButton' onclick='addContract_openPopup(" + customerId + ")'>Satış Yap</button>" +
				"<button style='margin-left:20px;' class='mtMainScreen_musteriDetaylarButton' onclick='mtMainScreen_searchCustomerContracts(" + customerId + ")'>Sözleşme Bilgisi Göster</button>" +
			"</div>";
	}
	
	mtMainScreen_musteriDetaylariButtonsDiv.innerHTML = musteriDetaylariButtonsHTML;
	
	mtMainScreen_musteriDetaylariContainerDiv.appendChild(mtMainScreen_musteriDetaylariButtonsDiv);
	$(".mtMainScreen_musteriDetaylarButton").button();
	$( "#mtMainScreen_aramaTabs" ).tabs( "option", "disabled", false );
	$( "#mtMainScreen_aramaTabs" ).tabs( "option", "active", 4 );	
}

function mtMainScreen_deleteCustomerContact(customerContactId, customerId)
{
	if(confirm("Bu kişiyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: mtMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomerContact&customerContactId=' + customerContactId ,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					mtMainScreen_getCustomerDetails(customerId);
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function mtMainScreen_deleteCustomerBranch(branchId, customerId)
{
	if(confirm("Bu şubeyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: mtMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomerBranch&branchId=' + branchId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					mtMainScreen_getCustomerDetails(customerId);
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function mtMainScreen_deleteCustomer(customerId)
{
	if(confirm("Bu müşteriyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: mtMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomer&customerId=' + customerId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					mtMainScreen_musteriAramaSirketUnvaniInput.value = "";
					mtMainScreen_musteriAramaSirketTelInput.value = "";
					mtMainScreen_musteriAramaSirketMarkaInput.value = "";
					mtMainScreen_musteriAramaCalisanAdiInput.value = "";
					mtMainScreen_musteriAramaCalisanSoyadiInput.value = "";
					mtMainScreen_musteriAramaAdresUlkeSelect.selectmenu("value", -1);
					mtMainScreen_musteriAdresIlSelect.innerHTML = "<option value='-1'>Seçiniz</option>";
					$("#mtMainScreen_musteriAdresIlSelect").selectmenu({maxHeight: 100});
					var mtMainScreen_musteriSonucDiv = document.getElementById("mtMainScreen_musteriSonucDiv");
					mtMainScreen_musteriSonucDiv.innerHTML = "";
					var mtMainScreen_musteriDetaylariContainerDiv = document.getElementById("mtMainScreen_musteriDetaylariContainerDiv");
					mtMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
					$("#mtMainScreen_aramaTabs").tabs({disabled: [ 3 ] });
					$( "#mtMainScreen_aramaTabs" ).tabs( "option", "active", 0 );
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function mtMainScreen_getMyCustomers()
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getMyCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showMyCustomers(data.contractCustomers, "mtMainScreen_firmalarimSozlesmeliSonucDiv");
				mtMainScreen_showMyCustomers(data.lockCustomers, "mtMainScreen_firmalarimTakipSonucDiv");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_showMyCustomers(customers, divId)
{
	var mtMainScreen_firmalarimSonucDiv = document.getElementById(divId);
	mtMainScreen_firmalarimSonucDiv.innerHTML = "";
	
	var mtMainScreen_musteriSonucHeaderRow = document.createElement("div");
	mtMainScreen_musteriSonucHeaderRow.setAttribute("class","mtMainScreen_musteriSonucHeaderRow");
	
	var mtMainScreen_musteriSonucLockHeader = document.createElement("div");
	mtMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	mtMainScreen_musteriSonucLockHeader.setAttribute("class","mtMainScreen_musteriSonucLockCell");
	
	var mtMainScreen_musteriSonucTitleHeader = document.createElement("div");
	mtMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	mtMainScreen_musteriSonucTitleHeader.setAttribute("class","mtMainScreen_musteriSonucTitleCell");
	
	var mtMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	mtMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	mtMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","mtMainScreen_musteriSonucPhoneNumberCell");
	
	var mtMainScreen_musteriSonucMailHeader = document.createElement("div");
	mtMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	mtMainScreen_musteriSonucMailHeader.setAttribute("class","mtMainScreen_musteriSonucMailCell");
	
	var mtMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	mtMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	mtMainScreen_musteriSonucWebsiteHeader.setAttribute("class","mtMainScreen_musteriSonucWebsiteCell");
	
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucLockHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucTitleHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucPhoneNumberHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucMailHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucWebsiteHeader);
	
	mtMainScreen_firmalarimSonucDiv.appendChild(mtMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var mtMainScreen_musteriSonucRow = document.createElement("div");
		mtMainScreen_musteriSonucRow.setAttribute("class","mtMainScreen_musteriSonucRow");
		
		var mtMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		mtMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		mtMainScreen_musteriSonucLockCell.setAttribute("class","mtMainScreen_musteriSonucLockCell");
		
		var mtMainScreen_musteriSonucTitleCell = document.createElement("div");
		mtMainScreen_musteriSonucTitleCell.innerHTML = "<span class='mtMainScreen_musteriSonucLink' onclick='mtMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		mtMainScreen_musteriSonucTitleCell.setAttribute("class","mtMainScreen_musteriSonucTitleCell");
		
		var mtMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		mtMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		mtMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","mtMainScreen_musteriSonucPhoneNumberCell");
		
		var mtMainScreen_musteriSonucMailCell = document.createElement("div");
		mtMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		mtMainScreen_musteriSonucMailCell.setAttribute("class","mtMainScreen_musteriSonucMailCell");
		
		var mtMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		mtMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		mtMainScreen_musteriSonucWebsiteCell.setAttribute("class","mtMainScreen_musteriSonucWebsiteCell");
		
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucLockCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucTitleCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucPhoneNumberCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucMailCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucWebsiteCell);
		
		mtMainScreen_firmalarimSonucDiv.appendChild(mtMainScreen_musteriSonucRow);
	}
}

function mtMainScreen_searchContracts()
{
	var fairId = $("#mtMainScreen_satisAramaFuarSelect").selectmenu("value");
	var userId = $("#mtMainScreen_satisAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("mtMainScreen_satisAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("mtMainScreen_satisAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#mtMainScreen_satisAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#mtMainScreen_satisAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: mtMainScreen_coreURL + "?op=searchContracts",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showContracts(data.contracts,postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_showContracts(contracts,postString)
{
	var mtMainScreen_satisSonucDiv = document.getElementById("mtMainScreen_satisSonucDiv");
	mtMainScreen_satisSonucDiv.innerHTML = "";
	var totalArea = 0;
	
	for(var i = 0; i < contracts.length; i++)
	{
		var mtMainScreen_satisSonucRow = document.createElement("div");
		mtMainScreen_satisSonucRow.setAttribute("class","mtMainScreen_satisSonucRow");
		
		mtMainScreen_satisSonucRow.innerHTML = contracts[i].contractDate + " - " + contracts[i].title + " - " + contracts[i].fairName + " - " +
			contracts[i].standArea + " m<sup>2</sup>";
		mtMainScreen_satisSonucRow.setAttribute("onclick","mtMainScreen_getContractDetails(" + contracts[i].contractId + ")");
		mtMainScreen_satisSonucDiv.appendChild(mtMainScreen_satisSonucRow);
		totalArea += contracts[i].standArea;
	}
	
	var postHTML = "";
	if(postString != "")
		postHTML = "<a style='margin-left:10px;' target='_blank' href='getContractsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
	
	var mtMainScreen_satisOzetDiv = document.getElementById("mtMainScreen_satisOzetDiv");
	mtMainScreen_satisOzetDiv.innerHTML = "Toplam " + contracts.length + " tane sözleşme bulundu. Toplam " + totalArea + " m<sup>2</sup>." +
		postHTML;
}

function mtMainScreen_getContractDetails(contractId)
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getContractDetails&contractId=" + contractId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showContractDetails(data, contractId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_showContractDetails(data, contractId)
{
	var mtMainScreen_satisDetaylariContainerDiv = document.getElementById("mtMainScreen_satisDetaylariContainerDiv");
	mtMainScreen_satisDetaylariContainerDiv.innerHTML = "";
	
	var pdfDownloadLinkHTML = "";
	if(data.generalInfo.pdfUpload)
		pdfDownloadLinkHTML = '<a style="margin-left:10px;" target="_blank" href="uploads/' + contractId + '.pdf">PDF İndir</a>';
	
	mtMainScreen_satisDetaylariContainerDiv.innerHTML=
		'<div id="mtMainScreen_showContractDetails_topDiv">' +
			'<div id="mtMainScreen_showContractDetails_leftDiv">' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Fuar Adı:</label>' +
					data.fairInfo.fairName +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Fuar Tarihi:</label>' +
					data.fairInfo.startDate + " - " + data.fairInfo.endDate +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Proje Sorumlusu:</label>' +
					data.fairInfo.fkName +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Müşteri Hizmetleri Sorumlusu:</label>' +
					data.fairInfo.mtName +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">İndirimsiz Satış Fiyatı:</label>' +
					data.fairInfo.price + " &#8364;" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Müşteri Temsilcisi Adı:</label>' +
					data.customerRepresentativeInfo.name +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">MT Grubu:</label>' +
					data.customerRepresentativeInfo.sector +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Katılımcı Firma Yetkili:</label>' +
					data.customerContactName +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Taksit Sayısı:</label>' +
					data.payments.length +
				'</div>' +
				'<div id="mtMainScreen_paymentPlanDiv">' +
				'</div>' +
			'</div>' +				
			'<div id="mtMainScreen_showContractDetails_rightDiv">' +	
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Katılımcı Firma Ünvanı:</label>' +
					data.customerTitle +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Sözleşme Tarihi:</label>' +
					data.generalInfo.contractDate +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Ürün Grubu:</label>' +
					data.generalInfo.productGroup +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Nakliye Durumu:</label>' +
					data.generalInfo.shippingOption +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Stand Durumu:</label>' +
					data.generalInfo.standRequest +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Ekstra Navlun:</label>' +
					'<input type="checkbox" id="mtMainScreen_extraNavlunInput" disabled="true"/>' +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Ekstra Navlun Miktar:</label>' +
					data.generalInfo.extraNavlunArea + " m<sup>3</sup>" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Ekstra Navlun Fiyat:</label>' +
					data.generalInfo.extraNavlunPrice + " &#8364;" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Stand m<sup>2</sup>:</label>' +
					data.generalInfo.standArea + " m<sup>2</sup>" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">m<sup>2</sup> Birim Fiyatı:</label>' +
					data.generalInfo.unitPrice + " &#8364;" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Sözleşme Tutarı:</label>' +
					data.generalInfo.contractAmount + " &#8364;" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">İndirim Oranı:</label>' +
					" %" + data.generalInfo.discountRate +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">İndirim Tutarı:</label>' +
					data.generalInfo.discountAmount + " &#8364;" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">KDV Tutarı:</label>' +
					data.generalInfo.kdvAmount  + " &#8364;" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv">' +
					'<label class="mtMainScreen_showContractDetails_label">Sözleşme Bedeli(KDVli):</label>' +
					data.generalInfo.contractAmountWithKdv  + " &#8364;" +
				'</div>' +
				'<div class="mtMainScreen_showContractDetails_outputDiv" style="height:80px;">' +
					'<label class="mtMainScreen_showContractDetails_label">Ekstra Taahhütler:</label>' +
					'<textarea id="mtMainScreen_showContractDetails_extraCommitmentsInput" rows="5" style="resize:none;" disabled="true"></textarea>' +
				'</div>' +
			'</div>'+
		'</div>' +
		'<div class="mtMainScreen_showContractDetails_outputDiv">' +
			'<input class="mtMainScreen_dosyaYukleButton" onclick="uploadifyPlugin_openPopup(' + contractId + ')" value="PDF Yükle" type="submit">' +
			pdfDownloadLinkHTML +
		'</div>';
	
	$(".mtMainScreen_dosyaYukleButton").button();
	if(data.generalInfo.extraNavlun)
		document.getElementById("mtMainScreen_extraNavlunInput").checked = true;
	var mtMainScreen_showContractDetails_extraCommitmentsInput = document.getElementById("mtMainScreen_showContractDetails_extraCommitmentsInput");
	mtMainScreen_showContractDetails_extraCommitmentsInput.value = data.generalInfo.extraCommitments;
	$( "#mtMainScreen_satisTabs" ).tabs( "option", "disabled", false );
	$( "#mtMainScreen_satisTabs" ).tabs( "option", "active", 1 );
	
	var mtMainScreen_paymentPlanDiv = document.getElementById("mtMainScreen_paymentPlanDiv");
	var paymentCount = data.payments.length;
	for(var i = 1; i <= paymentCount; i++)
	{
		var mtMainScreen_showContractDetails_outputDiv = document.createElement("div");
		mtMainScreen_showContractDetails_outputDiv.setAttribute("class", "mtMainScreen_showContractDetails_outputDiv");
		
		var mtMainScreen_showContractDetails_label = document.createElement("label");
		mtMainScreen_showContractDetails_label.setAttribute("class", "mtMainScreen_showContractDetails_label");
		mtMainScreen_showContractDetails_label.innerHTML = i + ". Taksit:";
		mtMainScreen_showContractDetails_outputDiv.appendChild(mtMainScreen_showContractDetails_label);
		
		var mtMainScreen_paymentLabel = document.createElement("label");
		mtMainScreen_paymentLabel.setAttribute("class", "mtMainScreen_paymentLabel");
		mtMainScreen_paymentLabel.innerHTML = data.payments[i - 1].paymentAmount + " &#8364;";
		mtMainScreen_showContractDetails_outputDiv.appendChild(mtMainScreen_paymentLabel);
		
		var mtMainScreen_paymentDueDateLabel = document.createElement("label");
		mtMainScreen_paymentDueDateLabel.setAttribute("class", "mtMainScreen_paymentDueDateLabel");
		mtMainScreen_paymentDueDateLabel.innerHTML = data.payments[i - 1].paymentDueDate;
		mtMainScreen_showContractDetails_outputDiv.appendChild(mtMainScreen_paymentDueDateLabel);
		
		var mtMainScreen_paymentPaidCheckbox = document.createElement("input");
		mtMainScreen_paymentPaidCheckbox.setAttribute("class", "mtMainScreen_paymentPaidCheckbox");
		mtMainScreen_paymentPaidCheckbox.setAttribute("type", "checkbox");
		mtMainScreen_paymentPaidCheckbox.setAttribute("disabled", "true");
		mtMainScreen_paymentPaidCheckbox.checked = data.payments[i - 1].paymentPaid;
		mtMainScreen_showContractDetails_outputDiv.appendChild(mtMainScreen_paymentPaidCheckbox);
		
		var mtMainScreen_paymentPaidSpan = document.createElement("span");
		mtMainScreen_paymentPaidSpan.setAttribute("class", "mtMainScreen_paymentPaidSpan");
		mtMainScreen_paymentPaidSpan.innerHTML = "Ödendi";
		mtMainScreen_showContractDetails_outputDiv.appendChild(mtMainScreen_paymentPaidSpan);
		
		mtMainScreen_paymentPlanDiv.appendChild(mtMainScreen_showContractDetails_outputDiv);
	}
}

function mtMainScreen_searchMeetings()
{
	var fairId = $("#mtMainScreen_gorusmeAramaFuarSelect").selectmenu("value");
	var userId = $("#mtMainScreen_gorusmeAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("mtMainScreen_gorusmeAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("mtMainScreen_gorusmeAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#mtMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#mtMainScreen_gorusmeAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: mtMainScreen_coreURL + "?op=searchMeetings",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showMeetings(data.meetings, postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_showMeetings(meetings, postString)
{
	var mtMainScreen_gorusmeSonucDiv = document.getElementById("mtMainScreen_gorusmeSonucDiv");
	mtMainScreen_gorusmeSonucDiv.innerHTML = "";
	
	if(meetings.length == 0)
		mtMainScreen_gorusmeSonucDiv.innerHTML = "Aradığınız kriterlere uygun görüşme bulunamamıştır.";
	
	for(var i = 0; i < meetings.length; i++)
	{
		var mtMainScreen_gorusmeSonucRow = document.createElement("div");
		mtMainScreen_gorusmeSonucRow.setAttribute("class","mtMainScreen_gorusmeSonucRow");
		
		mtMainScreen_gorusmeSonucRow.innerHTML = meetings[i].meetingDate + " - " + meetings[i].customerTitle + " - " + meetings[i].fairName + " - " +
			meetings[i].mtName + " - " + meetings[i].topic + " - " + meetings[i].description + " - " + meetings[i].meetingType;
		mtMainScreen_gorusmeSonucDiv.appendChild(mtMainScreen_gorusmeSonucRow);
	}
	
	var postHTML = "";
	if(postString != "")
		postHTML = "<a style='margin-left:10px;' target='_blank' href='getMeetingsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
	
	var mtMainScreen_gorusmeOzetDiv = document.getElementById("mtMainScreen_gorusmeOzetDiv");
	mtMainScreen_gorusmeOzetDiv.innerHTML = "Toplam " + meetings.length + " tane görüşme bulundu." +
		postHTML;
}

function mtMainScreen_searchCustomerMeetings(customerId)
{
	$("#mtMainScreen_gorusmeAramaFuarSelect").selectmenu("value", "-1");
	$("#mtMainScreen_gorusmeAramaMTSelect").selectmenu("value", "-1");
	document.getElementById("mtMainScreen_gorusmeAramaBaslangicTarihiInput").value = "";
	document.getElementById("mtMainScreen_gorusmeAramaBitisTarihiInput").value = "";
	
	var postString = "customerId=" + encodeURIComponent(customerId);
		
	$.ajax({
		url: mtMainScreen_coreURL + "?op=searchCustomerMeetings",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showMeetings(data.meetings, "");
				$("#mtMainScreen_accordion").accordion('option', 'active', 2);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_searchCustomerContracts(customerId)
{
	$("#mtMainScreen_satisAramaFuarSelect").selectmenu("value", "-1");
	$("#mtMainScreen_satisAramaMTSelect").selectmenu("value", "-1");
	document.getElementById("mtMainScreen_satisAramaBaslangicTarihiInput").value = "";
	document.getElementById("mtMainScreen_satisAramaBitisTarihiInput").value = "";
	
	var postString = "customerId=" + encodeURIComponent(customerId);
		
	$.ajax({
		url: mtMainScreen_coreURL + "?op=searchCustomerContracts",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showContracts(data.contracts, "");
				$("#mtMainScreen_accordion").accordion('option', 'active', 1);
				$("#mtMainScreen_satisTabs" ).tabs( "option", "active", 0 );	
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_unlockCustomer(customerId)
{
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=unlockCustomer&customerId=' + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Kilit başarıyla kaldırılmıştır.");
				mtMainScreen_getCustomerDetails(customerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_searchFairCustomers()
{
	var fairId = $("#mtMainScreen_fuarKatilimciAramaFuarSelect").selectmenu("value");
	if(fairId == -1)
	{
		alert("Lütfen katılımcılarını görüntülemek istediğiniz fuarı seçiniz.");
		return;
	}
	$.ajax({
		url: mtMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairCustomers&fairId=' + fairId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				mtMainScreen_showFairCustomers(data.fairCustomers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function mtMainScreen_showFairCustomers(customers)
{
	var mtMainScreen_fuarKatilimciSonucDiv = document.getElementById("mtMainScreen_fuarKatilimciSonucDiv");
	mtMainScreen_fuarKatilimciSonucDiv.innerHTML = "";
	
	var mtMainScreen_musteriSonucHeaderRow = document.createElement("div");
	mtMainScreen_musteriSonucHeaderRow.setAttribute("class","mtMainScreen_musteriSonucHeaderRow");
	
	var mtMainScreen_musteriSonucLockHeader = document.createElement("div");
	mtMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	mtMainScreen_musteriSonucLockHeader.setAttribute("class","mtMainScreen_musteriSonucLockCell");
	
	var mtMainScreen_musteriSonucTitleHeader = document.createElement("div");
	mtMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	mtMainScreen_musteriSonucTitleHeader.setAttribute("class","mtMainScreen_musteriSonucTitleCell");
	
	var mtMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	mtMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	mtMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","mtMainScreen_musteriSonucPhoneNumberCell");
	
	var mtMainScreen_musteriSonucMailHeader = document.createElement("div");
	mtMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	mtMainScreen_musteriSonucMailHeader.setAttribute("class","mtMainScreen_musteriSonucMailCell");
	
	var mtMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	mtMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	mtMainScreen_musteriSonucWebsiteHeader.setAttribute("class","mtMainScreen_musteriSonucWebsiteCell");
	
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucLockHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucTitleHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucPhoneNumberHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucMailHeader);
	mtMainScreen_musteriSonucHeaderRow.appendChild(mtMainScreen_musteriSonucWebsiteHeader);
	
	mtMainScreen_fuarKatilimciSonucDiv.appendChild(mtMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var mtMainScreen_musteriSonucRow = document.createElement("div");
		mtMainScreen_musteriSonucRow.setAttribute("class","mtMainScreen_musteriSonucRow");
		
		var mtMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		mtMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		mtMainScreen_musteriSonucLockCell.setAttribute("class","mtMainScreen_musteriSonucLockCell");
		
		var mtMainScreen_musteriSonucTitleCell = document.createElement("div");
		mtMainScreen_musteriSonucTitleCell.innerHTML = "<span class='mtMainScreen_musteriSonucLink' onclick='mtMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		mtMainScreen_musteriSonucTitleCell.setAttribute("class","mtMainScreen_musteriSonucTitleCell");
		
		var mtMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		mtMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		mtMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","mtMainScreen_musteriSonucPhoneNumberCell");
		
		var mtMainScreen_musteriSonucMailCell = document.createElement("div");
		mtMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		mtMainScreen_musteriSonucMailCell.setAttribute("class","mtMainScreen_musteriSonucMailCell");
		
		var mtMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		mtMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		mtMainScreen_musteriSonucWebsiteCell.setAttribute("class","mtMainScreen_musteriSonucWebsiteCell");
		
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucLockCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucTitleCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucPhoneNumberCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucMailCell);
		mtMainScreen_musteriSonucRow.appendChild(mtMainScreen_musteriSonucWebsiteCell);
		
		mtMainScreen_fuarKatilimciSonucDiv.appendChild(mtMainScreen_musteriSonucRow);
	}
}
