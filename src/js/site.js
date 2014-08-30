$(document).ready(function(){
    var projects = document.getElementById('projects').getBoundingClientRect();
    var profile = document.getElementById('profile').getBoundingClientRect();

    $(window).scroll(function() {
        if($(window).scrollTop() >= profile.top) { 
            $('#nav').attr('class', 'blue');
        } else if($(window).scrollTop() >= projects.top) { 
            $('#nav').attr('class', 'white');
        } else { 
            $('#nav').attr('class', 'red');
        }


    });

    $('section[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object
        var top = $('article', $bgobj).css('top');

        $(window).scroll(function() {
            var yPos = 200 - ($(window).scrollTop() / $bgobj.data('speed')); 
             
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            $('article', $bgobj).css({'top': yPos + 'px'});
 
            // Move the background
            //$bgobj.css({ 'background-position': coords });
        }); 
    }); 

    
    
}); 