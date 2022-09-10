import { canvas } from "./canvasSetup.js";


export const mouse = {
  x: canvas.width / 4,
  y: canvas.height / 2,
  click: false
}

canvas.addEventListener("mousedown", (e) => {
  mouse.x = e.offsetX
  mouse.y = e.offsetY
  mouse.click = true
})

canvas.addEventListener("mouseup", (e) => { mouse.click = false })

