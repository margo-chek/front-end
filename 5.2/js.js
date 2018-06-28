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

	function removeClass(elements, length) {
		for (var i = 0; i < length; ++i) {
			elements[i].addEventListener('focus', function() {
				this.classList.remove('empty');
			});
		}
	}

	button.addEventListener('click', function(event) {
		var fieldsArrayLength = fields.length;
		var haveEmptyFields = getEmptyFields(fields, fieldsArrayLength);	

		if (haveEmptyFields) {
			event.preventDefault();
		}

		removeClass(fields, fieldsArrayLength);
	});
}

window.onload = function() {
	showMore();
	checkFormFields();
}