
export default class MoveController{
    constructor(){
        this.angle = 0;
        document.getElementById('game').addEventListener('mousemove', (e) =>{
            this.angle = Math.atan2(e.pageY-this.getHeight()/2, e.pageX-this.getWidth()/2);
        });
    }
    getAngle(){
        return this.angle;
    }
    getWidth() {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      }
      
    getHeight() {
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.documentElement.clientHeight
        );
      }
}