//@codekit-prepend "jquery.min.js";

var pages = [
	{text:'Home', href:'/', disabled:false},
	{text:'Guardian', href:'/guardian/', disabled:false},
	{text:'Columns', href:'/columns/', disabled:false},
	{text:'NüTip', href:'/nutip/', disabled:false},
	//{text:'Muse', href:'/muse/', disabled:true},
	//{text:'Lapsus', href:'/lapsus/', disabled:true}
];

//building the nav
console.log(window.location.href);
var url = window.location.href.substring(window.location.href.indexOf('/', 7));
var nav = '<ul>';

$.each(pages, function(key, page) {
	nav += '<li><a href="'+page.href+'"';
	
	if(page.href == url) { 
		nav += 'class="active"'; 
	} else if(page.disabled) { 
		nav += 'class="disabled"';
	}
	
	nav += '>'+page.text+'</a></li>'; 
});
nav += '</ul>'

$('nav').html(nav); 
