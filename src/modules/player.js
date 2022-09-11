import { canvas, ctx } from "./canvasSetup.js"
import { mouse } from "./mouse.js"


export class Player {
  constructor() {
    this.x = 0
    this.y = canvas.height / 2
    this.angle = 0
    this.frame = 0
    this.frameSign = 1
    this.minFrame = 0
    this.maxFrame = 11
    this.spriteWidth = 498
    this.spriteHeight = 327
    this.scale = 0.2
    this.width = this.spriteWidth * this.scale
    this.height = this.spriteHeight * this.scale
    this.radius = this.width / 2.5
    this.imgLeft = new Image()
    this.imgLeft.src = "img/sweem.png"
    this.imgRight = new Image()
    this.imgRight.src = "img/sweem-flipped.png"
  }

  getFramePosition(frameNum) {
    return {
      frameX: Math.round(frameNum) % 4,
      frameY: Math.floor(frameNum / 4),
    }
  }

  update() {
    const dx = this.x - mouse.x
    const dy = this.y - mouse.y
    mouse.click && (this.angle = Math.atan2(dy, dx))

    const levelDelta = 0.005
    const pi = Math.PI
    if (!mouse.click) {
      this.angle > 0 && this.angle < pi / 2 && (this.angle -= levelDelta)
      this.angle > pi / 2 && this.angle < pi && (this.angle += levelDelta)
      this.angle < 0 && this.angle > -pi / 2 && (this.angle += levelDelta)
      this.angle < 0 && this.angle > -pi && this.angle < -pi / 2 && (this.angle -= levelDelta)
    }

    mouse.x !== this.x && (this.x -= dx / 10)
    mouse.y !== this.y && (this.y -= dy / 10)
  }

  draw(gameFrame) {
    this.update()

    if (gameFrame % 12 === 0) ++this.frame
    if (this.frame === 12) this.frame = 0

    const { frameX, frameY } = this.getFramePosition(this.frame)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //ctx.fillStyle = "red"
    //ctx.beginPath()
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    //ctx.fill()
    //ctx.closePath()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle || Math.PI)
    ctx.drawImage(
      this.x < mouse.x ? this.imgRight : this.imgLeft,
      frameX * this.spriteWidth,  // sprite X
      frameY * this.spriteHeight,  // sprite Y
      this.spriteWidth,
      this.spriteHeight,
      0 - this.scale * this.spriteWidth / 2,
      0 - this.scale * this.spriteHeight / 2,
      this.width,
      this.height
    )
    ctx.restore()

    //if (mouse.click) {
    //  ctx.lineWidth = 0.2
    //  ctx.beginPath()
    //  ctx.moveTo(this.x, this.y)
    //  ctx.lineTo(mouse.x, mouse.y)
    //  ctx.stroke()
    //  ctx.closePath()
    //}


  }
}




