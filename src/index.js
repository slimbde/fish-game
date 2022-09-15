import "./style.css"
import { Player } from "./modules/player.js";
import { drawNewGameRequest, drawScore } from "./modules/canvasSetup.js";
import { handleBubbles } from "./modules/bubbles.js"

let playerName = ""
let score = 0
let gameFrame = 0
let token = new AbortController()
let fish = new Player()
let endGameRequest = false

const bgSound = new Audio("sound/underwater.mp3")
bgSound.volume = 0.5
bgSound.loop = true




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
  const authForm = document.getElementById("auth-form")
  authForm.style.visibility = "visible"

  canvas.onclick = () => {
    const visibility = authForm.style.visibility
    authForm.style.visibility = visibility === "hidden" ? "visible" : "hidden"
  }


  //while (playerName.length < 1) {
  //  playerName = prompt("Please introduce yourself...")

  //  if (playerName === null) {
  //    canvas.onclick = () => newGameCallback(canvas)
  //    playerName = ""
  //    break
  //  }
  //}

  //if (!!playerName) {
  //  canvas.onclick = (e) => {
  //    //console.log(e.offsetX, e.offsetY)
  //    if (e.offsetX > 585 && e.offsetY > 25 && e.offsetY < 50) {
  //      if (confirm("really end this game?") === true) {

  //        let scores = {}
  //        let json = localStorage.getItem("scores")
  //        if (!!json) scores = JSON.parse(json)
  //        scores[playerName] = score
  //        localStorage.setItem("scores", JSON.stringify(scores))

  //        bgSound.pause()
  //        token.abort()
  //        token = new AbortController()
  //        gameFrame = 0
  //        score = 0
  //        fish = new Player()
  //        playerName = ""
  //        drawNewGameRequest(newGameCallback)
  //      }
  //    }
  //  }
  //  canvas.onmousemove = (e) => {
  //    if (e.offsetX > 585 && e.offsetY > 25 && e.offsetY < 50) {
  //      canvas.style.cursor = "pointer"
  //      endGameRequest = true
  //    }
  //    else {
  //      canvas.style.cursor = "default"
  //      endGameRequest = false
  //    }
  //  }

  //  bgSound.play()
  //  animate(token)
  //}
}


gameFrame === 0 && drawNewGameRequest(newGameCallback)


