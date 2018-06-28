function stringProcessing(result) {
    var stringLength = result.length;

    if (stringLength === 1) {
    	return ''
    } else {
    	return result.substr(0, stringLength - 1);
    }
}

var str = prompt('Входная строка', '');

if (str !== '') {
	alert(stringProcessing(str));
} else {
	alert('Пустая строка');
}