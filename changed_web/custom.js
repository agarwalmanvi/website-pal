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

canvas.addEventListener("click", createWorld, false);

var worldsNum = 0;
var r = 30;
var w = window;
w["arr"+worldsNum] = [];
var worldsArray = [];

function createWorld(event) {
	if (btn.classList.contains('mdl-button--colored')) {
		var x = event.clientX;
		var y = event.clientY;
		ctx.fillStyle = "rgba(5, 200, 150, 0.5)";
		ctx.lineWidth=1;
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		w["arr"+worldsNum] = [x,y,r];
		worldsArray.push([x,y,r]);
		worldsNum += 1;
	}
}

canvas.addEventListener("click", detectClick, false);

var clickedCircles = 0;

function detectClick(event){
	if (btn.classList.contains('mdl-button--colored') === false) {
		var keepGoing = true;
		var currentX = event.clientX;
		var currentY = event.clientY;
		var result;
		for (i=0;i<worldsArray.length && keepGoing;i++) {
			var temp = worldsArray[i];
			var centerX = temp[0];
			var centerY = temp[1];
			var radius = temp[2];
			if(Math.sqrt((currentX-centerX)*(currentX-centerX) + (currentY-centerY)*(currentY-centerY)) < radius) {
				if (clickedCircles == 0) {
					ctx.fillStyle = "rgba(5, 200, 150, 0.5)";
					ctx.lineWidth=5;
					ctx.strokeStyle = "#000000";
					ctx.beginPath();
					ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
					clickedCircles = clickedCircles + 1;
					keepGoing = false;
				} else if (clickedCircles == 1) {
					ctx.fillStyle = "rgba(5, 200, 150, 0.5)";
					ctx.lineWidth=5;
					ctx.strokeStyle = "#000000";
					ctx.beginPath();
					ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
					clickedCircles = clickedCircles + 1;
					keepGoing = false;
				} else {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					for (i=0;i<worldsArray.length;i++) {
						var temp = worldsArray[i];
						var x = temp[0];
						var y = temp[1];
						var r = temp[2];
						ctx.fillStyle = "rgba(5, 200, 150, 0.5)";
						ctx.lineWidth=1;
						ctx.strokeStyle = "#000000";
						ctx.beginPath();
						ctx.arc(x, y, r, 0, 2 * Math.PI);
						ctx.fill();
						ctx.stroke();
					}
					clickedCircles = 0;
				}
			} /*ADD DESELECTION*/
		}
	}
}

/*
var start = randomDiamond(ctx,'#060');
    var end   = randomDiamond(ctx,'#600');
    ctx.lineWidth = 2;
    ctx.fillStyle = ctx.strokeStyle = '#099';
    arrow(ctx,start,end,10);

    function arrow(ctx,p1,p2,size){
      ctx.save();

      var points = edges(ctx,p1,p2);
      if (points.length < 2) return 
      p1 = points[0], p2=points[points.length-1];

      // Rotate the context to point along the path
      var dx = p2.x-p1.x, dy=p2.y-p1.y, len=Math.sqrt(dx*dx+dy*dy);
      ctx.translate(p2.x,p2.y);
      ctx.rotate(Math.atan2(dy,dx));

      // line
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(-len,0);
      ctx.closePath();
      ctx.stroke();

      // arrowhead
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(-size,-size);
      ctx.lineTo(-size, size);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // Find all transparent/opaque transitions between two points
    // Uses http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
    function edges(ctx,p1,p2,cutoff){
      if (!cutoff) cutoff = 220; // alpha threshold
      var dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y),
          sx = p2.x > p1.x ? 1 : -1,  sy = p2.y > p1.y ? 1 : -1;
      var x0 = Math.min(p1.x,p2.x), y0=Math.min(p1.y,p2.y);
      var pixels = ctx.getImageData(x0,y0,dx+1,dy+1).data;
      var hits=[], over=null;
      for (x=p1.x,y=p1.y,e=dx-dy; x!=p2.x||y!=p2.y;){
        var alpha = pixels[((y-y0)*(dx+1)+x-x0)*4 + 3];
        if (over!=null && (over ? alpha<cutoff : alpha>=cutoff)){
          hits.push({x:x,y:y});
        }
        var e2 = 2*e;
        if (e2 > -dy){ e-=dy; x+=sx }
        if (e2 <  dx){ e+=dx; y+=sy  }
        over = alpha>=cutoff;
      }
      return hits;
    }

    function randomDiamond(ctx,color){
      var x = Math.round(Math.random()*(ctx.canvas.width  - 100) + 50),
          y = Math.round(Math.random()*(ctx.canvas.height - 100) + 50);
      ctx.save();
      ctx.fillStyle = color;
      ctx.translate(x,y);
      ctx.rotate(Math.random() * Math.PI);
      var scale = Math.random()*0.8 + 0.4;
      ctx.scale(scale,scale);
      ctx.lineWidth = 5/scale;
      ctx.fillRect(-50,-50,100,100);
      ctx.strokeRect(-50,-50,100,100);
      ctx.restore();
      return {x:x,y:y};
    }
*/
