var app={};app.bounds={},app.navUpdating=!1,app.sections={intro:document.getElementById("intro"),projects:document.getElementById("projects"),about:document.getElementById("about"),contact:document.getElementById("contact")},app.nav=document.getElementById("nav"),app.getBounds=function(){for(var a in app.sections)"object"==typeof app.sections[a]&&(app.bounds[a]=app.sections[a].getBoundingClientRect())},app.updateClass=function(a,b){var c=null,d=a.children.length;for(c=0;d>c;c++)a.children[c].getAttribute("id")==b?a.children[c].setAttribute("class","pure-menu-selected"):a.children[c].setAttribute("class","");return a},app.updateNav=function(){var a=app.nav;a.parentNode.removeChild(a);var b=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop;b+=70,b>=app.bounds.contact.top?a=app.updateClass(a,"navContact"):b>=app.bounds.about.top&&b<app.bounds.contact.top?a=app.updateClass(a,"navAbout"):b>=app.bounds.projects.top&&b<app.bounds.about.top?a=app.updateClass(a,"navProjects"):100>b&&(a=app.updateClass(a,"intro")),document.querySelector("nav").appendChild(a),app.navUpdating=!1},app.parallax=function(a,b,c){var d=document.body.scrollTop/b*-1+c;a.setAttribute("style","top:"+d+"px;")},app.scrollTo=function(a,b){function c(a,b){e>d?a>=d&&(window.scrollTo(0,a),a-=b,setTimeout(function(){c(a,b)},1)):d>=a&&(window.scrollTo(0,a),a+=b,setTimeout(function(){c(a,b)},1))}var d=app.bounds[a].top,e=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop,f=e;console.log(e),c(f,b)},app.init=function(){app.getBounds(),window.addEventListener("scroll",function(){setTimeout(function(){app.navUpdating||(app.navUpdating=!0,app.updateNav())},200)}),app.nav.addEventListener("click",function(a){a.preventDefault(),a.target&&"A"==a.target.nodeName&&app.scrollTo(a.target.getAttribute("href").substring(1),40)})},app.init();