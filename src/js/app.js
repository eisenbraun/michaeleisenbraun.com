var app = angular.module('me', ['me.controllers']);

/** PAGE SECTIONS */
var sections = {};
sections.intro = document.getElementById('intro');
sections.projects = document.getElementById('projects');
sections.about = document.getElementById('about');
sections.contact = document.getElementById('contact');

/** SECTIONS METHODS */
sections.getBounds = function(obj) {
    return obj.getBoundingClientRect();
}


