var string = 'Some             string with symbols';
var stringLength = string.length;

function getLastCharacter(result, length) {
  return result[length - 1];
}

function getStringWithoutLastCharacter(result, length) {
  return result.substr(0, length - 1);
}

function toReverse(result) {
  return result.split('').reverse().join('');
}

function getStringWithoutExtraWhitespaces(result) {
  var array = result.split(' ');

  array = array.filter(function(item) {
  	return item !== '';
  });

  result = array.join(' ');

  return result;
}

if (string !== '') {
	//alert(getLastCharacter(string));
	//alert(getStringWithoutLastCharacter(string));
	console.log('String is: ', string);
	console.log('Get last symbol: ', getLastCharacter(string, stringLength));
	console.log('Get without last symbol: ', getStringWithoutLastCharacter(string, stringLength));
	console.log('Reversed string: ', toReverse(string));
	console.log('String without extra whitespaces: ', getStringWithoutExtraWhitespaces(string));
} else {
	//alert('Пустая строка');
	console.log('Пустая строка');
}
