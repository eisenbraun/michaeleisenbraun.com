var app = {}; 


/** Initializing Variables */ 
app.bounds = {};
app.navUpdating = false;

/** Setting Page Sections */
app.sections = {
    intro: document.getElementById('intro'),
    projects: document.getElementById('projects'),
    about: document.getElementById('about'),
    contact: document.getElementById('contact'),
};

/** Retrieving Nav from DOM */
app.nav = document.getElementById('nav');

/** SETTING APPLICATION FUNCTIONS */ 

/** Retrieve the rectangular bounds of the element */
app.getBounds = function(element) {
    for(var section in app.sections) { 
        if(typeof app.sections[section] === 'object') {
            app.bounds[section] = app.sections[section].getBoundingClientRect();
        }
    }
};


/** Updates the class of the nav elements */ 
app.updateClass = function(nav, selected) { 
    var i = null, 
    length = nav.children.length;
    for(i = 0; i < length; i++) { 
       if(nav.children[i].getAttribute('id') == selected) { 
            nav.children[i].setAttribute('class', 'pure-menu-selected');
       } else { 
            nav.children[i].setAttribute('class', '');
       }
    }

    return nav; 
};

/** Updates the nav and adds it to the DOM */
app.updateNav = function() {
    var nav = app.nav;
    
    nav.parentNode.removeChild(nav);

    var top = window.scrollY +70; 

    if(top >= app.bounds.contact.top) {
        nav = app.updateClass(nav, 'navContact');
    } else if(top >= app.bounds.about.top && top < app.bounds.contact.top) {
        nav = app.updateClass(nav, 'navAbout');
    } else if(top >= app.bounds.projects.top && top < app.bounds.about.top) {
        nav = app.updateClass(nav, 'navProjects');
    } else if(top < 100) { 
        nav = app.updateClass(nav, 'intro');
    }

    document.querySelector('nav').appendChild(nav);
    app.navUpdating = false;
};

/** Moves element a speed relative to Scroll */
app.parallax = function(element, speed, offset) { 
    var top = (window.scrollY/speed * -1) + offset;

    element.setAttribute('style', 'top:'+top+
        'px'); 
};


app.init = function() { 
    app.getBounds();

    window.addEventListener("scroll", function() {
        setTimeout(function() { 
            if(!app.navUpdating) { 
                app.navUpdating = true;
                app.updateNav();
            }
        }, 200);

        app.parallax(document.getElementById('splash'), 3, 100);
    });
};


app.init(); 





