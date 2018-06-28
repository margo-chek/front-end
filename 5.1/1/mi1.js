function stringProcessing(result) {
  return result.slice(-1);
}

var str = prompt('Входная строка', '');

if (str !== '') {
	alert(stringProcessing(str));
} else {
	alert('Пустая строка');
}
