var btn = document.querySelector('.toggleBtn');

function clicker() {
	if (btn.classList.contains('mdl-button--colored')) {
		btn.classList.remove('mdl-button--colored');
	} else {
		btn.classList.add('mdl-button--colored');
	}
}

var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");

draw();

function draw() {
    setCanvasSize(ctx.canvas);
    ctx.strokeStyle="#FFFFFF";
    ctx.beginPath();
    ctx.arc(100,100,50,0,2*Math.PI);
    ctx.stroke();
}

window.onresize = setCanvasSize();

function setCanvasSize(canvas) {
	var canvas = document.getElementById('stage');
  var rect = canvas.parentNode.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

canvas.addEventListener("click", createWorld, false)

function createWorld(event) {
	if (btn.classList.contains('mdl-button--colored')) {
		var x = event.clientX;
		var y = event.clientY;
		ctx.fillStyle = "rgba(5, 200, 150, 0.5)";
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		ctx.arc(x, y, 30, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

