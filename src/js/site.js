$(document).ready(function(){
    var intro = document.getElementById('intro').getBoundingClientRect();
    var projects = document.getElementById('projects').getBoundingClientRect();
    var profile = document.getElementById('profile').getBoundingClientRect();
    var contact = document.getElementById('contact').getBoundingClientRect();

    $(window).scroll(function() {
        if($(window).scrollTop() >= contact.top - 50) {
            $('#nav').attr('class', 'gray');
        } else if($(window).scrollTop() >= profile.top) {
             $('#nav').attr('class', 'blue blue-bg');
        } else if($(window).scrollTop() >= profile.top - 50) {
            $('#nav').attr('class', 'blue');
        } else if($(window).scrollTop() >= projects.top) {
            $('#nav').attr('class', 'white white-bg');
        } else if($(window).scrollTop() >= projects.top - 50) {
            $('#nav').attr('class', 'white');
        } else if($(window).scrollTop() <= projects.top - 50) {
            $('#nav').attr('class', 'red');
        }
    });

    $('section[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object
        var top = $('article', $bgobj).css('top');

        $(window).scroll(function() {
            var article = 300 - ($(window).scrollTop() / 3);
            var aside = 300 - ($(window).scrollTop() / 4);
             
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            $('h1', $bgobj).css({'top': article + 'px'});
            $('aside', $bgobj).css({'top': aside + 'px'});
            // Move the background
            //$bgobj.css({ 'background-position': coords });
        }); 
    }); 

    
    
}); 