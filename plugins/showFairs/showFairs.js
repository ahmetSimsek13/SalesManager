$(showFairs_init);

var showFairs_coreURL = 'plugins/showFairs/showFairs_core.php';

function showFairs_init()
{
}

function showFairs_getFairs()
{
	$.ajax({
		url: showFairs_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairs',
		success: function(data)
		{
			showFairs_showFairs(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function showFairs_showFairs(data)
{
	var fairListHtml = "";
	for(var i = 0; i < data.fairs.length ; i++)
		fairListHtml += '<li class="ui-widget-content" fairId="' + data.fairs[i].fairId + '">' +  data.fairs[i].name + '</li>';
		
	var showFairs_fairsList = document.getElementById("showFairs_fairsList");
	showFairs_fairsList.innerHTML = fairListHtml;
	
	$('#showFairs_fairsList').selectable({
		stop: function(event, ui){
			$(event.target).children('.ui-selected').not(':first').removeClass('ui-selected');
		},
		selected: function( event, ui ) {
			$('#showFairs_fairsList .ui-selected').each(function(index, element) {
					
				var selectedFair = $(element).attr('fairId');
				showFairs_getFairDetails(selectedFair);
			});
		}
	});
}

function showFairs_openPopup()
{
	var showFairs_labelsContainer = document.getElementById("showFairs_labelsContainer");
	showFairs_labelsContainer.innerHTML = "";
	
	var showFairs_fairsList = document.getElementById("showFairs_fairsList");
	showFairs_fairsList.innerHTML = "";
	
	showFairs_getFairs();
	
	corePopupPlugin("showFairs",{});
}

function showFairs_getFairDetails(fairId)
{
	$.ajax({
		url: showFairs_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getFairDetails&id=' + fairId,
		success: function(data)
		{
			showFairs_showFairDetails(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function showFairs_showFairDetails(data)
{
	var showFairs_labelsContainer = document.getElementById("showFairs_labelsContainer");
	showFairs_labelsContainer.innerHTML = 
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Fuar Adı:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_fairNameInput">' + data.fairName + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Fuar Başlangıç Tarihi:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_fairStartDateInput">' + data.startDate + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Fuar Bitiş Tarihi:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_fairEndDateInput">' + data.endDate + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Ülke:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_countryInput">' + data.country + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Şehir:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_cityInput">' + data.city + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Tür:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_fairTypeInput">' + data.type + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Sektör:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_sectorInput">' + data.sector + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Satış Fiyatı:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_fairPriceInput">' + data.price + ' &#8364;</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' +
			'<label class="showFairs_label">Proje Sorumlusu:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_fairKeeperInput">' + data.fkName + '</label>' +
		'</div>' +
		'<div class="showFairs_labelDiv">' + 
			'<label class="showFairs_label">Müşteri Hizmetleri Sorumlusu:</label>' +
			'<label class="showFairs_fieldLabel" id="showFairs_customerRepresentativeInput">' + data.customerRepresentative + '</label>' +
		'</div>';
}