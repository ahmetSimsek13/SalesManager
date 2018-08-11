$(gyMainScreen_init);

var gyMainScreen_coreURL = 'plugins/gyMainScreen/gyMainScreen_core.php';
var gyMainScreen_musteriAramaSirketUnvaniInput;
var gyMainScreen_musteriAramaSirketTelInput;
var gyMainScreen_musteriAramaSirketMarkaInput;
var gyMainScreen_musteriAramaCalisanAdiInput;
var gyMainScreen_musteriAramaCalisanSoyadiInput;
var gyMainScreen_musteriAramaAdresUlkeSelect;
var gyMainScreen_musteriAdresIlSelect;

function gyMainScreen_init()
{
	$("#gyMainScreen_accordion").accordion();
	$("#gyMainScreen_firmalarimAccordion").accordion();
	$("#gyMainScreen_aramaTabs").tabs({disabled: [ 4 ],
		beforeActivate: function( event, ui ){
			var tab = ui.newTab;
			if(tab[0].innerText == "Firmalarım")
				gyMainScreen_getMyCustomers();
		}
	});
	$("#gyMainScreen_satisTabs").tabs({disabled: [ 1 ] });
	$("#gyMainScreen_istatistikTabs").tabs();
	$("#gyMainScreen_onayTabs").tabs();
	
	$("#gyMainScreen_musteriAramaSirketUnvaniInput, #gyMainScreen_musteriAramaSirketTelInput, #gyMainScreen_musteriAramaSirketMarkaInput" +
		", #gyMainScreen_musteriAramaCalisanAdiInput, #gyMainScreen_musteriAramaCalisanSoyadiInput").keyup(function(event){
		if(event.keyCode == 13)
		{
			$("#gyMainScreen_musteriAramaSearchButton").click();
		}
	});
	
	gyMainScreen_musteriAramaSirketUnvaniInput = document.getElementById("gyMainScreen_musteriAramaSirketUnvaniInput");
	gyMainScreen_musteriAramaSirketTelInput = document.getElementById("gyMainScreen_musteriAramaSirketTelInput");
	gyMainScreen_musteriAramaSirketMarkaInput = document.getElementById("gyMainScreen_musteriAramaSirketMarkaInput");
	gyMainScreen_musteriAramaCalisanAdiInput = document.getElementById("gyMainScreen_musteriAramaCalisanAdiInput");
	gyMainScreen_musteriAramaCalisanSoyadiInput = document.getElementById("gyMainScreen_musteriAramaCalisanSoyadiInput");
	gyMainScreen_musteriAramaAdresUlkeSelect = $("#gyMainScreen_musteriAramaAdresUlkeSelect");
	gyMainScreen_musteriAdresIlSelect = $("#gyMainScreen_musteriAdresIlSelect");
	
	gyMainScreen_musteriAramaAdresUlkeSelect.selectmenu({maxHeight: 100});
	gyMainScreen_musteriAdresIlSelect.selectmenu({maxHeight: 100});
	$("#gyMainScreen_musteriAramaSearchButton").button();
	$("#gyMainScreen_yeniMusteriKayitSehirSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_yeniMusteriKayitUlkeSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_yeniMusteriKayitSektorSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput").mask("0-(999) 9999999");
	$("#gyMainScreen_yeniMusteriKayitTel1Input").mask("0-(999) 9999999");
	$("#gyMainScreen_yeniMusteriKayitTel2Input").mask("0-(999) 9999999");
	$("#gyMainScreen_yeniMusteriKayitTel3Input").mask("0-(999) 9999999");
	$("#gyMainScreen_yeniMusteriKayitFaksInput").mask("0-(999) 9999999");
	$("#gyMainScreen_yeniMusteriKayitSaveButton").button();
	
	$("#gyMainScreen_fuarKatilimciAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_fuarKatilimciAramaSearchButton").button();
	
	$("#gyMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
	
	$("#gyMainScreen_satisAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_satisAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#gyMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_gorusmeAramaSearchButton").button();
	$("#gyMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_gorusmeAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#gyMainScreen_firmaIstatistikSearchButton").button();
	$("#gyMainScreen_firmaIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_firmaIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_firmaIstatistikFirmaSelect").selectmenu({maxHeight: 100});
	
	$("#gyMainScreen_mtIstatistikSearchButton").button();
	$("#gyMainScreen_mtIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_mtIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_mtIstatistikMTSelect").selectmenu({maxHeight: 100});
	
	$("#gyMainScreen_fuarIstatistikSearchButton").button();
	$("#gyMainScreen_fuarIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_fuarIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_fuarIstatistikFuarSelect").selectmenu({maxHeight: 100});
	
	$("#gyMainScreen_grupIstatistikSearchButton").button();
	$("#gyMainScreen_grupIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_grupIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#gyMainScreen_grupIstatistikGrupSelect").selectmenu({maxHeight: 100});
	
	var login_buttonsDiv = document.getElementById("login_buttonsDiv");
	
	var newMTButton = document.createElement("button");
	newMTButton.setAttribute("onclick","newMT_openPopup()");
	newMTButton.innerHTML = "Yeni MT Ekle";
	newMTButton.setAttribute("id","gyMainScreen_newMTButton");
	
	var newSpan = document.createElement("span");
	newSpan.setAttribute("id","gyMainScreen_onayBekleyenSpan");
	
	login_buttonsDiv.appendChild(newMTButton);
	login_buttonsDiv.appendChild(newSpan);
	
	$("#gyMainScreen_newMTButton").button();
	
	gyMainScreen_getSectors();
	gyMainScreen_getCountries();
	gyMainScreen_getFairs();
	gyMainScreen_getCustomerRepresentatives();
	gyMainScreen_getMyCustomers();
	gyMainScreen_getWaitingCustomers();
	gyMainScreen_getNotLockedCustomers();
	gyMainScreen_getAllCustomers();
	gyMainScreen_getWaitingContracts();
}

function gyMainScreen_getSectors()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectors',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var gyMainScreen_yeniMusteriKayitSektorSelect = document.getElementById("gyMainScreen_yeniMusteriKayitSektorSelect");
				var gyMainScreen_grupIstatistikGrupSelect = document.getElementById("gyMainScreen_grupIstatistikGrupSelect");
				for(var i = 0; i < data.sectors.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.sectors[i].sectorId);
					newOption.innerHTML = data.sectors[i].description;
					gyMainScreen_yeniMusteriKayitSektorSelect.appendChild(newOption);
					
					var newOption2 = document.createElement("option");
					newOption2.setAttribute("value", data.sectors[i].sectorId);
					newOption2.innerHTML = data.sectors[i].description;
					gyMainScreen_yeniMusteriKayitSektorSelect.appendChild(newOption2);
					gyMainScreen_grupIstatistikGrupSelect.appendChild(newOption2);
				}
				$("#gyMainScreen_yeniMusteriKayitSektorSelect").selectmenu({maxHeight: 100});
				$("#gyMainScreen_grupIstatistikGrupSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_getCountries()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCountries',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var gyMainScreen_yeniMusteriKayitUlkeSelect = document.getElementById("gyMainScreen_yeniMusteriKayitUlkeSelect");
				var gyMainScreen_musteriAramaAdresUlkeSelect = document.getElementById("gyMainScreen_musteriAramaAdresUlkeSelect");
				for(var i = 0; i < data.countries.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.countries[i].countryId);
					newOption.innerHTML = data.countries[i].name;
					gyMainScreen_yeniMusteriKayitUlkeSelect.appendChild(newOption);
					
					var newOption2 = document.createElement("option");
					newOption2.setAttribute("value", data.countries[i].countryId);
					newOption2.innerHTML = data.countries[i].name;
					gyMainScreen_musteriAramaAdresUlkeSelect.appendChild(newOption2);
				}
				$("#gyMainScreen_yeniMusteriKayitUlkeSelect").selectmenu({select: gyMainScreen_yeniMusteriKayitUlkeSelectChanged});
				$("#gyMainScreen_musteriAramaAdresUlkeSelect").selectmenu({select: gyMainScreen_musteriAramaAdresUlkeSelectChanged});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_musteriAramaAdresUlkeSelectChanged(event,optionElement)
{
	gyMainScreen_getCitiesOfCountry(1,optionElement.value);
}

function gyMainScreen_yeniMusteriKayitUlkeSelectChanged(event, optionElement)
{
	gyMainScreen_getCitiesOfCountry(2,optionElement.value);
}

