Revealator.scroll_padding = '300';  //-300, 300, -500...
Revealator.effects_padding = '-500';

function showMore() {
  var button = document.getElementById('js_serials_button');
  var films_block = document.getElementById('js_serials_content');
 
	button.addEventListener('click', function(event) {
		event.preventDefault();
		button.classList.add('display_none');
		films_block.classList.add('visible');
	});
}

function checkFormFields() { 
  var fields = document.getElementsByClassName('required_field');
  var button = document.getElementById('form_button');

	function getEmptyFields(elements, length) {
	  var isEmpty = false;

		for (var i = 0; i < length; ++i) {
			if (elements[i].value === '') {
				isEmpty = true;
				elements[i].classList.add('empty');
			}
		}

		return isEmpty;
	}

	function removeClass() {
		for (var i = 0; i < fields.length; ++i) {
			fields[i].addEventListener('focus', function() {
				this.classList.remove('empty');
			});
		}

		return;
	}

	button.addEventListener('click', function(event) {
	  var fieldsLength = fields.length;
	  var haveEmptyFields = getEmptyFields(fields, fieldsLength);	

		if (haveEmptyFields) {
			event.preventDefault();
		}
	});

	removeClass();
}

window.onload = function() {
	showMore();
	popup();
}

function popup() {
  var link = document.getElementById('link_popup');	
  var containerForm = document.getElementById('js_container_form');
  var body = document.getElementsByTagName('body')[0];
  var closeButton = document.getElementById('form_close_button');

    link.addEventListener('click', function(event) {
	    event.preventDefault();

		var widthWithoutScroll = document.documentElement.clientWidth;
		var widthWithScroll = window.innerWidth;

		containerForm.classList.add('visible');
		if (widthWithoutScroll < widthWithScroll) {
			body.classList.add('body_padding_right');
		}
		body.classList.add('body_overflow_hidden');
	});

	checkFormFields();

	window.addEventListener('click', function(event) {
		if (event.target === containerForm) {
			containerForm.classList.remove('visible');
			body.classList.remove('body_padding_right');
			body.classList.remove('body_overflow_hidden');
		}
	});

	closeButton.addEventListener('click', function(event) {
		containerForm.classList.remove('visible');
		body.classList.remove('body_padding_right');
		body.classList.remove('body_overflow_hidden');
	});
}

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
/*
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
}*/

$(document).ready(function() {

	$('body').smoothScroll({
	delegateSelector: 'nav.navigation a'
	});

	$('p.subnav a').click(function(event) { //????
	event.preventDefault();
	var link = this;
	$.smoothScroll({
	  scrollTarget: link.hash
	});
	});

	$('#change-speed').bind('click', function() {
	var $p1 = $('nav.navigation a').first();
	var p1Opts = $p1.smoothScroll('options') || {};

	p1Opts.speed = p1Opts.speed === 1400 ? 400 : 1400;
	$p1.smoothScroll('options', p1Opts);
	});
});