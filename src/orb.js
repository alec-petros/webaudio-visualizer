
class Orb {

  constructor(val) {
    this.x = Math.random() * 3000
    this.y = Math.random() * 3000
    this.val = val
    this.color = Orb.getRandomColor()
    Orb.all.push(this)
  }

  render(dataArray) {
    // console.log(dataArray[this.val])

    canvasCtx.globalAlpha = 0.5

    canvasCtx.beginPath();
    canvasCtx.fillStyle=this.color
    canvasCtx.lineWidth = 1
    canvasCtx.ellipse(this.x += 0.2, this.y += 0.4, dataArray[this.val] / 7, dataArray[this.val] / 7, 45 * Math.PI/180, 0, 2 * Math.PI)
    canvasCtx.fill()
    canvasCtx.stroke();
    // console.log(canvasCtx.width)

    if (this.x > canvas.width + 50) {

      this.x -= 900
    }
    if (this.y > canvas.height + 50) {
      this.y -= 900
    }
  }

  static getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

}
Orb.all = []
