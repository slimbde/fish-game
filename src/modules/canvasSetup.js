import { responseHandler, api } from "./auth.js"


export const canvas = document.getElementById("canvas")
export const ctx = canvas.getContext("2d")
canvas.width = 700
canvas.height = 500


Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
}


export const drawScore = (playerName, score, endGameRequest) => {
  ctx.fillStyle = "black"
  ctx.font = "15px Georgia"
  ctx.fillText("player: " + playerName, 10, 20)
  ctx.fillText((new Date()).addHours(5).toISOString().slice(11, 19), canvas.width - 70, 20)
  ctx.font = "30px Georgia"
  ctx.fillText("score: " + score, 10, 50)

  ctx.fillStyle = "red"
  ctx.font = "20px Georgia"
  ctx.fillText("end game", canvas.width - 100, 40)
  endGameRequest && (ctx.strokeStyle = "red")
  endGameRequest && (ctx.lineWidth = 2)
  endGameRequest && ctx.strokeText("end game", canvas.width - 100, 40)

  if (score < 3) {
    ctx.font = "50px Georgia"
    ctx.fillStyle = "#ffffff85"
    ctx.fillText("COLLECT BUBBLES", canvas.width / 5, 100)
  }
}


export const drawNewGameRequest = (newGameCallback) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.beginPath()
  ctx.fillStyle = "white"
  ctx.font = `${canvas.width / 50}px Georgia`
  ctx.fillText("by Grigoriy Dolgiy © 2022", canvas.width / 2 + 150, canvas.height / 3 + 25)
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = "white"
  ctx.font = `${canvas.width / 10}px Georgia`
  ctx.strokeStyle = "black"
  ctx.lineWidth = 2
  ctx.fillText("BUBBLES", canvas.width / 2, canvas.height / 2)
  ctx.strokeText("BUBBLES", canvas.width / 2, canvas.height / 2)
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.font = `${canvas.width / 30}px Georgia`
  ctx.fillText("Для начала новой игры", canvas.width / 2, canvas.height / 2 + 25)
  ctx.fillText("кликните игровой экран", canvas.width / 2, canvas.height / 2 + 47)
  ctx.closePath()

  // draw scores
  fetch(`${api}/php-api/users/fish-get-scores`)
    .then(responseHandler)
    .then(scores => {
      if (Array.isArray(scores)) {
        ctx.beginPath()
        ctx.font = "15px Georgia"
        ctx.fillStyle = "white"
        let y = 40
        ctx.fillText("TOP SCORES:", 20, y)
        ctx.fillStyle = "yellow"

        scores.forEach(one => {
          y += 18
          ctx.fillText(`${one.Login}: ${one.Scores}`, 20, y)
        })
        ctx.closePath()
      }
    })
    .catch(err => {
      if (!err.message.toLowerCase().includes("not found")) console.error(err.message)
    })

  canvas.onclick = () => newGameCallback(canvas)
}
