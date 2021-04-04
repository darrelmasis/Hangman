(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _functions = require("./modules/functions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var categories = ['Gente', 'Cuerpo humano y salud']; // Palabras del juego

var words = [// Gente
['humanidad', 'humano', 'persona', 'gente', 'hombre', 'mujer', 'bebé', 'niño', 'niña', 'adolescente', 'adulto', 'adulta', 'anciano', 'anciana', 'don', 'doña', 'señor', 'señora', 'caballero', 'dama'], // Cuerpo humano y salud
['cuerpo', 'pierna', 'pie', 'talón', 'espinilla', 'rodilla', 'muslo', 'cabeza', 'cara', 'boca', 'labio', 'diente', 'ojo', 'nariz', 'barba', 'bigote', 'cabello', 'oreja', 'cerebro', 'estómago', 'brazo', 'codo', 'hombro', 'uña', 'muñeca', 'palma', 'dedo', 'trasero', 'cola', 'glúteos', 'abdomen', 'hígado', 'músculo', 'cuello', 'corazón', 'mente', 'alma', 'espíritu', 'pecho', 'cintura', 'cadera', 'espalda', 'corazón', 'sangre', 'carne', 'piel', 'hueso', 'resfriado', 'gripe', 'diarrea', 'salud', 'enfermedad']];
var GAME = {
  answerArray: []
};
var PLAYER = {
  lives: 6,
  guess: ''
}; // Obtener categoría y palabra secreta aleatoria

var cPosition = (0, _functions.random)(categories);
var wPosition = (0, _functions.random)(words[cPosition]); // Agregar resultados obtenidos al objeto GAME

GAME.category = categories[cPosition];
GAME.secretWord = words[cPosition][wPosition];
var from = ['á', 'é', 'í', 'ó', 'ú', 'ñ'];
var to = ['a', 'e', 'i', 'o', 'u', 'n']; // Reemplazar la palabra secreta por guiones

for (var i = 0; i < GAME.secretWord.length; i++) {
  GAME.answerArray[i] = '_';
}

var canvas = (0, _functions.$)('my-canvas');
var ctx = canvas.getContext('2d');

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "drawLives",
    value:
    /**
     * Dibuja las vidas
     */
    function drawLives() {
      var _loop = function _loop(_i) {
        var heart = new Image();
        heart.src = './dist/img/heart.png';

        heart.onload = function () {
          var x = canvas.width - (PLAYER.lives * heart.width + (PLAYER.lives - 1) * 4) + _i * (heart.width + 4);
          ctx.beginPath();
          ctx.drawImage(heart, x, 0);
          ctx.closePath();
        };
      };

      for (var _i = 0; _i < PLAYER.lives; _i++) {
        _loop(_i);
      }
    }
    /**
     * Dibuja la palabra secreta
     */

  }, {
    key: "drawSecretWord",
    value: function drawSecretWord() {
      for (var _i2 = 0; _i2 < GAME.secretWord.length; _i2++) {
        var element = GAME.secretWord[_i2];
        var x = canvas.width - (GAME.secretWord.length * 24 + (GAME.secretWord.length - 1) * 4) + _i2 * (24 + 4);
        ctx.beginPath();
        ctx.font = "Bold 32px sans-serif";
        ctx.fillText(GAME.answerArray[_i2], x, canvas.height - 6);
        ctx.closePath();
      }
    }
  }]);

  return Game;
}();

var newGame = function newGame() {
  return new Game();
};

newGame();
newGame().drawLives();
newGame().drawSecretWord();

},{"./modules/functions":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.str_replace = exports.$ = exports.random = void 0;

/**
 * Obtiene una posición aleatoria de un array
 * @param {array}
 * @return {int}
 */
var random = function random(array) {
  var position = Math.floor(Math.random() * array.length);
  return position;
};
/**
 * Simplifica el getElementByID al estilo jQuery
 * @param {string} id
 * @return {DOM element}
 */


exports.random = random;

var $ = function $(id) {
  return document.getElementById(id);
};
/**
 * Reemplaza caracteres latinos
 * @param {string}
 * @return {string}
 * @author elchininet <https://xprimiendo.com/str_replace-de-php-en-javascript/>
 */


exports.$ = $;

var str_replace = function str_replace(search, replace, subject) {
  //Conformar la expresión regular a buscar
  var reg; //Si el parámetro search es un String

  if (typeof search == "string") {
    //Escapar los caracteres usados por las expresiones regulares
    search = search.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    reg = new RegExp("(" + search + ")", "g");
  } else {
    //Escapar los caracteres usados por las expresiones regulares
    search = search.map(function (i) {
      return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    });
    reg = new RegExp("(" + search.join("|") + ")", "g");
  } //Conformar el reemplazo


  var rep; //Si el parámetro replace es un String

  if (typeof replace == "string") {
    rep = replace;
  } else {
    //Si el parámetro search es un String y el parámetro replace un Array
    if (typeof search == "string") {
      rep = replace[0]; //Si el parámetro search es un Array y el parámetro replace un Array
    } else {
      rep = function rep(i) {
        return replace[search.indexOf(i)];
      };
    }
  }

  return subject.replace(reg, rep);
};

exports.str_replace = str_replace;

},{}]},{},[1]);

//# sourceMappingURL=scripts.js.map
