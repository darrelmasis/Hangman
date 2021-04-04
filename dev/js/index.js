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
  GAME.answerArray[i] = '_'
}

const canvas = $('my-canvas')
const ctx = canvas.getContext('2d')

class Game {

  /**
   * Dibuja las vidas
   */
  drawLives() {
    for (let i = 0; i < PLAYER.lives; i++) {
      const heart = new Image()
      heart.src = './dist/img/heart.png'
      heart.onload = () => {
        let x = (canvas.width - ((PLAYER.lives * heart.width) + ((PLAYER.lives - 1) * 4))) + (i * (heart.width + 4))
        ctx.beginPath()
        ctx.drawImage(heart, x, 0)
        ctx.closePath()
      }
    }
  }

  /**
   * Dibuja la palabra secreta
   */
  drawSecretWord() {
    for (let i = 0; i < GAME.secretWord.length; i++) {
      const element = GAME.secretWord[i];
      let x = (canvas.width - ((GAME.secretWord.length * 24) + ((GAME.secretWord.length - 1) * 4))) + (i * (24 + 4))
      ctx.beginPath()
      ctx.font = "Bold 32px sans-serif"
      ctx.fillText(GAME.answerArray[i], x, canvas.height - 6)
      ctx.closePath()
    }
  }
}

const newGame = () => {
  return new Game()
}

newGame()
newGame().drawLives()
newGame().drawSecretWord()