function gyMainScreen_getCitiesOfCountry(which, countryId)
{
	$.ajax({
		url: gyMainScreen_coreURL,
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
					currentSelect = document.getElementById("gyMainScreen_musteriAdresIlSelect");
					currentSelectId = "#gyMainScreen_musteriAdresIlSelect";
				}
				else if(which == 2)
				{
					currentSelect = document.getElementById("gyMainScreen_yeniMusteriKayitSehirSelect");
					currentSelectId = "#gyMainScreen_yeniMusteriKayitSehirSelect";
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

function gyMainScreen_saveNewCustomer()
{
	var gyMainScreen_yeniMusteriKayitUnvanInput = document.getElementById("gyMainScreen_yeniMusteriKayitUnvanInput");
	var gyMainScreen_yeniMusteriKayitMarkaInput = document.getElementById("gyMainScreen_yeniMusteriKayitMarkaInput");
	var gyMainScreen_yeniMusteriKayitVergiDairesiInput = document.getElementById("gyMainScreen_yeniMusteriKayitVergiDairesiInput");
	var gyMainScreen_yeniMusteriKayitVergiNoInput = document.getElementById("gyMainScreen_yeniMusteriKayitVergiNoInput");
	var gyMainScreen_yeniMusteriKayitSektorSelect = $("#gyMainScreen_yeniMusteriKayitSektorSelect");
	var gyMainScreen_yeniMusteriKayitSirketSahibiIsimInput = document.getElementById("gyMainScreen_yeniMusteriKayitSirketSahibiIsimInput");
	var gyMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput = document.getElementById("gyMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput");
	var gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput = document.getElementById("gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput");
	var gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput = document.getElementById("gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput");
	var gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput = document.getElementById("gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput");
	var gyMainScreen_yeniMusteriKayitAdresInput = document.getElementById("gyMainScreen_yeniMusteriKayitAdresInput");
	var gyMainScreen_yeniMusteriKayitIlceInput = document.getElementById("gyMainScreen_yeniMusteriKayitIlceInput");
	var gyMainScreen_yeniMusteriKayitSehirSelect = $("#gyMainScreen_yeniMusteriKayitSehirSelect");
	var gyMainScreen_yeniMusteriKayitUlkeSelect = $("#gyMainScreen_yeniMusteriKayitUlkeSelect");
	var gyMainScreen_yeniMusteriKayitWebInput = document.getElementById("gyMainScreen_yeniMusteriKayitWebInput");
	var gyMainScreen_yeniMusteriKayitEmailInput = document.getElementById("gyMainScreen_yeniMusteriKayitEmailInput");
	var gyMainScreen_yeniMusteriKayitTel1Input = document.getElementById("gyMainScreen_yeniMusteriKayitTel1Input");
	var gyMainScreen_yeniMusteriKayitTel2Input = document.getElementById("gyMainScreen_yeniMusteriKayitTel2Input");
	var gyMainScreen_yeniMusteriKayitTel3Input = document.getElementById("gyMainScreen_yeniMusteriKayitTel3Input");
	var gyMainScreen_yeniMusteriKayitFaksInput = document.getElementById("gyMainScreen_yeniMusteriKayitFaksInput");
	var gyMainScreen_yeniMusteriKayitNotlarInput = document.getElementById("gyMainScreen_yeniMusteriKayitNotlarInput");
	
	var unvan = gyMainScreen_yeniMusteriKayitUnvanInput.value;
	var marka = gyMainScreen_yeniMusteriKayitMarkaInput.value;
	var vergiDairesi = gyMainScreen_yeniMusteriKayitVergiDairesiInput.value;
	var vergiNo = gyMainScreen_yeniMusteriKayitVergiNoInput.value;
	var sektor = gyMainScreen_yeniMusteriKayitSektorSelect.selectmenu("value");
	var sirketSahibiIsim = gyMainScreen_yeniMusteriKayitSirketSahibiIsimInput.value;
	var sirketSahibiSoyisim = gyMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput.value;
	var irtibatKurulacakKisiIsim = gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput.value;
	var irtibatKurulacakKisiSoyisim = gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput.value;
	var irtibatKurulacakKisiTel = gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput.value;
	var adres = gyMainScreen_yeniMusteriKayitAdresInput.value;
	var ilce = gyMainScreen_yeniMusteriKayitIlceInput.value;
	var sehir = gyMainScreen_yeniMusteriKayitSehirSelect.selectmenu("value");
	var ulke = gyMainScreen_yeniMusteriKayitUlkeSelect.selectmenu("value");
	var web = gyMainScreen_yeniMusteriKayitWebInput.value;
	var email = gyMainScreen_yeniMusteriKayitEmailInput.value;
	var tel1 = gyMainScreen_yeniMusteriKayitTel1Input.value;
	var tel2 = gyMainScreen_yeniMusteriKayitTel2Input.value;
	var tel3 = gyMainScreen_yeniMusteriKayitTel3Input.value;
	var faks = gyMainScreen_yeniMusteriKayitFaksInput.value;
	var notlar = gyMainScreen_yeniMusteriKayitNotlarInput.value;
	
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
		url: gyMainScreen_coreURL + "?op=saveNewCustomer",
		dataType: 'json',
		type: 'POST',
		data: postedString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Müşteri başarıyla kaydedildi");
				gyMainScreen_yeniMusteriKayitUnvanInput.value = "";
				gyMainScreen_yeniMusteriKayitMarkaInput.value = "";
				gyMainScreen_yeniMusteriKayitVergiDairesiInput.value = "";
				gyMainScreen_yeniMusteriKayitVergiNoInput.value = "";
				gyMainScreen_yeniMusteriKayitSektorSelect.selectmenu("value","-1");
				gyMainScreen_yeniMusteriKayitSirketSahibiIsimInput.value = "";
				gyMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput.value = "";
				gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput.value = "";
				gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput.value = "";
				gyMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput.value = "";
				gyMainScreen_yeniMusteriKayitAdresInput.value = "";
				gyMainScreen_yeniMusteriKayitIlceInput.value = "";
				document.getElementById("gyMainScreen_yeniMusteriKayitSehirSelect").innerHTML = "<option value='-1'>Seçiniz</option>";
				gyMainScreen_yeniMusteriKayitSehirSelect.selectmenu({maxHeight: 100});
				gyMainScreen_yeniMusteriKayitUlkeSelect.selectmenu("value","-1");
				gyMainScreen_yeniMusteriKayitWebInput.value = "";
				gyMainScreen_yeniMusteriKayitEmailInput.value = "";
				gyMainScreen_yeniMusteriKayitTel1Input.value = "";
				gyMainScreen_yeniMusteriKayitTel2Input.value = "";
				gyMainScreen_yeniMusteriKayitTel3Input.value = "";
				gyMainScreen_yeniMusteriKayitFaksInput.value = "";
				gyMainScreen_yeniMusteriKayitNotlarInput.value = "";
				gyMainScreen_getNotLockedCustomers();
			}
			else
				alert(data.status);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_getFairs()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairs',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_fillFairsSelect(data.fairs);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_fillFairsSelect(fairs)
{
	var gyMainScreen_satisAramaFuarSelect = document.getElementById("gyMainScreen_satisAramaFuarSelect");
	var gyMainScreen_gorusmeAramaFuarSelect = document.getElementById("gyMainScreen_gorusmeAramaFuarSelect");
	var gyMainScreen_fuarIstatistikFuarSelect = document.getElementById("gyMainScreen_fuarIstatistikFuarSelect");
	var gyMainScreen_fuarKatilimciAramaFuarSelect = document.getElementById("gyMainScreen_fuarKatilimciAramaFuarSelect");
	
	for(var i = 0; i < fairs.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = fairs[i].name;
		newOption.setAttribute("value", fairs[i].fairId);
		gyMainScreen_satisAramaFuarSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = fairs[i].name;
		newOption2.setAttribute("value", fairs[i].fairId);
		gyMainScreen_gorusmeAramaFuarSelect.appendChild(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.innerHTML = fairs[i].name;
		newOption3.setAttribute("value", fairs[i].fairId);
		gyMainScreen_fuarIstatistikFuarSelect.appendChild(newOption3);
		
		var newOption4 = document.createElement("option");
		newOption4.innerHTML = fairs[i].name;
		newOption4.setAttribute("value", fairs[i].fairId);
		gyMainScreen_fuarKatilimciAramaFuarSelect.appendChild(newOption4);
	}
	
	$("#gyMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_fuarIstatistikFuarSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_fuarKatilimciAramaFuarSelect").selectmenu({maxHeight: 100});
}

function gyMainScreen_getCustomerRepresentatives()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCustomerRepresentatives',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_fillCustomerRepresentativesSelect(data.customerRepresentatives);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_fillCustomerRepresentativesSelect(customerRepresentatives)
{
	var gyMainScreen_satisAramaMTSelect = document.getElementById("gyMainScreen_satisAramaMTSelect");
	var gyMainScreen_gorusmeAramaMTSelect = document.getElementById("gyMainScreen_gorusmeAramaMTSelect");
	var gyMainScreen_mtIstatistikMTSelect = document.getElementById("gyMainScreen_mtIstatistikMTSelect");
	
	for(var i = 0; i < customerRepresentatives.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = customerRepresentatives[i].name;
		newOption.setAttribute("value", customerRepresentatives[i].userId);
		gyMainScreen_satisAramaMTSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = customerRepresentatives[i].name;
		newOption2.setAttribute("value", customerRepresentatives[i].userId);
		gyMainScreen_gorusmeAramaMTSelect.appendChild(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.innerHTML = customerRepresentatives[i].name;
		newOption3.setAttribute("value", customerRepresentatives[i].userId);
		gyMainScreen_mtIstatistikMTSelect.appendChild(newOption3);
	}
	
	$("#gyMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
	$("#gyMainScreen_mtIstatistikMTSelect").selectmenu({maxHeight: 100});
}

function gyMainScreen_searchCustomers()
{
	var title = gyMainScreen_musteriAramaSirketUnvaniInput.value;
	var phoneNumber = gyMainScreen_musteriAramaSirketTelInput.value;
	var brand = gyMainScreen_musteriAramaSirketMarkaInput.value;
	var name = gyMainScreen_musteriAramaCalisanAdiInput.value;
	var surname = gyMainScreen_musteriAramaCalisanSoyadiInput.value;
	var countryId = gyMainScreen_musteriAramaAdresUlkeSelect.selectmenu("value");
	var cityId = gyMainScreen_musteriAdresIlSelect.selectmenu("value");
	
	if(title == "" && phoneNumber == "" && brand == "" && name == "" && surname == "" && countryId == -1 && cityId == -1)
	{
		alert("Lütfen en az bir kriteri giriniz.");
		return;
	}
	
	var postString = "title=" + encodeURIComponent(title) + "&phoneNumber=" + encodeURIComponent(phoneNumber) + "&brand=" + encodeURIComponent(brand)
		+ "&name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) + "&countryId=" + encodeURIComponent(countryId)
		+ "&cityId=" + encodeURIComponent(cityId);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=searchCustomers",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showCustomers(data.customers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showCustomers(customers)
{
	var gyMainScreen_musteriSonucDiv = document.getElementById("gyMainScreen_musteriSonucDiv");
	gyMainScreen_musteriSonucDiv.innerHTML = "";
	
	var gyMainScreen_musteriSonucHeaderRow = document.createElement("div");
	gyMainScreen_musteriSonucHeaderRow.setAttribute("class","gyMainScreen_musteriSonucHeaderRow");
	
	var gyMainScreen_musteriSonucLockHeader = document.createElement("div");
	gyMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	gyMainScreen_musteriSonucLockHeader.setAttribute("class","gyMainScreen_musteriSonucLockCell");
	
	var gyMainScreen_musteriSonucTitleHeader = document.createElement("div");
	gyMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	gyMainScreen_musteriSonucTitleHeader.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
	
	var gyMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	gyMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	gyMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
	
	var gyMainScreen_musteriSonucMailHeader = document.createElement("div");
	gyMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	gyMainScreen_musteriSonucMailHeader.setAttribute("class","gyMainScreen_musteriSonucMailCell");
	
	var gyMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	gyMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	gyMainScreen_musteriSonucWebsiteHeader.setAttribute("class","gyMainScreen_musteriSonucWebsiteCell");
	
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucLockHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucTitleHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucPhoneNumberHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucMailHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucWebsiteHeader);
	
	gyMainScreen_musteriSonucDiv.appendChild(gyMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var gyMainScreen_musteriSonucRow = document.createElement("div");
		gyMainScreen_musteriSonucRow.setAttribute("class","gyMainScreen_musteriSonucRow");
		
		var gyMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		gyMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		gyMainScreen_musteriSonucLockCell.setAttribute("class","gyMainScreen_musteriSonucLockCell");
		
		var gyMainScreen_musteriSonucTitleCell = document.createElement("div");
		gyMainScreen_musteriSonucTitleCell.innerHTML = "<span class='gyMainScreen_musteriSonucLink' onclick='gyMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		gyMainScreen_musteriSonucTitleCell.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
		
		var gyMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		gyMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		gyMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
		
		var gyMainScreen_musteriSonucMailCell = document.createElement("div");
		gyMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		gyMainScreen_musteriSonucMailCell.setAttribute("class","gyMainScreen_musteriSonucMailCell");
		
		var gyMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		gyMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		gyMainScreen_musteriSonucWebsiteCell.setAttribute("class","gyMainScreen_musteriSonucWebsiteCell");
		
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucLockCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucTitleCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucPhoneNumberCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucMailCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucWebsiteCell);
		
		gyMainScreen_musteriSonucDiv.appendChild(gyMainScreen_musteriSonucRow);
	}
}

function gyMainScreen_getCustomerDetails(customerId)
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getCustomerDetails&customerId=" + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showCustomerDetails(data,customerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showCustomerDetails(data,customerId)
{
	var gyMainScreen_musteriDetaylariContainerDiv = document.getElementById("gyMainScreen_musteriDetaylariContainerDiv");
	gyMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
	
	var gyMainScreen_musteriDetaylariTopDiv = document.createElement("div");
	gyMainScreen_musteriDetaylariTopDiv.setAttribute("class","gyMainScreen_musteriDetaylariTopDiv");
	
	var gyMainScreen_musteriDetaylariLeftDiv = document.createElement("div");
	gyMainScreen_musteriDetaylariLeftDiv.setAttribute("class","gyMainScreen_musteriDetaylariLeftDiv");
	
	var imageHTML = "";
	if(data.lockedByUser)
		imageHTML += "<img style='margin-left:5px;' src='core/css/images/Lock.png' title='Kilidi kaldırmak için tıklayınız.' onclick='gyMainScreen_unlockCustomer(" + customerId + ")'>";
	var lockedMT = ""
	if(data.lockedMT != null)
		lockedMT = data.lockedMT;
	
	var gyMainScreen_musteriDetaylariGeneralInfoDiv = document.createElement("div");
	gyMainScreen_musteriDetaylariGeneralInfoDiv.setAttribute("style","margin-bottom:5px;");
	gyMainScreen_musteriDetaylariGeneralInfoDiv.innerHTML += 
		"<div style='margin-bottom:10px;'>" +
			"<span style='font-weight:bold; font-size:16px;text-align:center;'>" + data.customerInfo.title + "</span>" +
			imageHTML +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='gyMainScreen_musteriDetaylariLabel'>Ekleyen MT:</label>" +
			"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerInfo.addedName + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='gyMainScreen_musteriDetaylariLabel'>Kilitleyen MT:</label>" +
			"<span class='gyMainScreen_musteriDetaylariSpan'>" + lockedMT + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='gyMainScreen_musteriDetaylariLabel'>Marka</label>" +
			"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerInfo.brand + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='gyMainScreen_musteriDetaylariLabel'>Marka</label>" +
			"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerInfo.brand + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='gyMainScreen_musteriDetaylariLabel'>Vergi Dairesi</label>" +
			"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerInfo.taxOffice + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='gyMainScreen_musteriDetaylariLabel'>Vergi No</label>" +
			"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerInfo.taxId + "</span>" +
		"</div>";
		
	gyMainScreen_musteriDetaylariLeftDiv.appendChild(gyMainScreen_musteriDetaylariGeneralInfoDiv);
	
	var gyMainScreen_musteriDetaylariContactsDiv = document.createElement("div");
	gyMainScreen_musteriDetaylariContactsDiv.setAttribute("class","gyMainScreen_musteriDetaylariContactsDiv");
	if(data.customerContacts.length != 0)
		gyMainScreen_musteriDetaylariContactsDiv.innerHTML = "<div style='font-weight:bold;margin-bottom:5px;'>İrtibat Kurulabilecek Kişiler</div>";
	
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
				"<div class='gyMainScreen_musteriDetaylariContactButtonsDiv'>" +
					"<a href='#' onclick='javascript:gyMainScreen_deleteCustomerContact(" + data.customerContacts[i].customerContactId + "," + customerId + ")'>Sil</a>" +
					"<a style='margin-left:5px;' href='#' onclick='javascript:editCustomerContact_openEditPopup(" 
						+ data.customerContacts[i].customerContactId + "," + customerId + ")'>Düzenle</a>" +
				"</div>";
		}
		
		gyMainScreen_musteriDetaylariContactsDiv.innerHTML += 
			"<div class='gyMainScreen_musteriDetaylariContactDiv'>" +
				"<div class='gyMainScreen_musteriDetaylariContactInfoDiv'>" +
					data.customerContacts[i].contactName + " " + data.customerContacts[i].contactSurname + "-" + title
					+ "-" + phone + "-" + data.customerContacts[i].branchType +
				"</div>" +
				contactButtonsHTML +
			"</div>";
	}
	gyMainScreen_musteriDetaylariLeftDiv.appendChild(gyMainScreen_musteriDetaylariContactsDiv);
	gyMainScreen_musteriDetaylariTopDiv.appendChild(gyMainScreen_musteriDetaylariLeftDiv);
			
	var gyMainScreen_musteriDetaylariRightDiv = document.createElement("div");
	gyMainScreen_musteriDetaylariRightDiv.setAttribute("class","gyMainScreen_musteriDetaylariRightDiv");
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
	
	gyMainScreen_musteriDetaylariRightDiv.innerHTML = "<div style='height: 25px;'>" +
			"<label class='gyMainScreen_musteriDetaylariRightLabel'>Sektörler:</label>" +
			"<span class='gyMainScreen_musteriDetaylariRightSpan'>" + sectorsText + "</span>" +
			"<div class='gyMainScreen_contractCheckboxDiv' style='float: left; margin-right:8px;'>" +
				"<label class='gyMainScreen_musteriDetaylariRightLabel'>Sözleşme:</label>" +
				"<input type='checkbox' id='gyMainScreen_contractCheckInput' disabled='true' " + checkedString + "'/>" +
			"</div>" +
			"<label class='gyMainScreen_musteriDetaylariRightLabel'>Tarih:</label>" +
			"<span class='gyMainScreen_musteriDetaylariRightSpan'>" + lastContractDate + "</span>" +
			"<label class='gyMainScreen_musteriDetaylariRightLabel'>Fuar:</label>" +
			"<span class='customerDetails_fairNameSpan'>" + lastContractFair + "</span>" +
		"</div>";
	
	var gyMainScreen_musteriDetaylariSubelerTabs = document.createElement("div");
	gyMainScreen_musteriDetaylariSubelerTabs.setAttribute("class","gyMainScreen_musteriDetaylariSubelerTabs");
	gyMainScreen_musteriDetaylariRightDiv.appendChild(gyMainScreen_musteriDetaylariSubelerTabs);
	
	var subelerTabUlHTML = "<ul>";
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		subelerTabUlHTML += '<li><a href="#gyMainScreen_musteriDetaylariSube' + i + 'Tab">' 
									+ data.customerBranches[i].type + '</a></li>';
	}
	subelerTabUlHTML += "</ul>";
	gyMainScreen_musteriDetaylariSubelerTabs.innerHTML = subelerTabUlHTML;
	
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		var deleteButtonHTML = "";
		if(data.customerBranches[i].type == "Merkez" || data.lockedByAnotherUser)
		{
			deleteButtonHTML = "<button disabled='true' class='gyMainScreen_musteriDetaylarSubeButton'>Bu Şubeyi Sil</button>";
		}
		else
			deleteButtonHTML = "<button class='gyMainScreen_musteriDetaylarSubeButton' onclick='gyMainScreen_deleteCustomerBranch(" + data.customerBranches[i].branchId + "," + customerId + ")'>Bu Şubeyi Sil</button>";
			
		var editButtonHTML = "";
		if(data.lockedByAnotherUser)
		{
			editButtonHTML = "<button disabled='true' class='gyMainScreen_musteriDetaylarSubeButton'>Düzenle</button>";
		}
		else
			editButtonHTML ="<button class='gyMainScreen_musteriDetaylarSubeButton' onclick='editCustomerLocation_openEditPopup(" 
						+ data.customerBranches[i].branchId + "," + customerId + ")'>Düzenle</button>";
		
		gyMainScreen_musteriDetaylariSubelerTabs.innerHTML += 
			"<div id='gyMainScreen_musteriDetaylariSube" + i + "Tab'>" +  
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Adres:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].address + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>İlçe:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].county + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Şehir:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].cityName + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Ülke:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].countryName + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Website:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].website + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>E-mail:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].email + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Tel-1:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber1 + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Tel-2:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber2 + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Tel-3:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber3 + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Faks:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].fax + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='gyMainScreen_musteriDetaylariLabel'>Notlar:</label>" +
					"<span class='gyMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].notes + "</span>" +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow' style='height:28px;'>" +
					deleteButtonHTML +
				"</div>" +
				"<div class='gyMainScreen_musteriDetaylarSubeRow' style='height:28px;'>" +
					editButtonHTML +
				"</div>" +
			"</div>";
	}
	gyMainScreen_musteriDetaylariTopDiv.appendChild(gyMainScreen_musteriDetaylariRightDiv);
	gyMainScreen_musteriDetaylariContainerDiv.appendChild(gyMainScreen_musteriDetaylariTopDiv);
	$(".gyMainScreen_musteriDetaylariSubelerTabs").tabs();
	$(".gyMainScreen_musteriDetaylarSubeButton").button();
	var gyMainScreen_musteriDetaylariButtonsDiv = document.createElement("div");
	gyMainScreen_musteriDetaylariButtonsDiv.setAttribute("class","gyMainScreen_musteriDetaylariButtonsDiv");
	
	var musteriDetaylariButtonsHTML = "";
	if(data.lockedByAnotherUser)
	{
		musteriDetaylariButtonsHTML = 
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' disabled='true'>Şirket Bilgilerini Düzenle</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' disabled='true'>Şirketi Sil</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' disabled='true'>Yeni Lokasyon Ekle</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' disabled='true'>Yeni Kişi Ekle</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' disabled='true'>Yeni Görüşme Oluştur</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' disabled='true'>Görüşmeleri Göster</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' disabled='true'>Satış Yap</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' disabled='true'>Sözleşme Bilgisi Göster</button>" +
			"</div>";
	}
	else
	{
		musteriDetaylariButtonsHTML = 
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' onclick='editCustomer_openPopup(" + customerId + ")'>Şirket Bilgilerini Düzenle</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' onclick='gyMainScreen_deleteCustomer(" + customerId + ")'>Şirketi Sil</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' onclick='editCustomerLocation_openPopup(" + customerId + ")'>Yeni Lokasyon Ekle</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' onclick='editCustomerContact_openPopup(" + customerId + ")'>Yeni Kişi Ekle</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' onclick='addMeeting_openPopup(" + customerId + ")'>Yeni Görüşme Oluştur</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' onclick='gyMainScreen_searchCustomerMeetings(" + customerId + ")'>Görüşmeleri Göster</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='gyMainScreen_musteriDetaylarButton' onclick='addContract_openPopup(" + customerId + ")'>Satış Yap</button>" +
				"<button style='margin-left:20px;' class='gyMainScreen_musteriDetaylarButton' onclick='gyMainScreen_searchCustomerContracts(" + customerId + ")'>Sözleşme Bilgisi Göster</button>" +
			"</div>";
	}
	
	gyMainScreen_musteriDetaylariButtonsDiv.innerHTML = musteriDetaylariButtonsHTML;
	
	gyMainScreen_musteriDetaylariContainerDiv.appendChild(gyMainScreen_musteriDetaylariButtonsDiv);
	$(".gyMainScreen_musteriDetaylarButton").button();
	$("#gyMainScreen_accordion").accordion('option', 'active', 0);
	$( "#gyMainScreen_aramaTabs" ).tabs( "option", "disabled", false );
	$( "#gyMainScreen_aramaTabs" ).tabs( "option", "active", 4 );	
}

