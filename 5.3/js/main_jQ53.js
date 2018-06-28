Revealator.effects_padding = '-500';

$('.slow_scroll').smoothScroll()

$('.menuToggle').click(function(){
    var some = $('.menuToggle');
    var some1 = $('.menuToggle_1');
    some1.removeClass('menuToggle_1').addClass('menuToggle');
    some.removeClass('menuToggle').addClass('menuToggle_1');
})

$(window).on('load', function() {
    openModalWindowAddFilmsClicked();
    closeModalWindowAddFilmsClicked();
    validateFormAddFilms();
    openTopMenu();
});

function openTopMenu() {
    $('.menuToggle').click(function() {
        $('.menu').toggleClass('open');
    })
}

function openModalWindowAddFilmsClicked() {
    var modalFilms = $('#modal_add_films');
    var body = $('body');
    
    $('#add_films_new').click(function() {
        //$('#modal_add_films').show();
        modalFilms.css('display', 'block');
        body.css('overflowY', 'hidden');
    })
}

function closeModalWindowAddFilmsClicked() {
    var modalFilms = $('#modal_add_films');
    var body = $('body');
    
    $('#close_film_modal').click(function() {
        modalFilms.css('display', 'none');
        body.css('overflowY', 'auto');
    })

    $(window).on('click', function(event) {
        if ($(event.target).hasClass('style_modal_add_films')) {
            //$('#modal_add_films').hide();
            modalFilms.css('display', 'none');
            body.css('overflowY', 'auto');
        }
    })
}

function validateFormAddFilms(){
    var formFilm = document.getElementById('formForAddFilms');
    formFilm.addEventListener('submit', validateFilms);

    function validateFilms(){
        var error = false;

        var requiredFields = $('.required_field_films');
        for (var i = 0; i < requiredFields.length; i++) {
            var field = $(requiredFields[i]);
            if (!field.val()) {
                field.addClass('error');
                error = true;
            }
        }

        event.preventDefault();
        if (error) {
            console.log('Form has errors');
        }
        else {
            console.log('Form submitted');
            
            $('#modal_add_films').css('display', 'none');
            $('body').css('overflowY', 'auto');
        
            var newLogoFilm = '<img src="' + $('#urlPicture').val() + '" class="serial_logo revealator-fadein revealator-slideup revealator-once" id="serialLogoNewFilm">';
            var newNameFilm = '<h3 class="name_serial revealator-fadein revealator-slideup revealator-once">' + $('#nameFilms').val() + '</h3>';
            var newDescriptionFilm = '<p class="about_serial revealator-fadein revealator-slideup revealator-once">' + $('#descriptionFilms').val() + '</p>';

            $('#films').append('<div class="container_serial_info_block">' + newLogoFilm + newNameFilm + newDescriptionFilm + '</div>');
        }
    }

    var requiredFieldsFilms = document.getElementsByClassName('required_field_films');
    for (var i = 0; i < requiredFieldsFilms.length; i++) {
        requiredFieldsFilms[i].addEventListener('click', function() {
            this.classList.remove('error');
        });
    }
}