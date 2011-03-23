var canvas = new ART(1000, 1000);

var square = new ART.Path()
	.move(0,0)
	.line(100,0)
	.line(0,100)
	.line(-100,0)
	.close();

var circle = new ART.Path()
	.moveTo(50,0)
	.arc(0,100, 50)
	.arc(0,-100, 50)
	.close();

var morph = new ART.Path.Morph(square, circle);

var shape = new ART.Shape()
	.fill('#F00')
	.inject(canvas);

var start = +new Date(), timer = setInterval(function(){
	var delta = (new Date() - start) / 4000;
	if (delta > 1)
		clearInterval(timer);
	else
		shape.draw(morph.compute(delta));
}, 1000 / 60);

canvas.inject(document.body);