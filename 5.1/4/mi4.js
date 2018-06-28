function stringProcessing(result) {
  return result.replace(/\s{2,}/g, ' ').trim();
}

var str = prompt('Входная строка', '');

if (str !== '') {
	alert(stringProcessing(str));
} else {
	alert('Пустая строка');
}