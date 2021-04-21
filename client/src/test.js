const canvas = document.getElementById('mainCanvas')
const ctx = canvas.getContext('2d')

ctx.imageSmoothingEnabled = true
ctx.imageSmoothingQuality = 'high'

let width = innerWidth

let height = innerHeight
canvas.width = width
canvas.height = height

window.onresize = () => {
  width = innerWidth
  height = innerHeight
  canvas.width = width
  canvas.height = height
}

let x = width * 0.5
let y = height * 0.5

document.onmousemove = evt => {
  x = evt.clientX
  y = evt.clientY
}

let boost = false

document.onmousedown = () => {
  boost = true
}
document.onmouseup = () => {
  boost = false
}

const fixAngle = angle => {
  if (angle > Math.PI * 2) {
    angle %= Math.PI * 2
  } else if (angle < 0) {
    angle %= -Math.PI * 2
    angle += Math.PI * 2
  }
  return angle
}

const makeSnakeSegmentCache = (r, fillColor, strokeColor) => {
  let canvas = document.createElement('canvas')
  canvas.width = r * 2.6
  canvas.height = r * 2.6
  
  let ctx = canvas.getContext('2d')
  
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = r * 0.1
  
  ctx.shadowColor = 'black'
  ctx.shadowBlur = r * 0.3
  
  ctx.beginPath()
  ctx.arc(canvas.width * 0.5, canvas.height * 0.5, r, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  return canvas
}

class Snake {
  constructor(x, y, n) {
    this.x = x
    this.y = y
    this.r = 30
    this.segments = []
    this.angle = 0
    this.speed = 2
    this.acceleration = 0.06
    
    for (let i = 0; i < n; i++) {
      this.segments.push({
        x, y
      })
    }
    
    this.cache = makeSnakeSegmentCache(100, 'rgb(240, 0, 0)', 'rgb(180, 0, 0)')
  }
  move(x, y, boost) {
    if (boost && this.speed < 4) {
      this.speed += this.acceleration
      if (this.speed >= 4) {
        this.speed = 4
      }
    } else if (this.speed > 2) {
      this.speed -= this.acceleration
      if (this.speed <= 2) {
        this.speed = 2
      }
    }

    const speed = this.speed
    let angle = fixAngle(Math.atan2(y - this.y, x - this.x))

    this.angle = angle
    
    const r = this.r

    let MULTIPLIER = 1
    let m = Math.hypot(x - this.x, y - this.y)
    if (m < r) {
      MULTIPLIER = Math.pow(m / r, 2)
    }

    let xVelocity = Math.cos(this.angle) * speed * MULTIPLIER
    let yVelocity = Math.sin(this.angle) * speed * MULTIPLIER
    this.x += xVelocity
    this.y += yVelocity

    const d = 8/20 * r

    let firstSegment = this.segments[0]
    let angle_head = Math.atan2(this.y - firstSegment.y, this.x - firstSegment.x)
    firstSegment.x = this.x - Math.cos(angle_head) * d
    firstSegment.y = this.y - Math.sin(angle_head) * d

    for (let i = 1; i < this.segments.length; i++) {
      let previous = this.segments[i - 1]
      let current = this.segments[i]

      let angle_new_position = Math.atan2(previous.y - current.y, previous.x - current.x)
      current.x = previous.x - Math.cos(angle_new_position) * d
      current.y = previous.y - Math.sin(angle_new_position) * d
    }
  }
  drawCachedSegment(x, y) {
    let r = this.r
    ctx.drawImage(this.cache, x - r * 1.3, y - r * 1.3, r * 2.6, r * 2.6)
  }
  draw() {
    ctx.fillStyle = 'rgb(240, 0, 0)'
    ctx.strokeStyle = 'rgb(180, 0, 0)'
    ctx.lineWidth = 2
    const r = this.r

    for (let i = this.segments.length - 1; i >= 0; i--) {
      let segment = this.segments[i]
      let { x, y } = segment
      this.drawCachedSegment(x, y)
    }
    this.drawCachedSegment(this.x, this.y)

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.beginPath()
    ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = '#ddd'
    ctx.fill()

    ctx.beginPath()
    ctx.translate(Math.cos(this.angle) * r * 0.35, Math.sin(this.angle) * r * 0.35)
    ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.restore()

    ctx.lineWidth = 4
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }
}

let snake = new Snake(width * 0.5, height * 0.5, 32)

const loop = () => {
  // Update
  snake.move(x, y, boost)

  // Draw
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, width, height)

  snake.draw()

  // Loop
  requestAnimationFrame(loop)
}

loop()