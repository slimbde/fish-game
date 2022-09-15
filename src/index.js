import "./style.css"
import { Player } from "./modules/player.js";
import { drawNewGameRequest, drawScore } from "./modules/canvasSetup.js";
import { handleBubbles } from "./modules/bubbles.js"
import { saveScores, setUpAuth } from "./modules/auth.js";

let playerName
let score = 0
let gameFrame = 0
let token = new AbortController()
let fish = new Player()
let endGameRequest = false

const bgSound = new Audio("sound/underwater.mp3")
bgSound.volume = 0.5
bgSound.loop = true

const authForm = document.getElementById("auth-form")



const animate = (token) => {
  if (!token.signal.aborted) {
    fish.draw(gameFrame)
    score += handleBubbles(gameFrame, fish)
    drawScore(playerName, score, endGameRequest)
    ++gameFrame
    requestAnimationFrame(() => animate(token))
  }
}


const newGameCallback = (canvas) => {
  authForm.style.visibility = "visible"
  setUpAuth(startGameCallback)

  canvas.onclick = () => {
    const visibility = authForm.style.visibility

    if (visibility === "hidden") {
      authForm.style.visibility = "visible"
      setUpAuth(startGameCallback)
    }
    else {
      authForm.style.visibility = "hidden"
    }
  }
}


const startGameCallback = ({ login, prevScore }) => {
  authForm.style.visibility = "hidden"
  playerName = login
  score = prevScore

  canvas.onclick = (e) => {
    if (e.offsetX > 585 && e.offsetY > 25 && e.offsetY < 50) {
      if (confirm("really end this game?") === true && score > 0) {

        saveScores(playerName, score)
          .then(() => {
            bgSound.pause()
            token.abort()
            token = new AbortController()
            gameFrame = 0
            fish = new Player()
            drawNewGameRequest(newGameCallback)
          })

      }
    }
  }

  canvas.onmousemove = (e) => {
    if (e.offsetX > 585 && e.offsetY > 25 && e.offsetY < 50) {
      canvas.style.cursor = "pointer"
      endGameRequest = true
    }
    else {
      canvas.style.cursor = "default"
      endGameRequest = false
    }
  }

  bgSound.play()
  animate(token)
}



gameFrame === 0 && drawNewGameRequest(newGameCallback)


