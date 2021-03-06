import {random, $, cleanString, str_replace} from './modules/functions'

const categories = ['Gente','Cuerpo humano y salud']
const gameKeys = $('game-keys')
const keys = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L','Ñ'],
  ['Z','X','C','V','B','N','M']
];

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
  guess: '',
  guessStatus: true,
  attemps: 0
}

// Obtener categoría y palabra secreta aleatoria

let cPosition = random(categories)
let wPosition = random(words[cPosition])

// Agregar resultados obtenidos al objeto GAME
GAME.category = categories[cPosition]
GAME.secretWord = words[cPosition][wPosition].toUpperCase()


let from = ['Á','É','Í','Ó','Ú']
let to = ['A','E','I','O','U']

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
    ctx.clearRect(canvas.width - 116,0,116,16)
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
    ctx.clearRect(0,canvas.height-40,canvas.width,40)
    GAME.secretWord.includes(PLAYER.guess) ? PLAYER.guessStatus = true : PLAYER.guessStatus = false
    for (let i = 0; i < GAME.secretWord.length; i++) {
      const element = GAME.secretWord[i];
      if(str_replace(from,to,element) === PLAYER.guess) {
        PLAYER.guessStatus = true
        GAME.answerArray[i] = element
      }
      let x = (canvas.width - ((GAME.secretWord.length * 24) + ((GAME.secretWord.length - 1) * 4))) + (i * (24 + 4))
      ctx.beginPath()
      ctx.font = "32px calibri"
      ctx.fillText(GAME.answerArray[i], x, canvas.height - 6)
      ctx.closePath()
    }
  }

  drawKeys() {
    for (let rows = 0; rows < keys.length; rows++) {
      const row = keys[rows];
      let rowSection = document.createElement('section')
      let rowId = rows + 1
      rowSection.setAttribute('id','row-' + rowId)
      rowSection.classList.add('keys-section')
      gameKeys.appendChild(rowSection)
      const section = $('row-' + rowId)

      for (let i = 0; i < row.length; i++) {
        const rowElement = row[i];
        let button = document.createElement('button')
        button.classList.add('key')
        button.setAttribute('data-key',rowElement)
        button.textContent = row[i]
        section.appendChild(button)
      }
    }
  }

  gameOver() {
    if (PLAYER.lives === 0) {
      ctx.beginPath()
      ctx.font = "Bold 40px calibri"
      let text = "¡Has perdido!"
      let text2 = "La palabra secreta era "+ GAME.secretWord
      ctx.fillText(text,(canvas.width/2)-ctx.measureText(text).width/2, canvas.height/2)
      ctx.font = "Bold 28px calibri"
      ctx.fillText(text2,(canvas.width/2)-ctx.measureText(text2).width/2, (canvas.height/2) + 40)
      ctx.closePath()
    } else {
      ctx.beginPath()
      let text = "¡Enhorabuena!"
      let text2 = "Lo has conseguido en " + PLAYER.attemps + " intentos"
      ctx.font = "Bold 40px calibri"
      ctx.fillText(text,(canvas.width/2)-ctx.measureText(text).width/2, canvas.height/2)
      ctx.font = "Bold 28px calibri"
      ctx.fillText(text2,(canvas.width/2)-ctx.measureText(text2).width/2, (canvas.height/2) + 40)
      ctx.closePath()
    }
  }

}

gameKeys.addEventListener('click', e => {
  let key = e.target
  if (key.tagName === 'BUTTON') {
    key.classList.add('pressed')
    PLAYER.guess = key.textContent
    PLAYER.attemps++
    newGame().drawSecretWord()
    if (PLAYER.guessStatus !== true) {
      PLAYER.lives--
      console.log(PLAYER.lives)
      newGame().drawLives()
    }
    if (PLAYER.lives === 0 || GAME.answerArray.join('') === GAME.secretWord) {
      newGame().gameOver()
    }
  }
})

const newGame = () => {
  return new Game()
}

newGame()
newGame().drawLives()
newGame().drawSecretWord()
newGame().drawKeys()
