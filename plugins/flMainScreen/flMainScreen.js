$(flMainScreen_init);

var flMainScreen_coreURL = 'plugins/flMainScreen/flMainScreen_core.php';
var flMainScreen_musteriAramaSirketUnvaniInput;
var flMainScreen_musteriAramaSirketTelInput;
var flMainScreen_musteriAramaSirketMarkaInput;
var flMainScreen_musteriAramaCalisanAdiInput;
var flMainScreen_musteriAramaCalisanSoyadiInput;
var flMainScreen_musteriAramaAdresUlkeSelect;
var flMainScreen_musteriAdresIlSelect;

function flMainScreen_init()
{
	$("#flMainScreen_accordion").accordion();
	$("#flMainScreen_firmalarimAccordion").accordion();
	$("#flMainScreen_aramaTabs").tabs({disabled: [ 3 ],
		beforeActivate: function( event, ui ){
			var tab = ui.newTab;
			if(tab[0].innerText == "Firmalarım")
				flMainScreen_getMyCustomers();
		}	
	});
	$("#flMainScreen_satisTabs").tabs({disabled: [ 1 ] });
	$("#flMainScreen_istatistikTabs").tabs();
	$("#flMainScreen_onayTabs").tabs();
	
	$("#flMainScreen_musteriAramaSirketUnvaniInput, #flMainScreen_musteriAramaSirketTelInput, #flMainScreen_musteriAramaSirketMarkaInput" +
		", #flMainScreen_musteriAramaCalisanAdiInput, #flMainScreen_musteriAramaCalisanSoyadiInput").keyup(function(event){
		if(event.keyCode == 13)
		{
			$("#flMainScreen_musteriAramaSearchButton").click();
		}
	});
	
	flMainScreen_musteriAramaSirketUnvaniInput = document.getElementById("flMainScreen_musteriAramaSirketUnvaniInput");
	flMainScreen_musteriAramaSirketTelInput = document.getElementById("flMainScreen_musteriAramaSirketTelInput");
	flMainScreen_musteriAramaSirketMarkaInput = document.getElementById("flMainScreen_musteriAramaSirketMarkaInput");
	flMainScreen_musteriAramaCalisanAdiInput = document.getElementById("flMainScreen_musteriAramaCalisanAdiInput");
	flMainScreen_musteriAramaCalisanSoyadiInput = document.getElementById("flMainScreen_musteriAramaCalisanSoyadiInput");
	flMainScreen_musteriAramaAdresUlkeSelect = $("#flMainScreen_musteriAramaAdresUlkeSelect");
	flMainScreen_musteriAdresIlSelect = $("#flMainScreen_musteriAdresIlSelect");
	
	flMainScreen_musteriAramaAdresUlkeSelect.selectmenu({maxHeight: 100});
	flMainScreen_musteriAdresIlSelect.selectmenu({maxHeight: 100});
	$("#flMainScreen_musteriAramaSearchButton").button();
	
	$("#flMainScreen_mtFirmaAramaMTSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_mtFirmaAramaLockTypeSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_mtFirmaAramaSearchButton").button();
	
	$("#flMainScreen_yeniMusteriKayitSehirSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_yeniMusteriKayitUlkeSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_yeniMusteriKayitSektorSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput").mask("0-(999) 9999999");
	$("#flMainScreen_yeniMusteriKayitTel1Input").mask("0-(999) 9999999");
	$("#flMainScreen_yeniMusteriKayitTel2Input").mask("0-(999) 9999999");
	$("#flMainScreen_yeniMusteriKayitTel3Input").mask("0-(999) 9999999");
	$("#flMainScreen_yeniMusteriKayitFaksInput").mask("0-(999) 9999999");
	$("#flMainScreen_yeniMusteriKayitSaveButton").button();
	
	$("#flMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_satisAramaSearchButton").button();
	$("#flMainScreen_satisAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_satisAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#flMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_gorusmeAramaSearchButton").button();
	$("#flMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_gorusmeAramaBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	
	$("#flMainScreen_firmaIstatistikSearchButton").button();
	$("#flMainScreen_firmaIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_firmaIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_firmaIstatistikFirmaSelect").selectmenu({maxHeight: 100});
	
	$("#flMainScreen_mtIstatistikSearchButton").button();
	$("#flMainScreen_mtIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_mtIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_mtIstatistikMTSelect").selectmenu({maxHeight: 100});
	
	$("#flMainScreen_fuarIstatistikSearchButton").button();
	$("#flMainScreen_fuarIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_fuarIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_fuarIstatistikFuarSelect").selectmenu({maxHeight: 100});
	
	$("#flMainScreen_grupIstatistikSearchButton").button();
	$("#flMainScreen_grupIstatistikBaslangicTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_grupIstatistikBitisTarihiInput").datepicker({dateFormat: "dd/mm/yy"});
	$("#flMainScreen_grupIstatistikGrupSelect").selectmenu({maxHeight: 100});
	
	var login_buttonsDiv = document.getElementById("login_buttonsDiv");
	
	var newFairButton = document.createElement("button");
	newFairButton.setAttribute("onclick","newFair_openPopup()");
	newFairButton.innerHTML = "Yeni Fuar Ekle";
	newFairButton.setAttribute("id","flMainScreen_newFairButton");
	
	var editFairButton = document.createElement("button");
	editFairButton.setAttribute("onclick","editFair_openPopup()");
	editFairButton.innerHTML = "Fuar Düzenle";
	editFairButton.setAttribute("id","flMainScreen_editFairButton");
	
	var showFairsButton = document.createElement("button");
	showFairsButton.setAttribute("onclick","showFairs_openPopup()");
	showFairsButton.innerHTML = "Fuarları Görüntüle";
	showFairsButton.setAttribute("id","flMainScreen_showFairsButton");
	
	var editMTButton = document.createElement("button");
	editMTButton.setAttribute("onclick","editMT_openPopup()");
	editMTButton.innerHTML = "MT Düzenle";
	editMTButton.setAttribute("id","flMainScreen_editMTButton");
	
	var deleteMTButton = document.createElement("button");
	deleteMTButton.setAttribute("onclick","deleteMT_openPopup()");
	deleteMTButton.innerHTML = "MT Sil";
	deleteMTButton.setAttribute("id","flMainScreen_deleteMTButton");
	
	login_buttonsDiv.appendChild(newFairButton);
	login_buttonsDiv.appendChild(editFairButton);
	login_buttonsDiv.appendChild(showFairsButton);
	login_buttonsDiv.appendChild(editMTButton);
	login_buttonsDiv.appendChild(deleteMTButton);
	
	$("#flMainScreen_newFairButton").button();
	$("#flMainScreen_editFairButton").button();
	$("#flMainScreen_showFairsButton").button();
	$("#flMainScreen_editMTButton").button();
	$("#flMainScreen_deleteMTButton").button();
	
	flMainScreen_getSectors();
	flMainScreen_getCountries();
	flMainScreen_getFairs();
	flMainScreen_getCustomerRepresentatives();
	flMainScreen_getMyCustomers();
	flMainScreen_getAllCustomers();
}

function flMainScreen_getSectors()
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getSectors',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var flMainScreen_yeniMusteriKayitSektorSelect = document.getElementById("flMainScreen_yeniMusteriKayitSektorSelect");
				var flMainScreen_grupIstatistikGrupSelect = document.getElementById("flMainScreen_grupIstatistikGrupSelect");
				for(var i = 0; i < data.sectors.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.sectors[i].sectorId);
					newOption.innerHTML = data.sectors[i].description;
					flMainScreen_yeniMusteriKayitSektorSelect.appendChild(newOption);
					
					var newOption2 = document.createElement("option");
					newOption2.setAttribute("value", data.sectors[i].sectorId);
					newOption2.innerHTML = data.sectors[i].description;
					flMainScreen_yeniMusteriKayitSektorSelect.appendChild(newOption2);
					flMainScreen_grupIstatistikGrupSelect.appendChild(newOption2);
				}
				$("#flMainScreen_yeniMusteriKayitSektorSelect").selectmenu({maxHeight: 100});
				$("#flMainScreen_grupIstatistikGrupSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_getCountries()
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCountries',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var flMainScreen_yeniMusteriKayitUlkeSelect = document.getElementById("flMainScreen_yeniMusteriKayitUlkeSelect");
				var flMainScreen_musteriAramaAdresUlkeSelect = document.getElementById("flMainScreen_musteriAramaAdresUlkeSelect");
				for(var i = 0; i < data.countries.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.countries[i].countryId);
					newOption.innerHTML = data.countries[i].name;
					flMainScreen_yeniMusteriKayitUlkeSelect.appendChild(newOption);
					
					var newOption2 = document.createElement("option");
					newOption2.setAttribute("value", data.countries[i].countryId);
					newOption2.innerHTML = data.countries[i].name;
					flMainScreen_musteriAramaAdresUlkeSelect.appendChild(newOption2);
				}
				$("#flMainScreen_yeniMusteriKayitUlkeSelect").selectmenu({select: flMainScreen_yeniMusteriKayitUlkeSelectChanged});
				$("#flMainScreen_musteriAramaAdresUlkeSelect").selectmenu({select: flMainScreen_musteriAramaAdresUlkeSelectChanged});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_musteriAramaAdresUlkeSelectChanged(event,optionElement)
{
	flMainScreen_getCitiesOfCountry(1,optionElement.value);
}

