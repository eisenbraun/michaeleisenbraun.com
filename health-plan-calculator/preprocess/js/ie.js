$(document).ready(function() { 
	$.each($('fieldset'), function() { 
		$('.input-group:even', $(this)).css('background','#EEF7FD');  
	});
	
	$('tbody tr:even').css('background', '#f9f9f9'); 
}); 