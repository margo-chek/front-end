//Revealator.scroll_padding = '300';  //-300, 300, -500...
Revealator.effects_padding = '-500';

$('.slow_scroll').smoothScroll()

/*$('.menu a').click(function(){
	var element = $(this).attr('href');
	var dist = $(element).offset().top;
	var topMenuHit = 50;

	$('html, body').animate({'scrollTop': dist-topMenuHit}, 1000); 

	return false;
});*/

/*$(document).ready(function() { 

	var navPos, winPos, navHeight;
	  
	function refreshVar() {
	  navPos = $('nav').offset().top;
	  navHeight = $('nav').outerHeight(true);
	}

	refreshVar();
	$(window).resize(refreshVar);
	  
		$(window).scroll(function() {
		  winPos = $(window).scrollTop();
		});
});*/

/*$(window).scroll(function() {
    ;('selection[id]').each(function() {
   	var id = $(this).attr('id');
    	if($(this).offset().top-100 < $(window).scrollTop()){
    		$('.menu a[href=#'+id+']').addClass('active').sibLings().removeClass('active'); //необходимо прописать класс active(овечает за подсвечивание нужного элемента)//
    	}

    	if($(window).scrollTop() < 50) {
    		$('.menu a').removeClass('active');
    	}
    });
});*/

$(window).on('load', onWindowLoaded);

function onWindowLoaded() { //на загруженном окне
    tryToListenByJQuery('#hamburger_menu_button', 'click', toggleHamburgerMenu); //переключатель
}


function tryToGet(selector) {  //попытаться Добраться
    if (doesExist(selector)) {
        return $(selector);
    }
}

function toggleHamburgerMenu() {  //переключение Меню Гамбургера
    var hamburger = tryToGet('#hamburger');
    var button = tryToGet('#hamburger_menu_button');
    var menu = tryToGet('[data-hamburger-menu]');
    var body = tryToGet('body');
    var menuItem = menu.find('.link');
    var bodyScrollBlockClass = 'body_scroll_block';
    var activeClass = 'is-active';

    if (hamburger && button && menu) {
        button.toggleClass(activeClass);
        hamburger.toggleClass(activeClass);
        menu.toggleClass(activeClass);
        body.toggleClass(bodyScrollBlockClass);
        menuItem ? closeByClickOnMenuItem(menuItem, hamburger, button, menu, body, activeClass, bodyScrollBlockClass) : null;
    }
}

function closeByClickOnMenuItem(menuItem, hamburger, button, menu, body, activeClass, bodyScrollBlockClass) {//закрывать меню по клику
    menuItem.on('click', function() {
        button.removeClass(activeClass);
        hamburger.removeClass(activeClass);
        menu.removeClass(activeClass);
        body.removeClass(bodyScrollBlockClass);
    });
}

function configureScrollToNewBlock(indicator, block) {
    $(indicator).smoothScroll({
        speed: 1500,
        scrollTarget: block
    });
}

function painlessScroll() {
    var button = tryToGet('.smooth_scroll');
    if (button) {
        button.smoothScroll({
            speed: 1500,
            beforeScroll: function(options) {
                getScrollOffset(options);
            }
        });
    }
}