function flMainScreen_yeniMusteriKayitUlkeSelectChanged(event, optionElement)
{
	flMainScreen_getCitiesOfCountry(2,optionElement.value);
}

function flMainScreen_getCitiesOfCountry(which, countryId)
{
	$.ajax({
		url: flMainScreen_coreURL,
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
					currentSelect = document.getElementById("flMainScreen_musteriAdresIlSelect");
					currentSelectId = "#flMainScreen_musteriAdresIlSelect";
				}
				else if(which == 2)
				{
					currentSelect = document.getElementById("flMainScreen_yeniMusteriKayitSehirSelect");
					currentSelectId = "#flMainScreen_yeniMusteriKayitSehirSelect";
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

function flMainScreen_saveNewCustomer()
{
	var flMainScreen_yeniMusteriKayitUnvanInput = document.getElementById("flMainScreen_yeniMusteriKayitUnvanInput");
	var flMainScreen_yeniMusteriKayitMarkaInput = document.getElementById("flMainScreen_yeniMusteriKayitMarkaInput");
	var flMainScreen_yeniMusteriKayitVergiDairesiInput = document.getElementById("flMainScreen_yeniMusteriKayitVergiDairesiInput");
	var flMainScreen_yeniMusteriKayitVergiNoInput = document.getElementById("flMainScreen_yeniMusteriKayitVergiNoInput");
	var flMainScreen_yeniMusteriKayitSektorSelect = $("#flMainScreen_yeniMusteriKayitSektorSelect");
	var flMainScreen_yeniMusteriKayitSirketSahibiIsimInput = document.getElementById("flMainScreen_yeniMusteriKayitSirketSahibiIsimInput");
	var flMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput = document.getElementById("flMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput");
	var flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput = document.getElementById("flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput");
	var flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput = document.getElementById("flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput");
	var flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput = document.getElementById("flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput");
	var flMainScreen_yeniMusteriKayitAdresInput = document.getElementById("flMainScreen_yeniMusteriKayitAdresInput");
	var flMainScreen_yeniMusteriKayitIlceInput = document.getElementById("flMainScreen_yeniMusteriKayitIlceInput");
	var flMainScreen_yeniMusteriKayitSehirSelect = $("#flMainScreen_yeniMusteriKayitSehirSelect");
	var flMainScreen_yeniMusteriKayitUlkeSelect = $("#flMainScreen_yeniMusteriKayitUlkeSelect");
	var flMainScreen_yeniMusteriKayitWebInput = document.getElementById("flMainScreen_yeniMusteriKayitWebInput");
	var flMainScreen_yeniMusteriKayitEmailInput = document.getElementById("flMainScreen_yeniMusteriKayitEmailInput");
	var flMainScreen_yeniMusteriKayitTel1Input = document.getElementById("flMainScreen_yeniMusteriKayitTel1Input");
	var flMainScreen_yeniMusteriKayitTel2Input = document.getElementById("flMainScreen_yeniMusteriKayitTel2Input");
	var flMainScreen_yeniMusteriKayitTel3Input = document.getElementById("flMainScreen_yeniMusteriKayitTel3Input");
	var flMainScreen_yeniMusteriKayitFaksInput = document.getElementById("flMainScreen_yeniMusteriKayitFaksInput");
	var flMainScreen_yeniMusteriKayitNotlarInput = document.getElementById("flMainScreen_yeniMusteriKayitNotlarInput");
	
	var unvan = flMainScreen_yeniMusteriKayitUnvanInput.value;
	var marka = flMainScreen_yeniMusteriKayitMarkaInput.value;
	var vergiDairesi = flMainScreen_yeniMusteriKayitVergiDairesiInput.value;
	var vergiNo = flMainScreen_yeniMusteriKayitVergiNoInput.value;
	var sektor = flMainScreen_yeniMusteriKayitSektorSelect.selectmenu("value");
	var sirketSahibiIsim = flMainScreen_yeniMusteriKayitSirketSahibiIsimInput.value;
	var sirketSahibiSoyisim = flMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput.value;
	var irtibatKurulacakKisiIsim = flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput.value;
	var irtibatKurulacakKisiSoyisim = flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput.value;
	var irtibatKurulacakKisiTel = flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput.value;
	var adres = flMainScreen_yeniMusteriKayitAdresInput.value;
	var ilce = flMainScreen_yeniMusteriKayitIlceInput.value;
	var sehir = flMainScreen_yeniMusteriKayitSehirSelect.selectmenu("value");
	var ulke = flMainScreen_yeniMusteriKayitUlkeSelect.selectmenu("value");
	var web = flMainScreen_yeniMusteriKayitWebInput.value;
	var email = flMainScreen_yeniMusteriKayitEmailInput.value;
	var tel1 = flMainScreen_yeniMusteriKayitTel1Input.value;
	var tel2 = flMainScreen_yeniMusteriKayitTel2Input.value;
	var tel3 = flMainScreen_yeniMusteriKayitTel3Input.value;
	var faks = flMainScreen_yeniMusteriKayitFaksInput.value;
	var notlar = flMainScreen_yeniMusteriKayitNotlarInput.value;
	
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
		url: flMainScreen_coreURL + "?op=saveNewCustomer",
		dataType: 'json',
		type: 'POST',
		data: postedString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Müşteri başarıyla kaydedildi");
				flMainScreen_yeniMusteriKayitUnvanInput.value = "";
				flMainScreen_yeniMusteriKayitMarkaInput.value = "";
				flMainScreen_yeniMusteriKayitVergiDairesiInput.value = "";
				flMainScreen_yeniMusteriKayitVergiNoInput.value = "";
				flMainScreen_yeniMusteriKayitSektorSelect.selectmenu("value","-1");
				flMainScreen_yeniMusteriKayitSirketSahibiIsimInput.value = "";
				flMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput.value = "";
				flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput.value = "";
				flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput.value = "";
				flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput.value = "";
				flMainScreen_yeniMusteriKayitAdresInput.value = "";
				flMainScreen_yeniMusteriKayitIlceInput.value = "";
				document.getElementById("flMainScreen_yeniMusteriKayitSehirSelect").innerHTML = "<option value='-1'>Seçiniz</option>";
				flMainScreen_yeniMusteriKayitSehirSelect.selectmenu({maxHeight: 100});
				flMainScreen_yeniMusteriKayitUlkeSelect.selectmenu("value","-1");
				flMainScreen_yeniMusteriKayitWebInput.value = "";
				flMainScreen_yeniMusteriKayitEmailInput.value = "";
				flMainScreen_yeniMusteriKayitTel1Input.value = "";
				flMainScreen_yeniMusteriKayitTel2Input.value = "";
				flMainScreen_yeniMusteriKayitTel3Input.value = "";
				flMainScreen_yeniMusteriKayitFaksInput.value = "";
				flMainScreen_yeniMusteriKayitNotlarInput.value = "";
			}
			else
				alert(data.status);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_getFairs()
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairs',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_fillFairsSelect(data.fairs);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_fillFairsSelect(fairs)
{
	var flMainScreen_satisAramaFuarSelect = document.getElementById("flMainScreen_satisAramaFuarSelect");
	var flMainScreen_gorusmeAramaFuarSelect = document.getElementById("flMainScreen_gorusmeAramaFuarSelect");
	var flMainScreen_fuarIstatistikFuarSelect = document.getElementById("flMainScreen_fuarIstatistikFuarSelect");
	
	for(var i = 0; i < fairs.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = fairs[i].name;
		newOption.setAttribute("value", fairs[i].fairId);
		flMainScreen_satisAramaFuarSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = fairs[i].name;
		newOption2.setAttribute("value", fairs[i].fairId);
		flMainScreen_gorusmeAramaFuarSelect.appendChild(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.innerHTML = fairs[i].name;
		newOption3.setAttribute("value", fairs[i].fairId);
		flMainScreen_fuarIstatistikFuarSelect.appendChild(newOption3);
	}
	
	$("#flMainScreen_gorusmeAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_satisAramaFuarSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_fuarIstatistikFuarSelect").selectmenu({maxHeight: 100});
}

function flMainScreen_getCustomerRepresentatives()
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getCustomerRepresentatives',
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_fillCustomerRepresentativesSelect(data.customerRepresentatives);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_fillCustomerRepresentativesSelect(customerRepresentatives)
{
	var flMainScreen_satisAramaMTSelect = document.getElementById("flMainScreen_satisAramaMTSelect");
	var flMainScreen_gorusmeAramaMTSelect = document.getElementById("flMainScreen_gorusmeAramaMTSelect");
	var flMainScreen_mtIstatistikMTSelect = document.getElementById("flMainScreen_mtIstatistikMTSelect");
	var flMainScreen_mtFirmaAramaMTSelect = document.getElementById("flMainScreen_mtFirmaAramaMTSelect");
	
	for(var i = 0; i < customerRepresentatives.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.innerHTML = customerRepresentatives[i].name;
		newOption.setAttribute("value", customerRepresentatives[i].userId);
		flMainScreen_satisAramaMTSelect.appendChild(newOption);
	
		var newOption2 = document.createElement("option");
		newOption2.innerHTML = customerRepresentatives[i].name;
		newOption2.setAttribute("value", customerRepresentatives[i].userId);
		flMainScreen_gorusmeAramaMTSelect.appendChild(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.innerHTML = customerRepresentatives[i].name;
		newOption3.setAttribute("value", customerRepresentatives[i].userId);
		flMainScreen_mtIstatistikMTSelect.appendChild(newOption3);
		
		var newOption4 = document.createElement("option");
		newOption4.innerHTML = customerRepresentatives[i].name;
		newOption4.setAttribute("value", customerRepresentatives[i].userId);
		flMainScreen_mtFirmaAramaMTSelect.appendChild(newOption4);
	}
	
	$("#flMainScreen_gorusmeAramaMTSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_satisAramaMTSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_mtIstatistikMTSelect").selectmenu({maxHeight: 100});
	$("#flMainScreen_mtFirmaAramaMTSelect").selectmenu({maxHeight: 100});
}

function flMainScreen_searchCustomers()
{
	var title = flMainScreen_musteriAramaSirketUnvaniInput.value;
	var phoneNumber = flMainScreen_musteriAramaSirketTelInput.value;
	var brand = flMainScreen_musteriAramaSirketMarkaInput.value;
	var name = flMainScreen_musteriAramaCalisanAdiInput.value;
	var surname = flMainScreen_musteriAramaCalisanSoyadiInput.value;
	var countryId = flMainScreen_musteriAramaAdresUlkeSelect.selectmenu("value");
	var cityId = flMainScreen_musteriAdresIlSelect.selectmenu("value");
	
	if(title == "" && phoneNumber == "" && brand == "" && name == "" && surname == "" && countryId == -1 && cityId == -1)
	{
		alert("Lütfen en az bir kriteri giriniz.");
		return;
	}
	
	var postString = "title=" + encodeURIComponent(title) + "&phoneNumber=" + encodeURIComponent(phoneNumber) + "&brand=" + encodeURIComponent(brand)
		+ "&name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) + "&countryId=" + encodeURIComponent(countryId)
		+ "&cityId=" + encodeURIComponent(cityId);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=searchCustomers",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showCustomers(data.customers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showCustomers(customers)
{
	var flMainScreen_musteriSonucDiv = document.getElementById("flMainScreen_musteriSonucDiv");
	flMainScreen_musteriSonucDiv.innerHTML = "";
	
	var flMainScreen_musteriSonucHeaderRow = document.createElement("div");
	flMainScreen_musteriSonucHeaderRow.setAttribute("class","flMainScreen_musteriSonucHeaderRow");
	
	var flMainScreen_musteriSonucLockHeader = document.createElement("div");
	flMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	flMainScreen_musteriSonucLockHeader.setAttribute("class","flMainScreen_musteriSonucLockCell");
	
	var flMainScreen_musteriSonucTitleHeader = document.createElement("div");
	flMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	flMainScreen_musteriSonucTitleHeader.setAttribute("class","flMainScreen_musteriSonucTitleCell");
	
	var flMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	flMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	flMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","flMainScreen_musteriSonucPhoneNumberCell");
	
	var flMainScreen_musteriSonucMailHeader = document.createElement("div");
	flMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	flMainScreen_musteriSonucMailHeader.setAttribute("class","flMainScreen_musteriSonucMailCell");
	
	var flMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	flMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	flMainScreen_musteriSonucWebsiteHeader.setAttribute("class","flMainScreen_musteriSonucWebsiteCell");
	
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucLockHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucTitleHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucPhoneNumberHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucMailHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucWebsiteHeader);
	
	flMainScreen_musteriSonucDiv.appendChild(flMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var flMainScreen_musteriSonucRow = document.createElement("div");
		flMainScreen_musteriSonucRow.setAttribute("class","flMainScreen_musteriSonucRow");
		
		var flMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		flMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		flMainScreen_musteriSonucLockCell.setAttribute("class","flMainScreen_musteriSonucLockCell");
		
		var flMainScreen_musteriSonucTitleCell = document.createElement("div");
		flMainScreen_musteriSonucTitleCell.innerHTML = "<span class='flMainScreen_musteriSonucLink' onclick='flMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		flMainScreen_musteriSonucTitleCell.setAttribute("class","flMainScreen_musteriSonucTitleCell");
		
		var flMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		flMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		flMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","flMainScreen_musteriSonucPhoneNumberCell");
		
		var flMainScreen_musteriSonucMailCell = document.createElement("div");
		flMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		flMainScreen_musteriSonucMailCell.setAttribute("class","flMainScreen_musteriSonucMailCell");
		
		var flMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		flMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		flMainScreen_musteriSonucWebsiteCell.setAttribute("class","flMainScreen_musteriSonucWebsiteCell");
		
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucLockCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucTitleCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucPhoneNumberCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucMailCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucWebsiteCell);
		
		flMainScreen_musteriSonucDiv.appendChild(flMainScreen_musteriSonucRow);
	}
}

function flMainScreen_getCustomerDetails(customerId)
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getCustomerDetails&customerId=" + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showCustomerDetails(data,customerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showCustomerDetails(data,customerId)
{
	var flMainScreen_musteriDetaylariContainerDiv = document.getElementById("flMainScreen_musteriDetaylariContainerDiv");
	flMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
	
	var flMainScreen_musteriDetaylariTopDiv = document.createElement("div");
	flMainScreen_musteriDetaylariTopDiv.setAttribute("class","flMainScreen_musteriDetaylariTopDiv");
	
	var flMainScreen_musteriDetaylariLeftDiv = document.createElement("div");
	flMainScreen_musteriDetaylariLeftDiv.setAttribute("class","flMainScreen_musteriDetaylariLeftDiv");
	
	var imageHTML = "";
	if(data.lockedByUser)
		imageHTML += "<img style='margin-left:5px;' src='core/css/images/Lock.png' title='Kilidi kaldırmak için tıklayınız.' onclick='flMainScreen_unlockCustomer(" + customerId + ")'>";
	
	var lockedMT = ""
	if(data.lockedMT != null)
		lockedMT = data.lockedMT;
	
	var flMainScreen_musteriDetaylariGeneralInfoDiv = document.createElement("div");
	flMainScreen_musteriDetaylariGeneralInfoDiv.setAttribute("style","margin-bottom:5px;");
	flMainScreen_musteriDetaylariGeneralInfoDiv.innerHTML += 
		"<div style='margin-bottom:10px;'>" +
			"<span style='font-weight:bold; font-size:16px;text-align:center;'>" + data.customerInfo.title + "</span>" +
			imageHTML +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='flMainScreen_musteriDetaylariLabel'>Ekleyen MT:</label>" +
			"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerInfo.addedName + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='flMainScreen_musteriDetaylariLabel'>Kilitleyen MT:</label>" +
			"<span class='flMainScreen_musteriDetaylariSpan'>" + lockedMT + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='flMainScreen_musteriDetaylariLabel'>Marka</label>" +
			"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerInfo.brand + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='flMainScreen_musteriDetaylariLabel'>Vergi Dairesi</label>" +
			"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerInfo.taxOffice + "</span>" +
		"</div>" +
		"<div style='height: 25px;'>" +
			"<label class='flMainScreen_musteriDetaylariLabel'>Vergi No</label>" +
			"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerInfo.taxId + "</span>" +
		"</div>";
		
	flMainScreen_musteriDetaylariLeftDiv.appendChild(flMainScreen_musteriDetaylariGeneralInfoDiv);
	
	var flMainScreen_musteriDetaylariContactsDiv = document.createElement("div");
	flMainScreen_musteriDetaylariContactsDiv.setAttribute("class","flMainScreen_musteriDetaylariContactsDiv");
	if(data.customerContacts.length != 0)
		flMainScreen_musteriDetaylariContactsDiv.innerHTML = "<div style='font-weight:bold;margin-bottom:5px;'>İrtibat Kurulabilecek Kişiler</div>";
	
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
				"<div class='flMainScreen_musteriDetaylariContactButtonsDiv'>" +
					"<a href='#' onclick='javascript:flMainScreen_deleteCustomerContact(" + data.customerContacts[i].customerContactId + "," + customerId + ")'>Sil</a>" +
					"<a style='margin-left:5px;' href='#' onclick='javascript:editCustomerContact_openEditPopup(" 
						+ data.customerContacts[i].customerContactId + "," + customerId + ")'>Düzenle</a>" +
				"</div>";
		}
		
		flMainScreen_musteriDetaylariContactsDiv.innerHTML += 
			"<div class='flMainScreen_musteriDetaylariContactDiv'>" +
				"<div class='flMainScreen_musteriDetaylariContactInfoDiv'>" +
					data.customerContacts[i].contactName + " " + data.customerContacts[i].contactSurname + "-" + title
					+ "-" + phone + "-" + data.customerContacts[i].branchType +
				"</div>" +
				contactButtonsHTML +
			"</div>";
	}
	flMainScreen_musteriDetaylariLeftDiv.appendChild(flMainScreen_musteriDetaylariContactsDiv);
	flMainScreen_musteriDetaylariTopDiv.appendChild(flMainScreen_musteriDetaylariLeftDiv);
			
	var flMainScreen_musteriDetaylariRightDiv = document.createElement("div");
	flMainScreen_musteriDetaylariRightDiv.setAttribute("class","flMainScreen_musteriDetaylariRightDiv");
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
	
	flMainScreen_musteriDetaylariRightDiv.innerHTML = "<div style='height: 25px;'>" +
			"<label class='flMainScreen_musteriDetaylariRightLabel'>Sektörler:</label>" +
			"<span class='flMainScreen_musteriDetaylariRightSpan'>" + sectorsText + "</span>" +
			"<div class='flMainScreen_contractCheckboxDiv' style='float: left; margin-right:8px;'>" +
				"<label class='flMainScreen_musteriDetaylariRightLabel'>Sözleşme:</label>" +
				"<input type='checkbox' id='flMainScreen_contractCheckInput' disabled='true' " + checkedString + "'/>" +
			"</div>" +
			"<label class='flMainScreen_musteriDetaylariRightLabel'>Tarih:</label>" +
			"<span class='flMainScreen_musteriDetaylariRightSpan'>" + lastContractDate + "</span>" +
			"<label class='flMainScreen_musteriDetaylariRightLabel'>Fuar:</label>" +
			"<span class='customerDetails_fairNameSpan'>" + lastContractFair + "</span>" +
		"</div>";
	
	var flMainScreen_musteriDetaylariSubelerTabs = document.createElement("div");
	flMainScreen_musteriDetaylariSubelerTabs.setAttribute("class","flMainScreen_musteriDetaylariSubelerTabs");
	flMainScreen_musteriDetaylariRightDiv.appendChild(flMainScreen_musteriDetaylariSubelerTabs);
	
	var subelerTabUlHTML = "<ul>";
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		subelerTabUlHTML += '<li><a href="#flMainScreen_musteriDetaylariSube' + i + 'Tab">' 
									+ data.customerBranches[i].type + '</a></li>';
	}
	subelerTabUlHTML += "</ul>";
	flMainScreen_musteriDetaylariSubelerTabs.innerHTML = subelerTabUlHTML;
	
	for(var i = 0; i < data.customerBranches.length; i++)
	{
		var deleteButtonHTML = "";
		if(data.customerBranches[i].type == "Merkez" || data.lockedByAnotherUser)
		{
			deleteButtonHTML = "<button disabled='true' class='flMainScreen_musteriDetaylarSubeButton'>Bu Şubeyi Sil</button>";
		}
		else
			deleteButtonHTML = "<button class='flMainScreen_musteriDetaylarSubeButton' onclick='flMainScreen_deleteCustomerBranch(" + data.customerBranches[i].branchId + "," + customerId + ")'>Bu Şubeyi Sil</button>";
			
		var editButtonHTML = "";
		if(data.lockedByAnotherUser)
		{
			editButtonHTML = "<button disabled='true' class='flMainScreen_musteriDetaylarSubeButton'>Düzenle</button>";
		}
		else
			editButtonHTML ="<button class='flMainScreen_musteriDetaylarSubeButton' onclick='editCustomerLocation_openEditPopup(" 
						+ data.customerBranches[i].branchId + "," + customerId + ")'>Düzenle</button>";
		
		flMainScreen_musteriDetaylariSubelerTabs.innerHTML += 
			"<div id='flMainScreen_musteriDetaylariSube" + i + "Tab'>" +  
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Adres:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].address + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>İlçe:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].county + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Şehir:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].cityName + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Ülke:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].countryName + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Website:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].website + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>E-mail:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].email + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Tel-1:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber1 + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Tel-2:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber2 + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Tel-3:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].phoneNumber3 + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Faks:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].fax + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow'>" +
					"<label class='flMainScreen_musteriDetaylariLabel'>Notlar:</label>" +
					"<span class='flMainScreen_musteriDetaylariSpan'>" + data.customerBranches[i].notes + "</span>" +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow' style='height:28px;'>" +
					deleteButtonHTML +
				"</div>" +
				"<div class='flMainScreen_musteriDetaylarSubeRow' style='height:28px;'>" +
					editButtonHTML +
				"</div>" +
			"</div>";
	}
	flMainScreen_musteriDetaylariTopDiv.appendChild(flMainScreen_musteriDetaylariRightDiv);
	flMainScreen_musteriDetaylariContainerDiv.appendChild(flMainScreen_musteriDetaylariTopDiv);
	$(".flMainScreen_musteriDetaylariSubelerTabs").tabs();
	$(".flMainScreen_musteriDetaylarSubeButton").button();
	var flMainScreen_musteriDetaylariButtonsDiv = document.createElement("div");
	flMainScreen_musteriDetaylariButtonsDiv.setAttribute("class","flMainScreen_musteriDetaylariButtonsDiv");
	
	var musteriDetaylariButtonsHTML = "";
	if(data.lockedByAnotherUser)
	{
		musteriDetaylariButtonsHTML = 
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' disabled='true'>Şirket Bilgilerini Düzenle</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' disabled='true'>Şirketi Sil</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' disabled='true'>Yeni Lokasyon Ekle</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' disabled='true'>Yeni Kişi Ekle</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' disabled='true'>Yeni Görüşme Oluştur</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' disabled='true'>Görüşmeleri Göster</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' disabled='true'>Satış Yap</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' disabled='true'>Sözleşme Bilgisi Göster</button>" +
			"</div>";
	}
	else
	{
		musteriDetaylariButtonsHTML = 
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' onclick='editCustomer_openPopup(" + customerId + ")'>Şirket Bilgilerini Düzenle</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' onclick='flMainScreen_deleteCustomer(" + customerId + ")'>Şirketi Sil</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' onclick='editCustomerLocation_openPopup(" + customerId + ")'>Yeni Lokasyon Ekle</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' onclick='editCustomerContact_openPopup(" + customerId + ")'>Yeni Kişi Ekle</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' onclick='addMeeting_openPopup(" + customerId + ")'>Yeni Görüşme Oluştur</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' onclick='flMainScreen_searchCustomerMeetings(" + customerId + ")'>Görüşmeleri Göster</button>" +
			"</div>" +
			"<div style='height:28px;text-align:left;'>" +
				"<button class='flMainScreen_musteriDetaylarButton' onclick='addContract_openPopup(" + customerId + ")'>Satış Yap</button>" +
				"<button style='margin-left:20px;' class='flMainScreen_musteriDetaylarButton' onclick='flMainScreen_searchCustomerContracts(" + customerId + ")'>Sözleşme Bilgisi Göster</button>" +
			"</div>";
	}
	
	flMainScreen_musteriDetaylariButtonsDiv.innerHTML = musteriDetaylariButtonsHTML;
	
	flMainScreen_musteriDetaylariContainerDiv.appendChild(flMainScreen_musteriDetaylariButtonsDiv);
	$(".flMainScreen_musteriDetaylarButton").button();
	$("#flMainScreen_accordion").accordion('option', 'active', 0);
	$( "#flMainScreen_aramaTabs" ).tabs( "option", "disabled", false );
	$( "#flMainScreen_aramaTabs" ).tabs( "option", "active", 3 );	
}

