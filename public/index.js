var app = function () {
  var canvas = document.querySelector("#main-canvas")
  var context = canvas.getContext("2d")
  canvas.focus();
  var currentX = 260;
  var currentY = 175;

  var button = document.querySelector("button")
  button.addEventListener("click", function () {
    console.log("Shaked")
    context.clearRect(0, 0, canvas.width, canvas.height)
    canvas.focus();
  })

  canvas.addEventListener("keydown", function (event) {
    calcNewPosition(event)
    drawLine(event)

  })

  var chooseDirection = function(event) {
    var key = event.key
    console.log(key);
  }

  var drawLine = function () {
    // if (currentY === undefined && currentY === undefined){
    // currentX = 300;
    // currentY = 250;
    // }

    var standardIncrement = 5;
    context.lineTo(currentX, currentY);
    context.stroke()

  }

  var calcNewPosition = function (event) {
    context.beginPath()
    context.moveTo(currentX, currentY);
    console.log("currentY", currentY);
    console.log("currentX", currentX);

    switch (event.key) {

      case "ArrowUp":
        if (currentY > 0){
        console.log("Up");
        currentY -= 10;
      }
        break;
      case "ArrowDown":
      if (currentY < 345){
        console.log("Down");
        currentY += 10;
      }
        break;
      case "ArrowRight":
      if (currentX < 521){
        console.log("Right");
        currentX += 10;
      }
        break;
      case "ArrowLeft":
      if (currentX > 0 ){
        console.log("Left");
        currentX -= 10;
      }
        break;

    }
  }




}





window.addEventListener("load", app)





// var map = {}; // You could also use an array
// onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.keyCode] = e.type == 'keydown';
//     /* insert conditional here */
// }
