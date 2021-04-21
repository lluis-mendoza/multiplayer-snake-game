
export default class GameView{
    constructor(){
        this.canvas = document.getElementById('cnvSnake');
        this.ctx = this.canvas.getContext('2d');
        this.dpi = window.devicePixelRatio;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.cache = this.makeSnakeSegmentCache(100, 'rgb(240, 0, 0)', 'rgb(180, 0, 0)');
        this.fix_dpi();
    }
    makeSnakeSegmentCache(r, fillColor, strokeColor){
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
    drawCachedSegment(x, y) {
        let r = 40;
        this.ctx.drawImage(this.cache, x - r * 1.3, y - r * 1.3, r * 2.6, r * 2.6)
      }
    drawSnake(segments){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        this.ctx.fillStyle = 'rgb(240, 0, 0)'
        this.ctx.strokeStyle = 'rgb(180, 0, 0)'
        this.ctx.lineWidth = 2
    
        for (let i = segments.length - 1; i >= 0; i--) {
          let segment = segments[i]
          let { x, y } = segment
          this.drawCachedSegment(x, y)
        }
        this.ctx.save();
    }
    fix_dpi() {
        let canvas = this.canvas;
        let style = {
            height() {
              return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
            },
            width() {
              return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
            }
        }
        this.canvas.setAttribute('width', style.width() * this.dpi);
        this.canvas.setAttribute('height', style.height() * this.dpi);
    }
}