function flMainScreen_deleteCustomerContact(customerContactId, customerId)
{
	if(confirm("Bu kişiyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: flMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomerContact&customerContactId=' + customerContactId ,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					flMainScreen_getCustomerDetails(customerId);
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function flMainScreen_deleteCustomerBranch(branchId, customerId)
{
	if(confirm("Bu şubeyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: flMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomerBranch&branchId=' + branchId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					flMainScreen_getCustomerDetails(customerId);
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function flMainScreen_deleteCustomer(customerId)
{
	if(confirm("Bu müşteriyi silmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: flMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=deleteCustomer&customerId=' + customerId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					flMainScreen_musteriAramaSirketUnvaniInput.value = "";
					flMainScreen_musteriAramaSirketTelInput.value = "";
					flMainScreen_musteriAramaSirketMarkaInput.value = "";
					flMainScreen_musteriAramaCalisanAdiInput.value = "";
					flMainScreen_musteriAramaCalisanSoyadiInput.value = "";
					flMainScreen_musteriAramaAdresUlkeSelect.selectmenu("value", -1);
					flMainScreen_musteriAdresIlSelect.innerHTML = "<option value='-1'>Seçiniz</option>";
					$("#flMainScreen_musteriAdresIlSelect").selectmenu({maxHeight: 100});
					var flMainScreen_musteriSonucDiv = document.getElementById("flMainScreen_musteriSonucDiv");
					flMainScreen_musteriSonucDiv.innerHTML = "";
					var flMainScreen_musteriDetaylariContainerDiv = document.getElementById("flMainScreen_musteriDetaylariContainerDiv");
					flMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
					$("#flMainScreen_aramaTabs").tabs({disabled: [ 3 ] });
					$( "#flMainScreen_aramaTabs" ).tabs( "option", "active", 0 );
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function flMainScreen_getMyCustomers()
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getMyCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showMyCustomers(data.contractCustomers, "flMainScreen_firmalarimSozlesmeliSonucDiv");
				flMainScreen_showMyCustomers(data.lockCustomers, "flMainScreen_firmalarimTakipSonucDiv");
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showMyCustomers(customers, divId)
{
	var flMainScreen_firmalarimSonucDiv = document.getElementById(divId);
	flMainScreen_firmalarimSonucDiv.innerHTML = "";
	
	var flMainScreen_musteriSonucHeaderRow = document.createElement("div");
	flMainScreen_musteriSonucHeaderRow.setAttribute("class","flMainScreen_musteriSonucHeaderRow");
	
	var flMainScreen_musteriSonucLockHeader = document.createElement("div");
	flMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	flMainScreen_musteriSonucLockHeader.setAttribute("class","flMainScreen_musteriSonucLockCell");
	
	var flMainScreen_musteriSonucTitleHeader = document.createElement("div");
	flMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	flMainScreen_musteriSonucTitleHeader.setAttribute("class","flMainScreen_musteriSonucTitleCell");
	
	var flMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	flMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	flMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","flMainScreen_musteriSonucPhoneNumberCell");
	
	var flMainScreen_musteriSonucMailHeader = document.createElement("div");
	flMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	flMainScreen_musteriSonucMailHeader.setAttribute("class","flMainScreen_musteriSonucMailCell");
	
	var flMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	flMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	flMainScreen_musteriSonucWebsiteHeader.setAttribute("class","flMainScreen_musteriSonucWebsiteCell");
	
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucLockHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucTitleHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucPhoneNumberHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucMailHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucWebsiteHeader);
	
	flMainScreen_firmalarimSonucDiv.appendChild(flMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var flMainScreen_musteriSonucRow = document.createElement("div");
		flMainScreen_musteriSonucRow.setAttribute("class","flMainScreen_musteriSonucRow");
		
		var flMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		flMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		flMainScreen_musteriSonucLockCell.setAttribute("class","flMainScreen_musteriSonucLockCell");
		
		var flMainScreen_musteriSonucTitleCell = document.createElement("div");
		flMainScreen_musteriSonucTitleCell.innerHTML = "<span class='flMainScreen_musteriSonucLink' onclick='flMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		flMainScreen_musteriSonucTitleCell.setAttribute("class","flMainScreen_musteriSonucTitleCell");
		
		var flMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		flMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		flMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","flMainScreen_musteriSonucPhoneNumberCell");
		
		var flMainScreen_musteriSonucMailCell = document.createElement("div");
		flMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		flMainScreen_musteriSonucMailCell.setAttribute("class","flMainScreen_musteriSonucMailCell");
		
		var flMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		flMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		flMainScreen_musteriSonucWebsiteCell.setAttribute("class","flMainScreen_musteriSonucWebsiteCell");
		
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucLockCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucTitleCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucPhoneNumberCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucMailCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucWebsiteCell);
		
		flMainScreen_firmalarimSonucDiv.appendChild(flMainScreen_musteriSonucRow);
	}
}

function flMainScreen_searchContracts()
{
	var fairId = $("#flMainScreen_satisAramaFuarSelect").selectmenu("value");
	var userId = $("#flMainScreen_satisAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("flMainScreen_satisAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("flMainScreen_satisAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#flMainScreen_satisAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#flMainScreen_satisAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=searchContracts",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showContracts(data.contracts,postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showContracts(contracts,postString)
{
	var flMainScreen_satisSonucDiv = document.getElementById("flMainScreen_satisSonucDiv");
	flMainScreen_satisSonucDiv.innerHTML = "";
	var totalArea = 0;
	
	for(var i = 0; i < contracts.length; i++)
	{
		var flMainScreen_satisSonucRow = document.createElement("div");
		flMainScreen_satisSonucRow.setAttribute("class","flMainScreen_satisSonucRow");
		
		flMainScreen_satisSonucRow.innerHTML = contracts[i].contractDate + " - " + contracts[i].title + " - " + contracts[i].fairName + " - " +
			contracts[i].standArea + " m<sup>2</sup>";
		flMainScreen_satisSonucRow.setAttribute("onclick","flMainScreen_getContractDetails(" + contracts[i].contractId + ")");
		flMainScreen_satisSonucDiv.appendChild(flMainScreen_satisSonucRow);
		totalArea += contracts[i].standArea;
	}
	
	var postHTML = "";
	if(postString != "")
		postHTML = "<a style='margin-left:10px;' target='_blank' href='getContractsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
	
	var flMainScreen_satisOzetDiv = document.getElementById("flMainScreen_satisOzetDiv");
	flMainScreen_satisOzetDiv.innerHTML = "Toplam " + contracts.length + " tane sözleşme bulundu. Toplam " + totalArea + " m<sup>2</sup>." +
		postHTML;
}

function flMainScreen_getContractDetails(contractId)
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getContractDetails&contractId=" + contractId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showContractDetails(data, contractId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showContractDetails(data, contractId)
{
	var flMainScreen_satisDetaylariContainerDiv = document.getElementById("flMainScreen_satisDetaylariContainerDiv");
	flMainScreen_satisDetaylariContainerDiv.innerHTML = "";
	
	var pdfUploadLinkHTML = "";
	if(data.generalInfo.ownContract)
		pdfUploadLinkHTML = '<input class="flMainScreen_dosyaYukleButton" onclick="uploadifyPlugin_openPopup(' + contractId + ')" value="PDF Yükle" type="submit">';
		
	var pdfDownloadLinkHTML = "";
	if(data.generalInfo.pdfUpload)
		pdfDownloadLinkHTML = '<a style="margin-left:10px;" target="_blank" href="uploads/' + contractId + '.pdf">PDF İndir</a>';
	
	flMainScreen_satisDetaylariContainerDiv.innerHTML=
		'<div id="flMainScreen_showContractDetails_topDiv">' +
			'<div id="flMainScreen_showContractDetails_leftDiv">' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Fuar Adı:</label>' +
					data.fairInfo.fairName +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Fuar Tarihi:</label>' +
					data.fairInfo.startDate + " - " + data.fairInfo.endDate +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Proje Sorumlusu:</label>' +
					data.fairInfo.fkName +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Müşteri Hizmetleri Sorumlusu:</label>' +
					data.fairInfo.mtName +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">İndirimsiz Satış Fiyatı:</label>' +
					data.fairInfo.price + " &#8364;" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Müşteri Temsilcisi Adı:</label>' +
					data.customerRepresentativeInfo.name +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">MT Grubu:</label>' +
					data.customerRepresentativeInfo.sector +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Katılımcı Firma Yetkili:</label>' +
					data.customerContactName +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Taksit Sayısı:</label>' +
					data.payments.length +
				'</div>' +
				'<div id="flMainScreen_paymentPlanDiv">' +
				'</div>' +
			'</div>' +				
			'<div id="flMainScreen_showContractDetails_rightDiv">' +	
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Katılımcı Firma Ünvanı:</label>' +
					data.customerTitle +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Sözleşme Tarihi:</label>' +
					data.generalInfo.contractDate +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Ürün Grubu:</label>' +
					data.generalInfo.productGroup +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Nakliye Durumu:</label>' +
					data.generalInfo.shippingOption +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Stand Durumu:</label>' +
					data.generalInfo.standRequest +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Ekstra Navlun:</label>' +
					'<input type="checkbox" id="flMainScreen_extraNavlunInput" disabled="true"/>' +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Ekstra Navlun Miktar:</label>' +
					data.generalInfo.extraNavlunArea + " m<sup>3</sup>" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Ekstra Navlun Fiyat:</label>' +
					data.generalInfo.extraNavlunPrice + " &#8364;" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Stand m<sup>2</sup>:</label>' +
					data.generalInfo.standArea + " m<sup>2</sup>" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">m<sup>2</sup> Birim Fiyatı:</label>' +
					data.generalInfo.unitPrice + " &#8364;" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Sözleşme Tutarı:</label>' +
					data.generalInfo.contractAmount + " &#8364;" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">İndirim Oranı:</label>' +
					" %" + data.generalInfo.discountRate +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">İndirim Tutarı:</label>' +
					data.generalInfo.discountAmount + " &#8364;" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">KDV Tutarı:</label>' +
					data.generalInfo.kdvAmount  + " &#8364;" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv">' +
					'<label class="flMainScreen_showContractDetails_label">Sözleşme Bedeli(KDVli):</label>' +
					data.generalInfo.contractAmountWithKdv  + " &#8364;" +
				'</div>' +
				'<div class="flMainScreen_showContractDetails_outputDiv" style="height:80px;">' +
					'<label class="flMainScreen_showContractDetails_label">Ekstra Taahhütler:</label>' +
					'<textarea id="flMainScreen_showContractDetails_extraCommitmentsInput" rows="5" style="resize:none;" disabled="true"></textarea>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="flMainScreen_showContractDetails_outputDiv">' +
			'<input class="flMainScreen_sozlesmeIptalButton" onclick="flMainScreen_cancelContract(' + contractId + ')" value="İptal Et" type="submit">' +
			'<input class="flMainScreen_sozlesmeDuzenleButton" onclick="editContract_openPopup(' + contractId + ')" value="Düzenle" type="submit">' +
			pdfUploadLinkHTML +
			pdfDownloadLinkHTML +
		'</div>';
	
	if(data.generalInfo.extraNavlun)
		document.getElementById("flMainScreen_extraNavlunInput").checked = true;
	
	var flMainScreen_showContractDetails_extraCommitmentsInput = document.getElementById("flMainScreen_showContractDetails_extraCommitmentsInput");
	flMainScreen_showContractDetails_extraCommitmentsInput.value = data.generalInfo.extraCommitments;
	
	$(".flMainScreen_sozlesmeIptalButton").button();
	$(".flMainScreen_dosyaYukleButton").button();
	$(".flMainScreen_sozlesmeDuzenleButton").button();
	
	$( "#flMainScreen_satisTabs" ).tabs( "option", "disabled", false );
	$( "#flMainScreen_satisTabs" ).tabs( "option", "active", 1 );	
	
	var flMainScreen_paymentPlanDiv = document.getElementById("flMainScreen_paymentPlanDiv");
	var paymentCount = data.payments.length;
	for(var i = 1; i <= paymentCount; i++)
	{
		var flMainScreen_showContractDetails_outputDiv = document.createElement("div");
		flMainScreen_showContractDetails_outputDiv.setAttribute("class", "flMainScreen_showContractDetails_outputDiv");
		
		var flMainScreen_showContractDetails_label = document.createElement("label");
		flMainScreen_showContractDetails_label.setAttribute("class", "flMainScreen_showContractDetails_label");
		flMainScreen_showContractDetails_label.innerHTML = i + ". Taksit:";
		flMainScreen_showContractDetails_outputDiv.appendChild(flMainScreen_showContractDetails_label);
		
		var flMainScreen_paymentLabel = document.createElement("label");
		flMainScreen_paymentLabel.setAttribute("class", "flMainScreen_paymentLabel");
		flMainScreen_paymentLabel.innerHTML = data.payments[i - 1].paymentAmount + " &#8364;";
		flMainScreen_showContractDetails_outputDiv.appendChild(flMainScreen_paymentLabel);
		
		var flMainScreen_paymentDueDateLabel = document.createElement("label");
		flMainScreen_paymentDueDateLabel.setAttribute("class", "flMainScreen_paymentDueDateLabel");
		flMainScreen_paymentDueDateLabel.innerHTML = data.payments[i - 1].paymentDueDate;
		flMainScreen_showContractDetails_outputDiv.appendChild(flMainScreen_paymentDueDateLabel);
		
		var flMainScreen_paymentPaidCheckbox = document.createElement("input");
		flMainScreen_paymentPaidCheckbox.setAttribute("class", "flMainScreen_paymentPaidCheckbox");
		flMainScreen_paymentPaidCheckbox.setAttribute("type", "checkbox");
		flMainScreen_paymentPaidCheckbox.setAttribute("disabled", "true");
		flMainScreen_paymentPaidCheckbox.checked = data.payments[i - 1].paymentPaid;
		flMainScreen_showContractDetails_outputDiv.appendChild(flMainScreen_paymentPaidCheckbox);
		
		var flMainScreen_paymentPaidSpan = document.createElement("span");
		flMainScreen_paymentPaidSpan.setAttribute("class", "flMainScreen_paymentPaidSpan");
		flMainScreen_paymentPaidSpan.innerHTML = "Ödendi";
		flMainScreen_showContractDetails_outputDiv.appendChild(flMainScreen_paymentPaidSpan);
		
		flMainScreen_paymentPlanDiv.appendChild(flMainScreen_showContractDetails_outputDiv);
	}
}

function flMainScreen_searchMeetings()
{
	var fairId = $("#flMainScreen_gorusmeAramaFuarSelect").selectmenu("value");
	var userId = $("#flMainScreen_gorusmeAramaMTSelect").selectmenu("value");
	var startDate = document.getElementById("flMainScreen_gorusmeAramaBaslangicTarihiInput").value;
	var endDate = document.getElementById("flMainScreen_gorusmeAramaBitisTarihiInput").value;
	
	if(fairId == -1 || userId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#flMainScreen_gorusmeAramaBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#flMainScreen_gorusmeAramaBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&userId=" + encodeURIComponent(userId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=searchMeetings",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showMeetings(data.meetings,postString);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showMeetings(meetings, postString)
{
	var flMainScreen_gorusmeSonucDiv = document.getElementById("flMainScreen_gorusmeSonucDiv");
	flMainScreen_gorusmeSonucDiv.innerHTML = "";
	
	if(meetings.length == 0)
		flMainScreen_gorusmeSonucDiv.innerHTML = "Aradığınız kriterlere uygun görüşme bulunamamıştır.";
	
	for(var i = 0; i < meetings.length; i++)
	{
		var flMainScreen_gorusmeSonucRow = document.createElement("div");
		flMainScreen_gorusmeSonucRow.setAttribute("class","flMainScreen_gorusmeSonucRow");
		
		flMainScreen_gorusmeSonucRow.innerHTML = meetings[i].meetingDate + " - " + meetings[i].customerTitle + " - " + meetings[i].fairName + " - " +
			meetings[i].mtName + " - " + meetings[i].topic + " - " + meetings[i].description + " - " + meetings[i].meetingType;
		flMainScreen_gorusmeSonucDiv.appendChild(flMainScreen_gorusmeSonucRow);
	}
	
	var postHTML = "";
	if(postString != "")
		postHTML = "<a style='margin-left:10px;' target='_blank' href='getMeetingsAsExcel.php?" + postString + "'>Excel Olarak İndir</a>";
	var flMainScreen_gorusmeOzetDiv = document.getElementById("flMainScreen_gorusmeOzetDiv");
	flMainScreen_gorusmeOzetDiv.innerHTML = "Toplam " + meetings.length + " tane görüşme bulundu." +
		postHTML;
}

function flMainScreen_searchCustomerMeetings(customerId)
{
	$("#flMainScreen_gorusmeAramaFuarSelect").selectmenu("value", "-1");
	$("#flMainScreen_gorusmeAramaMTSelect").selectmenu("value", "-1");
	document.getElementById("flMainScreen_gorusmeAramaBaslangicTarihiInput").value = "";
	document.getElementById("flMainScreen_gorusmeAramaBitisTarihiInput").value = "";
	
	var postString = "customerId=" + encodeURIComponent(customerId);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=searchCustomerMeetings",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showMeetings(data.meetings, "");
				$("#flMainScreen_accordion").accordion('option', 'active', 2);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_searchCustomerContracts(customerId)
{
	$("#flMainScreen_satisAramaFuarSelect").selectmenu("value", "-1");
	$("#flMainScreen_satisAramaMTSelect").selectmenu("value", "-1");
	document.getElementById("flMainScreen_satisAramaBaslangicTarihiInput").value = "";
	document.getElementById("flMainScreen_satisAramaBitisTarihiInput").value = "";
	
	var postString = "customerId=" + encodeURIComponent(customerId);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=searchCustomerContracts",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showContracts(data.contracts, "");
				$("#flMainScreen_accordion").accordion('option', 'active', 1);
				$("#flMainScreen_satisTabs" ).tabs( "option", "active", 0 );	
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_getAllCustomers()
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: "op=getAllCustomers",
		success: function(data)
		{
			if(data.status == "Ok")
			{
				var flMainScreen_firmaIstatistikFirmaSelect = document.getElementById("flMainScreen_firmaIstatistikFirmaSelect");
				for(var i = 0; i < data.customers.length; i++)
				{
					var newOption = document.createElement("option");
					newOption.setAttribute("value", data.customers[i].customerId);
					newOption.innerHTML = data.customers[i].title;
					flMainScreen_firmaIstatistikFirmaSelect.appendChild(newOption);
				}
				$("#flMainScreen_firmaIstatistikFirmaSelect").selectmenu({maxHeight: 100});
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_createCustomerStats()
{
	var customerId = $("#flMainScreen_firmaIstatistikFirmaSelect").selectmenu("value");
	var startDate = document.getElementById("flMainScreen_firmaIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("flMainScreen_firmaIstatistikBitisTarihiInput").value;
	
	if(customerId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#flMainScreen_firmaIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#flMainScreen_firmaIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "customerId=" + encodeURIComponent(customerId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=getCustomerStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			flMainScreen_showCustomerStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_createPieChart(contractCount, gorusmeCount, randevuCount, cancelledContractCount, divIdString)
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
	pieChart.outlineColor = "#FFFFFF";
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

function flMainScreen_createChart(data, categoryField, chartTitle, valueTitle, valueField, divIdString, unit)
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

function flMainScreen_showCustomerStats(data, postString)
{
	flMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "flMainScreen_firmaIstatistikTypeChart");
	flMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "flMainScreen_firmaIstatistikSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "flMainScreen_firmaIstatistikSatisFiyatChart", "&#8364;");
	flMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "flMainScreen_firmaIstatistikIndirimTutarChart" ,"&#8364;");
	flMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "flMainScreen_firmaIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "flMainScreen_firmaIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var flMainScreen_firmaIstatistikOzetDiv = document.getElementById("flMainScreen_firmaIstatistikOzetDiv");
	flMainScreen_firmaIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getCustomerStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function flMainScreen_createMTStats()
{
	var mtId = $("#flMainScreen_mtIstatistikMTSelect").selectmenu("value");
	var startDate = document.getElementById("flMainScreen_mtIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("flMainScreen_mtIstatistikBitisTarihiInput").value;
	
	if(mtId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#flMainScreen_mtIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#flMainScreen_mtIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "mtId=" + encodeURIComponent(mtId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=getMTStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			flMainScreen_showMTStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showMTStats(data, postString)
{
	flMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "flMainScreen_mtIstatistikTypeChart");
	flMainScreen_createChart(data.satism2, "fair", "Fuar vs Stand Alanı", "Stand Alanı", "stand", "flMainScreen_mtIstatistikSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.satisFiyat, "fair", "Fuar vs Tutar", "Tutar", "fiyat", "flMainScreen_mtIstatistikSatisFiyatChart", "&#8364;");
	flMainScreen_createChart(data.indirimTutar, "fair", "Fuar vs İndirim Tutarı", "İndirim Tutarı", "tutar", "flMainScreen_mtIstatistikIndirimTutarChart" ,"&#8364;");
	flMainScreen_createChart(data.iptalSatism2, "fair", "Fuar vs Stand Alanı (İptal)", "Stand Alanı", "stand", "flMainScreen_mtIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.iptalSatisFiyat, "fair", "Fuar vs Tutar (İptal)", "Tutar", "fiyat", "flMainScreen_mtIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var flMainScreen_mtIstatistikOzetDiv = document.getElementById("flMainScreen_mtIstatistikOzetDiv");
	flMainScreen_mtIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getMtStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function flMainScreen_createFairStats()
{
	var fairId = $("#flMainScreen_fuarIstatistikFuarSelect").selectmenu("value");
	var startDate = document.getElementById("flMainScreen_fuarIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("flMainScreen_fuarIstatistikBitisTarihiInput").value;
	
	if(fairId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#flMainScreen_fuarIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#flMainScreen_fuarIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "fairId=" + encodeURIComponent(fairId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=getFairStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			flMainScreen_showFairStats(data,postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showFairStats(data, postString)
{
	flMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "flMainScreen_fuarIstatistikTypeChart");
	flMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "flMainScreen_fuarIstatistikSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "flMainScreen_fuarIstatistikSatisFiyatChart", "&#8364;");
	flMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "flMainScreen_fuarIstatistikIndirimTutarChart" ,"&#8364;");
	flMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "flMainScreen_fuarIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "flMainScreen_fuarIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var flMainScreen_fuarIstatistikOzetDiv = document.getElementById("flMainScreen_fuarIstatistikOzetDiv");
	flMainScreen_fuarIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getFairStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function flMainScreen_createGroupStats()
{
	var groupId = $("#flMainScreen_grupIstatistikGrupSelect").selectmenu("value");
	var startDate = document.getElementById("flMainScreen_grupIstatistikBaslangicTarihiInput").value;
	var endDate = document.getElementById("flMainScreen_grupIstatistikBitisTarihiInput").value;
	
	if(groupId == -1 || startDate == "" || endDate == "")
	{
		alert("Lütfen tüm alanları doldurunuz.");
		return;
	}
	
	var startDateAsDateType = $("#flMainScreen_grupIstatistikBaslangicTarihiInput").datepicker("getDate");
	var endDateAsDateType = $("#flMainScreen_grupIstatistikBitisTarihiInput").datepicker("getDate");
	
	if(startDateAsDateType > endDateAsDateType)
	{
		alert("Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
		return;
	}
	
	var postString = "groupId=" + encodeURIComponent(groupId) + "&startDate=" + encodeURIComponent(startDate)
		+ "&endDate=" + encodeURIComponent(endDate);
		
	$.ajax({
		url: flMainScreen_coreURL + "?op=getGroupStats",
		dataType: 'json',
		type: 'POST',
		data: postString,
		success: function(data)
		{
			flMainScreen_showGroupStats(data, postString);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showGroupStats(data, postString)
{
	flMainScreen_createPieChart(data.contractCount, data.gorusmeCount, data.randevuCount, data.cancelledContractCount, "flMainScreen_grupIstatistikTypeChart");
	flMainScreen_createChart(data.satism2, "MT", "MT vs Stand Alanı", "Stand Alanı", "stand", "flMainScreen_grupIstatistikSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.satisFiyat, "MT", "MT vs Tutar", "Tutar", "fiyat", "flMainScreen_grupIstatistikSatisFiyatChart", "&#8364;");
	flMainScreen_createChart(data.indirimTutar, "MT", "MT vs İndirim Tutarı", "İndirim Tutarı", "tutar", "flMainScreen_grupIstatistikIndirimTutarChart" ,"&#8364;");
	flMainScreen_createChart(data.iptalSatism2, "MT", "MT vs Stand Alanı (İptal)", "Stand Alanı", "stand", "flMainScreen_grupIstatistikIptalSatisM2Chart", "m<sup>2</sup>");
	flMainScreen_createChart(data.iptalSatisFiyat, "MT", "MT vs Tutar (İptal)", "Tutar", "fiyat", "flMainScreen_grupIstatistikIptalSatisFiyatChart" ,"&#8364;");

	var flMainScreen_grupIstatistikOzetDiv = document.getElementById("flMainScreen_grupIstatistikOzetDiv");
	flMainScreen_grupIstatistikOzetDiv.innerHTML = "<a style='padding-top: 4px;display: inline-block;' target='_blank' href='getGroupStatsAsExcel.php?" 
		+ postString + "'>Excel Olarak İndir</a>";
}

function flMainScreen_cancelContract(contractId)
{
	if(confirm("Bu kontratı iptal etmek istediğinize emin misiniz?"))
	{
		$.ajax({
			url: flMainScreen_coreURL,
			dataType: 'json',
			type: 'GET',
			data: 'op=cancelContract&contractId=' + contractId,
			success: function(data)
			{
				if(data.status == "Ok")
				{
					alert("İşlem başarıyla gerçekleştirilmiştir.");
					flMainScreen_getWaitingContracts();
					var flMainScreen_musteriDetaylariContainerDiv = document.getElementById("flMainScreen_musteriDetaylariContainerDiv");
					flMainScreen_musteriDetaylariContainerDiv.innerHTML = "";
					$( "#flMainScreen_satisTabs" ).tabs( "option", "disabled", [1] );
					$( "#flMainScreen_satisTabs" ).tabs( "option", "active", 0 );
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}

function flMainScreen_unlockCustomer(customerId)
{
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=unlockCustomer&customerId=' + customerId,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				alert("Kilit başarıyla kaldırılmıştır.");
				flMainScreen_getCustomerDetails(customerId);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_getMTLockedCustomers()
{
	var mtId = $("#flMainScreen_mtFirmaAramaMTSelect").selectmenu("value");
	var lockType = $("#flMainScreen_mtFirmaAramaLockTypeSelect").selectmenu("value");
	if(mtId == -1 || lockType == -1)
	{
		alert("Lütfen tüm alanları seçiniz.");
		return;
	}
	$.ajax({
		url: flMainScreen_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getMTLockedCustomers&mtId=' + mtId + "&lockType=" + lockType,
		success: function(data)
		{
			if(data.status == "Ok")
			{
				flMainScreen_showMTLockedCustomers(data.lockedCustomers);
			}
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function flMainScreen_showMTLockedCustomers(customers)
{
	var flMainScreen_mtFirmaSonucDiv = document.getElementById("flMainScreen_mtFirmaSonucDiv");
	flMainScreen_mtFirmaSonucDiv.innerHTML = "";
	
	var flMainScreen_musteriSonucHeaderRow = document.createElement("div");
	flMainScreen_musteriSonucHeaderRow.setAttribute("class","flMainScreen_musteriSonucHeaderRow");
	
	var flMainScreen_musteriSonucLockHeader = document.createElement("div");
	flMainScreen_musteriSonucLockHeader.innerHTML = "Durum";
	flMainScreen_musteriSonucLockHeader.setAttribute("class","flMainScreen_musteriSonucLockCell");
	
	var flMainScreen_musteriSonucTitleHeader = document.createElement("div");
	flMainScreen_musteriSonucTitleHeader.innerHTML = "Ünvan";
	flMainScreen_musteriSonucTitleHeader.setAttribute("class","flMainScreen_musteriSonucTitleCell");
	
	var flMainScreen_musteriSonucPhoneNumberHeader = document.createElement("div");
	flMainScreen_musteriSonucPhoneNumberHeader.innerHTML = "Telefon";
	flMainScreen_musteriSonucPhoneNumberHeader.setAttribute("class","flMainScreen_musteriSonucPhoneNumberCell");
	
	var flMainScreen_musteriSonucMailHeader = document.createElement("div");
	flMainScreen_musteriSonucMailHeader.innerHTML = "Mail";
	flMainScreen_musteriSonucMailHeader.setAttribute("class","flMainScreen_musteriSonucMailCell");
	
	var flMainScreen_musteriSonucWebsiteHeader = document.createElement("div");
	flMainScreen_musteriSonucWebsiteHeader.innerHTML = "Website";
	flMainScreen_musteriSonucWebsiteHeader.setAttribute("class","flMainScreen_musteriSonucWebsiteCell");
	
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucLockHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucTitleHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucPhoneNumberHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucMailHeader);
	flMainScreen_musteriSonucHeaderRow.appendChild(flMainScreen_musteriSonucWebsiteHeader);
	
	flMainScreen_mtFirmaSonucDiv.appendChild(flMainScreen_musteriSonucHeaderRow);
	
	for(var i = 0; i < customers.length; i++)
	{
		var flMainScreen_musteriSonucRow = document.createElement("div");
		flMainScreen_musteriSonucRow.setAttribute("class","flMainScreen_musteriSonucRow");
		
		var flMainScreen_musteriSonucLockCell = document.createElement("div");
		var imageHTML = "";
		if(customers[i].locked)
			imageHTML = "<img style='margin-left:5px;' src='core/css/images/Lock.png'>";
		flMainScreen_musteriSonucLockCell.innerHTML = imageHTML;
		flMainScreen_musteriSonucLockCell.setAttribute("class","flMainScreen_musteriSonucLockCell");
		
		var flMainScreen_musteriSonucTitleCell = document.createElement("div");
		flMainScreen_musteriSonucTitleCell.innerHTML = "<span class='flMainScreen_musteriSonucLink' onclick='flMainScreen_getCustomerDetails(" 
			+ customers[i].customerId + ")'>" + customers[i].title + "</span>";
		flMainScreen_musteriSonucTitleCell.setAttribute("class","flMainScreen_musteriSonucTitleCell");
		
		var flMainScreen_musteriSonucPhoneNumberCell = document.createElement("div");
		flMainScreen_musteriSonucPhoneNumberCell.innerHTML = customers[i].phoneNumber;
		flMainScreen_musteriSonucPhoneNumberCell.setAttribute("class","flMainScreen_musteriSonucPhoneNumberCell");
		
		var flMainScreen_musteriSonucMailCell = document.createElement("div");
		flMainScreen_musteriSonucMailCell.innerHTML = '<a href="mailto:' + customers[i].email + '">' + customers[i].email + "</a>";
		flMainScreen_musteriSonucMailCell.setAttribute("class","flMainScreen_musteriSonucMailCell");
		
		var flMainScreen_musteriSonucWebsiteCell = document.createElement("div");
		flMainScreen_musteriSonucWebsiteCell.innerHTML = customers[i].website;
		flMainScreen_musteriSonucWebsiteCell.setAttribute("class","flMainScreen_musteriSonucWebsiteCell");
		
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucLockCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucTitleCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucPhoneNumberCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucMailCell);
		flMainScreen_musteriSonucRow.appendChild(flMainScreen_musteriSonucWebsiteCell);
		
		flMainScreen_mtFirmaSonucDiv.appendChild(flMainScreen_musteriSonucRow);
	}
}
