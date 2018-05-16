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

$('.menu a').click(function(){
	var element = $(this).attr('href');
	var dist = $(element).offset().top;

	$('html, body').animate({'scrollTop': dist}, 1000); 

	return false;
});

$(document).ready(function() { // надо прибавить 50px что бы не наезжало на заголовок
 
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

});

//$(document).ready(function(){
//    $(window).scroll(function(){
//        var bo = $("body").scrollTop();
//        $('#hid').text(bo);
//        if ( bo > 200 ) { $("#hid").css("display", "block"); } else { $("#hid").css("display", "none"); };
//    })
//})

//jQuery(function(f){
//    var element = f('#back-top');
//    f(window).scroll(function(){
//        element['fade'+ (f(this).scrollTop() > 200 ? 'In': 'Out')](500);           
//    });
//});