function gyMainScreen_deleteCustomerContact(customerContactId, customerId)
{
	if(confirm("Bu kişiyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: gyMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomerContact&customerContactId=' + customerContactId ,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					gyMainScreen_getCustomerDetails(customerId);
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function gyMainScreen_deleteCustomerBranch(branchId, customerId)
{
	if(confirm("Bu şubeyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: gyMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomerBranch&branchId=' + branchId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					gyMainScreen_getCustomerDetails(customerId);
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function gyMainScreen_deleteCustomer(customerId)
{
	if(confirm("Bu müşteriyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: gyMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomer&customerId=' + customerId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					gyMainScreen_musteriAramaSirketUnvaniInput.value = "";
					gyMainScreen_musteriAramaSirketTelInput.value = "";
					gyMainScreen_musteriAramaSirketMarkaInput.value = "";
					gyMainScreen_musteriAramaCalisanAdiInput.value = "";
					gyMainScreen_musteriAramaCalisanSoyadiInput.value = "";
					gyMainScreen_musteriAramaAdresUlkeSelect.selectmenu("value", -1);
					gyMainScreen_musteriAdresIlSelect.innerHTML = "<option value='-1'>Seçiniz</option>";
					$("#gyMainScreen_musteriAdresIlSelect").selectmenu({maxHeight: 100});
					var gyMainScreen_musteriSonucDiv = document.getElementById("gyMainScreen_musteriSonucDiv");
					gyMainScreen_musteriSonucDiv.innerHTML = "";
					var gyMainScreen_musteriDetaylariContainerDiv = document.getElementById("gyMainScreen_musteriDetaylariContainerDiv");
					gyMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
					$("#gyMainScreen_aramaTabs").tabs({disabled: [ 3 ] });
					$( "#gyMainScreen_aramaTabs" ).tabs( "option", "active", 0 );
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function gyMainScreen_getMyCustomers()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getMyCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showMyCustomers(data.contractCustomers, "gyMainScreen_firmalarimSozlesmeliSonucDiv");
				gyMainScreen_showMyCustomers(data.lockCustomers, "gyMainScreen_firmalarimTakipSonucDiv");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showMyCustomers(customers, divId)
{
	var gyMainScreen_firmalarimSonucDiv = document.getElementById(divId);
	gyMainScreen_firmalarimSonucDiv.innerHTML = "";
	
	var gyMainScreen_musteriSonucHeaderRow = document.createElement("div");
	gyMainScreen_musteriSonucHeaderRow.setAttribute("class","gyMainScreen_musteriSonucHeaderRow");
	
	var gyMainScreen_musteriSonucLockHeader = document.createElement("div");
	gyMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	gyMainScreen_musteriSonucLockHeader.setAttribute("class","gyMainScreen_musteriSonucLockCell");
	
	var gyMainScreen_musteriSonucTitleHeader = document.createElement("div");
	gyMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	gyMainScreen_musteriSonucTitleHeader.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
	
	var gyMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	gyMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	gyMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
	
	var gyMainScreen_musteriSonucMailHeader = document.createElement("div");
	gyMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	gyMainScreen_musteriSonucMailHeader.setAttribute("class","gyMainScreen_musteriSonucMailCell");
	
	var gyMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	gyMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	gyMainScreen_musteriSonucWebsiteHeader.setAttribute("class","gyMainScreen_musteriSonucWebsiteCell");
	
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucLockHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucTitleHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucPhoneNumberHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucMailHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucWebsiteHeader);
	
	gyMainScreen_firmalarimSonucDiv.appendChild(gyMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var gyMainScreen_musteriSonucRow = document.createElement("div");
		gyMainScreen_musteriSonucRow.setAttribute("class","gyMainScreen_musteriSonucRow");
		
		var gyMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		gyMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		gyMainScreen_musteriSonucLockCell.setAttribute("class","gyMainScreen_musteriSonucLockCell");
		
		var gyMainScreen_musteriSonucTitleCell = document.createElement("div");
		gyMainScreen_musteriSonucTitleCell.innerHTML = "<span class='gyMainScreen_musteriSonucLink' onclick='gyMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		gyMainScreen_musteriSonucTitleCell.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
		
		var gyMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		gyMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		gyMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
		
		var gyMainScreen_musteriSonucMailCell = document.createElement("div");
		gyMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		gyMainScreen_musteriSonucMailCell.setAttribute("class","gyMainScreen_musteriSonucMailCell");
		
		var gyMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		gyMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		gyMainScreen_musteriSonucWebsiteCell.setAttribute("class","gyMainScreen_musteriSonucWebsiteCell");
		
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucLockCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucTitleCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucPhoneNumberCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucMailCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucWebsiteCell);
		
		gyMainScreen_firmalarimSonucDiv.appendChild(gyMainScreen_musteriSonucRow);
	}
}

function gyMainScreen_searchContracts()
{
	var fairId = $("#gyMainScreen_satisAramaFuarSelect").selectmenu("value");
	var userId = $("#gyMainScreen_satisAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("gyMainScreen_satisAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("gyMainScreen_satisAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#gyMainScreen_satisAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#gyMainScreen_satisAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=searchContracts",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showContracts(data.contracts,postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showContracts(contracts,postString)
{
	var gyMainScreen_satisSonucDiv = document.getElementById("gyMainScreen_satisSonucDiv");
	gyMainScreen_satisSonucDiv.innerHTML = "";
	var totalArea = 0;
	
	for(var i = 0; i < contracts.length; i++)
	{
		var gyMainScreen_satisSonucRow = document.createElement("div");
		gyMainScreen_satisSonucRow.setAttribute("class","gyMainScreen_satisSonucRow");
		
		gyMainScreen_satisSonucRow.innerHTML = contracts[i].contractDate + " - " + contracts[i].title + " - " + contracts[i].fairName + " - " +
			contracts[i].standArea + " m<sup>2</sup>";
		gyMainScreen_satisSonucRow.setAttribute("onclick","gyMainScreen_getContractDetails(" + contracts[i].contractId + ")");
		gyMainScreen_satisSonucDiv.appendChild(gyMainScreen_satisSonucRow);
		totalArea += contracts[i].standArea;
	}
	
	var postHTML = "";
	if(postString != "")
		postHTML = "<a style='margin-left:10px;' target='_blank' href='getContractsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
	
	var gyMainScreen_satisOzetDiv = document.getElementById("gyMainScreen_satisOzetDiv");
	gyMainScreen_satisOzetDiv.innerHTML = "Toplam " + contracts.length + " tane sözleşme bulundu. Toplam " + totalArea + " m<sup>2</sup>." +
		postHTML;
}

function gyMainScreen_getContractDetails(contractId, onay)
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getContractDetails&contractId=" + contractId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showContractDetails(data, onay, contractId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showContractDetails(data, onay, contractId)
{
	var gyMainScreen_satisDetaylariContainerDiv = document.getElementById("gyMainScreen_satisDetaylariContainerDiv");
	gyMainScreen_satisDetaylariContainerDiv.innerHTML = "";
	
	var pdfUploadLinkHTML = "";
	if(data.generalInfo.ownContract)
		pdfUploadLinkHTML = '<input class="gyMainScreen_dosyaYukleButton" onclick="uploadifyPlugin_openPopup(' + contractId + ')" value="PDF Yükle" type="submit">';
		
	var pdfDownloadLinkHTML = "";
	if(data.generalInfo.pdfUpload)
		pdfDownloadLinkHTML = '<a style="margin-left:10px;" target="_blank" href="uploads/' + contractId + '.pdf">PDF İndir</a>';
	
	gyMainScreen_satisDetaylariContainerDiv.innerHTML=
		'<div id="gyMainScreen_showContractDetails_topDiv">' +
			'<div id="gyMainScreen_showContractDetails_leftDiv">' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Fuar Adı:</label>' +
					data.fairInfo.fairName +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Fuar Tarihi:</label>' +
					data.fairInfo.startDate + " - " + data.fairInfo.endDate +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Proje Sorumlusu:</label>' +
					data.fairInfo.fkName +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Müşteri Hizmetleri Sorumlusu:</label>' +
					data.fairInfo.mtName +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">İndirimsiz Satış Fiyatı:</label>' +
					data.fairInfo.price + " &#8364;" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Müşteri Temsilcisi Adı:</label>' +
					data.customerRepresentativeInfo.name +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">MT Grubu:</label>' +
					data.customerRepresentativeInfo.sector +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Katılımcı Firma Yetkili:</label>' +
					data.customerContactName +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Taksit Sayısı:</label>' +
					data.payments.length +
				'</div>' +
				'<div id="gyMainScreen_paymentPlanDiv">' +
				'</div>' +
			'</div>' +				
			'<div id="gyMainScreen_showContractDetails_rightDiv">' +	
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Katılımcı Firma Ünvanı:</label>' +
					data.customerTitle +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Sözleşme Tarihi:</label>' +
					data.generalInfo.contractDate +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Ürün Grubu:</label>' +
					data.generalInfo.productGroup +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Nakliye Durumu:</label>' +
					data.generalInfo.shippingOption +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Stand Durumu:</label>' +
					data.generalInfo.standRequest +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Ekstra Navlun:</label>' +
					'<input type="checkbox" id="gyMainScreen_extraNavlunInput" disabled="true"/>' +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Ekstra Navlun Miktar:</label>' +
					data.generalInfo.extraNavlunArea + " m<sup>3</sup>" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Ekstra Navlun Fiyat:</label>' +
					data.generalInfo.extraNavlunPrice + " &#8364;" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Stand m<sup>2</sup>:</label>' +
					data.generalInfo.standArea + " m<sup>2</sup>" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">m<sup>2</sup> Birim Fiyatı:</label>' +
					data.generalInfo.unitPrice + " &#8364;" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Sözleşme Tutarı:</label>' +
					data.generalInfo.contractAmount + " &#8364;" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">İndirim Oranı:</label>' +
					" %" + data.generalInfo.discountRate +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">İndirim Tutarı:</label>' +
					data.generalInfo.discountAmount + " &#8364;" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">KDV Tutarı:</label>' +
					data.generalInfo.kdvAmount  + " &#8364;" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv">' +
					'<label class="gyMainScreen_showContractDetails_label">Sözleşme Bedeli(KDVli):</label>' +
					data.generalInfo.contractAmountWithKdv  + " &#8364;" +
				'</div>' +
				'<div class="gyMainScreen_showContractDetails_outputDiv" style="height:80px;">' +
					'<label class="gyMainScreen_showContractDetails_label">Ekstra Taahhütler:</label>' +
					'<textarea id="gyMainScreen_showContractDetails_extraCommitmentsInput" rows="5" style="resize:none;" disabled="true"></textarea>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="gyMainScreen_showContractDetails_outputDiv">' +
			'<input class="gyMainScreen_sozlesmeIptalButton" onclick="gyMainScreen_cancelContract(' + contractId + ')" value="İptal Et" type="submit">' +
			pdfUploadLinkHTML +
			pdfDownloadLinkHTML +
		'</div>';
	
	if(data.generalInfo.extraNavlun)
		document.getElementById("gyMainScreen_extraNavlunInput").checked = true;
	
	var gyMainScreen_showContractDetails_extraCommitmentsInput = document.getElementById("gyMainScreen_showContractDetails_extraCommitmentsInput");
	gyMainScreen_showContractDetails_extraCommitmentsInput.value = data.generalInfo.extraCommitments;
	
	$(".gyMainScreen_sozlesmeIptalButton").button();
	$(".gyMainScreen_dosyaYukleButton").button();
	if(onay)
		$("#gyMainScreen_accordion").accordion('option', 'active', 1);
	
	$( "#gyMainScreen_satisTabs" ).tabs( "option", "disabled", false );
	$( "#gyMainScreen_satisTabs" ).tabs( "option", "active", 1 );	
	
	var gyMainScreen_paymentPlanDiv = document.getElementById("gyMainScreen_paymentPlanDiv");
	var paymentCount = data.payments.length;
	for(var i = 1; i <= paymentCount; i++)
	{
		var gyMainScreen_showContractDetails_outputDiv = document.createElement("div");
		gyMainScreen_showContractDetails_outputDiv.setAttribute("class", "gyMainScreen_showContractDetails_outputDiv");
		
		var gyMainScreen_showContractDetails_label = document.createElement("label");
		gyMainScreen_showContractDetails_label.setAttribute("class", "gyMainScreen_showContractDetails_label");
		gyMainScreen_showContractDetails_label.innerHTML = i + ". Taksit:";
		gyMainScreen_showContractDetails_outputDiv.appendChild(gyMainScreen_showContractDetails_label);
		
		var gyMainScreen_paymentLabel = document.createElement("label");
		gyMainScreen_paymentLabel.setAttribute("class", "gyMainScreen_paymentLabel");
		gyMainScreen_paymentLabel.innerHTML = data.payments[i - 1].paymentAmount + " &#8364;";
		gyMainScreen_showContractDetails_outputDiv.appendChild(gyMainScreen_paymentLabel);
		
		var gyMainScreen_paymentDueDateLabel = document.createElement("label");
		gyMainScreen_paymentDueDateLabel.setAttribute("class", "gyMainScreen_paymentDueDateLabel");
		gyMainScreen_paymentDueDateLabel.innerHTML = data.payments[i - 1].paymentDueDate;
		gyMainScreen_showContractDetails_outputDiv.appendChild(gyMainScreen_paymentDueDateLabel);
		
		var gyMainScreen_paymentPaidCheckbox = document.createElement("input");
		gyMainScreen_paymentPaidCheckbox.setAttribute("class", "gyMainScreen_paymentPaidCheckbox");
		gyMainScreen_paymentPaidCheckbox.setAttribute("type", "checkbox");
		gyMainScreen_paymentPaidCheckbox.setAttribute("disabled", "true");
		gyMainScreen_paymentPaidCheckbox.checked = data.payments[i - 1].paymentPaid;
		gyMainScreen_showContractDetails_outputDiv.appendChild(gyMainScreen_paymentPaidCheckbox);
		
		var gyMainScreen_paymentPaidSpan = document.createElement("span");
		gyMainScreen_paymentPaidSpan.setAttribute("class", "gyMainScreen_paymentPaidSpan");
		gyMainScreen_paymentPaidSpan.innerHTML = "Ödendi";
		gyMainScreen_showContractDetails_outputDiv.appendChild(gyMainScreen_paymentPaidSpan);
		
		gyMainScreen_paymentPlanDiv.appendChild(gyMainScreen_showContractDetails_outputDiv);
	}
}

function gyMainScreen_searchMeetings()
{
	var fairId = $("#gyMainScreen_gorusmeAramaFuarSelect").selectmenu("value");
	var userId = $("#gyMainScreen_gorusmeAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("gyMainScreen_gorusmeAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("gyMainScreen_gorusmeAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#gyMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#gyMainScreen_gorusmeAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=searchMeetings",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showMeetings(data.meetings,postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showMeetings(meetings, postString)
{
	var gyMainScreen_gorusmeSonucDiv = document.getElementById("gyMainScreen_gorusmeSonucDiv");
	gyMainScreen_gorusmeSonucDiv.innerHTML = "";
	
	if(meetings.length == 0)
		gyMainScreen_gorusmeSonucDiv.innerHTML = "Aradığınız kriterlere uygun görüşme bulunamamıştır.";
	
	for(var i = 0; i < meetings.length; i++)
	{
		var gyMainScreen_gorusmeSonucRow = document.createElement("div");
		gyMainScreen_gorusmeSonucRow.setAttribute("class","gyMainScreen_gorusmeSonucRow");
		
		gyMainScreen_gorusmeSonucRow.innerHTML = meetings[i].meetingDate + " - " + meetings[i].customerTitle + " - " + meetings[i].fairName + " - " +
			meetings[i].mtName + " - " + meetings[i].topic + " - " + meetings[i].description + " - " + meetings[i].meetingType;
		gyMainScreen_gorusmeSonucDiv.appendChild(gyMainScreen_gorusmeSonucRow);
	}
	
	var postHTML = "";
	if(postString != "")
		postHTML = "<a style='margin-left:10px;' target='_blank' href='getMeetingsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
	var gyMainScreen_gorusmeOzetDiv = document.getElementById("gyMainScreen_gorusmeOzetDiv");
	gyMainScreen_gorusmeOzetDiv.innerHTML = "Toplam " + meetings.length + " tane görüşme bulundu." +
		postHTML;
}

function gyMainScreen_searchCustomerMeetings(customerId)
{
	$("#gyMainScreen_gorusmeAramaFuarSelect").selectmenu("value", "-1");
	$("#gyMainScreen_gorusmeAramaMTSelect").selectmenu("value", "-1");
	document.getElementById("gyMainScreen_gorusmeAramaBaslangicTarihiInput").value = "";
	document.getElementById("gyMainScreen_gorusmeAramaBitisTarihiInput").value = "";
	
	var postString = "customerId=" + encodeURIComponent(customerId);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=searchCustomerMeetings",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showMeetings(data.meetings, "");
				$("#gyMainScreen_accordion").accordion('option', 'active', 2);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_searchCustomerContracts(customerId)
{
	$("#gyMainScreen_satisAramaFuarSelect").selectmenu("value", "-1");
	$("#gyMainScreen_satisAramaMTSelect").selectmenu("value", "-1");
	document.getElementById("gyMainScreen_satisAramaBaslangicTarihiInput").value = "";
	document.getElementById("gyMainScreen_satisAramaBitisTarihiInput").value = "";
	
	var postString = "customerId=" + encodeURIComponent(customerId);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=searchCustomerContracts",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showContracts(data.contracts, "");
				$("#gyMainScreen_accordion").accordion('option', 'active', 1);
				$("#gyMainScreen_satisTabs" ).tabs( "option", "active", 0 );	
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_getAllCustomers()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getAllCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var gyMainScreen_firmaIstatistikFirmaSelect = document.getElementById("gyMainScreen_firmaIstatistikFirmaSelect");
				for(var i = 0; i < data.customers.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.customers[i].customerId);
					newOption.innerHTML = data.customers[i].title;
					gyMainScreen_firmaIstatistikFirmaSelect.appendChild(newOption);
				}
				$("#gyMainScreen_firmaIstatistikFirmaSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_createCustomerStats()
{
	var customerId = $("#gyMainScreen_firmaIstatistikFirmaSelect").selectmenu("value");
	var startDate = document.getElementById("gyMainScreen_firmaIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("gyMainScreen_firmaIstatistikBitisTarihiInput").value;
	
	if(customerId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#gyMainScreen_firmaIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#gyMainScreen_firmaIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "customerId=" + encodeURIComponent(customerId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=getCustomerStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			gyMainScreen_showCustomerStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_createPieChart(contractCount, gorusmeCount, randevuCount, cancelledContractCount, divIdString)
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

function gyMainScreen_createChart(data, categoryField, chartTitle, valueTitle, valueField, divIdString, unit)
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

function gyMainScreen_showCustomerStats(data, postString)
{
	gyMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "gyMainScreen_firmaIstatistikTypeChart");
	gyMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "gyMainScreen_firmaIstatistikSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "gyMainScreen_firmaIstatistikSatisFiyatChart", "&#8364;");
	gyMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "gyMainScreen_firmaIstatistikIndirimTutarChart" ,"&#8364;");
	gyMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "gyMainScreen_firmaIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "gyMainScreen_firmaIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var gyMainScreen_firmaIstatistikOzetDiv = document.getElementById("gyMainScreen_firmaIstatistikOzetDiv");
	gyMainScreen_firmaIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getCustomerStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function gyMainScreen_createMTStats()
{
	var mtId = $("#gyMainScreen_mtIstatistikMTSelect").selectmenu("value");
	var startDate = document.getElementById("gyMainScreen_mtIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("gyMainScreen_mtIstatistikBitisTarihiInput").value;
	
	if(mtId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#gyMainScreen_mtIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#gyMainScreen_mtIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "mtId=" + encodeURIComponent(mtId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=getMTStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			gyMainScreen_showMTStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showMTStats(data, postString)
{
	gyMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "gyMainScreen_mtIstatistikTypeChart");
	gyMainScreen_createChart(data.satism2, "fair", "Fuar vs Stand Alanı", "Stand Alanı", "stand", "gyMainScreen_mtIstatistikSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.satisFiyat, "fair", "Fuar vs Tutar", "Tutar", "fiyat", "gyMainScreen_mtIstatistikSatisFiyatChart", "&#8364;");
	gyMainScreen_createChart(data.indirimTutar, "fair", "Fuar vs İndirim Tutarı", "İndirim Tutarı", "tutar", "gyMainScreen_mtIstatistikIndirimTutarChart" ,"&#8364;");
	gyMainScreen_createChart(data.iptalSatism2, "fair", "Fuar vs Stand Alanı (İptal)", "Stand Alanı", "stand", "gyMainScreen_mtIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.iptalSatisFiyat, "fair", "Fuar vs Tutar (İptal)", "Tutar", "fiyat", "gyMainScreen_mtIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var gyMainScreen_mtIstatistikOzetDiv = document.getElementById("gyMainScreen_mtIstatistikOzetDiv");
	gyMainScreen_mtIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getMtStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function gyMainScreen_createFairStats()
{
	var fairId = $("#gyMainScreen_fuarIstatistikFuarSelect").selectmenu("value");
	var startDate = document.getElementById("gyMainScreen_fuarIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("gyMainScreen_fuarIstatistikBitisTarihiInput").value;
	
	if(fairId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#gyMainScreen_fuarIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#gyMainScreen_fuarIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=getFairStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			gyMainScreen_showFairStats(data,postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showFairStats(data, postString)
{
	gyMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "gyMainScreen_fuarIstatistikTypeChart");
	gyMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "gyMainScreen_fuarIstatistikSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "gyMainScreen_fuarIstatistikSatisFiyatChart", "&#8364;");
	gyMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "gyMainScreen_fuarIstatistikIndirimTutarChart" ,"&#8364;");
	gyMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "gyMainScreen_fuarIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "gyMainScreen_fuarIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var gyMainScreen_fuarIstatistikOzetDiv = document.getElementById("gyMainScreen_fuarIstatistikOzetDiv");
	gyMainScreen_fuarIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getFairStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function gyMainScreen_createGroupStats()
{
	var groupId = $("#gyMainScreen_grupIstatistikGrupSelect").selectmenu("value");
	var startDate = document.getElementById("gyMainScreen_grupIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("gyMainScreen_grupIstatistikBitisTarihiInput").value;
	
	if(groupId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#gyMainScreen_grupIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#gyMainScreen_grupIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "groupId=" + encodeURIComponent(groupId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: gyMainScreen_coreURL + "?op=getGroupStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			gyMainScreen_showGroupStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showGroupStats(data, postString)
{
	gyMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "gyMainScreen_grupIstatistikTypeChart");
	gyMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "gyMainScreen_grupIstatistikSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "gyMainScreen_grupIstatistikSatisFiyatChart", "&#8364;");
	gyMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "gyMainScreen_grupIstatistikIndirimTutarChart" ,"&#8364;");
	gyMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "gyMainScreen_grupIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	gyMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "gyMainScreen_grupIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var gyMainScreen_grupIstatistikOzetDiv = document.getElementById("gyMainScreen_grupIstatistikOzetDiv");
	gyMainScreen_grupIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getGroupStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function gyMainScreen_getWaitingCustomers()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getWaitingCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showWaitingCustomers(data.customers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showWaitingCustomers(customers)
{
	var gyMainScreen_onayBekleyenlerSonucDiv = document.getElementById("gyMainScreen_onayBekleyenlerSonucDiv");
	gyMainScreen_onayBekleyenlerSonucDiv.innerHTML = "";
	
	var gyMainScreen_onayBekleyenSonucHeaderRow = document.createElement("div");
	gyMainScreen_onayBekleyenSonucHeaderRow.setAttribute("class","gyMainScreen_onayBekleyenSonucHeaderRow");
	
	var gyMainScreen_onayBekleyenSonucTitleHeader = document.createElement("div");
	gyMainScreen_onayBekleyenSonucTitleHeader.innerHTML = "Ünvan";
	gyMainScreen_onayBekleyenSonucTitleHeader.setAttribute("class","gyMainScreen_onayBekleyenSonucTitleCell");
	
	var gyMainScreen_onayBekleyenSonucPhoneNumberHeader = document.createElement("div");
	gyMainScreen_onayBekleyenSonucPhoneNumberHeader.innerHTML = "Telefon";
	gyMainScreen_onayBekleyenSonucPhoneNumberHeader.setAttribute("class","gyMainScreen_onayBekleyenSonucPhoneNumberCell");
	
	var gyMainScreen_onayBekleyenSonucMTHeader = document.createElement("div");
	gyMainScreen_onayBekleyenSonucMTHeader.innerHTML = "MT";
	gyMainScreen_onayBekleyenSonucMTHeader.setAttribute("class","gyMainScreen_onayBekleyenSonucMTCell");
	
	var gyMainScreen_onayBekleyenSonucTarihHeader = document.createElement("div");
	gyMainScreen_onayBekleyenSonucTarihHeader.innerHTML = "Tarih";
	gyMainScreen_onayBekleyenSonucTarihHeader.setAttribute("class","gyMainScreen_onayBekleyenSonucTarihCell");
	
	var gyMainScreen_onayBekleyenSonucEmptyHeader = document.createElement("div");
	gyMainScreen_onayBekleyenSonucEmptyHeader.innerHTML = "";
	gyMainScreen_onayBekleyenSonucEmptyHeader.setAttribute("class","gyMainScreen_onayBekleyenSonucEmptyCell");
	
	gyMainScreen_onayBekleyenSonucHeaderRow.appendChild(gyMainScreen_onayBekleyenSonucTitleHeader);
	gyMainScreen_onayBekleyenSonucHeaderRow.appendChild(gyMainScreen_onayBekleyenSonucPhoneNumberHeader);
	gyMainScreen_onayBekleyenSonucHeaderRow.appendChild(gyMainScreen_onayBekleyenSonucMTHeader);
	gyMainScreen_onayBekleyenSonucHeaderRow.appendChild(gyMainScreen_onayBekleyenSonucTarihHeader);
	gyMainScreen_onayBekleyenSonucHeaderRow.appendChild(gyMainScreen_onayBekleyenSonucEmptyHeader);
	
	gyMainScreen_onayBekleyenlerSonucDiv.appendChild(gyMainScreen_onayBekleyenSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var gyMainScreen_onayBekleyenSonucRow = document.createElement("div");
		gyMainScreen_onayBekleyenSonucRow.setAttribute("class","gyMainScreen_onayBekleyenSonucRow");
		
		var gyMainScreen_onayBekleyenSonucTitleCell = document.createElement("div");
		gyMainScreen_onayBekleyenSonucTitleCell.innerHTML = "<span class='gyMainScreen_onayBekleyenSonucLink' onclick='gyMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		gyMainScreen_onayBekleyenSonucTitleCell.setAttribute("class","gyMainScreen_onayBekleyenSonucTitleCell");
		
		var gyMainScreen_onayBekleyenSonucPhoneNumberCell = document.createElement("div");
		gyMainScreen_onayBekleyenSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		gyMainScreen_onayBekleyenSonucPhoneNumberCell.setAttribute("class","gyMainScreen_onayBekleyenSonucPhoneNumberCell");
		
		var gyMainScreen_onayBekleyenSonucMTCell = document.createElement("div");
		gyMainScreen_onayBekleyenSonucMTCell.innerHTML = customers[i].mt;
		gyMainScreen_onayBekleyenSonucMTCell.setAttribute("class","gyMainScreen_onayBekleyenSonucMTCell");
		
		var gyMainScreen_onayBekleyenSonucTarihCell = document.createElement("div");
		gyMainScreen_onayBekleyenSonucTarihCell.innerHTML = customers[i].addedDate;
		gyMainScreen_onayBekleyenSonucTarihCell.setAttribute("class","gyMainScreen_onayBekleyenSonucTarihCell");
		
		var gyMainScreen_onayBekleyenSonucEmptyCell = document.createElement("div");
		gyMainScreen_onayBekleyenSonucEmptyCell.innerHTML = "<input class='gyMainScreen_onayBekleyenButton' onclick='gyMainScreen_confirmCustomer(" 
			+ customers[i].customerId + ")' value='Onayla' type='submit'/>";
		gyMainScreen_onayBekleyenSonucEmptyCell.setAttribute("class","gyMainScreen_onayBekleyenSonucEmptyCell");
		
		gyMainScreen_onayBekleyenSonucRow.appendChild(gyMainScreen_onayBekleyenSonucTitleCell);
		gyMainScreen_onayBekleyenSonucRow.appendChild(gyMainScreen_onayBekleyenSonucPhoneNumberCell);
		gyMainScreen_onayBekleyenSonucRow.appendChild(gyMainScreen_onayBekleyenSonucMTCell);
		gyMainScreen_onayBekleyenSonucRow.appendChild(gyMainScreen_onayBekleyenSonucTarihCell);
		gyMainScreen_onayBekleyenSonucRow.appendChild(gyMainScreen_onayBekleyenSonucEmptyCell);
		
		gyMainScreen_onayBekleyenlerSonucDiv.appendChild(gyMainScreen_onayBekleyenSonucRow);
	}
	$(".gyMainScreen_onayBekleyenButton").button();
	if(customers.length > 0)
	{
		document.getElementById("gyMainScreen_onayBekleyenSpan").innerHTML = customers.length + " müşteri onay bekliyor!";
		document.getElementById("gyMainScreen_onayBekleyenSpan").setAttribute("onclick","gyMainScreen_openOnayTab()");
	}
	else
	{
		document.getElementById("gyMainScreen_onayBekleyenSpan").innerHTML = "Onay bekleyen müşteri bulunmuyor.";
		document.getElementById("gyMainScreen_onayBekleyenSpan").setAttribute("style","text-decoration:none;");
		document.getElementById("gyMainScreen_onayBekleyenSpan").setAttribute("onclick","");
	}
}

function gyMainScreen_confirmCustomer(customerId)
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=confirmCustomer&customerId=' + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("İşlem başarıyla gerçekleştirilmiştir.");
				gyMainScreen_getWaitingCustomers();
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_getWaitingContracts()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getWaitingContracts",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showWaitingContracts(data.contracts);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showWaitingContracts(contracts)
{
	var gyMainScreen_onayBekleyenSozlesmelerSonucDiv = document.getElementById("gyMainScreen_onayBekleyenSozlesmelerSonucDiv");
	gyMainScreen_onayBekleyenSozlesmelerSonucDiv.innerHTML = "";
	
	for(var i = 0; i < contracts.length; i++)
	{
		var gyMainScreen_onayBekleyenSozlesmelerRow = document.createElement("div");
		gyMainScreen_onayBekleyenSozlesmelerRow.setAttribute("class","gyMainScreen_onayBekleyenSozlesmelerRow");
		
		var gyMainScreen_onayBekleyenSozlesmeDetailCell = document.createElement("div");
		gyMainScreen_onayBekleyenSozlesmeDetailCell.setAttribute("class","gyMainScreen_onayBekleyenSozlesmeDetailCell");
		gyMainScreen_onayBekleyenSozlesmeDetailCell.setAttribute("id","gyMainScreen_onayBekleyenSozlesmeDetailCell_" + contracts[i].contractId);
		gyMainScreen_onayBekleyenSozlesmeDetailCell.innerHTML = contracts[i].contractDate + " - " + contracts[i].title + " - " + contracts[i].fairName + " - " +
			contracts[i].standArea + " m<sup>2</sup>";
		gyMainScreen_onayBekleyenSozlesmeDetailCell.setAttribute("onclick","gyMainScreen_getContractDetailsFromConfirm(" + contracts[i].contractId + ")");
		
		var gyMainScreen_onayBekleyenSozlesmeButtonCell = document.createElement("div");
		gyMainScreen_onayBekleyenSozlesmeButtonCell.setAttribute("class","gyMainScreen_onayBekleyenSozlesmeButtonCell");
		gyMainScreen_onayBekleyenSozlesmeButtonCell.innerHTML = "<input class='gyMainScreen_onayBekleyenSozlesmeButton' onclick='gyMainScreen_confirmContract(" 
			+ contracts[i].contractId + ")' value='Onayla' type='submit'/>";
		
		gyMainScreen_onayBekleyenSozlesmelerRow.appendChild(gyMainScreen_onayBekleyenSozlesmeDetailCell);
		gyMainScreen_onayBekleyenSozlesmelerRow.appendChild(gyMainScreen_onayBekleyenSozlesmeButtonCell);
		
		gyMainScreen_onayBekleyenSozlesmelerSonucDiv.appendChild(gyMainScreen_onayBekleyenSozlesmelerRow);
	}
	$(".gyMainScreen_onayBekleyenSozlesmeButton").button();
}

function gyMainScreen_getContractDetailsFromConfirm(contractId)
{
	$(".gyMainScreen_onayBekleyenSozlesmeAktifDetailCell").removeClass("gyMainScreen_onayBekleyenSozlesmeAktifDetailCell");
	$("#gyMainScreen_onayBekleyenSozlesmeDetailCell_" + contractId).addClass("gyMainScreen_onayBekleyenSozlesmeAktifDetailCell")
	gyMainScreen_getContractDetails(contractId, true);
}

function gyMainScreen_confirmContract(contractId)
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=confirmContract&contractId=' + contractId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("İşlem başarıyla gerçekleştirilmiştir.");
				gyMainScreen_getWaitingContracts();
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_cancelContract(contractId)
{
	if(confirm("Bu kontratı iptal etmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: gyMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=cancelContract&contractId=' + contractId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					gyMainScreen_getWaitingContracts();
					var gyMainScreen_musteriDetaylariContainerDiv = document.getElementById("gyMainScreen_musteriDetaylariContainerDiv");
					gyMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
					$( "#gyMainScreen_satisTabs" ).tabs( "option", "disabled", [1] );
					$( "#gyMainScreen_satisTabs" ).tabs( "option", "active", 0 );
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function gyMainScreen_getNotLockedCustomers()
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getNotLockedCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showNotLockedCustomers(data.customers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showNotLockedCustomers(customers)
{
	var gyMainScreen_takiptenDusenlerSonucDiv = document.getElementById("gyMainScreen_takiptenDusenlerSonucDiv");
	gyMainScreen_takiptenDusenlerSonucDiv.innerHTML = "";
	
	var gyMainScreen_musteriSonucHeaderRow = document.createElement("div");
	gyMainScreen_musteriSonucHeaderRow.setAttribute("class","gyMainScreen_musteriSonucHeaderRow");
	
	var gyMainScreen_musteriSonucTitleHeader = document.createElement("div");
	gyMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	gyMainScreen_musteriSonucTitleHeader.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
	
	var gyMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	gyMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	gyMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
	
	var gyMainScreen_musteriSonucFaxHeader = document.createElement("div");
	gyMainScreen_musteriSonucFaxHeader.innerHTML = "Faks";
	gyMainScreen_musteriSonucFaxHeader.setAttribute("class","gyMainScreen_musteriSonucFaxCell");
	
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucTitleHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucPhoneNumberHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucFaxHeader);
	
	gyMainScreen_takiptenDusenlerSonucDiv.appendChild(gyMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var gyMainScreen_musteriSonucRow = document.createElement("div");
		gyMainScreen_musteriSonucRow.setAttribute("class","gyMainScreen_musteriSonucRow");
		
		var gyMainScreen_musteriSonucTitleCell = document.createElement("div");
		gyMainScreen_musteriSonucTitleCell.innerHTML = "<span class='gyMainScreen_musteriSonucLink' onclick='gyMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		gyMainScreen_musteriSonucTitleCell.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
		
		var gyMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		gyMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		gyMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
		
		var gyMainScreen_musteriSonucFaxCell = document.createElement("div");
		gyMainScreen_musteriSonucFaxCell.innerHTML = customers[i].fax;
		gyMainScreen_musteriSonucFaxCell.setAttribute("class","gyMainScreen_musteriSonucFaxCell");
		
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucTitleCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucPhoneNumberCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucFaxCell);
		
		gyMainScreen_takiptenDusenlerSonucDiv.appendChild(gyMainScreen_musteriSonucRow);
	}
}

function gyMainScreen_openOnayTab()
{
	$("#gyMainScreen_accordion").accordion('option', 'active', 4);
	$("#gyMainScreen_onayTabs" ).tabs( "option", "active", 0 );
}

function gyMainScreen_unlockCustomer(customerId)
{
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=unlockCustomer&customerId=' + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Kilit başarıyla kaldırılmıştır.");
				gyMainScreen_getCustomerDetails(customerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_searchFairCustomers()
{
	var fairId = $("#gyMainScreen_fuarKatilimciAramaFuarSelect").selectmenu("value");
	if(fairId == -1)
	{
		alert("Lütfen katılımcılarını görüntülemek istediğiniz fuarı seçiniz.");
		return;
	}
	$.ajax({
		url: gyMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairCustomers&fairId=' + fairId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				gyMainScreen_showFairCustomers(data.fairCustomers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function gyMainScreen_showFairCustomers(customers)
{
	var gyMainScreen_fuarKatilimciSonucDiv = document.getElementById("gyMainScreen_fuarKatilimciSonucDiv");
	gyMainScreen_fuarKatilimciSonucDiv.innerHTML = "";
	
	var gyMainScreen_musteriSonucHeaderRow = document.createElement("div");
	gyMainScreen_musteriSonucHeaderRow.setAttribute("class","gyMainScreen_musteriSonucHeaderRow");
	
	var gyMainScreen_musteriSonucLockHeader = document.createElement("div");
	gyMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	gyMainScreen_musteriSonucLockHeader.setAttribute("class","gyMainScreen_musteriSonucLockCell");
	
	var gyMainScreen_musteriSonucTitleHeader = document.createElement("div");
	gyMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	gyMainScreen_musteriSonucTitleHeader.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
	
	var gyMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	gyMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	gyMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
	
	var gyMainScreen_musteriSonucMailHeader = document.createElement("div");
	gyMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	gyMainScreen_musteriSonucMailHeader.setAttribute("class","gyMainScreen_musteriSonucMailCell");
	
	var gyMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	gyMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	gyMainScreen_musteriSonucWebsiteHeader.setAttribute("class","gyMainScreen_musteriSonucWebsiteCell");
	
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucLockHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucTitleHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucPhoneNumberHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucMailHeader);
	gyMainScreen_musteriSonucHeaderRow.appendChild(gyMainScreen_musteriSonucWebsiteHeader);
	
	gyMainScreen_fuarKatilimciSonucDiv.appendChild(gyMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var gyMainScreen_musteriSonucRow = document.createElement("div");
		gyMainScreen_musteriSonucRow.setAttribute("class","gyMainScreen_musteriSonucRow");
		
		var gyMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		gyMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		gyMainScreen_musteriSonucLockCell.setAttribute("class","gyMainScreen_musteriSonucLockCell");
		
		var gyMainScreen_musteriSonucTitleCell = document.createElement("div");
		gyMainScreen_musteriSonucTitleCell.innerHTML = "<span class='gyMainScreen_musteriSonucLink' onclick='gyMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		gyMainScreen_musteriSonucTitleCell.setAttribute("class","gyMainScreen_musteriSonucTitleCell");
		
		var gyMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		gyMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		gyMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","gyMainScreen_musteriSonucPhoneNumberCell");
		
		var gyMainScreen_musteriSonucMailCell = document.createElement("div");
		gyMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		gyMainScreen_musteriSonucMailCell.setAttribute("class","gyMainScreen_musteriSonucMailCell");
		
		var gyMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		gyMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		gyMainScreen_musteriSonucWebsiteCell.setAttribute("class","gyMainScreen_musteriSonucWebsiteCell");
		
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucLockCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucTitleCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucPhoneNumberCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucMailCell);
		gyMainScreen_musteriSonucRow.appendChild(gyMainScreen_musteriSonucWebsiteCell);
		
		gyMainScreen_fuarKatilimciSonucDiv.appendChild(gyMainScreen_musteriSonucRow);
	}
}
