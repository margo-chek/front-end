function stringProcessing(result) {
  return result.split('').reverse().join('');
}

var str = prompt('Входная строка', '');

if (str !== '') {
	alert(stringProcessing(str));
} else {
	alert('Пустая строка');
}