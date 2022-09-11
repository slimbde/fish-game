import { canvas, ctx } from "./canvasSetup.js"



class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = canvas.height + 100
    this.speed = Math.random() * 5 + 1
    this.distance = 0
    this.dispose = false
    this.sound = new Audio(`sound/bubble${Math.random() < 0.5 ? 1 : 2}.mp3`)
    this.sound.volume = 0.1
    this.img = new Image()
    this.img.src = Math.random() < 0.5 ? "img/bubble1.png" : "img/bubble2.png"
    this.scale = 0.15
    this.spriteWidth = 512
    this.spriteHeight = 512
    this.width = this.spriteWidth * this.scale
    this.height = this.spriteHeight * this.scale
    this.radius = this.width / 3
    this.frame = 0
  }

  getFramePosition(frameNum) {
    return {
      frameX: Math.round(frameNum) % 4,
      frameY: Math.floor(frameNum / 4),
    }
  }

  update(fish) {
    // disposing rule
    this.y -= this.speed
    this.y < (0 - this.radius * 2) && (this.dispose = true)

    // to distinguish when the bubble was approached we indicate the distance
    const distance = Math.sqrt(Math.pow(this.x - fish.x, 2) + Math.pow(this.y - fish.y, 2))
    distance < this.radius + fish.radius && (this.distance -= 1)
  }

  draw(gameFrame) {
    //ctx.fillStyle = "blue"
    //ctx.beginPath()
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    //ctx.fill()
    //ctx.closePath()
    //ctx.stroke()

    if (this.distance < 0 && gameFrame % 6 === 0) ++this.frame

    const { frameX, frameY } = this.getFramePosition(this.frame)

    ctx.drawImage(
      this.img,
      frameX * this.spriteWidth,  // sprite X
      frameY * this.spriteHeight,  // sprite Y
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.scale * this.spriteWidth / 2,
      this.y - this.scale * this.spriteHeight / 2,
      this.width,
      this.height
    )
  }
}


const bubbleArray = []


export const handleBubbles = (gameFrame, fish) => {
  let approachedBubbles = 0

  if (gameFrame % 50 === 0) {
    bubbleArray.push(new Bubble())
  }

  for (let i = 0; i < bubbleArray.length;) {
    const b = bubbleArray[i]

    if (b.dispose) {
      bubbleArray.splice(i, 1)
      continue
    }

    if (b.distance < 0) {
      if (b.distance === -1) {
        b.sound.play()
        ++approachedBubbles
      }

      b.frame > 6 && (b.dispose = true)
    }

    b.update(fish)
    b.draw(gameFrame)
    ++i
  }

  return approachedBubbles
  //console.log(bubbleArray.length)
}