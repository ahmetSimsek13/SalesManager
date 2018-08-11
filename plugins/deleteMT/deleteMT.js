$(deleteMT_init);

var deleteMT_coreURL = 'plugins/deleteMT/deleteMT_core.php';
var deleteMT_mtSelect;
var deleteMT_accessLevelSelect;

function deleteMT_init()
{
	deleteMT_mtSelect = document.getElementById("deleteMT_mtSelect");
	
	$("#deleteMT_mtSelect").selectmenu({maxHeight: 100});
	$("#deleteMT_submitButton").button();
	
	deleteMT_getMts();
}

function deleteMT_getMts()
{
	$.ajax({
		url: deleteMT_coreURL,
		dataType: 'json',
		type: 'GET',
		data: 'op=getMts',
		success: function(data)
		{
			deleteMT_setSelectContents(data);
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

function deleteMT_setSelectContents(data)
{	
	deleteMT_mtSelect.innerHTML = "";
	
	var newOption = document.createElement("option");
	newOption.setAttribute("value", -1);
	newOption.innerHTML = "Seçiniz";
	deleteMT_mtSelect.appendChild(newOption);

	for(var i = 0; i < data.mts.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.setAttribute("value", data.mts[i].userId);
		newOption.innerHTML = data.mts[i].mtName;
		deleteMT_mtSelect.appendChild(newOption);
	}
	$("#deleteMT_mtSelect").selectmenu({maxHeight: 100});
}

function deleteMT_setInputsToDefaults()
{
	$("#deleteMT_mtSelect").selectmenu("value","-1");
}

function deleteMT_openPopup()
{
	deleteMT_setInputsToDefaults();
	corePopupPlugin("deleteMT",{});
}

function deleteMT_deleteRecord()
{
	var userId = $("#deleteMT_mtSelect").selectmenu("value");
	if(userId == -1)
	{
		alert("Lütfen bir MT seçiniz.");
		return;
	}
	
	if(confirm("Bu müşteri temsilcisini silmek istediğinize emin misiniz?"))
	{	
		$.ajax({
			url: deleteMT_coreURL + "?op=deleteRecord&userId=" + encodeURIComponent(userId),
			dataType: 'json',
			type: 'POST',
			success: function(data)
			{
				if(data.status == "Ok")
				{
					document.getElementById("deleteMT_ozetDiv").innerHTML = "Müşteri temsilcisi başarıyla silinmiştir. Portföyünü <a target='_blank' " + 
						" href='getCustomerPortfolioAsExcel.php?userId=" + userId + "'>buradan</a> indirebilirsiniz.";
					deleteMT_getMts();
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	}
}