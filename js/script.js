
var map;
$(function() {
    $(document).ready( function() {
		map = new GMaps({
		el: '#map',
		lat: -12.043333,
		lng: -77.028333
		});


		$("#buttonMap").click(function (){
			GMaps.geocode({
					address: $("#villebox").val() +', ' +$("#code").val(),
					callback: function(results, status) {
	    			if (status == 'OK') {
						var latlng = results[0].geometry.location;
						map.setCenter(latlng.lat(), latlng.lng());
						map.addMarker({
							lat: latlng.lat(),
							lng: latlng.lng()
						});
					}
				}
			});
		});

		$("#valdider").click(function (){
			var zip_in = $("#code");
			
			
			if(zip_in.val().length == 5) 
			{
				
				$.ajax({
					url: "http://api.zippopotam.us/fr/" + zip_in.val(),
					cache: false,
					dataType: "json",
					type: "GET",
				    success: function(result, success) {

						$('#ville').removeAttr('disabled');
						
						suggestions = "";
						for ( i in result['places']){
							suggestions += '<option value="'+result['places'][i]['place name']+'" >'+result['places'][i]['place name']+'</option>';
						}
						$("#villebox").html(suggestions);
						
					}
				});
			}

		});

		$('#villebox').html("");
	});	
});
