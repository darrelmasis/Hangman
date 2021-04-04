/**
 * Obtiene una posición aleatoria de un array
 * @param {array}
 * @return {int}
 */
const random = array => {
  let position = Math.floor(Math.random() * array.length)
  return position
}

/**
 * Simplifica el getElementByID al estilo jQuery
 * @param {string} id
 * @return {DOM element}
 */
const $ = id => {
  return document.getElementById(id)
}

/**
 * Reemplaza caracteres latinos
 * @param {string}
 * @return {string}
 * @author elchininet <https://xprimiendo.com/str_replace-de-php-en-javascript/>
 */

const str_replace = (search, replace, subject) => {
  //Conformar la expresión regular a buscar
	let reg;

	//Si el parámetro search es un String
	if( typeof(search) == "string" ){
		//Escapar los caracteres usados por las expresiones regulares
		search = search.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
		reg = new RegExp("(" + search + ")", "g");
	}else{
		//Escapar los caracteres usados por las expresiones regulares
		search = search.map(function(i){
			return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
		});
		reg = new RegExp("(" + search.join("|") + ")", "g");
	}
	//Conformar el reemplazo
	var rep;
	//Si el parámetro replace es un String
	if( typeof(replace) == "string" ){
		rep = replace;
	}else{
		//Si el parámetro search es un String y el parámetro replace un Array
		if( typeof(search) == "string" ){
			rep = replace[0];
		//Si el parámetro search es un Array y el parámetro replace un Array
		}else{
			rep = function(i){
				return replace[ search.indexOf(i) ];
			}
		}
	}
	return subject.replace(reg, rep);
}

export {random, $, str_replace}
