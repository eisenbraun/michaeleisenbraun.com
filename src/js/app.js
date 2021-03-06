var app = { 
    menuLink: document.getElementById('menuLink'), 
    menuList: document.getElementById('menuList')
}; 

app.toggleMenu = function() { 
    app.menuList.classList.toggle('menu-list-open');
};

app.init = function() { 
    app.menuLink.addEventListener('click', app.toggleMenu);
    app.menuList.addEventListener('click', app.toggleMenu, true);
};

app.init();