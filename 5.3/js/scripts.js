Revealator.scroll_padding = '300';
Revealator.effects_padding = '-100';

$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    tryToListenByJQuery('#films_button', 'click', showMore);
    tryToListenByJQuery('#feedback_button', 'click', openForm);
    tryToListenByJQuery('#film_add_button', 'click', openFilmAddForm);
    tryToListenByJQuery('#hamburger_menu_button', 'click', toggleHamburgerMenu);
    $(window).scroll(revealatorAdapter);
    painlessScroll();
}

function tryToListenByJQuery(selector, eventName, newFunction) {
    if (doesExist(selector)) {
        $(selector).on(eventName, newFunction);
    }
}

function tryToGet(selector) {
    if (doesExist(selector)) {
        return $(selector);
    }
}

function doesExist(selector) {
    return $(selector).is(selector);
}

function showMore(event) {
    var filmsButton = tryToGet('#films_button');
    var blockToShow = tryToGet('#js_film_cards');
    event.preventDefault();
    filmsButton.fadeOut(500);
    blockToShow.fadeIn(500);
}

function openForm() {
    var body = $('body');
    var container = tryToGet('#form_container');
    var formSelector = '#form';
    event.preventDefault();

    toggleForm(formSelector, body, container);
    tryToListenByJQuery(formSelector, 'submit', checkForEmptyFields);
}

function openFilmAddForm() {
    var body = $('body');
    var container = tryToGet('#film_form_container');
    var formSelector = '#film_form';
    event.preventDefault();

    toggleForm(formSelector, body, container);
    tryToListenByJQuery(formSelector, 'submit', checkForEmptyFields);
    //tryToListenByJQuery(formSelector, 'submit', addFilmBlocks);
}

function toggleForm(formSelector, body, container) {
    if (container && doesExist(formSelector)) {
        toOpen(body, container, formSelector);
        toClose(body, container);
    }
}

function toOpen(body, container, formSelector) {
    var isThereScrollbar = doesScrollBarExist();

    container.fadeIn(300);
    $(formSelector).addClass('opened');
    body.addClass('body_scroll_block');
    if (isThereScrollbar) {
        body.addClass('body_padding_right');
    }
}

function doesScrollBarExist() {
    var screenWidthWithScroll = $(window).width();
    var screenWidthWithoutScroll = $(window).outerWidth();
    return screenWidthWithoutScroll > screenWidthWithScroll;
}

function checkForEmptyFields(event) {
    var indicatorSelector = '.form_indicator';
    var EMPTY_FIELDS_INDICATOR_TEMPLATE = 'Заполните пустые поля';

    var doHaveEmptyFields = function(fields) {
        var isEmpty = false;

        fields.each(function() {
            if ($(this).val() === '') {
                isEmpty = true;
                $(this).addClass('empty');
            }
        });

        return isEmpty;
    };

    var restoreFields = function(fields) {
        fields.focus(function() {
            $(this).removeClass('empty');
        });
    };

    var requiredFields = tryToGet('.opened > .required_field');

    if (doHaveEmptyFields(requiredFields)) {
        event.preventDefault();
        if (doesExist(indicatorSelector)) {
            $(indicatorSelector).addClass('error').text(EMPTY_FIELDS_INDICATOR_TEMPLATE).fadeIn(1000, function() {
                $(this).fadeOut(10000);
            });
        }
        restoreFields(requiredFields);
    }
}

/*function addFilmBlocks() {
    var requiredFields = tryToGet('.opened > .required_field');
    if (!requiredFields.hasClass('empty')) {
        event.preventDefault()
        var body = $('body');
        var container = tryToGet('#film_form_container');
        container.removeClass('display_block');
        body.removeClass('body_scroll_block');
        body.removeClass('body_padding_right');
    }
}*/

function toClose(body, container) {
    var closeSelector = '[data-close-form-button]';
    closeByClickOutOfForm(body, container);
    closeByClickOnCloseButton(closeSelector, body, container);
}

function closeByClickOutOfForm(body, container) {
    $(window).on('click', function(event) {
        if (event.target === container.get(0)) {
            container.fadeOut(300);
            body.removeClass('body_scroll_block');
            body.removeClass('body_padding_right');
        }
    });
}

function closeByClickOnCloseButton(closeSelector, body, container) {
    if (doesExist(closeSelector)) {
        $(closeSelector).on('click', function() {
            container.fadeOut(300);
            body.removeClass('body_scroll_block');
            body.removeClass('body_padding_right');
        });
    }
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

function getScrollOffset(options) {
    var target = $(options.scrollTarget);
    if (target.css('opacity') === '0') {
        options.offset = -100;
    }
}

function revealatorAdapter() {
    var revealIndicatorClass = '.revealator-within';

    $(window).outerWidth() > 775 ? filmCardsAdapt(revealIndicatorClass) : null;
    $(window).outerWidth() >= 1220 ? revealatorSettingsAdapt(revealIndicatorClass) : Revealator.effects_padding = '-300';
}

function filmCardsAdapt(indicatorClass) {
    var toRevealSelector = '.film_cards .card p.card_description';
    var adaptiveClassToDelete = 'revealator_card_height';

    if (doesExist(toRevealSelector)) {
        var blockToReveal = $(toRevealSelector);
        if (blockToReveal.hasClass(indicatorClass.substr(1))) {
            $(toRevealSelector + indicatorClass).removeClass(adaptiveClassToDelete);
        }
    }
}

function revealatorSettingsAdapt(indicatorClass) {
    var revealatorStageIndicatorSelector = '#revealator_indicator';

    if (doesExist(revealatorStageIndicatorSelector)) {
        var revealIndicatorBlock = $(revealatorStageIndicatorSelector);
        if (revealIndicatorBlock.hasClass(indicatorClass.substr(1))) {
            Revealator.effects_padding = '-300';
        }
    }
}

function toggleHamburgerMenu() {
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

function closeByClickOnMenuItem(menuItem, hamburger, button, menu, body, activeClass, bodyScrollBlockClass) {
    menuItem.on('click', function() {
        button.removeClass(activeClass);
        hamburger.removeClass(activeClass);
        menu.removeClass(activeClass);
        body.removeClass(bodyScrollBlockClass);
    });
}