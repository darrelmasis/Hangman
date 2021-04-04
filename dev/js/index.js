import {random, $, cleanString, str_replace} from './modules/functions'

const categories = ['Gente','Cuerpo humano y salud'];

// Palabras del juego
const words = [
  // Gente
  ['humanidad','humano','persona','gente','hombre','mujer','bebé','niño','niña','adolescente','adulto','adulta','anciano','anciana','don','doña','señor','señora','caballero','dama'],
  // Cuerpo humano y salud
  ['cuerpo','pierna','pie','talón','espinilla','rodilla','muslo','cabeza','cara','boca','labio','diente','ojo','nariz','barba','bigote','cabello','oreja','cerebro','estómago','brazo','codo','hombro','uña','muñeca','palma','dedo','trasero','cola','glúteos','abdomen','hígado','músculo','cuello','corazón','mente','alma','espíritu','pecho','cintura','cadera','espalda','corazón','sangre','carne','piel','hueso','resfriado','gripe','diarrea','salud','enfermedad']
]

const GAME = {
  answerArray: []
}

const PLAYER = {
  lives: 6,
  guess: ''
}

// Obtener categoría y palabra secreta aleatoria

let cPosition = random(categories)
let wPosition = random(words[cPosition])

// Agregar resultados obtenidos al objeto GAME
GAME.category = categories[cPosition]
GAME.secretWord = words[cPosition][wPosition]


let from = ['á','é','í','ó','ú','ñ']
let to = ['a','e','i','o','u','n']

// Reemplazar la palabra secreta por guiones
for (let i = 0; i < GAME.secretWord.length; i++) {
  const element = GAME.secretWord[i]
  element = '_'
}

const canvas = $('my-canvas')
const ctx = canvas.getContext('2d')

class Game {

}

